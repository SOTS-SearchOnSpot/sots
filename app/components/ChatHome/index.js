import React, { PureComponent } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import styles from './styles';
import { Images, Languages, Constants } from '@common';
import { connect } from 'react-redux';
import Fire from '../../FireBase/Fire';
import firebase from '../../FireBase/Config';

class ChatHome extends PureComponent {
    constructor(props){
        super(props);
        this.state = {
            userList: [],            
        }
    }

    componentDidMount(){
        try{
            let users = [];
            let currentUser = {
                name: '',
                email: '',
                uuid: '',
                img: ''
            }
            firebase            
            .database()
            .ref('users')
            .on('value', (snapshot) => {
                snapshot.forEach((child) => {
                    if(this.props.uuid == child.val().uuid){
                        currentUser.name = child.val().name,
                        currentUser.email = child.val().email,
                        currentUser.uuid = child.val().uuid,
                        currentUser.img = ''
                    }else {
                        users.push({
                            name: child.val().name,
                            email: child.val().email,
                            uuid: child.val().uuid,
                            img: ''
                        });
                    }
                })
                this.setState({userList: users});
            }) 
        }catch (e) {
            console.log('Get User Error => ', e)
        }
        //this.getUser();
    }

    getUser = async () => {
        let user = await Fire.getUser(this.props.uuid);
        this.setState({userList: user.users});
    }

    renderItem = ({item}) => {
        return(
            <View>
                <View style={styles.itemView}>
                    {item.img == "" ? (
                        <View style={styles.profileTextView}>
                            <Text style={styles.profileText}>{item.name.charAt(0)}</Text>
                        </View>
                    ) : (
                        <Image source={{uri: item.img}} style={styles.imageView} />
                    )}
                    <TouchableOpacity
                    style={styles.chatProfileNameView}
                    onPress={() => {
                        this.props.gotoChat(item);
                    }}>
                        <Text style={styles.chatProfileName}>{item.name}</Text>
                    </TouchableOpacity>
                    
                </View>
                <View style={styles.divider}/>
            </View>
        )
    }

    render() {
        const { user } = this.props;
        let profileImg = ""
        if(user == null){
            profileImg = Images.LoginTopImage;
        }else if(user.ProfilePic == ""){
            profileImg = Images.LoginTopImage;
        }else{
            profileImg = {uri: user.ProfilePic}
        }
        return(
            <View style={styles.container}>
                <View style={styles.profileHeader}>
                    <View style={styles.headerInsideView}>
                        <View style={styles.profileView}>
                            <View style={styles.profileImageView}>
                                <Image source={profileImg} style={styles.profileImage}/>
                            </View>                            
                        </View>
                        <View style={styles.profileView}>
                        <Text style={styles.profileName}>{user.FirstName}</Text>
                        </View>                        
                    </View>
                </View>                
                <View style={styles.bottomBorder}/>
                <View style={styles.container}>
                    <FlatList 
                    showsVerticalScrollIndicator={false}
                    data={this.state.userList}
                    renderItem={this.renderItem}/>
                </View>
            </View>
        );
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
)(ChatHome);
//export default Chat;