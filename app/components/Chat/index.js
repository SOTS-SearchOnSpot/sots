import React from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput } from 'react-native';
import styles from './styles';
import { Images, Languages, Constants, Icons, Color } from '@common';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';
import Fire from '../../FireBase/Fire';
import firebase from '../../FireBase/Config';

class Chat extends React.PureComponent {
    constructor(props){
        super(props);
        this.state = {
            messages: [
                // {
                //     sender: 'eU0Bi3OnhFarUNxiluwA4lA7YE72',
                //     reciever: 'moyfdsfOIpRyCDG4r54rvdaDGs03',
                //     msg: 'Hi'
                // },
                // {
                //     sender: 'moyfdsfOIpRyCDG4r54rvdaDGs03',
                //     reciever: 'eU0Bi3OnhFarUNxiluwA4lA7YE72',
                //     msg: 'Hi'
                // },
                // {
                //     sender: 'eU0Bi3OnhFarUNxiluwA4lA7YE72',
                //     reciever: 'moyfdsfOIpRyCDG4r54rvdaDGs03',
                //     msg: 'hsdjxc'
                // }
            ],
            message: ''
        }
        this.onMessageEditHandle = (message) => this.setState({ message });
    }

    componentDidMount(){
        const {fuser, uuid} = this.props;
        try{
            firebase
            .database()
            .ref('messages')
            .child(uuid)
            .child(fuser.uuid)
            .on('value', (snapShot) => {
                let msgs = [];
                snapShot.forEach((element) => {
                    msgs.push({
                        sender: element.val().message.sender,
                        reciever: element.val().message.reciever,
                        msg: element.val().message.msg
                    })
                });
                this.setState({messages: msgs.reverse()})
            })
        }catch(e){
            console.log('Get Message error => ', e)
        }
    }

    sendPressHandle = async () => {
        const { message } = this.state;
        const {fuser, uuid} = this.props;
        if(message != ''){
            Fire.send(message, uuid, fuser.uuid)
            .then(()=>{})
            .catch((e)=> console.log('send message error => ', e));

            Fire.recieve(message, uuid, fuser.uuid)
            .then(()=>{})
            .catch((e)=> console.log('send recieve message error => ', e));
            this.setState({message: ''})
        }                
    }

    renderItem = ({item}) => {
        const {fuser, uuid} = this.props;
        return(
            <View>
                <View style={[styles.msgItemView, item.sender == uuid ? styles.msgItemPosRight : styles.msgItemPosLeft ]}>
                    <View style={item.sender == uuid ? styles.msgItemRight : styles.msgItemLeft}>
                        <Text style={styles.msg}>{item.msg}</Text>
                    </View>
                </View>
            </View>
        )
    }
    render(){
        const {fuser, navigation} = this.props;
        const { messages, message } = this.state;
        return(
            <View style={styles.container}>
                <View style={styles.topView}>
                    <TouchableOpacity
                    onPress={()=> {
                        navigation.goBack(null);
                    }}
                    style={styles.icon}>
                        <Icon name={Icons.MaterialCommunityIcons.Back} size={25} color={Color.cancelButton}/>
                    </TouchableOpacity>
                    <View style={styles.headerView}>
                        <Text style={styles.headerText}>{fuser.name}</Text>
                    </View>
                </View>
                <View style={styles.container}>
                <FlatList
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.flatList}
                inverted
                data={messages}
                keyExtractor={(item, index) => index.toString()}
                renderItem={this.renderItem}/>
                <View style={styles.bottomView}>
                    <TextInput
                        style={styles.input}
                        ref={(comp) => (this.message = comp)}
                        placeholderTextColor={Color.placeholder}
                        placeholder={Languages.TypeHere}
                        onChangeText={this.onMessageEditHandle}
                        returnKeyType= 'go'
                        value={message}
                    />
                    <TouchableOpacity
                    style={styles.sendIcon}
                    onPress={this.sendPressHandle}>
                        <Icon name={Icons.MaterialCommunityIcons.Send} size={25} color={Color.white}/>
                    </TouchableOpacity>
                </View>
                </View>                             
            </View>
        )
    }
}
const mapStateToProps = (state) => ({
    user: state.user.user,
    token: state.user.token,
    uuid: state.user.uid
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
)(Chat);