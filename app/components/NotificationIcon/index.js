import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Icons, Color } from '@common';
import { UserDetails } from '@services';
import { connect } from 'react-redux'
import styles from './styles';

class NotificationIcon extends PureComponent {
    constructor(props){
        super(props);
    }

    componentDidMount(){
        if(this.props.user != null){
            this.getNotificationList();
        }
    }

    getNotificationList = async () => {
        const { user, token, setCount, count } = this.props;
        var data = new FormData();
        data.append('cust_id', user.Id);
        const response = await UserDetails.getNotificationList(token, data);
        if(response !== undefined){
            if(response.flag == true){
                let notiCount = response.response.length - count;
                await setCount(notiCount);
            }else{
                await setCount(0);
            }
        }
    }

    render(){
        const { count, user } = this.props;

        if(user == null || count == 0) {
            return(
                <Icon name={Icons.MaterialCommunityIcons.Notification} color={ Color.black } size={20}/>
            )
        }
        return(
            <View style={styles.container}>
                <Icon name={Icons.MaterialCommunityIcons.Notification} color={ Color.black } size={16}/>
                <View style={styles.countView}>
                    <Text style={styles.count}>{count}</Text>
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user.user,
    token: state.user.token,
    count: state.user.notificationCount
});
const mapDispatchToProps = (dispatch) => {
    const { action } = require('@redux/UserRedux');
    return {
        setNotification: (value) => dispatch(action.setNotification(value)),
        setCount: (noti) => dispatch(action.setCount(noti))
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NotificationIcon);