import React, { PureComponent, Component } from 'react'
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { Languages, Images, Color, Styles, Validate, Icons } from '@common';
import { Container, Header, Content } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';
import { connect } from 'react-redux'
import { UserDetails } from '@services';
import Toast from 'react-native-simple-toast';

class NotificationSettings extends PureComponent {
    constructor(props){
        super(props);
    }

    setNotifications = async (value) => {
        const { user, token, setNotification } = this.props;
        var data = new FormData();
        data.append('id', user.Id);
        if(value){
            data.append('notification_on', 1);
        }else{
            data.append('notification_on', 0);
        }
        const response = await UserDetails.editProfile(token, data);
        if(response !== undefined){
            if(response.flag == true){
                setNotification(value);
            }else{
                Toast.show(response.message, Toast.LONG);
            }
        }        
    }

    render(){
        return(
            <Container style={styles.container}>               
                <Header style={styles.actionBar}>
                    <View style={styles.actionBarLeft}>
                        <TouchableOpacity 
                        onPress={() => {
                            this.props.navigation.goBack();
                        }}>
                            <Icon name={Icons.MaterialCommunityIcons.Back} size={25} color={Color.cancelButton}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.actionBarMiddle}>
                    <Text style={styles.barCentertext}>{Languages.Notification}</Text>
                    </View>
                    <View style={styles.actionBarRight}>                    
                    </View>
                </Header>
                <Content style={styles.container}>
                <View style={styles.layoutInner}>
                    <View style={styles.itemView}>
                        <Text style={styles.itemText}>{Languages.NotificationInfo}</Text>
                        <View style={styles.itemButton}>
                            <Switch
                            trackColor={{ false: Color.cancelButton, true: Color.primary }}
                            onValueChange = {this.setNotifications}
                            value = {this.props.notification}/>
                        </View>
                    </View>                                            
                </View>
                </Content>                
            </Container>
        )
    }
}
const mapStateToProps = (state) => ({
    user: state.user.user,
    token: state.user.token,
    notification: state.user.notification
});
const mapDispatchToProps = (dispatch) => {
    const { action } = require('@redux/UserRedux');
    return {
        setNotification: (value) => dispatch(action.setNotification(value))
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NotificationSettings);
//export default NotificationSettings;