import React, { PureComponent } from 'react'
import { View, Text, Image, TextInput, TouchableOpacity, ActivityIndicator, Platform } from 'react-native';
import { Languages, Images, Color, Styles, Validate } from '@common';
import { Container, Header, Content } from 'native-base';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-community/async-storage';
import styles from './styles';
import { UserDetails } from '@services';
import { connect } from 'react-redux';
import Fire from '../../FireBase/Fire';

class Login extends PureComponent {
    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: "",
            isLoading: false
        };
        this.onUsernameEditHandle = (username) => this.setState({ username });
        this.onPasswordEditHandle = (password) => this.setState({ password });

        this.focusPassword = () => this.password && this.password.focus();
    }

    validateForm = () => {
        const {username, password} = this.state;
        if(Validate.isEmpty(username, password)){
            return Languages.FormError;
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

    onLoginPressHandle = async () => {
        const { username, password, isLoading } = this.state;
        const { token, login, setUID, setPassword } = this.props;
        const error = this.validateForm();
        if(error) return Toast.show(error, Toast.LONG);//alert(error);
        var data = new FormData();
        data.append('email_mobile', username);
        data.append('password', password);
        this.setState({isLoading: true});
        const response = await UserDetails.userLogin(token, data);
        if(response !== undefined){
            if(response.flag == true){
               // this.addPlayerId(response.response);
                try{
                    Fire.loginRequest(response.response.Email, password)
                    .then(async (res) => {
                        await this.addPlayerId(response.response, res.user.uid);
                        await setUID(res.user.uid);
                    })
                    .catch((err) => {
                        console.log('firebase login error => ', err)
                    })
                }catch (e) {

                } 
                await setPassword(password);               
                await login(response.response);
                Toast.show("Welcome back " + response.response.FirstName + " " + response.response.LastName, Toast.LONG);
                this.setState({isLoading: false});                
            }else{
                //alert(response.message);
                Toast.show(response.message, Toast.LONG);
                this.setState({isLoading: false});
            }
        }else{
            //alert(Languages.ServerError);
            Toast.show(Languages.ServerError, Toast.LONG);
            this.setState({isLoading: false});
        }

    }
    onForgotPasswordPressHandle = () => {
        this.props.navigation.navigate('ForgotPasswordScreen');
    }
    onGooglePressHandle = () => {

    }
    onFacebookPressHandle = () => {
        
    }
    onOTPPressHandle = () => {

    }
    onSignupPressHandle = () => {
        this.props.navigation.navigate('SignupScreen');

    }

    render(){
        const { username, password, isLoading } = this.state;
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
                                        ref={(comp) => (this.username = comp)}
                                        placeholderTextColor={Color.placeholder}
                                        placeholder={Languages.EmailMobile}
                                        keyboardType='email-address'
                                        onChangeText={this.onUsernameEditHandle}
                                        onSubmitEditing={this.focusPassword}
                                        returnKeyType= 'next'
                                        value={username}
                                    />
                                </View>
                                <View style={styles.inputwrap}>
                                    <TextInput
                                        style={styles.input}
                                        //underlineColorAndroid='transpaent'
                                        ref={(comp) => (this.password = comp)}
                                        placeholderTextColor={Color.placeholder}
                                        placeholder={Languages.Password}
                                        onChangeText={this.onPasswordEditHandle}
                                        secureTextEntry
                                        returnKeyType= 'go'
                                        value={password}
                                    />
                                </View>
                                <TouchableOpacity
                                    style={[styles.loginButton, Platform.OS == 'ios' && {borderColor: Color.background1, borderWidth: 1}]}
                                    onPress={this.onLoginPressHandle}>
                                    <Text style={styles.buttonText}>{Languages.Login}</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity
                                style={Styles.Common.ColumnCenter}
                                onPress={this.onForgotPasswordPressHandle}>
                                    <Text style={styles.forgotpassword}>
                                        {""}
                                        <Text style={styles.highlight}>{Languages.ForgotPassword}</Text>
                                    </Text>
                            </TouchableOpacity>
                            <View style={styles.separatorWap}>
                                <View style={styles.separator}/>
                                <Text style={styles.separatorText}>{Languages.Or}</Text>
                                <View style={styles.separator}/>
                            </View>
                            {/* <TouchableOpacity
                                style={[styles.loginButton, { marginTop: 10}]}
                                onPress={this.onOTPPressHandle}>
                                    <Text style={styles.buttonText}>{Languages.LoginWithOTP}</Text>
                            </TouchableOpacity> */}
                            {/*<TouchableOpacity
                                style={[styles.loginButton, { marginTop: 10, backgroundColor: Color.facebook}]}
                                onPress={this.onFacebookPressHandle}>
                                    <Text style={[styles.buttonText, {color: 'white'}]}>{Languages.LoginWithFacebook}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.loginButton, { marginTop: 10, backgroundColor: Color.google}]}
                                onPress={this.onGooglePressHandle}>
                                    <Text style={[styles.buttonText, {color: 'white'}]}>{Languages.LoginWithGoogle}</Text>
                            </TouchableOpacity>*/}                            
                            <TouchableOpacity
                                style={Styles.Common.ColumnCenter}
                                onPress={this.onSignupPressHandle}>
                                    <Text style={styles.forgotpassword}>
                                        {Languages.DontHaveAccount}{" "}
                                        <Text style={styles.highlight}>{Languages.Signup}</Text>
                                    </Text>
                            </TouchableOpacity>
                        </View>

                    </View>
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
    token: state.user.token
});
const mapDispatchToProps = (dispatch) => {
    const { action } = require('@redux/UserRedux');
    return {
        login: (user) => dispatch(action.login(user)),
        setUID: (id) => dispatch(action.setUID(id)),
        setPassword: (password) => dispatch(action.setPassword(password)),
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);
//export default Login;