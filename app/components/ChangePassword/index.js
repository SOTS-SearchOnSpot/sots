import React, { PureComponent } from 'react'
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import { Container, Header } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Toast from 'react-native-simple-toast';
import { Languages, Color, Icons, Validate } from '@common';
import styles from './styles';
import { UserDetails } from '@services';
import { connect } from 'react-redux'
import Fire from '../../FireBase/Fire';
import firebase from '../../FireBase/Config';

class ChangePassword extends PureComponent {
    constructor(props){
        super(props);
        this.state = {
            password: "",
            confirmPassword: "",
            isLoading: false
        };
        this.onPasswordEditHandle = (password) => this.setState({ password });
        this.onConfirmPasswordEditHandle = (confirmPassword) => this.setState({ confirmPassword });
        this.focusConfirmPassword = () => this.confirmPassword && this.confirmPassword.focus();
    }

    validateForm = () => {
        const { password, confirmPassword } = this.state;
        if(Validate.isEmpty(password, confirmPassword)){
            return Languages.FormError;
        }else if(password.length < 6){
            return Languages.PasswordDigitError;
        }else if(password != confirmPassword){
            return Languages.PasswordError;
        }
        return undefined;
    }
    // reauthenticate = (currentPassword) => {

    //     var user = firebase.auth().currentUser;
    //     var credential = firebase.auth().EmailAuthProvider.credential(
    //         user.Email, '123456'
    //     )
    //     firebase.auth().
    //     var cred = firebase.auth.EmailAuthProvider.credential(
    //         user.email, currentPassword);
    //     return user.reauthenticateWithCredential(cred);
    //   }
    onSubmitPressHandle = async () => {
        const { password } = this.state;
        const { user, token, setIntro,setPassword, currentPassword } = this.props;
        const error = this.validateForm();
        if(error) return Toast.show(error, Toast.LONG);
        var data = new FormData();
        data.append('id', user.Id);
        data.append('password', password);
        const response = await UserDetails.editProfile(token, data);
        if(response === undefined){
            Toast.show(Languages.ServerError, Toast.LONG);
        }else{
            if(response.flag == true){
                Fire.loginRequest(user.Email, currentPassword)
                .then(async (res) => {
                    var currentUser = await firebase.auth().currentUser;
                    currentUser.updatePassword(password)
                    .then(()=>{
                        console.log('Password updated');
                    })
                    .catch(e=>{
                        console.log('Change Password error => ', e)
                    })
                })
                .catch(e => {
                    console.log('Login reguest error => ', e)
                }) 
                await setPassword(password);             
                await setIntro();
                Toast.show(Languages.PasswordUpdate, Toast.LONG);
            }else{
                Toast.show(response.message, Toast.LONG);
            }
        }        
    }
    

    render(){
        const { password, confirmPassword, isLoading } = this.state;
        return(
            <Container style={styles.container}>
                <Header style={styles.header}>
                    <View style={styles.actionBarLeft}>
                        <TouchableOpacity 
                        onPress={() => {
                            this.props.navigation.goBack();
                        }}>
                            <Icon name={Icons.MaterialCommunityIcons.Back} size={25} color={Color.cancelButton}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.actionBarMiddle}>
                        <Text style={styles.barCentertext}>{this.props.navigation.state.params.name}</Text>
                    </View>
                    <View style={styles.actionBarRight}></View>
                </Header>
                <View style={styles.container}>                    
                    <View style={styles.subContain}>
                        <View style={styles.loginForm}>                        
                            <View style={styles.inputwrap}>
                                <TextInput
                                    style={styles.input}
                                    //underlineColorAndroid='transpaent'
                                    ref={(comp) => (this.password = comp)}
                                    placeholderTextColor={Color.placeholder}
                                    placeholder={Languages.NewPassword}
                                    onChangeText={this.onPasswordEditHandle}
                                    returnKeyType= 'next'
                                    onSubmitEditing={this.focusConfirmPassword}
                                    secureTextEntry
                                    value={password}
                                />
                            </View>
                            <View style={styles.inputwrap}>
                                <TextInput
                                    style={styles.input}
                                    //underlineColorAndroid='transpaent'
                                    ref={(comp) => (this.confirmPassword = comp)}
                                    placeholderTextColor={Color.placeholder}
                                    placeholder={Languages.ConfirmNewPassword}
                                    onChangeText={this.onConfirmPasswordEditHandle}
                                    returnKeyType= 'go'
                                    secureTextEntry
                                    value={confirmPassword}
                                />
                            </View>
                            <TouchableOpacity
                                style={styles.loginButton}
                                onPress={this.onSubmitPressHandle}>
                                <Text style={styles.buttonText}>{Languages.Submit}</Text>
                            </TouchableOpacity>
                        </View>                        
                    </View>
                </View>
            </Container>
        );
    }
}
const mapStateToProps = (state) => ({
    token: state.user.token,
    user: state.user.user,
    currentPassword: state.user.currentPassword
});
const mapDispatchToProps = (dispatch) => {
    const { action } = require('@redux/UserRedux');
    return {
        login: (user) => dispatch(action.login(user)),
        setIntro: () => dispatch(action.setIntro()),
        setPassword: (password) => dispatch(action.setPassword(password)),
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChangePassword);
//export default ChangePassword;