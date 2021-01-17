import React, { PureComponent } from 'react'
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { Languages, Images, Color, Styles, Icons, Constants } from '@common'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from 'react-native-modalbox';
import Toast from 'react-native-simple-toast';
import { UserDetails } from '@services';
import styles from './styles';
import { connect } from 'react-redux';
import ReviewTab from './ReviewTab';
import { Rating, AddReview } from '@components';
import Communications from 'react-native-communications';

class ViewProfile extends PureComponent {
    constructor(props){
        super(props);
        this.state = {
            tabIndex: 0,
            ReviewList: [],
            loading: false
        }

    }

    componentDidMount(){
        this.getProfileDetails();
    }

    getProfileDetails = async () => {
        const {token, id, setProfileData} = this.props;
        var data = new FormData();
        data.append('id', id);
        const response = await UserDetails.userProfile(token, data);
        if(response === undefined){
            Toast.show(Languages.ServerError, Toast.LONG);
        }else{
            if(response.flag == true){
                await setProfileData(response.response);
            }else{
                Toast.show(response.message, Toast.LONG);
            }
        }        
    }

    openReview = () => {
        this.reviewModal.open();
    }

    closeReview = () => {
        this.reviewModal.close();
    }
    showAddReview = () => {
        return(
            <Modal
            ref={(modal) => (this.reviewModal = modal)}
            backButtonClose={true}
            onClosed={this.closeReview}>
                <AddReview 
                id={this.props.id}
                onClosed={this.closeReview}/>
            </Modal>
        );
    }

    fetchReviewList = async () => {
        const {token, id} = this.props;
        var data = new FormData();
        data.append('customer_id', id);
        const response = await UserDetails.getRating(token, data);
        if(response !== undefined){
            if(response.flag == true){
                this.setState({ReviewList: response.response == ""? [] : response.response})
            }else{
                this.setState({ReviewList: response.response})
            }
        }else{
            Toast.show(Languages.ServerError, Toast.LONG)
        }
    }

    tabButton = (index, isSelected, text) => {
        return(
            <TouchableOpacity
                onPress={() => {
                    this.setState({tabIndex: index})
                    if(index == 1){
                        this.fetchReviewList();
                    }
                }}
                activeOpacity={0.8}
                selected={isSelected}>
                <View
                style={[
                    styles.tabButton,
                    isSelected && styles.tabActive,
                ]}>
                    <Text style={styles.tabButtonText}>{text}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    aboutTab = () => {
        const { profileData } = this.props;
        return(
            <View style={styles.tabView}>
                {profileData != null && (
                    <View>
                        <View style={styles.aboutItemView}>
                            <View style={styles.aboutItem}>
                                <View style={styles.aboutIcon}>
                                <Icon
                                    name={Icons.MaterialCommunityIcons.Profile}
                                    size={24}
                                    color={Color.background1}
                                />
                                </View>
                                <Text style={styles.aboutText}>{profileData.FirstName + " " + profileData.LastName}</Text>
                            </View>
                            {/* <View style={styles.divider}/> */}
                        </View>
                        {profileData.EmailPrivate == 0 && (
                            <View style={styles.aboutItemView}>
                                <View style={styles.aboutItem}>
                                    <View style={styles.aboutIcon}>
                                        <Icon
                                            name={Icons.MaterialCommunityIcons.Email}
                                            size={24}
                                            color={Color.background1}
                                        />
                                    </View>
                                    <Text style={styles.aboutText}>{profileData.Email}</Text>
                                </View>
                                {/* <View style={styles.divider}/> */}
                            </View>
                        )}
                        {profileData.MobilePrivate == 0 && (
                            <TouchableOpacity 
                            style={styles.aboutItemView}
                            onPress={() => {
                                if(Platform.OS == "android"){
                                    Communications.phonecall(profileData.Mobile, true)
                                }
                            }}>
                                <View style={styles.aboutItem}>
                                    <View style={styles.aboutIcon}>
                                        <Icon
                                            name={Icons.MaterialCommunityIcons.Phone}
                                            size={24}
                                            color={Color.background1}
                                        />
                                    </View>
                                    <Text style={styles.aboutText}>{profileData.Mobile}</Text>
                                </View>
                                {/* <View style={styles.divider}/> */}
                            </TouchableOpacity>
                        )}
                        {profileData.Description != "" && (
                            <View style={styles.aboutItemView}>
                                <View style={styles.aboutItem}>
                                    <View style={styles.aboutIcon}>
                                        <Icon
                                            name={Icons.MaterialCommunityIcons.Bag}
                                            size={24}
                                            color={Color.background1}
                                        />
                                    </View>
                                    <Text style={[styles.aboutText, {width: Styles.width - 55}]}>{profileData.Description}</Text>
                                </View>
                                {/* <View style={styles.divider}/> */}
                            </View>
                        )}
                        {profileData.Location != "" && (
                            <View style={styles.aboutItemView}>
                                <View style={styles.aboutItem}>
                                    <View style={styles.aboutIcon}>
                                        <Icon
                                            name={Icons.MaterialCommunityIcons.Location}
                                            size={24}
                                            color={Color.background1}
                                        />
                                    </View>
                                    <Text style={[styles.aboutText, {width: Styles.width - 55}]}>{profileData.Location}</Text>
                                </View>
                                {/* <View style={styles.divider}/> */}
                            </View>
                        )}
                    </View>
                )}
            </View>
        );
    }
    moreTab = () => {
        return(
            <View style={styles.tabView}>
                <View style={styles.aboutItemView}>
                    <View style={styles.aboutItem}>
                        <View style={styles.aboutIcon}>
                            <Icon
                                name={Icons.MaterialCommunityIcons.Bag}
                                size={24}
                                color={Color.background1}
                            />
                        </View>
                        <Text style={[styles.aboutText, {width: Styles.width - 55}]}>{Languages.HomeHeader}</Text>
                    </View>
                    {/* <View style={styles.divider}/> */}
                </View>
            </View>
        );
    }
    reviewTab = () => {
        const { id, user } = this.props;
        let userid = user == null ? 0 : user.Id;
        return(
            <View style={styles.tabView}>
                <View style={styles.aboutItemView}>
                    {id != userid && (
                        <TouchableOpacity
                        onPress={this.openReview}>
                            <Text style={styles.addReview}>{Languages.AddReview}</Text>
                        </TouchableOpacity>
                    )}
                    {this.state.ReviewList.map(item => {
                        return(
                            <TouchableOpacity style={styles.item}
                            onPress={() => {
                                
                            }}>
                                <Image source={{uri: item.ProfilePic}} style={styles.image} />
                                <View style={styles.itemDetails}>
                                    <Text style={styles.itemName}>{item.FirstName + " " + item.LastName}</Text>
                                    <Rating rating={item.Rating} size={14} count={6} style={styles.rating} />
                                    <Text 
                                    style={[styles.itemName, {width: Styles.width - 90}]}
                                    numberOfLines={3}>{item.Comment}</Text>
                                </View>                
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </View>
        );
    }

    tabView = () => {
        const { tabIndex } = this.state;
        return(
            <View style={styles.tabView}>
                <View style={styles.tabHeaderView}>
                    <View style={styles.tabItemView}>
                        {this.tabButton(0, tabIndex == 0, Languages.AboutTab)}
                    </View>
                    {/* <View style={styles.tabItemView}>
                        {this.tabButton(1, tabIndex == 1, Languages.More)}
                    </View> */}
                    <View style={styles.tabItemView}>
                        {this.tabButton(1, tabIndex == 1, Languages.Reviews)}
                    </View>
                </View>
                {tabIndex == 0 && (this.aboutTab())}
                {/* {tabIndex == 1 && (this.moreTab())} */}
                {tabIndex == 1 && (this.reviewTab())}
            </View>
        )
    }
    render(){
        const { user, goViewEdit, id, profileData } = this.props;
        if(profileData == 'Updated'){
            this.getProfileDetails();
        }        
        let userid = user == null ? 0 : user.Id;
        let rating = (profileData != 'Updated' && profileData != null)? profileData.Rating != ""? profileData.Rating: 0 : 0;
        return(
            <View style={styles.container}>
                {this.showAddReview()}
                <ScrollView>
                <View style={styles.profileHeader}>
                    <View style={styles.headerInsideView}>
                        <View style={styles.profileView}>
                            <Image source={profileData == null ? Images.LoginTopImage : profileData.ProfilePic == "" ? Images.LoginTopImage : {uri: profileData.ProfilePic} } style={styles.profileImage} />
                        </View>
                        <View style={styles.profileView}>
                        <Text style={styles.profileName}>{profileData == null ? 'AIO' : profileData.FirstName}</Text>
                        </View>
                        <View style={styles.profileView}>
                            <Rating rating={rating} size={14} count={6} style={styles.rating} />
                        </View>
                        {userid == id && (
                            <View style={styles.profileView}>
                                <TouchableOpacity onPress={() => {
                                    goViewEdit();
                                }}>
                                    <Text style={styles.profilEdit}>{Languages.EditProfile}</Text>
                                </TouchableOpacity>
                            </View>
                        )}                        
                    </View>
                </View>
                {this.tabView()}
                </ScrollView>
            </View>
        );
    }
}
const mapStateToProps = (state) => ({
    user: state.user.user,
    token: state.user.token,
    profileData: state.user.profileData
});
const mapDispatchToProps = (dispatch) => {
    const { action } = require('@redux/UserRedux');
    return {
        login: (user) => dispatch(action.login(user)),
        setProfileData: (data) => dispatch(action.setProfileData(data)),
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ViewProfile);
//export default ViewProfile;