import React, { PureComponent } from 'react'
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import { Languages, Images, Color, Styles, Validate } from '@common';
import { Container, Header, Content } from 'native-base';
import Toast from 'react-native-simple-toast';
import styles from './styles';
import { AdDetails } from '@services';
import { connect } from 'react-redux'

class ReportAd extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            message: '',            
        }
        this.onMessageEditHandle = (message) => this.setState({ message });
    }

    validateForm = () => {
        const { message } = this.state;
        if(Validate.isEmpty(message)){
            return Languages.FormError;
        }
        return undefined;
    }

    onSubmitPressHandle = async () =>{
        const { adId, token, user, setIntro } = this.props;
        const { message } = this.state;
        const error = this.validateForm();
        if(error) return Toast.show(error, Toast.LONG);
        var data = new FormData();
        data.append('cust_id', user.Id);
        data.append('ads_id', adId);
        data.append('comment', message);
        const response = await AdDetails.reportAd(token, data);
        if(response !== undefined){
            if(response.flag == true){
                Toast.show(response.response, Toast.LONG);
                setIntro();
            }else{
                Toast.show(response.response, Toast.LONG);
            }
        }else{
            Toast.show(Languages.ServerError, Toast.LONG);
        }
    }

    render(){
        const {adId} = this.props;
        const { message } = this.state;
        return(
            <Container style={styles.container}>
                <Content style={styles.container}>              
                    <View style={styles.layoutInner}>
                        <View style={styles.logoWrap}>
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
                                        ref={(comp) => (this.id = comp)}
                                        placeholderTextColor={Color.placeholder}
                                        placeholder={Languages.EmailMobile}
                                        editable={false}
                                        value={adId}
                                    />
                                </View>
                                <View style={styles.inputwrap}>
                                    <TextInput
                                        style={[styles.input, {height: 120}]}
                                        ref={(comp) => (this.message = comp)}
                                        placeholderTextColor={Color.placeholder}
                                        placeholder={Languages.Message}
                                        onChangeText={this.onMessageEditHandle}
                                        multiline={true}
                                        returnKeyType= 'go'
                                        value={message}
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
                </Content>
            </Container>
        );
    }
}
const mapStateToProps = (state) => ({
    token: state.user.token,
    user: state.user.user
});
const mapDispatchToProps = (dispatch) => {
    const { action } = require('@redux/UserRedux');
    return {
        setIntro: () => dispatch(action.setIntro())
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ReportAd);