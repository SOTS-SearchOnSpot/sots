import React, { PureComponent } from 'react'
import { View, Text, Image, TextInput, TouchableOpacity, ActivityIndicator, Platform } from 'react-native';
import { Languages, Images, Color, Styles, Validate, Icons } from '@common';
import { Container, Header, Content } from 'native-base';
import Toast from 'react-native-simple-toast';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-community/async-storage';
import {Picker} from '@react-native-community/picker';
import styles from './styles';
import { UserDetails } from '@services';
import { connect } from 'react-redux';
import Fire from '../../FireBase/Fire';

class Signup extends PureComponent {
    constructor(props){
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            phno: "",
            confirmPhno: "",
            password: "",
            confirmPassword: "",
            isLoading: false,
            languagePicker: props.language == 'en' ? "English" : "Tamil",
        };
        this.onFirstNameEditHandle = (firstName) => this.setState({ firstName });
        this.onLastNameEditHandle = (lastName) => this.setState({ lastName });
        this.onEmailEditHandle = (email) => this.setState({ email });
        this.onPhnoEditHandle = (phno) => this.setState({ phno });
        this.onConfirmPasswordEditHandle = (confirmPassword) => this.setState({ confirmPassword });
        this.onConfirmPhnoEditHandle = (confirmPhno) => this.setState({ confirmPhno });
        this.onPasswordEditHandle = (password) => this.setState({ password });

        this.focusLastName = () => this.lastName && this.lastName.focus();
        this.focusEmail = () => this.email && this.email.focus();
        this.focusPhno = () => this.phno && this.phno.focus();
        this.focusPassword = () => this.password && this.password.focus();
        this.focusConfirmPassword = () => this.confirmPassword && this.confirmPassword.focus();
        this.focusConfirmPhno = () => this.confirmPhno && this.confirmPhno.focus();
    }

    validateForm = () => {
        const { email, password, confirmPassword, phno, confirmPhno, lastName, firstName } = this.state;
        if(Validate.isEmpty(email, password, confirmPassword, phno, confirmPhno, lastName, firstName)){
            return Languages.FormError;
        }else if(!Validate.isEmail(email)){
            return Languages.EmailError;
        }else if(phno != confirmPhno){
            return Languages.MobileNoError;
        }else if(password.length < 6){
            return Languages.PasswordDigitError;
        }else if(password != confirmPassword){
            return Languages.PasswordError;
        }
        return undefined;
    }

    addPlayerId = async (user, chat_id) => {
        try{
            let playerId = await AsyncStorage.getItem('Player_id');
            var data = new FormData();
            data.append('customer_id', user.Id);
            data.append('player_id', playerId);
            data.append('chat_user_id', chat_id);
            const response = await UserDetails.addPlayerId(this.props.token, data);
        }catch(e){
            console.log('add player id error => ', e); 
        }
    }

    onRegisterPressHandle = async () => {
        const { email, password, phno, lastName, firstName } = this.state;
        const { token, login, setUID, setPassword } = this.props;
        const error = this.validateForm();
        if(error) return Toast.show(error, Toast.LONG);
        var data = new FormData();
        data.append('email', email);
        data.append('password', password);
        data.append('first_name', firstName);
        data.append('last_name', lastName);
        data.append('mobile', phno);
        this.setState({isLoading: true});
        const response = await UserDetails.userRegister(token, data);
        if(response !== undefined){
            if(response.flag == true){
               // this.addPlayerId(response.response);
                try{
                    Fire.signUpRequest(response.response.Email, password)
                    .then((res) => {
                        let uid = Fire.getUid();
                        let name = response.response.FirstName + " " + response.response.LastName
                        Fire.addUser(response.response.Email, name, uid)
                        .then(async () => {
                            await this.addPlayerId(response.response, uid);
                            await setUID(uid);
                        })
                    })
                    .catch((err) => {
                        console.log('firebase login error => ', err)
                    })
                }catch(e) {
                }
                await setPassword(password);
                await login(response.response);
                Toast.show("Welcome, Please inform your friends to download our app", Toast.LONG);
                this.setState({isLoading: false});
            }else{
                Toast.show(response.message, Toast.LONG);
                this.setState({isLoading: false});
            }
        }else{
            Toast.show(Languages.ServerError, Toast.LONG);
            this.setState({isLoading: false});
        }
    }
    
    onLoginPressHandle = () => {
        this.props.navigation.goBack(null);
    }

    render(){
        const { firstName, lastName, email, phno, password, confirmPassword, confirmPhno, isLoading, languagePicker } = this.state;
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
                            <View style={styles.inputwrap}>
                                    <TextInput
                                        style={styles.input}
                                        //underlineColorAndroid='transpaent'
                                        ref={(comp) => (this.firstName = comp)}
                                        placeholderTextColor={Color.placeholder}
                                        placeholder={Languages.FirstName}
                                        onChangeText={this.onFirstNameEditHandle}
                                        onSubmitEditing={this.focusLastName}
                                        returnKeyType= 'next'
                                        value={firstName}
                                    />
                                </View>
                                <View style={styles.inputwrap}>
                                    <TextInput
                                        style={styles.input}
                                        //underlineColorAndroid='transpaent'
                                        ref={(comp) => (this.lastName = comp)}
                                        placeholderTextColor={Color.placeholder}
                                        placeholder={Languages.LastName}
                                        onChangeText={this.onLastNameEditHandle}
                                        onSubmitEditing={this.focusEmail}
                                        returnKeyType= 'next'
                                        value={lastName}
                                    />
                                </View>
                                <View style={styles.inputwrap}>
                                    <TextInput
                                        style={styles.input}
                                        //underlineColorAndroid='transpaent'
                                        ref={(comp) => (this.email = comp)}
                                        placeholderTextColor={Color.placeholder}
                                        placeholder={Languages.Email}
                                        keyboardType='email-address'
                                        onChangeText={this.onEmailEditHandle}
                                        onSubmitEditing={this.focusPhno}
                                        returnKeyType= 'next'
                                        value={email}
                                    />
                                </View>
                                <View style={styles.inputwrap}>
                                    <TextInput
                                        style={styles.input}
                                        //underlineColorAndroid='transpaent'
                                        ref={(comp) => (this.phno = comp)}
                                        placeholderTextColor={Color.placeholder}
                                        placeholder={Languages.Mobileno}
                                        keyboardType='phone-pad'
                                        onChangeText={this.onPhnoEditHandle}
                                        onSubmitEditing={this.focusConfirmPhno}
                                        returnKeyType= 'next'
                                        value={phno}
                                    />
                                </View>
                                <View style={styles.inputwrap}>
                                    <TextInput
                                        style={styles.input}
                                        //underlineColorAndroid='transpaent'
                                        ref={(comp) => (this.confirmPhno = comp)}
                                        placeholderTextColor={Color.placeholder}
                                        placeholder={Languages.ConfirmMobile}
                                        keyboardType='phone-pad'
                                        onChangeText={this.onConfirmPhnoEditHandle}
                                        onSubmitEditing={this.focusPassword}
                                        returnKeyType= 'next'
                                        value={confirmPhno}
                                    />
                                </View>
                                <View style={styles.inputwrap}>
                                    <TextInput
                                        style={styles.input}
                                       // underlineColorAndroid='transpaent'
                                        ref={(comp) => (this.password = comp)}
                                        placeholderTextColor={Color.placeholder}
                                        placeholder={Languages.Password}
                                        onChangeText={this.onPasswordEditHandle}
                                        secureTextEntry
                                        onSubmitEditing={this.focusConfirmPassword}
                                        returnKeyType= 'next'
                                        value={password}
                                    />
                                </View>
                                <View style={styles.inputwrap}>
                                    <TextInput
                                        style={styles.input}
                                       // underlineColorAndroid='transpaent'
                                        ref={(comp) => (this.confirmPassword = comp)}
                                        placeholderTextColor={Color.placeholder}
                                        placeholder={Languages.ConfirmPassword}
                                        onChangeText={this.onConfirmPasswordEditHandle}
                                        secureTextEntry
                                        returnKeyType= 'go'
                                        value={confirmPassword}
                                    />
                                </View>
                                <View style={styles.inputwrap}>
                                    <Picker
                                        selectedValue={languagePicker}
                                        style={styles.pickerSelect}
                                        onValueChange={async (itemValue, itemIndex) =>{
                                            await this.props.setSignupLanguage(itemValue == "English" ? 'en' : 'ta');
                                            this.setState({languagePicker: itemValue});                                
                                        }}>
                                        <Picker.Item label="English"  value="English" />
                                        <Picker.Item label="தமிழ்" value="Tamil" />
                                    </Picker>
                                </View>
                                <TouchableOpacity
                                    style={[styles.loginButton, Platform.OS == 'ios' && {borderColor: Color.background1, borderWidth: 1}]}
                                    onPress={this.onRegisterPressHandle}>
                                    <Text style={styles.buttonText}>{Languages.Register}</Text>
                                </TouchableOpacity>
                                {Platform.OS == 'ios' && (
                                <TouchableOpacity
                                style={Styles.Common.ColumnCenter}
                                onPress={this.onLoginPressHandle}>
                                    <Text style={styles.forgotpassword}>
                                        {Languages.HaveAccount}{" "}
                                        <Text style={styles.highlight}>{Languages.Login}</Text>
                                    </Text>
                                </TouchableOpacity>)}
                            </View>                        
                        </View>
                    </View>
                    {Platform.OS == 'ios' && (
                            <View style={[styles.header, Platform.OS == 'ios' && {marginTop: 30}]}>
                            <TouchableOpacity 
                                onPress={() => {
                                    this.props.navigation.goBack(null);
                                }}
                                style={styles.backArrow}>
                                    <Icon name={Icons.MaterialCommunityIcons.Back} size={25} color={Color.black}/>
                            </TouchableOpacity>                            
                        </View>
                        )}
                    {isLoading == true && (
                        <View style={styles.loading}>
                            <ActivityIndicator size={'large'} color={Color.primary}/>
                        </View>
                    )}
                </Content>
            </Container>
        );
    }
}
const mapStateToProps = (state) => ({
    token: state.user.token,
    language: state.user.language,
});
const mapDispatchToProps = (dispatch) => {
    const { action } = require('@redux/UserRedux');
    return {
        login: (user) => dispatch(action.login(user)),
        setUID: (id) => dispatch(action.setUID(id)),
        setPassword: (password) => dispatch(action.setPassword(password)),
        setSignupLanguage: (value) => dispatch(action.setSignupLanguage(value)),
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Signup);
//export default Signup;