import React, { PureComponent } from 'react';
import { View, FlatList, TouchableOpacity, Text, Image } from 'react-native';
import { Container, Header, Content } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from 'react-native-modalbox';
import styles from './styles';
import { Constants, Icons, Color, Languages, Styles, Images } from '@common';
import { Rating } from '@components';
import { UserDetails } from '@services';
import Toast from 'react-native-simple-toast';
import { connect } from "react-redux";

class ContactList extends PureComponent {
    constructor(props){
        super(props);
        this.state = {
            contactList: [],
            cusRating: 0,
            ratingList: Constants.CusRating,
            starId: 0,
            contact: false,
        }
    }

    async componentDidMount(){
        this.getContactList(false, 0);
    }
    getContactList = async (filter, rating) => {
        const { user, token, catId, subId, setContact, value } = this.props;
        var data = new FormData();
        data.append('cat_id', catId);
        data.append('sub_cat_id', subId);
        if(value != null){
            data.append('blood_group', value);
        }
        if(filter){
            data.append('rating', rating);
        }
        const response = await UserDetails.contactList(token, data);
        if(response !== undefined){
            if(response.flag == true){
               let arr = response.response.filter(item => item.CustId == user.Id);
               this.setState({contact: arr.length > 0 ? true : false})
               await setContact(response.response);
            }else{
                Toast.show(response.message, Toast.LONG);
                await setContact([]);
            }
        }else{
            Toast.show(Languages.ServerError, Toast.LONG);
        }
    }
    buttonPressHandle = async () => {
        const { contact} = this.state;
        const { user, token, catId, subId, value } = this.props;
        var data = new FormData();
        data.append('cat_id', catId);
        data.append('sub_cat_id', subId);
        data.append('cust_id', user.Id);
        if(value != null){
            data.append('blood_group', value);
        }
        let response = null;
        if(contact){
            response = await UserDetails.removeContact(token, data);
        }else{
            response = await UserDetails.addContact(token, data);
        }
        if(response !== undefined){
            if(response.flag == true){
                if(contact){
                    Toast.show(response.response, Toast.LONG);
                }else{
                    Toast.show(response.response, Toast.LONG);
                }
                this.getContactList(false, 0);
            }else{
                Toast.show(response.message, Toast.LONG);
            }
        }else{
            Toast.show(Languages.ServerError, Toast.LONG);
        }


    }

    renderItem = ({item}) => {
        return(
            <TouchableOpacity style={styles.item}
            onPress={() => {
                this.props.goProfile(item.CustId);
            }}>
                <Image source={item.ProfilePic == "" ? Images.LoginTopImage : {uri: item.ProfilePic}} style={styles.image} />
                <View style={styles.itemDetails}>
                    <Text style={styles.itemName}>{item.FirstName + " " + item.LastName}</Text>
                    <Rating rating={item.Rating} size={14} count={6} style={styles.rating} />                                    
                </View>                
            </TouchableOpacity>
        );
    }

    onFilterPressHandle = () => {
        const { cusRating } = this.state;
        if(cusRating == 0){
            return Toast.show(Languages.ServerError, Toast.LONG);
        }else{
            this.getContactList(true, cusRating);
            this.closeFilter();
        }
    }

    openFilter = () => {        
        this.filterModal.open();
    }

    closeFilter = () => {
        this.filterModal.close();
    }

    showFilter = () => {
        const { ratingList, starId, cusRating } = this.state;
        return(
            <Modal
            ref={(modal) => (this.filterModal = modal)}
            backButtonClose={true}
            onClosed={this.closeFilter}>
                <View style={styles.container}>
                    <View style={styles.topView}>
                        <Text style={styles.filterText}>{Languages.Filter}</Text>
                    </View>
                    <View style={styles.cusRatingView}>
                        <Text style={styles.infoText}>{Languages.CusRating}</Text>
                        <View style={styles.ratingView}>                        
                            {ratingList && ratingList.map((item)=>{
                                return(
                                    <TouchableOpacity style={[styles.starView, starId == item.id && styles.selectedView]}
                                    onPress={()=>{
                                        this.setState({starId: item.id, cusRating: item.rating});
                                    }}>
                                        <Rating rating={item.rating} size={15} count={item.count} style={styles.rating} />
                                        <Text style={styles.pluseText}>{' & ' + Languages.Up}</Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    </View>
                    <View style={styles.buttonView}>
                        <TouchableOpacity
                        style={[styles.button, {backgroundColor: Color.cancelButton}]}
                        onPress={()=>{
                            this.setState({starId: 0, cusRating: 0});
                        }}>
                            <Text style={styles.buttonText}>{Languages.Clear}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                        style={[styles.button, {backgroundColor: Color.primary}]}
                        onPress={this.onFilterPressHandle}>
                            <Text style={styles.buttonText}>{Languages.Submit}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        );
    }


    render() {
        const { contact } = this.state;
        const { contactList } = this.props;
        return(
            <Container style={styles.container}> 
                {this.showFilter()}              
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
                    <Text style={styles.barCentertext}>{Languages.Contacts}</Text>
                    </View>
                    <View style={styles.actionBarRight}>
                        <View style={styles.rightIcons}>
                            {/* <TouchableOpacity 
                            onPress={async ()=>{
                                alert('Are you want to add?');                            
                            }}>
                                <Icon name={Icons.MaterialCommunityIcons.Plus} size={25} color={Color.cancelButton}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={{marginLeft: 20}}
                            onPress={async ()=>{
                                alert('Are you sure want to remove?');
                            }}>
                                <Icon name={Icons.MaterialCommunityIcons.Minus} size={25} color={Color.cancelButton}/>
                            </TouchableOpacity> */}
                            <TouchableOpacity  style={{marginLeft: 20}}
                            onPress={this.openFilter}>
                                <Icon name={Icons.MaterialCommunityIcons.Filter} size={25} color={Color.cancelButton}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Header>
                <View style={[styles.container, {marginBottom: 40}]}>
                    <FlatList
                        overScrollMode='never'
                        contentContainerStyle={styles.flatlist}
                        keyExtractor={(item, index) => index.toString()}
                        data={contactList}
                        horizontal={false}                 
                        renderItem={this.renderItem}/>                        
                </View>
                <View style={styles.bottomView}>
                    <TouchableOpacity
                    style={[styles.bottomButton, contact == true && styles.removeBackground ]}
                    onPress={this.buttonPressHandle}>
                        <Text style={styles.bottomText}>{contact ? Languages.Remove : Languages.Add}</Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity
                    style={[styles.bottomButton, {backgroundColor: Color.cancelButton}]}
                    onPress={()=>{
                        alert('Are you sure want to remove?');
                    }}>
                        <Text style={styles.bottomText}>{Languages.Remove}</Text>
                    </TouchableOpacity> */}
                </View>
            </Container>
        );
    }
}
const mapStateToProps = (state) => ({
    token: state.user.token,
    user: state.user.user,
    contactList: state.user.contact
  });
  const mapDispatchToProps = (dispatch) => {
    const { action } = require('@redux/UserRedux');
    return {
        setContact: (value) => dispatch(action.setContact(value))
    };
  };
  export default
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(ContactList);
//export default ContactList;