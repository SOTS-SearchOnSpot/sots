import React, { PureComponent, Component } from 'react'
import { View, Text, Image, TouchableOpacity, FlatList, Linking } from 'react-native';
import { Languages, Images, Color, Styles, Validate, Icons } from '@common';
import { Container, Header, Content } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';
import { UserDetails, AdDetails } from '@services';
import Toast from 'react-native-simple-toast';
import { connect } from 'react-redux'
import {DeleteItem} from '@components';

class NotificationInbox extends PureComponent {
    constructor(props){
        super(props);
        this.state = {
            notificationList: [],
            imageUrl: ""
        }
    }
    
    componentDidMount(){
        if(this.props.user != null){
            this.getNotificationList();
            this.getOurImage();
        }
    }
    getOurImage = async () => {
        const response = await AdDetails.getOurAd(this.props.token);
        if(response !== undefined){
            if(response.flag == true){
                if(response.response.length > 0){
                    this.setState({imageUrl: response.response[0].Image})
                }
            }
        }
    }
    getNotificationList = async () => {
        const { user, token, setCount } = this.props;
        var data = new FormData();
        data.append('cust_id', user.Id);
        const response = await UserDetails.getNotificationList(token, data);
        if(response !== undefined){
            if(response.flag == true){
                this.setState({notificationList: response.response});
                await setCount(0);
            }else{
                Toast.show(response.message, Toast.LONG);
                this.setState({notificationList: []});
                await setCount(0);
            }
        }else{
            Toast.show(Languages.ServerError, Toast.LONG); 
        }
    }

    onDelete = () => {
        this.getNotificationList();
    }

    openUrl = async (url) => {
        const supported = await Linking.canOpenURL(url);

        if (supported) {
          // Opening the link with some app, if the URL scheme is "http" the web link should be opened
          // by some browser in the mobile
          await Linking.openURL(url);
        } else {
            Toast.show(`Don't know how to open this URL: ${url}`, Toast.LONG);
        }
    }

    gotoAd = async (item) => {
        if(item.Type == "common"){
            let str = "";
            str = item.Message.split(':')[0];
            if(str == 'video'){
                let url = item.Message;
                url = url.replace('video:', '');
                this.openUrl(url);
            }
        }else if(item.Type == "ads"){
            var data = new FormData();
            data.append('ads_id', item.AdsId);
            const response = await AdDetails.getAds(this.props.token, data);
            if(response !== undefined){
                if(response.flag == true){
                    this.props.navigation.navigate('DetailScreen', {id: response.response[0].MCId, details: response.response[0], url: this.state.imageUrl});
                }
            }
        }
    }

    renderItem = ({item}) => {
        return(
            <TouchableOpacity style={styles.itemView}
            onPress={() => {this.gotoAd(item)}}>
                <Text style={styles.message}>{item.Message}</Text>
                {item.Reason != "" && (<Text style={[styles.message, {marginTop: 5}]}>{item.Reason}</Text>)}
                <Text style={styles.date}>{item.CreatedOn}</Text>
                <View style={styles.divider}/>
                <View style={styles.delete}>
                   <DeleteItem 
                   id={item.ID}
                   onDelete={this.onDelete}
                   token={this.props.token}
                   user={this.props.user}
                   isMyAds={false}
                   isfavourite={false}
                   isNotification={true}/>
                </View>
            </TouchableOpacity>
        );
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
                <View style={styles.container}>
                    <FlatList
                        overScrollMode='never'
                        //contentContainerStyle={styles.flatlist}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item, index) => index.toString()}
                        data={this.state.notificationList}
                        horizontal={false}                 
                        renderItem={this.renderItem}/>
                </View>                
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
        setNotification: (value) => dispatch(action.setNotification(value)),
        setCount: (count) => dispatch(action.setCount(count))
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NotificationInbox);
//export default NotificationSettings;