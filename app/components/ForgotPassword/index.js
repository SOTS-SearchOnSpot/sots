import React, { PureComponent } from 'react'
import { View, Text, Image, TextInput, TouchableOpacity, Platform } from 'react-native';
import { Languages, Images, Color, Styles, Validate, Icons } from '@common';
import { Container, Header, Content } from 'native-base';
import Toast from 'react-native-simple-toast';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles'
import { UserDetails } from '@services';
import { connect } from 'react-redux'

class ForgotPassword extends PureComponent {
    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: "",
            confirmPassword: "",
            id: '',
            isLoading: false,
            isChecked: false
        };
        this.onUsernameEditHandle = (username) => this.setState({ username });
        this.onPasswordEditHandle = (password) => this.setState({ password });
        this.onConfirmPasswordEditHandle = (confirmPassword) => this.setState({ confirmPassword });

        this.focusPassword = () => this.password && this.password.focus();
        this.focusConfirmPassword = () => this.confirmPassword && this.confirmPassword.focus();
    }

    validateForm = () => {
        const {username, password, confirmPassword, isChecked} = this.state;
        if(isChecked){
            if(Validate.isEmpty(password, confirmPassword)){
                return Languages.FormError;
            }else if(password < 6){
                return Languages.PasswordDigitError;
            }else if(password != confirmPassword){
                return Languages.PasswordError;
            }
        }else{
            if(Validate.isEmpty(username)){
                return Languages.FormError;
            }
        }
        return undefined;
    }

    onSubmitPressHandle = async () => {
        const { username, password, isChecked, id } = this.state;
        const { token } = this.props;
        const error = this.validateForm();
        if(error) return Toast.show(error, Toast.LONG);
        var data = new FormData();
        if(isChecked){
            data.append('id', id);
            data.append('password', password);
            let response = await UserDetails.editProfile(token, data);
            if(response === undefined){
                Toast.show(Languages.ServerError, Toast.LONG);
            }else{
                if(response.flag == true){
                    Toast.show(Languages.PasswordUpdate, Toast.LONG);
                    this.setState({isChecked: false, username: ""});
                    this.props.navigation.goBack();
                }else{
                    Toast.show(response.message, Toast.LONG);
                }               
            }            
        }else{
            data.append('email_mobile', username);
            let response = await UserDetails.userValidation(token, data);
            if(response === undefined){
                Toast.show(Languages.ServerError, Toast.LONG);
            }else{
                if(response.flag == true){
                    this.setState({isChecked: true, id: response.response.Id});
                }else{
                    Toast.show(response.message, Toast.LONG);
                }               
            }            
        }
    }
    

    render(){
        const { username, password, confirmPassword, isLoading, isChecked } = this.state;
        return(
            <Container style={styles.container}>
                <Content style={styles.container}>                
                    <View style={styles.layoutInner}>
                        <View style={[styles.logoWrap, Platform.OS == 'ios' && {marginTop: 60}]}>
                            <Image
                            source={Images.LoginTopImage}
                            style={styles.logo}
                            resizeMode='contain'/>
                        </View>
                        <View style={styles.subContain}>
                            <View style={styles.loginForm}>                        
                                {isChecked == false && (<View style={styles.inputwrap}>
                                    <TextInput
                                        style={styles.input}
                                        //underlineColorAndroid='transpaent'
                                        ref={(comp) => (this.username = comp)}
                                        placeholderTextColor={Color.placeholder}
                                        placeholder={Languages.EmailMobile}
                                        //keyboardType='email-address'
                                        onChangeText={this.onUsernameEditHandle}
                                        //onSubmitEditing={this.focusPassword}
                                        returnKeyType= 'go'
                                        value={username}
                                    />
                                </View>)}
                                {isChecked == true && (<View style={styles.inputwrap}>
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
                                </View>)}
                                {isChecked == true && (<View style={styles.inputwrap}>
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
                                </View>)}
                                <TouchableOpacity
                                    style={[styles.loginButton, Platform.OS == 'ios' && {borderColor: Color.background1, borderWidth: 1}]}
                                    onPress={this.onSubmitPressHandle}>
                                    <Text style={styles.buttonText}>{Languages.Submit}</Text>
                                </TouchableOpacity>
                            </View>                        
                        </View>
                        {Platform.OS == 'ios' && (
                            <View style={[styles.header, Platform.OS == 'ios' && {marginTop: 40}]}>
                            <TouchableOpacity 
                                onPress={() => {
                                    this.props.navigation.goBack(null);
                                }}
                                style={styles.backArrow}>
                                    <Icon name={Icons.MaterialCommunityIcons.Back} size={25} color={Color.black}/>
                            </TouchableOpacity>                            
                        </View>
                        )}
                    </View>
                </Content>
            </Container>
        );
    }
}
const mapStateToProps = (state) => ({
    token: state.user.token
});
const mapDispatchToProps = (dispatch) => {
    const { action } = require('@redux/UserRedux');
    return {
        login: (user) => dispatch(action.login(user))
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ForgotPassword);
//export default ForgotPassword;