import React from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Image } from 'react-native';
import { Languages, Images, Color, Styles, Validate, Icons, Constants } from '@common';
import { Container, Header, Content } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontIcon from 'react-native-vector-icons/FontAwesome5'
import currencyFormatter from 'currency-formatter'
import styles from './styles';
import { AdDetails } from '@services';
import { connect } from 'react-redux'


class Search extends React.PureComponent {
    constructor(props){
        super(props);
        this.state = {
            search: '',
            resultList: [],
            imageUrl: ""
        }
        this.onSearchEditHandle = (search) => {
            this.setState({ search });
            if(search.length >= 1){
                this.getSearchResult();
            }
        };

    }

    componentDidMount(){
        this.getOurImage();
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

    getSearchResult = async () => {
        const { token, location } = this.props;
        const { search } = this.state;
        var data = new FormData();
        data.append('search_name', search);
        data.append('search_location', location);
        const response = await AdDetails.filterAds(token, data);
        if(response !== undefined){
            if(response.flag == true){
                this.setState({resultList: response.response})
            }
        }
    }

    getCurrencyFormat = (price) => {
        let currency = currencyFormatter.format(price, {
            ...Constants.DefaultCurrency
        })
        return currency;
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
            </TouchableOpacity>
        );
    }

    render(){
        const { search, resultList } = this.state;
        return(
            <Container style={styles.container}>               
            <Header style={styles.actionBar}>
                <View style={styles.searchView}>
                    <View style={styles.searchbox}>
                        <TouchableOpacity 
                        onPress={() => {
                            this.props.navigation.goBack();
                        }}>
                            <Icon name={Icons.MaterialCommunityIcons.Back} size={30} color={Color.cancelButton}/>
                        </TouchableOpacity>
                        <TextInput
                            style={styles.searchInput}
                            //underlineColorAndroid='transpaent'
                            ref={(comp) => (this.search = comp)}
                            placeholderTextColor={Color.cancelButton}
                            placeholder={Languages.Search}
                            onChangeText={this.onSearchEditHandle}
                            returnKeyType= 'go'
                            value={search}
                        />
                        <TouchableOpacity 
                        onPress={() => {
                        }}>
                            <FontIcon name={Icons.FontAwesome.Search} color={ Color.cancelButton } size={24} />
                        </TouchableOpacity>
                    </View>
                </View>
                
            </Header>
            <View style={[styles.container, {backgroundColor: 'white'}]}>
                <FlatList
                    overScrollMode='never'
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    data={resultList}
                    horizontal={false}                
                    renderItem={this.renderItem}/>
            </View>                
        </Container>
        )
    }
}
const mapStateToProps = (state) => ({
    language: state.user.language,
    token: state.user.token
});
export default connect(
    mapStateToProps,
    null
)(Search);
//export default Search;