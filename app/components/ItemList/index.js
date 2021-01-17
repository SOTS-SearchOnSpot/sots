import React, {PureComponent} from 'react';
import { View, FlatList, TouchableOpacity, Text, Image, ActivityIndicator } from 'react-native';
import { Container, Header, Content } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import currencyFormatter from 'currency-formatter';
import Modal from 'react-native-modalbox';
import { Filter } from '@components';
import { AdDetails } from '@services';
import Toast from 'react-native-simple-toast';
import { connect } from 'react-redux'
import { Icons, Color, Constants, Languages, Images } from '@common';
import styles from './styles';


class ItemList extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            ItemList: [],//Constants.SearchResult,
            visibleFilter: false,
            loading: false,
            imageUrl: "",
            CatList1: Constants.BloodGroups1,
            CatList2: Constants.BloodGroups2,        
        }
        
    }
    
    async componentDidMount(){
        await this.props.setFilterData(null, false);
        this.getAds();        
    }

    getAds = async () => {
        const {categoryId, subCategory, token, location, setFilterData, filterData, isFilter} = this.props;
        var data = new FormData();
        if(isFilter){
           // this.closeFilter();
            data = filterData;
            if(location.toLowerCase() == 'tamilnadu'){
                data.append('search_location', 'all');
            }else{
                data.append('search_location', location);
            }
        }else{
            if(location.toLowerCase() == 'tamilnadu'){
                data.append('location', 'all');
            }else{
                data.append('location', location);
            }
        }
        data.append('cat_id', categoryId);
        if(subCategory.id != 16){
            data.append('sub_cat_id', subCategory.id);
        }
        if(subCategory.subCategory != null){
            if(subCategory.subCategory.id != 16){
                data.append('sub_sub_cat_id', subCategory.subCategory.id);
            }
        }
        this.setState({loading: true});
        let response = undefined;
        if(isFilter){
            response = await AdDetails.filterAds(token, data);
        }else{
            response = await AdDetails.getAds(token, data);
        }
        await setFilterData(null, false);
        if(response !== undefined){
            if(response.flag == true){
                this.setState({ItemList: response.response});
                this.getOurImage();
            }else{
                Toast.show(response.message, Toast.LONG);
                this.setState({ItemList: [], loading: false});
            }
        }else{
            Toast.show(Languages.ServerError, Toast.LONG);
            this.setState({ItemList: [], loading: false});
        }
    }
    getOurImage = async () => {
        const response = await AdDetails.getOurAd(this.props.token);
        if(response !== undefined){
            if(response.flag == true){
                if(response.response.length > 0){
                    this.setState({imageUrl: response.response[0].Image, loading: false})
                }
            }
        }
        this.setState({loading: false});
    }

    getCurrencyFormat = (price) => {
        let currency = currencyFormatter.format(price, {
            ...Constants.DefaultCurrency
        })
        return currency;
    }

    renderCategory = (item) => {
        return(
            <TouchableOpacity
            style={styles.catItemView}
            onPress={()=>{
                this.onShowPressHandle(item);
            }}>
                <Text style={styles.catItemText}>{Languages[item.name]}</Text>
            </TouchableOpacity>
        );
    }

    renderItem = ({item}) => {
        const { categoryId, navigation, user, token } = this.props;
        return(
            <TouchableOpacity style={styles.item}
            onPress={() => {
                navigation.navigate('DetailScreen', {id: categoryId, details: item, url: this.state.imageUrl});
            }}>
                <Image source={item.Images != null && {uri: item.Images[0].Image}} style={styles.itemImage} resizeMode='contain' />
                <View style={styles.itemDetails}>
                    <Text style={styles.itemName}>{item.Title}</Text>
                    <View style={styles.priceView}>
                        <Text style={styles.itemInfo}>{item.Description}</Text>
                        <Text style={styles.itemPrice}>{this.getCurrencyFormat(item.Price)}</Text>
                    </View>                    
                </View>
                <View style={styles.topView}>
                    <Text style={[styles.itemName, { color: Color.white }]}>{item.Date}</Text>                    
                </View>
            </TouchableOpacity>
        );
    }

    openFilter = () => {    
            this.props.navigation.navigate('FilterScreen', {id: this.props.categoryId});
    }

    closeFilter = () => {
        this.filterModal.close();
    }

    onShowPressHandle = (item) => {
        const { categoryId, subCategory } = this.props;
        let value = item;
        if(item != null){
            switch(item.id){
                case 120031: 
                    value = 'O+';
                    break;
                case 120032: 
                    value = 'O-';
                    break;
                case 120033: 
                    value = 'A+';
                    break;
                case 120034: 
                    value = 'A-';
                    break;
                case 120035: 
                    value = 'B+';
                    break;
                case 120036: 
                    value = 'B-';
                    break;
                case 120037: 
                    value = 'AB+';
                    break;
                case 120038: 
                    value = 'AB-';
                    break;
            }
        }
        this.props.navigation.navigate('ContactListScreen', {id: categoryId, subId: subCategory.id, item: value});
    }

    render() {
        const { ItemList, CatList1, CatList2, loading } = this.state;
        const { categoryId, subCategory, isFilter } = this.props;
        if(isFilter){
            this.getAds();
        }
        return(
            <Container style={styles.container}>
                {/* {this.showFilter()} */}
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
                    <Text style={styles.barCentertext}>{Languages[subCategory.name]}</Text>
                    </View>
                    <View style={styles.actionBarRight}>
                        {categoryId != 12 && (
                            <TouchableOpacity 
                            onPress={this.openFilter}>
                                <Icon name={Icons.MaterialCommunityIcons.Filter} size={25} color={Color.cancelButton}/>
                            </TouchableOpacity>
                        )}
                    </View>
                </Header>
                <View style={styles.container}>
                    {((categoryId == 3 || (categoryId == 2 && subCategory.id == 2001)) && subCategory.id != 15 && subCategory.id != 16) && (
                        <TouchableOpacity
                        style={styles.submitButton}
                        onPress={()=>{
                            this.onShowPressHandle(null)
                        }}>
                        <Text style={[styles.selectText]}>{Languages.ShowContact}</Text>
                    </TouchableOpacity>
                    )}
                    {(categoryId == 12 && subCategory.id == 12003) && (
                        <View>
                            <Text style={[styles.buttonText, {marginLeft: 10, marginTop: 10}]}>{Languages.ContactList}</Text>
                            <View style={styles.Itemrow}>
                            {CatList1.map(item => {
                                return(this.renderCategory(item));
                            })}
                            </View>
                            <View style={styles.Itemrow}>
                            {CatList2.map(item => {
                                return(this.renderCategory(item));
                            })}
                            </View>
                            <View style={styles.view}/>
                        </View>
                    )}
                    
                    <FlatList
                        overScrollMode='never'
                        contentContainerStyle={styles.flatlist}
                        keyExtractor={(item, index) => index.toString()}
                        data={ItemList}
                        horizontal={false}
                        numColumns={2}                      
                        renderItem={this.renderItem}/>
                    {loading == true && (
                        <View style={styles.loading}>
                            <ActivityIndicator size={'large'} color={Color.primary}/>
                        </View>
                    )}                        
                </View>
            </Container>
        );
    }
}
const mapStateToProps = (state) => ({
    token: state.user.token,
    user: state.user.user,
    location: state.user.selectedLocation,
    filterData: state.user.filterData,
    isFilter: state.user.isFilter
});
const mapDispatchToProps = (dispatch) => {
    const { action } = require('@redux/UserRedux');
    return {
        login: (user) => dispatch(action.login(user)),
        setFilterData: (value, isFilter) => dispatch(action.setFilterData(value, isFilter)),
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ItemList);
//export default ItemList;