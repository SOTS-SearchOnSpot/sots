import React, { PureComponent } from 'react';
import { View, Text, Image, TouchableOpacity, Switch } from 'react-native';
import {Picker} from '@react-native-community/picker';
import Toast from 'react-native-simple-toast';
//import Icon from 'react-native-vector-icons/Entypo';
import styles from './styles';
import { Color, Icons, Languages } from '@common';
import { UserDetails } from '@services';
import { connect } from 'react-redux'

class SettingsItem extends PureComponent {
    constructor(props) {
        super(props);
        this.state= {
            languagePicker: props.language == 'en' ? "English" : "Tamil",
        }
    }
    setMobileEmail = async(privacyMobile, privacyEmail) => {
        const { user, token, setPrivacy } = this.props;
        let mobile = 0, email = 0;
        if(privacyMobile){
            mobile = 1;
        }
        if(privacyEmail){
            email = 1;
        }
        var data = new FormData();
        data.append('id', user.Id);
        data.append('email_private', email);
        data.append('mobile_private', mobile);
        const response = await UserDetails.editProfile(token, data);
        if(response !== undefined){
            if(response.flag == true){
                await setPrivacy(privacyMobile, privacyEmail);
            }else{
                Toast.show(response.message, Toast.LONG);
            }
        }else{
            Toast.show(Languages.ServerError, Toast.LONG);
        }
    }
    render(){
        const { item, onItemPress, setLanguage, user, token } = this.props;
        return(
            <View>
                {item.id == 2 && (
                    <View 
                    style={styles.item}>
                        <View style={styles.itemView}>
                            <Text style={styles.itemName}>{Languages[item.name]}</Text>
                            {/* <View style={styles.rightIcon}>
                                <Icon name={Icons.Entypo.Right} color={Color.cancelButton} size={24}/>
                            </View>                    */}
                        </View>
                        <Picker
                            selectedValue={this.state.languagePicker}
                            style={styles.pickerSelect}
                            onValueChange={async (itemValue, itemIndex) =>{
                                await setLanguage(itemValue == "English" ? 'en' : 'ta');
                                this.setState({languagePicker: itemValue});                                
                            }}>
                            <Picker.Item label="English"  value="English" />
                            <Picker.Item label="தமிழ்" value="Tamil" />
                        </Picker>
                        <View style={styles.bottomView}/>
                    </View>
                )}
                 {item.id == 3 && (
                    <View
                    style={styles.item}>
                        <View style={styles.itemView}>
                            <Text style={styles.itemName}>{Languages[item.name]}</Text>
                        </View>
                        <View style={styles.itemView}>
                            <Text style={styles.itemText}>{Languages['Mobileno']}</Text>
                            <View style={styles.itemButton}>
                                <Switch
                                trackColor={{ false: Color.cancelButton, true: Color.primary }}
                                onValueChange = {(value) => {
                                    this.setMobileEmail(value, this.props.privacyEmail);
                                    //this.props.setPrivacy(value, this.props.privacyEmail);
                                }}
                                value = {this.props.privacyMobile}/>
                            </View>
                        </View>
                        <View style={[styles.itemView, {marginTop: 5}]}>
                            <Text style={styles.itemText}>{Languages['Email']}</Text>
                            <View style={styles.itemButton}>
                                <Switch
                                trackColor={{ false: Color.cancelButton, true: Color.primary }}
                                onValueChange = {(value) => {
                                    this.setMobileEmail(this.props.privacyMobile,value);
                                    //this.props.setPrivacy(this.props.privacyMobile,value);
                                }}
                                value = {this.props.privacyEmail}/>
                            </View>
                        </View>
                        <View style={styles.bottomView}/>
                    </View>
                )}
                 {(item.id != 2 && item.id != 3) && (
                    <TouchableOpacity onPress={() => {
                    onItemPress(item);
                    }}
                    style={styles.item}>
                        <View style={styles.itemView}>
                            <Text style={styles.itemName}>{Languages[item.name]}</Text>
                            {/* <View style={styles.rightIcon}>
                                <Icon name={Icons.Entypo.Right} color={Color.cancelButton} size={24}/>
                            </View>                    */}
                        </View>
                        <View style={styles.bottomView}/>
                    </TouchableOpacity>
                )}

            </View>
            
        );
    }
}
const mapStateToProps = (state) => ({
    language: state.user.language,
    privacyEmail: state.user.privacyEmail,
    privacyMobile: state.user.privacyMobile,
    token: state.user.token,
    user: state.user.user
});
const mapDispatchToProps = (dispatch) => {
    const { action } = require('@redux/UserRedux');
    return {
        setLanguage: (value) => dispatch(action.setLanguage(value)),
        setPrivacy: (privacyMobile, privacyEmail) => dispatch(action.setPrivacy(privacyMobile, privacyEmail))

    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SettingsItem);
//export default SettingsItem;