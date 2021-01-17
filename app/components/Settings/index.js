import React, { PureComponent } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Container, Header, Content } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-community/async-storage';
import { UserDetails } from '@services';
import { Icons, Color, Constants, Languages } from '@common';
import styles from './styles';
import SettingsItem from './SettingsItem';
import { connect } from 'react-redux';

class Settings extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            settingsItems: props.navigation.state.params.item
        }
    }
    onItemPress = async (item) => {
        const {logout, goToHome, gotoNotification, user} = this.props;
        if(item.id == 1){
            gotoNotification();
        }else if(item.id == 4){
            await this.deletePlayerId(user);
            this.deleteAccount();
        }else if(item.id == 5){
            await this.deletePlayerId(user);
            logout();
            Toast.show(Languages.LogoutMSG, Toast.LONG);
            //alert(Languages.LogoutMSG);
        }else{
            //alert(item.name)
        }
    }

    deletePlayerId = async (user) => {
        try{
            let playerId = await AsyncStorage.getItem('Player_id');
            var data = new FormData();
            data.append('customer_id', user.Id);
            data.append('player_id', playerId);
            const response = await UserDetails.deletePlayerId(this.props.token, data);
        }catch(e){
            console.log('delete player id error => ', e); 
        }
    }

    deleteAccount = async () =>{
        const {logout, user, token} = this.props;
        var data = new FormData();
        data.append('id', user.Id);
        data.append('status', 1);
        const response = await UserDetails.editProfile(token, data);
        if(response !== undefined){
            if(response.flag == true){
                logout();
            }else{
                Toast.show(response.message, Toast.LONG);
            }
        }else{
            Toast.show(Languages.ServerError, Toast.LONG);
        }
    }
    render() {
        const { settingsItems } = this.state;
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
                {settingsItems && settingsItems.map((item)=>{
                    return(
                        <SettingsItem 
                        item={item}
                        onItemPress={this.onItemPress}/>
                    );
                })}
                </View>
            </Container>
        );
    }
}
const mapStateToProps = (state) => ({
    user: state.user.user,
    token: state.user.token
});
const mapDispatchToProps = (dispatch) => {
    const { action } = require('@redux/UserRedux');
    return {
        logout: () => dispatch(action.logout())
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Settings);
//export default Settings;