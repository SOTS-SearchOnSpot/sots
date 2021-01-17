import React, { PureComponent } from 'react';
import { View, TouchableOpacity, Text, FlatList, Image } from 'react-native';
import { Container, Header } from 'native-base';
import { Color, Constants, Languages, Images } from '@common';
import styles from './styles';
import { AdDetails } from '@services';
import Toast from 'react-native-simple-toast';
import currencyFormatter from 'currency-formatter'
import { connect } from 'react-redux';
import {DeleteItem} from '@components';

class MyAds extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            ItemList: [],//Constants.SearchResult,
            imageUrl: "",
            deleted: false
        }
    }
    componentDidMount(){
        this.getAds();
    }
    getAds = async () => {
        const {user, token} = this.props;
        var data = new FormData();
        data.append('customer_id', user.Id);
        const response = await AdDetails.getAds(token, data);
        if(response !== undefined){
            if(response.flag == true){
                this.setState({ItemList: response.response});
                this.getOurImage();
            }else{
                Toast.show(response.message, Toast.LONG);
                this.setState({ItemList: []});
            }
        }else{
            Toast.show(Languages.ServerError, Toast.LONG);
            this.setState({ItemList: []});
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

    onDelete = () => {
        this.getAds();
    }
    renderItem = ({item}) => {
        return(
            <TouchableOpacity 
            style={styles.favouriteList}
            onPress={() => {
                this.props.navigation.navigate('DetailScreen', {id: item.MCId, details: item, url: this.state.imageUrl});
            }}>
                <Image source={item.images == null ? Images.Automobile : {uri: item.images[0]}} style={styles.itemImage} resizeMode='contain' />
                <View style={styles.itemDetails}>
                    <Text style={styles.itemName}>{item.Title}</Text>
                    <Text style={styles.itemInfo}>{item.Description}</Text>
                    <Text style={styles.itemInfo}>{item.Date}</Text>
                    <Text style={styles.itemName}>{this.getCurrencyFormat(item.Price)}</Text>
                </View>                
                <View style={styles.delete}>
                   <DeleteItem 
                   id={item.Id}
                   onDelete={this.onDelete}
                   token={this.props.token}
                   user={this.props.user}
                   isMyAds={true}
                   isfavourite={false}
                   isNotification={false}/>
                </View>
            </TouchableOpacity>
        );
    }
    getCurrencyFormat = (price) => {
        let currency = currencyFormatter.format(price, {
            ...Constants.DefaultCurrency
        })
        return currency;
    }
    render() {
        const { ItemList } = this.state;
        return(
            <Container style={styles.container}>
            <Header style={styles.header}>
                <View style={styles.actionBarLeft}>                   
                </View>
                <View style={styles.actionBarMiddle}>
                    <Text style={styles.barCentertext}>{Languages.Myads}</Text>
                </View>
                <View style={styles.actionBarRight}></View>
            </Header>
            <View style={styles.container}>
                <FlatList
                    overScrollMode='never'
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    data={ItemList}
                    horizontal={false}                
                    renderItem={this.renderItem}/>            
            </View>
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
        login: (user) => dispatch(action.login(user))
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MyAds);
//export default MyAds;