import React, { PureComponent } from 'react'
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { Languages, Images, Color, Styles, Validate, Icons } from '@common';
import { Container, Header, Content } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker from 'react-native-image-crop-picker';
import Toast from 'react-native-simple-toast';
import styles from './styles';
import { UserDetails } from '@services';
import { connect } from 'react-redux'

class EditProfile extends PureComponent {
    constructor(props){
        super(props);
        this.state = {
            firstName: props.user == null ? '' : props.user.FirstName,
            lastName: props.user == null ? '' : props.user.LastName,
            email: props.user == null ? '' : props.user.Email,
            phno: props.user == null ? '' : props.user.Mobile,
            description: props.user == null ? '' : props.user.Description,
            isLoading: false,
            profileImage: props.user == null ? '' : props.user.ProfilePic,
            imageData: null,
            location: props.user == null ? '' : props.user.Location
        };
        this.onFirstNameEditHandle = (firstName) => this.setState({ firstName });
        this.onLastNameEditHandle = (lastName) => this.setState({ lastName });
        this.onEmailEditHandle = (email) => this.setState({ email });
        this.onPhnoEditHandle = (phno) => this.setState({ phno });
        this.onDescriptionEditHandle = (description) => this.setState({ description });
        this.onLocationEditHandle = (location) => this.setState({ location });

        this.focusLastName = () => this.lastName && this.lastName.focus();
        this.focusEmail = () => this.email && this.email.focus();
        this.focusPhno = () => this.phno && this.phno.focus();
        this.focusDescription = () => this.description && this.description.focus();
        this.focusLocation = () => this.location && this.location.focus();
    }

    onSelectImagePressHandle = () => {
        const { profileImage } = this.state;
        const options = {
            multiple: false,
            //includeBase64: true
        }   

        ImagePicker.openPicker(options).then(image => {
           this.setState({imageData: image, profileImage: image.path})
        })
    }

    validateForm = () => {
        const { email, phno, lastName, firstName } = this.state;
        if(Validate.isEmpty(email, phno, lastName, firstName)){
            return Languages.FormError;
        }else if(!Validate.isEmail(email)){
            return Languages.EmailError;
        }
        return undefined;
    }

    onUpdatePressHandle = async () => {
        const { email, description, phno, lastName, firstName, location, imageData } = this.state;
        const { token, user, editProfile } = this.props;
        const error = this.validateForm();
        if(error) return Toast.show(error, Toast.LONG);
        this.setState({isLoading: true});
        var data = new FormData();
        data.append('id', user.Id);
        data.append('email', email);
        data.append('first_name', firstName);
        data.append('last_name', lastName);
        data.append('mobile', phno);
        if(description != ""){
            data.append('description', description);
        }
        if(location != ""){
            data.append('location', location);
        }
        if(imageData != null){
            let path = imageData.path;
            path = path.replace('file:///', '');
            let pathdata = path.split('/');
            let name = pathdata[pathdata.length - 1];
            let img = {
                name: name,
                uri: imageData.path,
                type: imageData.mime
            }
            data.append('profile_pic', img);
        }
        const response = await UserDetails.editProfile(token, data);
        if(response !== undefined){
            if(response.flag == true){
                await editProfile(response.response, 'Updated');
                Toast.show(Languages.ProfileUpdate, Toast.LONG);
                this.setState({isLoading: false});
            }else{
                Toast.show(response.message, Toast.LONG);
                this.setState({isLoading: false});                
            }
        }else{            
            Toast.show(Languages.ServerError, Toast.LONG);
            this.setState({isLoading: false});
        }
    }
    

    render(){
        const { firstName, lastName, email, phno, description, profileImage, location, isLoading } = this.state;
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
                    <Text style={styles.barCentertext}>{'Edit Profile'}</Text>
                    </View>
                    <View style={styles.actionBarRight}>                    
                    </View>
                </Header>
                <Content style={styles.container}>
                <View style={styles.layoutInner}>
                    <View style={styles.profileView}>                        
                        <TouchableOpacity
                        onPress={this.onSelectImagePressHandle}
                        style={styles.profilePhotoView}>
                            <Image
                            source={profileImage == "" ? Images.LoginTopImage : {uri: profileImage}}
                            style={styles.profilePhoto}
                            />
                            <View style={styles.profileImageEditIcon}>
                                <Icon name={Icons.MaterialCommunityIcons.Edit} size={40} color={Color.primary}/>
                            </View>                            
                        </TouchableOpacity>
                    </View>
                    <View style={styles.subContain}>
                        <View style={styles.loginForm}>
                        <View style={styles.inputwrap}>
                                <TextInput
                                    style={styles.input}
                                    ref={(comp) => (this.firstName = comp)}
                                    placeholderTextColor={Color.placeholder}
                                    placeholder={Languages.FirstName}
                                    onChangeText={this.onFirstNameEditHandle}
                                    onSubmitEditing={this.focusLastName}
                                    returnKeyType= 'next'
                                    value={firstName}
                                />
                            </View>
                            <View style={styles.inputwrap}>
                                <TextInput
                                    style={styles.input}
                                    ref={(comp) => (this.lastName = comp)}
                                    placeholderTextColor={Color.placeholder}
                                    placeholder={Languages.LastName}
                                    onChangeText={this.onLastNameEditHandle}
                                    onSubmitEditing={this.focusEmail}
                                    returnKeyType= 'next'
                                    value={lastName}
                                />
                            </View>
                            <View style={styles.inputwrap}>
                                <TextInput
                                    style={styles.input}
                                    ref={(comp) => (this.email = comp)}
                                    placeholderTextColor={Color.placeholder}
                                    placeholder={Languages.Email}
                                    keyboardType='email-address'
                                    onChangeText={this.onEmailEditHandle}
                                    onSubmitEditing={this.focusPhno}
                                    returnKeyType= 'next'
                                    value={email}
                                />
                            </View>
                            <View style={styles.inputwrap}>
                                <TextInput
                                    style={styles.input}
                                    ref={(comp) => (this.phno = comp)}
                                    placeholderTextColor={Color.placeholder}
                                    placeholder={Languages.Mobileno}
                                    keyboardType='phone-pad'
                                    onChangeText={this.onPhnoEditHandle}
                                    onSubmitEditing={this.focusDescription}
                                    returnKeyType= 'next'
                                    value={phno}
                                />
                            </View>                            
                            <View style={styles.inputwrap}>
                                <TextInput
                                    style={[styles.input, {height: 100}]}
                                    ref={(comp) => (this.description = comp)}
                                    placeholderTextColor={Color.placeholder}
                                    placeholder={Languages.About}
                                    onChangeText={this.onDescriptionEditHandle}
                                    onSubmitEditing={this.focusLocation}
                                    multiline={true}
                                    returnKeyType= 'next'
                                    value={description}
                                />
                            </View>
                            <View style={styles.inputwrap}>
                                <TextInput
                                    style={styles.input}
                                    ref={(comp) => (this.location = comp)}
                                    placeholderTextColor={Color.placeholder}
                                    placeholder={Languages.Location}
                                    onChangeText={this.onLocationEditHandle}
                                    returnKeyType= 'go'
                                    value={location}
                                />
                            </View>
                            <TouchableOpacity
                                style={styles.loginButton}
                                onPress={this.onUpdatePressHandle}>
                                <Text style={styles.buttonText}>{Languages.Update}</Text>
                            </TouchableOpacity>
                        </View>                        
                    </View>
                </View>
                {isLoading == true && (
                    <View style={styles.loading}>
                        <ActivityIndicator size={'large'} color={Color.primary}/>
                    </View>
                )}
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
        login: (user) => dispatch(action.login(user)),
        editProfile: (user, data) => dispatch(action.editProfile(user, data)),
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditProfile);