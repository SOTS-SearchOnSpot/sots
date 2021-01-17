import React, { PureComponent } from 'react';
import { View, Text, Image, TouchableOpacity, Share, Linking } from 'react-native';
import styles from './styles';
import { Images, Languages, Constants } from '@common';
import ProfileItem from './ProfileItem';
import { connect } from 'react-redux';

class Profile extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            profileItems: Constants.ProfileItems
        }
    }
    componentDidMount(){
        if(this.props.user == null){
            this.props.goToLogin();
        }
    }
    checkUserLogin = () => {
        const { user, goToLogin } = this.props;
        if(user === null){
            goToLogin();
            return false;
        }
        return true;
    }
    onItemPress = (item) => {
        if(item.id == 4){
            Share.share({
                message: 'AIO',
                title: 'Shopping'
            });
        }else if(item.id == 2){
            this.props.goSupport();
        }else{
            this.props.navigation.navigate(item.route, 
                {item: (item.items === undefined) ? [] : item.items,
                name: item.name});
        }        
    }
    render() {
        const { profileItems } = this.state;
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
                            <Image source={profileImg} style={styles.profileImage} />
                        </View>
                        <View style={styles.profileView}>
                        <Text style={styles.profileName}>{user == null? 'AIO' : user.FirstName}</Text>
                        </View>
                        <View style={styles.profileView}>
                            <TouchableOpacity onPress={() => {
                                if(this.checkUserLogin()){
                                    this.props.goViewEdit(user.Id);
                                }
                            }}>
                                <Text style={styles.profilEdit}>{Languages.ViewEdit}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>                
                <View style={styles.bottomBorder}/>
                <View style={styles.profileItems}>
                {profileItems && profileItems.map((item)=>{
                    return(
                        <ProfileItem 
                        item={item}
                        onItemPress={this.onItemPress}/>
                    );
                })}
                
                </View>                
            </View>
        );
    }
}
const mapStateToProps = (state) => ({
    user: state.user.user
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
)(Profile);
//export default Profile;