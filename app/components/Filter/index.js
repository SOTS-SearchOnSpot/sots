import React from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, CheckBox, Platform } from 'react-native';
import { Container, Header, Content } from 'native-base';
import Icon from 'react-native-vector-icons/AntDesign';
import { Languages, Constants, Color, Icons, Styles } from '@common';
import { Rating } from '@components';
import styles from './styles';
import { connect } from 'react-redux'
import SelectMultiple from 'react-native-select-multiple'
import Toast from 'react-native-simple-toast';

class Filter extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {            
            starId: 0,
            optionid: 0,
            sortBy: '',
            cusRating: 0,
            ratingList: Constants.CusRating,
            optionList1: Constants.FilterOptions1,
            optionList2: Constants.FilterOptionsDate,
            maxPrice: '',
            minPrice: '',
            postId: 0,
            postedBy: '',
            postedList: Constants.PostedList,
            conditionList: Constants.ConditionList,
            conditionId: 0,
            condition: '',
            fuelType: '',
            fuelId: 0,
            fuelList: Constants.FuelType,
            typeList: Constants.TypeList,
            typeId: 0,
            type: '',
            ownerList: Constants.OwnerType,
            owner: '',
            ownerId: 0,
            minYear: '',
            maxYear: '',
            minKM: '',
            maxKM: '',
            searchText: '',
            searchResultId: [],
            search: '',
            resultList: [],
            selectedItem: []

        }
        this.onMaxPriceEditHandle = (maxPrice) => this.setState({ maxPrice });
        this.onMinPriceEditHandle = (minPrice) => this.setState({ minPrice });
        this.onMaxYearEditHandle = (maxYear) => this.setState({ maxYear });
        this.onMinYearEditHandle = (minYear) => this.setState({ minYear });
        this.onMaxKMEditHandle = (maxKM) => this.setState({ maxKM });
        this.onMinKMEditHandle = (minKM) => this.setState({ minKM });
        this.onSearchTextEditHandle = (searchText) => this.setState({ searchText });

        this.focusMaxPrice = () => this.maxPrice && this.maxPrice.focus();
        this.focusMaxYear = () => this.maxYear && this.maxYear.focus();
        this.focusMaxKM = () => this.maxKM && this.maxKM.focus();
    }

    onSelectionsChange = (selectedItem) => {
        // selectedFruits is array of { label, value }
        this.setState({ selectedItem })
    }

    onClearPressHandle = () => {
        this.setState({            
            starId: 0,
            optionid: 0,
            sortBy: '',
            cusRating: 0,
            ratingList: Constants.CusRating,
            optionList1: Constants.FilterOptions1,
            optionList2: Constants.FilterOptions2,
            maxPrice: '',
            minPrice: '',
            postId: 0,
            postedBy: '',
            postedList: Constants.PostedList,
            conditionList: Constants.ConditionList,
            conditionId: 0,
            condition: '',
            fuelType: '',
            fuelId: 0,
            fuelList: Constants.FuelType,
            typeList: Constants.TypeList,
            typeId: 0,
            type: '',
            ownerList: Constants.OwnerType,
            owner: '',
            ownerId: 0,
            minYear: '',
            maxYear: '',
            minKM: '',
            maxKM: '',
            searchText: '',
            searchResultId: [],
            search: '',
            resultList: [],
            selectedItem: []
        })
        this.props.navigation.goBack(null);
    }

    showToast = (msg) => {
        Toast.show(Languages[msg], Toast.LONG);
    }

    onSubmitPressHandle = async () => {
        const { cusRating, sortBy, minPrice, maxPrice, postedBy, postId, condition, fuelType, type, owner, 
            maxKM, maxYear, minKM, minYear, searchText, resultList, searchResultId, selectedItem } = this.state;
        const { id, setFilterData } = this.props;
        var data = new FormData();
        if(id == 1 || id == 2 || id == 3 || id == 4 || id == 5 || id == 7 || id == 8 || id == 9 || id == 10){
            if(cusRating == 0 && sortBy == '' && minPrice == '' && maxPrice == '' && postedBy == '' && condition == ''){
                return this.showToast('FormError')
            }else{
                if(cusRating != 0){
                    data.append('search_rating', cusRating);
                }
                if(sortBy != ''){
                    if(sortBy == 'Date'){
                        data.append('sort_date', 'desc');
                    }else if(sortBy == 'PriceLow'){
                        data.append('sort_price', 'asc');
                    }else if(sortBy == 'PriceHigh'){
                        data.append('sort_price', 'desc');
                    }
                }
                if(maxPrice != ''){
                    data.append('price_max', maxPrice);
                    if(minPrice != ''){
                        data.append('price_min', minPrice);
                    }else{
                        data.append('price_min', 0);
                    }
                }
                if(postedBy != ''){
                    data.append('search_posted_by', postId);
                }
                if(condition != ''){
                    data.append('search_condition', condition);
                }
                await setFilterData(data, true);
                this.props.navigation.goBack(null);
            }
        }else if(id == 6){
            if(cusRating == 0 && sortBy == '' && minPrice == '' && maxPrice == '' && postedBy == '' && condition == '' &&
            fuelType == '' && type == '' && owner == '' && maxYear == '' && minYear == '' && maxKM == '' && minKM == '' && searchText == ''){
                return this.showToast('FormError')
            }else{
                if(cusRating != 0){
                    data.append('search_rating', cusRating);
                }
                if(sortBy != ''){
                    if(sortBy == 'Date'){
                        data.append('sort_date', 'desc');
                    }else if(sortBy == 'PriceLow'){
                        data.append('sort_price', 'asc');
                    }else if(sortBy == 'PriceHigh'){
                        data.append('sort_price', 'desc');
                    }
                }
                if(maxPrice != ''){
                    data.append('price_max', maxPrice);
                    if(minPrice != ''){
                        data.append('price_min', minPrice);
                    }else{
                        data.append('price_min', 0);
                    }
                }
                if(postedBy != ''){
                    data.append('search_posted_by', postId);
                }
                if(condition != ''){
                    data.append('search_condition', condition);
                }
                if(fuelType != ''){
                    data.append('search_fuel_type', fuelType);
                }
                if(type != ''){
                    data.append('search_vehicle_type', type);
                }
                if(owner != ''){
                    data.append('search_owner', owner);
                }
                if(maxKM != ''){
                    data.append('kilometer_max', maxKM);
                    if(minKM != ''){
                        data.append('kilometer_min', minKM);
                    }else{
                        data.append('kilometer_min', 0);
                    }
                }
                if(maxYear != ''){
                    data.append('model_max', maxYear);
                    if(minYear != ''){
                        data.append('model_min', minYear);
                    }else{
                        data.append('model_min', 0);
                    }
                }
                if(searchText != ''){
                    data.append('search_brand_name', searchText);
                }
                await setFilterData(data, true);
                this.props.navigation.goBack(null);
            }
        } else if(id == 11){
            if(cusRating == 0 && sortBy == '' && minPrice == '' && maxPrice == '' && postedBy == '' && condition == ''){
                return this.showToast('FormError')
            }else{
                if(cusRating != 0){
                    data.append('search_rating', cusRating);
                }
                if(sortBy != ''){
                    if(sortBy == 'Date'){
                        data.append('sort_date', 'desc');
                    }else if(sortBy == 'PriceLow'){
                        data.append('sort_price', 'asc');
                    }else if(sortBy == 'PriceHigh'){
                        data.append('sort_price', 'desc');
                    }
                }
                if(maxPrice != ''){
                    data.append('salary_max', maxPrice);
                    if(minPrice != ''){
                        data.append('salary_min', minPrice);
                    }else{
                        data.append('salary_min', 0);
                    }
                }
                if(postedBy != ''){
                    data.append('search_posted_by', postId);
                }
                if(condition != ''){
                    data.append('search_condition', condition);
                }
                await setFilterData(data, true);
                this.props.navigation.goBack(null);
            }
        }
    }

    render() {
        const { id } = this.props;
        const { starId, optionid, ratingList, optionList1, optionList2, minPrice, 
            maxPrice, postId, postedList, conditionList, conditionId, fuelId, fuelList, 
            typeId, typeList, ownerList, ownerId, maxKM, maxYear, minKM, minYear, 
            searchText, resultList, searchResultId, selectedItem } = this.state;
        return(
            <Container style={[styles.container,{height: Styles.height}]}>
                <View style={[styles.topView, Platform.OS == 'ios' && {marginTop: 30}]}>
                    <Text style={styles.filterText}>{Languages.Filter}</Text>
                </View>
                <Content style={[styles.container,{height: Styles.height - 50}]}>
                    <View style={styles.container}>
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
                    <View style={styles.options}>
                        <Text style={styles.infoText}>{Languages.SortBy}</Text>                    
                        <View style={styles.sortedView}>
                            {optionList1 && optionList1.map((item)=>{
                                return(
                                    <TouchableOpacity style={[styles.optionsView, styles.optionsMargin, optionid == item.id && styles.selectedView]}
                                    onPress={()=>{
                                        this.setState({optionid: item.id, sortBy: item.option})
                                    }}>
                                        <Text style={styles.optionText}>{Languages[item.option]}</Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                        <View style={styles.sortedView}>
                            {optionList2 && optionList2.map((item)=>{
                                return(
                                    <TouchableOpacity style={[styles.optionsView, styles.optionsMarginDate, optionid == item.id && styles.selectedView]}
                                    onPress={()=>{
                                        this.setState({optionid: item.id, sortBy: item.option})
                                    }}>
                                        <Text style={styles.optionText}>{Languages[item.option]}</Text>
                                    </TouchableOpacity>
                                );
                            })}                       
                        </View>                 
                    </View>
                    <View style={styles.priceView}>
                        <Text style={styles.infoText}>{id == 11? Languages.Salary : Languages.Price}</Text> 
                        <View style={styles.inputTextView}>
                            <TextInput
                                style={styles.inputText}                            
                                //underlineColorAndroid='transpaent'
                                ref={(comp) => (this.minPrice = comp)}
                                placeholderTextColor={Color.cancelButton}
                                placeholder={Languages.Minimum}
                                keyboardType='number-pad'
                                onChangeText={this.onMinPriceEditHandle}
                                onSubmitEditing={this.focusMaxPrice}
                                returnKeyType= 'next'
                                value={minPrice}
                            />
                            <TextInput
                                style={styles.inputText}                            
                                //underlineColorAndroid='transpaent'
                                ref={(comp) => (this.maxPrice = comp)}
                                placeholderTextColor={Color.cancelButton}
                                placeholder={Languages.Maximum}
                                keyboardType='number-pad'
                                onChangeText={this.onMaxPriceEditHandle}
                                returnKeyType= 'go'
                                value={maxPrice}
                            />
                        </View>                   
                    </View>
                    <View style={styles.options}>
                        <Text style={styles.infoText}>{Languages.Posted}</Text> 
                        <View style={styles.sortedView}>
                            {postedList && postedList.map((item)=>{
                                return(
                                    <TouchableOpacity style={[styles.optionsView, styles.optionsMargin, postId == item.id && styles.selectedView]}
                                    onPress={()=>{
                                        this.setState({postId: item.id, postedBy: item.option})
                                    }}>
                                        <Text style={styles.optionText}>{Languages[item.option]}</Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>                    
                    </View>
                    {id != 11 && (
                        <View style={styles.options}>
                            <Text style={styles.infoText}>{Languages.Condition}</Text>
                            <View style={styles.sortedView}>
                                {conditionList && conditionList.map((item)=>{
                                    return(
                                        <TouchableOpacity style={[styles.optionsView, styles.optionsMargin, conditionId == item.id && styles.selectedView]}
                                        onPress={()=>{
                                            this.setState({conditionId: item.id, condition: item.option})
                                        }}>
                                            <Text style={styles.optionText}>{Languages[item.option]}</Text>
                                        </TouchableOpacity>
                                    );
                                })}
                            </View>                         
                        </View>
                    )}
                    {id == 6 && (
                        <View style={styles.marginView}>
                            <View style={styles.options}>
                                <Text style={styles.infoText}>{Languages.FuelType}</Text>
                                <View style={styles.sortedView}>
                                    {fuelList && fuelList.map((item)=>{
                                        return(
                                            <TouchableOpacity style={[styles.optionsView, styles.optionsMargin2, fuelId == item.id && styles.selectedView]}
                                            onPress={()=>{
                                                this.setState({fuelId: item.id, fuelType: item.option})
                                            }}>
                                                <Text style={styles.optionText}>{Languages[item.option]}</Text>
                                            </TouchableOpacity>
                                        );
                                    })}
                                </View>                         
                            </View>
                            <View style={styles.options}>
                                <Text style={styles.infoText}>{Languages.Type}</Text>
                                <View style={styles.sortedView}>
                                    {typeList && typeList.map((item)=>{
                                        return(
                                            <TouchableOpacity style={[styles.optionsView, styles.optionsMargin, typeId == item.id && styles.selectedView]}
                                            onPress={()=>{
                                                this.setState({typeId: item.id, type: item.option})
                                            }}>
                                                <Text style={styles.optionText}>{Languages[item.option]}</Text>
                                            </TouchableOpacity>
                                        );
                                    })}
                                </View>                         
                            </View>
                            <View style={styles.options}>
                                <Text style={styles.infoText}>{Languages.Owner}</Text>
                                <View style={styles.sortedView}>
                                    {ownerList && ownerList.map((item)=>{
                                        return(
                                            <TouchableOpacity style={[styles.optionsView, styles.optionsMargin1, ownerId == item.id && styles.selectedView]}
                                            onPress={()=>{
                                                this.setState({ownerId: item.id, owner: item.option})
                                            }}>
                                                <Text style={styles.optionText}>{Languages[item.option]}</Text>
                                            </TouchableOpacity>
                                        );
                                    })}
                                </View>                         
                            </View>
                            <View style={styles.priceView}>
                                <Text style={styles.infoText}>{Languages.Model}</Text>
                                <View style={styles.inputTextView}>
                                    <TextInput
                                        style={styles.inputText}                            
                                        //underlineColorAndroid='transpaent'
                                        ref={(comp) => (this.minYear = comp)}
                                        placeholderTextColor={Color.cancelButton}
                                        placeholder={Languages.Minimum}
                                        keyboardType='number-pad'
                                        onChangeText={this.onMinYearEditHandle}
                                        onSubmitEditing={this.focusMaxYear}
                                        returnKeyType= 'next'
                                        value={minYear}
                                    />
                                    <TextInput
                                        style={styles.inputText}                            
                                        //underlineColorAndroid='transpaent'
                                        ref={(comp) => (this.maxYear = comp)}
                                        placeholderTextColor={Color.cancelButton}
                                        placeholder={Languages.Maximum}
                                        keyboardType='number-pad'
                                        onChangeText={this.onMaxYearEditHandle}
                                        returnKeyType= 'go'
                                        value={maxYear}
                                    />
                                </View>                   
                            </View>
                            <View style={styles.priceView}>
                                <Text style={styles.infoText}>{Languages.KM}</Text>
                                <View style={styles.inputTextView}>
                                    <TextInput
                                        style={styles.inputText}                            
                                        //underlineColorAndroid='transpaent'
                                        ref={(comp) => (this.minKM = comp)}
                                        placeholderTextColor={Color.cancelButton}
                                        placeholder={Languages.Minimum}
                                        keyboardType='number-pad'
                                        onChangeText={this.onMinKMEditHandle}
                                        onSubmitEditing={this.focusMaxKM}
                                        returnKeyType= 'next'
                                        value={minKM}
                                    />
                                    <TextInput
                                        style={styles.inputText}                            
                                        //underlineColorAndroid='transpaent'
                                        ref={(comp) => (this.maxKM = comp)}
                                        placeholderTextColor={Color.cancelButton}
                                        placeholder={Languages.Maximum}
                                        keyboardType='number-pad'
                                        onChangeText={this.onMaxKMEditHandle}
                                        returnKeyType= 'go'
                                        value={maxKM}
                                    />
                                </View>                   
                            </View>
                            <View style={styles.options}>
                                <Text style={styles.infoText}>{Languages.Brand}</Text>
                                <View style={styles.searchView}>
                                    <TextInput
                                        style={styles.searchText}                            
                                        //underlineColorAndroid='transpaent'
                                        placeholderTextColor={Color.cancelButton}
                                        placeholder={Languages.SelectBrand}
                                        onChangeText={this.onSearchTextEditHandle}
                                        returnKeyType= 'go'
                                        value={searchText}
                                    />
                                    {/* <View style={styles.searchSymbol}>
                                        <Icon name={searchText == '' ? Icons.AntDesign.Search : Icons.AntDesign.Close} color={ Color.cancelButton } size={22} />
                                    </View> */}
                                </View>
                                {/* {searchText != '' && (
                                    <View style={styles.searchResultView}>
                                        <Text style={[styles.infoText, { fontSize: 14 }]}>{Languages.AllModel}</Text>
                                        <View style={{marginHorizontal: 10}}>
                                            <SelectMultiple
                                            items={resultList}
                                            selectedItems={selectedItem}
                                            onSelectionsChange={this.onSelectionsChange} 
                                            />
                                        </View>
                                    </View>
                                )} */}
                            </View>
                        </View>
                    )}
                    <View style={{height: 120}}>
                        <View style={styles.buttonView}>
                            <TouchableOpacity
                            style={[styles.button, {backgroundColor: Color.cancelButton}]}
                            onPress={this.onClearPressHandle}>
                                <Text style={styles.buttonText}>{Languages.Clear}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                            style={[styles.button, {backgroundColor: Color.primary}]}
                            onPress={this.onSubmitPressHandle}>
                                <Text style={styles.buttonText}>{Languages.Submit}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    </View>
                </Content>
            </Container>
        );
    }
}
const mapStateToProps = (state) => ({
    token: state.user.token,
    user: state.user.user,
    location: state.user.selectedLocation,
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
)(Filter);
//export default Filter;