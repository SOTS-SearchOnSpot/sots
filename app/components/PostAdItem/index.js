import React from 'react';
import { View, TextInput, TouchableOpacity, Text, ScrollView, FlatList } from 'react-native';
import Toast from 'react-native-simple-toast';
import Icon from 'react-native-vector-icons/FontAwesome5'
import CommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Modal from 'react-native-modalbox';
import { Languages, Color, Constants, Validate, Icons } from '@common';
import styles from './styles';
import { PostImages } from '@components'
import {Picker} from '@react-native-community/picker';
import { AdDetails } from '@services';
import { connect } from "react-redux";

class PostAdItem extends React.PureComponent {
    constructor(props){
        super(props);
        // { name, type, price, sellerId, description, location }
        this.state = {
            name: '',
            type: '',
            price: 0,
            sellerType: '',
            sellerId: 0,
            sellerTypeList: Constants.PostedList,
            conditionList: Constants.ConditionList,
            conditionId: 0,
            condition: '',
            description: '',
            location: '',
            quantity: '',
            quantityPicker: 'Select',
            pricePicker: 'Select',
            fuelPicker: 'Select',
            fuelList: Constants.FuelType,
            typePicker: 'Select',
            typeList: Constants.TypeList,
            ownerPicker: 'Select',
            ownerList: Constants.OwnerType,
            model: '',
            kilometers: '',
            brand: '',
            jobType: 'Select',
            salary: '',
            role: '',
            qualification: '',
            experience: '',
            company: '',
            allowance: '', 
            license: '', 
            vacancy: '',
            saleType: '',
            saleId: '',
            saleList: Constants.SaleType,
            plotSize: '',
            plotPicker: 'Select',
            facePicker: 'Select',
            bedRoom: '', 
            bathRoom: '',
            propertyPicker: 'Select',
            financePicker: 'Select',
            size: '',
            ram: '',
            storage: '',
            colour: '',
            carPicker: 'Select',
            insurancePicker: 'Select',
            locationList: [],
            search: '',
        }
        this.onNameEditHandle = (name) => this.setState({ name });
        this.onTypeEditHandle = (type) => this.setState({ type });
        this.onPriceEditHandle = (price) => this.setState({ price });
        this.onQuantityEditHandle = (quantity) => this.setState({ quantity });
        this.onSellerTypeEditHandle = (sellerType) => this.setState({ sellerType });
        this.onDescriptionEditHandle = (description) => this.setState({ description });
        this.onLocationEditHandle = (location) => this.setState({ location });
        this.onModelEditHandle = (model) => this.setState({ model });
        this.onKilometersEditHandle = (kilometers) => this.setState({ kilometers });
        this.onBrandEditHandle = (brand) => this.setState({ brand });
        this.onSizeEditHandle = (size) => this.setState({ size });
        this.onRAMEditHandle = (ram) => this.setState({ ram });
        this.onStorageEditHandle = (storage) => this.setState({ storage });
        this.onColorEditHandle = (colour) => this.setState({ colour });
        this.onSalaryEditHandle = (salary) => this.setState({ salary });
        this.onRoleEditHandle = (role) => this.setState({ role });
        this.onQualificationEditHandle = (qualification) =>  this.setState({ qualification });
        this.onExperienceEditHandle = (experience) =>  this.setState({ experience });
        this.onCompanyEditHandle = (company) =>  this.setState({ company });
        this.onAllowanceEditHandle = (allowance) =>  this.setState({ allowance });
        this.onLicenseEditHandle = (license) =>  this.setState({ license });
        this.onVacancyEditHandle = (vacancy) =>  this.setState({ vacancy });
        this.onPlotSizeEditHandle = (plotSize) => this.setState({ plotSize });
        this.onBedRoomEditHandle = (bedRoom) =>  this.setState({ bedRoom });
        this.onBathRoomEditHandle = (bathRoom) => this.setState({ bathRoom });
        this.onSearchEditHandle = (search) => {
            this.setState({ search });
            this.searchLocation();
        };

        this.focusType = () => this.Type && this.Type.focus();
        this.focusPrice = () => this.Price && this.Price.focus();
        this.focusDescription = () => this.Description && this.Description.focus();
        this.focusSellerType = () => this.sellerType && this.sellerType.focus();
        this.focusLocation = () => this.Location && this.Location.focus();
        this.focusKilometers = () => this.kilometers && this.kilometers.focus();
        this.focusBrand = () => this.brand && this.brand.focus();
        this.focusSize = () => this.size && this.size.focus();
        this.focusStorage = () => this.storage && this.storage.focus();
        this.focusRole = () => this.Role && this.Role.focus();
        this.focusQualification = () => this.qualification && this.qualification.focus();
        this.focusExperience = () => this.experience && this.experience.focus();
        this.focusCompany = () => this.company && this.company.focus();
        this.focusAllowance = () => this.allowance && this.allowance.focus();
        this.focusLicense = () => this.license && this.license.focus();
        this.focusVacancy = () => this.vacancy && this.vacancy.focus();
        this.focusBathRoom = () => this.bathRoom && this.bathRoom.focus();
    }    
    showToast = (msg) => {
        Toast.show(Languages[msg], Toast.LONG);
    }
    searchLocation = async () => {
        const { search } = this.state;
        const { language, token } = this.props;
        if(search.length >= 1){
            var data = new FormData();
            data.append('search_location', search);
            data.append('search_lang', language.toUpperCase());
            const response = await AdDetails.searchLocation(token, data);
            if(response !== undefined){
                if(response.flag == true){
                    this.setState({locationList: response.response});
                }
            }
        }
    }

    onSubmitPressHandle = (categoryId, subCategoryId, subSubCategoryId) => {
        const { name, type, price, sellerId, sellerType, description, location, quantity, quantityPicker,
             pricePicker, condition, fuelPicker, typePicker, ownerPicker, model, brand, kilometers, jobType,
             role, salary, qualification, experience, company, allowance, license, vacancy, saleType, plotSize,
             facePicker, propertyPicker, bedRoom, bathRoom, financePicker, plotPicker, size, ram, storage, 
             colour, carPicker, insurancePicker} = this.state;
        var data = new FormData();
        switch(categoryId){
            case 1:
                if(Validate.isEmpty(name, price, sellerType, description, location)){
                    return this.showToast('FormError')
                }else{
                    data.append('title', name);
                    if(type != ''){
                        data.append('type', type);
                    }                    
                    data.append('seller_type', sellerId);
                    data.append('price', price);
                    data.append('description', description);
                    data.append('location', location);
                    data.append('cat_id', categoryId);
                    data.append('sub_cat_id', subCategoryId);
                    if(subSubCategoryId != 0){
                        data.append('sub_sub_cat_id', subSubCategoryId);
                    }
                    this.props.gotoUpload(true, data);
                }
            break;
            case 2: 
                if(Validate.isEmpty(name, price, sellerType, description, location, quantity, quantityPicker, pricePicker)){
                    return this.showToast('FormError')
                }else if(quantityPicker == 'Select'){
                    return this.showToast('QuantityPickerError')
                }else if(pricePicker == 'Select'){
                    return this.showToast('PricePickerError')
                }else{
                    data.append('title', name);
                    if(type != ''){
                        data.append('type', type);
                    }
                    data.append('quantity', quantity);
                    data.append('quantity_unit', quantityPicker);                    
                    data.append('price', price);                    
                    data.append('price_unit', pricePicker);
                    data.append('seller_type', sellerId);
                    data.append('description', description);
                    data.append('location', location);
                    data.append('cat_id', categoryId);
                    data.append('sub_cat_id', subCategoryId);
                    this.props.gotoUpload(true, data);
                }
            break;
            case 3: 
                if(Validate.isEmpty(name, price, sellerType, description, location)){
                    return this.showToast('FormError')
                }else{
                    data.append('title', name);
                    if(type != ''){
                        data.append('type', type);
                    }
                    data.append('seller_type', sellerId);
                    data.append('price', price);
                    data.append('description', description);
                    data.append('location', location);
                    data.append('cat_id', categoryId);
                    data.append('sub_cat_id', subCategoryId);
                    this.props.gotoUpload(true, data);
                }
            break;
            case 4:
                if(Validate.isEmpty(name, price, sellerType, description, location, condition)){
                    return this.showToast('FormError')
                }else{
                    data.append('title', name);
                    if(type != ''){
                        data.append('type', type);
                    }
                    data.append('price', price);
                    data.append('condition', condition);
                    if(model != ''){
                        data.append('model', model);
                    }
                    if(brand != ''){
                        data.append('brand_name', brand);
                    }
                    if(size != ''){
                        data.append('size', size);
                    }
                    if(subCategoryId == 4001 || subCategoryId == 4002){
                        data.append('ram', ram);                    
                        data.append('storage', storage);                        
                    }
                    data.append('seller_type', sellerId);                    
                    data.append('description', description);
                    data.append('location', location);
                    data.append('cat_id', categoryId);
                    data.append('sub_cat_id', subCategoryId);
                    this.props.gotoUpload(true, data);
                }
            break;
            case 5:
                if(Validate.isEmpty(name, price, sellerType, description, location, condition)){
                    return this.showToast('FormError')
                }else{
                    data.append('title', name);
                    if(type != ''){
                        data.append('type', type);
                    }
                    data.append('condition', condition);
                    data.append('seller_type', sellerId);
                    data.append('price', price);
                    if(model != ''){
                        data.append('model', model);
                    }
                    if(brand != ''){
                        data.append('brand_name', brand);
                    }
                    if(subCategoryId == 5001 && size != ''){
                        data.append('size', size);
                    }
                    data.append('description', description);
                    data.append('location', location);
                    data.append('cat_id', categoryId);
                    data.append('sub_cat_id', subCategoryId);
                    this.props.gotoUpload(true, data);
                }
            break;
            case 6:
                if(Validate.isEmpty(name, price, sellerType, description, location, fuelPicker, typePicker, ownerPicker, model, brand, kilometers, financePicker, insurancePicker, condition)){
                    return this.showToast('FormError')
                }else if(fuelPicker == 'Select'){
                    return this.showToast('FuelPickerError')
                }else if(typePicker == 'Select'){
                    return this.showToast('TypePickerError')
                }else if(ownerPicker == 'Select'){
                    return this.showToast('OwnerPickerError')
                }else if(financePicker == 'Select'){
                    return this.showToast('FinancePickerError')
                }else if(insurancePicker == 'Select'){
                    return this.showToast('InsurancePickerError')
                }else{
                    data.append('title', name);                    
                    data.append('price', price);
                    data.append('fuel_type', fuelPicker);
                    data.append('vehicle_type', typePicker);
                    data.append('owner', ownerPicker);
                    data.append('finance', financePicker);
                    data.append('insurance', insurancePicker);
                    data.append('model', model);
                    data.append('brand_name', brand);
                    data.append('kilometers', kilometers);
                    data.append('condition', condition);
                    data.append('seller_type', sellerId);
                    data.append('description', description);
                    data.append('location', location);
                    data.append('cat_id', categoryId);
                    data.append('sub_cat_id', subCategoryId);
                    this.props.gotoUpload(true, data);
                }
            break;
            case 7:
                if(Validate.isEmpty(name, price, sellerType, description, location, condition)){
                    return this.showToast('FormError')
                }else{
                    data.append('title', name);
                    if(type != ''){
                        data.append('type', type);
                    }
                    data.append('price', price);
                    data.append('condition', condition);
                    if(model != ''){
                        data.append('model', model);
                    }
                    if(brand != ''){
                        data.append('brand_name', brand);
                    }
                    if(size != ''){
                        data.append('size', size);
                    }
                    if(colour != ''){
                        data.append('color', colour);
                    }
                    data.append('seller_type', sellerId);                    
                    data.append('description', description);
                    data.append('location', location);
                    data.append('cat_id', categoryId);
                    data.append('sub_cat_id', subCategoryId);
                    this.props.gotoUpload(true, data);
                }
            break;
            case 8:
                if(Validate.isEmpty(name, price, sellerType, description, location)){
                    return this.showToast('FormError')
                }else{
                    data.append('title', name);
                    data.append('seller_type', sellerId);
                    data.append('price', price);
                    data.append('description', description);
                    data.append('location', location);
                    data.append('cat_id', categoryId);
                    data.append('sub_cat_id', subCategoryId);
                    this.props.gotoUpload(true, data);
                }
            break;
            case 9:
                if(Validate.isEmpty(name, price, sellerType, description, location, condition)){
                    return this.showToast('FormError')
                }else{
                    data.append('title', name);
                    if(type != ''){
                        data.append('type', type);
                    }
                    data.append('price', price);
                    data.append('condition', condition);
                    data.append('seller_type', sellerId);                    
                    data.append('description', description);
                    data.append('location', location);
                    data.append('cat_id', categoryId);
                    data.append('sub_cat_id', subCategoryId);
                    this.props.gotoUpload(true, data);
                }
            break;
            case 10:
                if(subCategoryId == 10001){
                    if(Validate.isEmpty(name, saleType, plotSize, plotPicker, facePicker, propertyPicker, bedRoom, bathRoom, financePicker, carPicker, price, sellerType, description, location, condition)){
                        return this.showToast('FormError')
                    }else if(plotPicker == 'Select'){
                        return this.showToast('PlotPickerError')
                    }else if(facePicker == 'Select'){
                        return this.showToast('FacePickerError')
                    }else if(propertyPicker == 'Select'){
                        return this.showToast('PropertyPickerError')
                    }else if(financePicker == 'Select'){
                        return this.showToast('FinancePickerError')
                    }else if(carPicker == 'Select'){
                        return this.showToast('CarPickerError')
                    }else{
                        data.append('title', name);
                        data.append('type', saleType);
                        data.append('plot_size', plotSize);
                        data.append('plot_size_unit', plotPicker);
                        data.append('facing', facePicker);
                        data.append('property_type', propertyPicker);
                        data.append('bedroom', bedRoom);
                        data.append('bathroom', bathRoom);
                        data.append('finance', financePicker);
                        data.append('car_parking', carPicker);
                        data.append('price', price);
                        data.append('condition', condition);
                        data.append('seller_type', sellerId);                    
                        data.append('description', description);
                        data.append('location', location);
                        data.append('cat_id', categoryId);
                        data.append('sub_cat_id', subCategoryId);
                        this.props.gotoUpload(true, data);
                    }                    
                }else if(subCategoryId == 10002 || subCategoryId == 10003){
                    if(Validate.isEmpty(name, plotSize, plotPicker, facePicker, propertyPicker, price, sellerType, description, location)){
                        return this.showToast('FormError')
                    }else if(plotPicker == 'Select'){
                        return this.showToast('PlotPickerError')
                    }else if(facePicker == 'Select'){
                        return this.showToast('FacePickerError')
                    }else if(propertyPicker == 'Select'){
                        return this.showToast('PropertyPickerError')
                    }else{
                        data.append('title', name);
                        data.append('plot_size', plotSize);
                        data.append('plot_size_unit', plotPicker);
                        data.append('facing', facePicker);
                        data.append('property_type', propertyPicker);
                        data.append('price', price);
                        data.append('seller_type', sellerId);                    
                        data.append('description', description);
                        data.append('location', location);
                        data.append('cat_id', categoryId);
                        data.append('sub_cat_id', subCategoryId);
                        this.props.gotoUpload(true, data);
                    }
                }
            break;
            case 11:
                if(Validate.isEmpty(name, description, location, jobType, role, qualification, experience, company, allowance, license, vacancy, sellerType)){
                    return this.showToast('FormError')
                }else{
                    data.append('title', name);
                    data.append('job_type', jobType);
                    data.append('salary', salary);
                    data.append('role', role);
                    data.append('qualification', qualification);
                    data.append('experience', experience);
                    data.append('company', company);
                    data.append('allowance', allowance);
                    data.append('license', license);
                    data.append('vacancy', vacancy);
                    data.append('seller_type', sellerId);
                    data.append('description', description);
                    data.append('location', location);
                    data.append('cat_id', categoryId);
                    data.append('sub_cat_id', subCategoryId);
                    this.props.gotoUpload(true, data);
                }
            break;
            case 12:
                if(Validate.isEmpty(name, description, location)){
                    return this.showToast('FormError')
                }else{
                    data.append('title', name);
                    data.append('description', description);
                    data.append('location', location);
                    data.append('cat_id', categoryId);
                    data.append('sub_cat_id', subCategoryId);
                    this.props.gotoUpload(true, data);
                }
            break;
        }
    }
    viewBusiness = (id, subId) => {
        const { name, type, sellerTypeList, sellerId, location, description, price, conditionList, 
            condition, conditionId, quantity, quantityPicker, pricePicker, model, brand, size, colour, 
            ram, storage} = this.state;
        return(
            <View style={styles.loginForm}>
                        <View style={styles.inputwrap}>
                            <TextInput
                                style={styles.input}
                                //underlineColorAndroid='transpaent'
                                ref={(comp) => (this.Name = comp)}
                                placeholderTextColor={Color.placeholder}
                                placeholder={Languages.Name}
                                onChangeText={this.onNameEditHandle}
                                onSubmitEditing={id == 8 ? this.focusPrice : this.focusType}
                                returnKeyType= 'next'
                                value={name}
                            />
                        </View>
                        {(id != 8 && id != 6) && (
                            <View style={styles.inputwrap}>
                            <TextInput
                                style={styles.input}
                                //underlineColorAndroid='transpaent'
                                ref={(comp) => (this.Type = comp)}
                                placeholderTextColor={Color.placeholder}
                                placeholder={Languages.Type}
                                onChangeText={this.onTypeEditHandle}
                                onSubmitEditing={this.focusPrice}
                                returnKeyType= 'next'
                                value={type}
                            />
                        </View>
                        )}
                        {id == 2 && (
                            <View>
                                <Text style={styles.buttonText}>{Languages.TotQuantity}</Text>
                            <View style={styles.inputwrap}>
                            <TextInput
                                style={styles.inputPicker}
                                //underlineColorAndroid='transpaent'
                                ref={(comp) => (this.Quantity = comp)}
                                placeholderTextColor={Color.placeholder}
                                placeholder={Languages.Quantity}
                                keyboardType='numeric'
                                onChangeText={this.onQuantityEditHandle}
                                returnKeyType= 'go'
                                value={quantity}
                            />
                            <Picker
                                selectedValue={quantityPicker}
                                style={styles.picker}
                                onValueChange={(itemValue, itemIndex) =>{
                                    this.setState({quantityPicker: itemValue})
                                }}>
                                <Picker.Item label={Languages['Select']} value='Select' />
                                <Picker.Item label={Languages['Tone']} value='Tone' />
                                <Picker.Item label={Languages['Kg']} value="Kg" />
                                <Picker.Item label={Languages['Bag']} value='Bag' />
                                <Picker.Item label={Languages['Bunch']} value="Bunch" />
                                <Picker.Item label={Languages['Bundle']} value='Bundle' />
                                <Picker.Item label={Languages['Pieces']} value="Pieces" />
                            </Picker>                            
                        </View>
                        <Text style={styles.buttonText}>{Languages.PriceInfo}</Text>
                            <View style={styles.inputwrap}>
                            <TextInput
                                style={styles.inputPicker}
                                //underlineColorAndroid='transpaent'
                                ref={(comp) => (this.Price = comp)}
                                placeholderTextColor={Color.placeholder}
                                placeholder={Languages.Price}
                                keyboardType='numeric'
                                onChangeText={this.onPriceEditHandle}
                                returnKeyType= 'go'
                                value={price}
                            />
                            <Picker
                                selectedValue={pricePicker}
                                style={styles.picker}
                                onValueChange={(itemValue, itemIndex) =>{
                                    this.setState({pricePicker: itemValue})
                                }}>
                                <Picker.Item label={Languages['Select']} value='Select' />
                                <Picker.Item label={Languages['Tone']} value='Tone' />
                                <Picker.Item label={Languages['Kg']} value="Kg" />
                                <Picker.Item label={Languages['Bag']} value='Bag' />
                                <Picker.Item label={Languages['Bunch']} value="Bunch" />
                                <Picker.Item label={Languages['Bundle']} value='Bundle' />
                                <Picker.Item label={Languages['Pieces']} value="Pieces" />
                            </Picker>                            
                        </View>
                        </View>
                        )}
                        
                                                
                        {id != 2 && (<View style={styles.inputwrap}>
                            <TextInput
                                style={styles.input}
                                //underlineColorAndroid='transpaent'
                                ref={(comp) => (this.Price = comp)}
                                placeholderTextColor={Color.placeholder}
                                placeholder={Languages.Price}
                                keyboardType='numeric'
                                onChangeText={this.onPriceEditHandle}
                                returnKeyType= 'go'
                                value={price}
                            />
                        </View>
                        )}
                        {(id == 7 || id == 4 || id == 5) && (
                            <View>
                                <View style={styles.inputwrap}>
                                    <TextInput
                                        style={styles.input}
                                        //underlineColorAndroid='transpaent'
                                        ref={(comp) => (this.model = comp)}
                                        placeholderTextColor={Color.placeholder}
                                        placeholder={Languages.Model}
                                        onChangeText={this.onModelEditHandle}
                                        onSubmitEditing={this.focusBrand}
                                        returnKeyType= 'next'
                                        value={model}
                                    />
                                </View>
                                <View style={styles.inputwrap}>
                                    <TextInput
                                        style={styles.input}
                                        //underlineColorAndroid='transpaent'
                                        ref={(comp) => (this.brand = comp)}
                                        placeholderTextColor={Color.placeholder}
                                        placeholder={Languages.Brand}
                                        onChangeText={this.onBrandEditHandle}
                                        onSubmitEditing={this.focusSize}
                                        returnKeyType= 'next'
                                        value={brand}
                                    />
                                </View>
                                <View style={styles.inputwrap}>
                                    <TextInput
                                        style={styles.input}
                                        //underlineColorAndroid='transpaent'
                                        ref={(comp) => (this.size = comp)}
                                        placeholderTextColor={Color.placeholder}
                                        placeholder={Languages.Size}
                                        onChangeText={this.onSizeEditHandle}
                                        returnKeyType= 'go'
                                        value={size}
                                    />
                                </View>
                            </View>
                        )}
                        {(id == 4 && (subId == 4001 || subId == 4002)) && (
                            <View>
                                <View style={styles.inputwrap}>
                                    <TextInput
                                        style={styles.input}
                                        //underlineColorAndroid='transpaent'
                                        ref={(comp) => (this.ram = comp)}
                                        placeholderTextColor={Color.placeholder}
                                        placeholder={Languages.RAM}
                                        onChangeText={this.onRAMEditHandle}
                                        onSubmitEditing={this.focusStorage}
                                        returnKeyType= 'next'
                                        value={ram}
                                    />
                                </View>
                                <View style={styles.inputwrap}>
                                    <TextInput
                                        style={styles.input}
                                        //underlineColorAndroid='transpaent'
                                        ref={(comp) => (this.storage = comp)}
                                        placeholderTextColor={Color.placeholder}
                                        placeholder={Languages.Storage}
                                        onChangeText={this.onStorageEditHandle}
                                        returnKeyType= 'go'
                                        value={storage}
                                    />
                                </View>
                            </View>
                        )}
                        {id == 7 && (
                            <View style={styles.inputwrap}>
                            <TextInput
                                style={styles.input}
                                //underlineColorAndroid='transpaent'
                                ref={(comp) => (this.colour = comp)}
                                placeholderTextColor={Color.placeholder}
                                placeholder={Languages.Color}
                                onChangeText={this.onColorEditHandle}
                                returnKeyType= 'go'
                                value={colour}
                            />
                        </View>
                        )}
                        {id == 6 && (this.automoileView())}
                        {(id == 7 || id == 9 || id == 4 || id == 5 || id == 6) && (
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

                        <View style={styles.options}>
                            <Text style={styles.infoText}>{Languages.SellerType}</Text> 
                            <View style={styles.sortedView}>
                                {sellerTypeList && sellerTypeList.map((item)=>{
                                    return(
                                        <TouchableOpacity style={[styles.optionsView, styles.optionsMargin, sellerId == item.id && styles.selectedView]}
                                        onPress={()=>{
                                            this.setState({sellerId: item.id, sellerType: item.option})
                                        }}>
                                            <Text style={styles.optionText}>{Languages[item.option]}</Text>
                                        </TouchableOpacity>
                                    );
                                })}
                            </View>                    
                        </View>
                        <View style={styles.inputwrap}>
                            <TextInput
                                style={styles.inputDescription}
                                //underlineColorAndroid='transpaent'
                                ref={(comp) => (this.Description = comp)}
                                placeholderTextColor={Color.placeholder}
                                placeholder={Languages.Description}
                                onChangeText={this.onDescriptionEditHandle}
                                onSubmitEditing={this.focusLocation}
                                multiline={true}
                                returnKeyType= 'next'
                                value={description}
                            />
                        </View>                        
                        <TouchableOpacity style={styles.inputwrap}
                        onPress={this.openLocation}>
                            {/* <TextInput
                                style={styles.input}
                                //underlineColorAndroid='transpaent'
                                ref={(comp) => (this.Location = comp)}
                                placeholderTextColor={Color.placeholder}
                                placeholder={Languages.Location}
                                onChangeText={this.onLocationEditHandle}
                                returnKeyType= 'go'
                                value={location}
                            /> */}
                            <Text style={styles.locationText}>{location == '' ? Languages.Location : location}</Text>
                            
                        </TouchableOpacity>
                    </View>
        )
    }
    automoileView = () => {
        const { fuelPicker, typePicker, ownerPicker, fuelList, typeList, ownerList, model, kilometers, 
            brand, financePicker, insurancePicker } = this.state;
        return(
            <View>
                <Text style={styles.buttonText}>{Languages.FuelType}</Text>
                <View style={styles.inputwrap}>
                    <Picker
                        selectedValue={fuelPicker}
                        style={styles.pickerSelect}
                        onValueChange={(itemValue, itemIndex) =>{
                            this.setState({fuelPicker: itemValue})
                        }}>
                        <Picker.Item label={Languages['Select']} value='Select' />
                        <Picker.Item label={Languages[fuelList[0].option]} value={fuelList[0].option} />
                        <Picker.Item label={Languages[fuelList[1].option]} value={fuelList[1].option} />
                        <Picker.Item label={Languages[fuelList[2].option]} value={fuelList[2].option} />
                        <Picker.Item label={Languages[fuelList[3].option]} value={fuelList[3].option} />
                    </Picker>                    
                </View>
                <Text style={styles.buttonText}>{Languages.Type}</Text>
                <View style={styles.inputwrap}>
                    <Picker
                        selectedValue={typePicker}
                        style={styles.pickerSelect}
                        onValueChange={(itemValue, itemIndex) =>{
                            this.setState({typePicker: itemValue})
                        }}>
                        <Picker.Item label={Languages['Select']} value='Select' />
                        <Picker.Item label={Languages[typeList[0].option]} value={typeList[0].option} />
                        <Picker.Item label={Languages[typeList[1].option]} value={typeList[1].option} />
                    </Picker>                    
                </View>
                <Text style={styles.buttonText}>{Languages.Owner}</Text>
                <View style={styles.inputwrap}>
                    <Picker
                        selectedValue={ownerPicker}
                        style={styles.pickerSelect}
                        onValueChange={(itemValue, itemIndex) =>{
                            this.setState({ownerPicker: itemValue})
                        }}>
                        <Picker.Item label={Languages['Select']} value='Select' />
                        <Picker.Item label={Languages[ownerList[0].option]}  value={ownerList[0].option} />
                        <Picker.Item label={Languages[ownerList[1].option]} value={ownerList[1].option} />
                        <Picker.Item label={Languages[ownerList[2].option]} value='Third +' />
                    </Picker>                    
                </View>
                <Text style={styles.buttonText}>{Languages.Finance}</Text>
                <View style={styles.inputwrap}>
                    <Picker
                        selectedValue={financePicker}
                        style={styles.pickerSelect}
                        onValueChange={(itemValue, itemIndex) =>{
                            this.setState({financePicker: itemValue})
                        }}>
                        <Picker.Item label={Languages['Select']} value='Select' />
                        <Picker.Item label="Yes"  value="Yes" />
                        <Picker.Item label="No" value="No" />
                    </Picker>                    
                </View>
                <Text style={styles.buttonText}>{Languages.Insurance}</Text>
                <View style={styles.inputwrap}>
                    <Picker
                        selectedValue={insurancePicker}
                        style={styles.pickerSelect}
                        onValueChange={(itemValue, itemIndex) =>{
                            this.setState({insurancePicker: itemValue})
                        }}>
                        <Picker.Item label={Languages['Select']} value='Select' />
                        <Picker.Item label="Yes"  value="Yes" />
                        <Picker.Item label="No" value="No" />
                    </Picker>                    
                </View>
                <View style={styles.inputwrap}>
                    <TextInput
                        style={styles.input}
                        //underlineColorAndroid='transpaent'
                        ref={(comp) => (this.model = comp)}
                        placeholderTextColor={Color.placeholder}
                        placeholder={Languages.Model}
                        onChangeText={this.onModelEditHandle}
                        onSubmitEditing={this.focusKilometers}
                        returnKeyType= 'next'
                        value={model}
                    />
                </View>
                <View style={styles.inputwrap}>
                    <TextInput
                        style={styles.input}
                        //underlineColorAndroid='transpaent'
                        ref={(comp) => (this.kilometers = comp)}
                        placeholderTextColor={Color.placeholder}
                        placeholder={Languages.KM}
                        onChangeText={this.onKilometersEditHandle}
                        onSubmitEditing={this.focusBrand}
                        returnKeyType= 'next'
                        value={kilometers}
                    />
                </View>
                <View style={styles.inputwrap}>
                    <TextInput
                        style={styles.input}
                        //underlineColorAndroid='transpaent'
                        ref={(comp) => (this.brand = comp)}
                        placeholderTextColor={Color.placeholder}
                        placeholder={Languages.Brand}
                        onChangeText={this.onBrandEditHandle}
                        returnKeyType= 'go'
                        value={brand}
                    />
                </View>
            </View>
        );

    }

    viewContribution= () => {
        const {name, location, description } = this.state;
        return(
            
            <View style={styles.loginForm}>
                        <View style={styles.inputwrap}>
                            <TextInput
                                style={styles.input}
                                //underlineColorAndroid='transpaent'
                                ref={(comp) => (this.Name = comp)}
                                placeholderTextColor={Color.placeholder}
                                placeholder={Languages.Name}
                                onChangeText={this.onNameEditHandle}
                                onSubmitEditing={this.focusType}
                                returnKeyType= 'next'
                                value={name}
                            />
                        </View>
                        
                        <View style={styles.inputwrap}>
                            <TextInput
                                style={styles.input}
                                //underlineColorAndroid='transpaent'
                                ref={(comp) => (this.Description = comp)}
                                placeholderTextColor={Color.placeholder}
                                placeholder={Languages.Description}
                                onChangeText={this.onDescriptionEditHandle}
                                onSubmitEditing={this.focusLocation}
                                returnKeyType= 'next'
                                value={description}
                            />
                        </View>                        
                        <TouchableOpacity style={styles.inputwrap}
                            onPress={this.openLocation}>
                            {/* <TextInput
                                style={styles.input}
                                //underlineColorAndroid='transpaent'
                                ref={(comp) => (this.Location = comp)}
                                placeholderTextColor={Color.placeholder}
                                placeholder={Languages.Location}
                                onChangeText={this.onLocationEditHandle}
                                returnKeyType= 'go'
                                value={location}
                            /> */}
                            <Text style={styles.locationText}>{location == '' ? Languages.Location : location}</Text>
                            
                        </TouchableOpacity>
                    </View>
        );
    }

    viewJob = () => {
        const { name, jobType, salary, role, qualification, experience, company, allowance, 
            license, vacancy, sellerTypeList, sellerId, description, location } = this.state;
        return(
            <View style={styles.loginForm}>
                <View style={styles.inputwrap}>
                    <TextInput
                        style={styles.input}
                        //underlineColorAndroid='transpaent'
                        ref={(comp) => (this.Name = comp)}
                        placeholderTextColor={Color.placeholder}
                        placeholder={Languages.Name}
                        onChangeText={this.onNameEditHandle}                        
                        returnKeyType= 'go'
                        value={name}
                    />
                </View>
                <Text style={styles.buttonText}>{Languages.Type}</Text>
                <View style={styles.inputwrap}>
                    <Picker
                        selectedValue={jobType}
                        style={styles.pickerSelect}
                        onValueChange={(itemValue, itemIndex) =>{
                            this.setState({jobType: itemValue})
                        }}>
                        <Picker.Item label={Languages['Select']} value='Select' />
                        <Picker.Item label={Languages['Permanent']} value='Permanent' />
                        <Picker.Item label={Languages['Temporary']} value='Temporary' />
                    </Picker>                    
                </View>
                <View style={styles.inputwrap}>
                    <TextInput
                        style={styles.input}
                        //underlineColorAndroid='transpaent'
                        ref={(comp) => (this.Salary = comp)}
                        placeholderTextColor={Color.placeholder}
                        placeholder={Languages.Salary}
                        keyboardType='numeric'
                        onChangeText={this.onSalaryEditHandle}
                        onSubmitEditing={this.focusRole}
                        returnKeyType= 'next'
                        value={salary}
                    />
                </View>
                <View style={styles.inputwrap}>
                    <TextInput
                        style={styles.input}
                        //underlineColorAndroid='transpaent'
                        ref={(comp) => (this.Role = comp)}
                        placeholderTextColor={Color.placeholder}
                        placeholder={Languages.Role}
                        onChangeText={this.onRoleEditHandle}
                        onSubmitEditing={this.focusQualification}
                        returnKeyType= 'next'
                        value={role}
                    />
                </View>
                <View style={styles.inputwrap}>
                    <TextInput
                        style={styles.input}
                        //underlineColorAndroid='transpaent'
                        ref={(comp) => (this.qualification = comp)}
                        placeholderTextColor={Color.placeholder}
                        placeholder={Languages.Qualification}
                        onChangeText={this.onQualificationEditHandle}
                        onSubmitEditing={this.focusExperience}
                        returnKeyType= 'next'
                        value={qualification}
                    />
                </View>
                <View style={styles.inputwrap}>
                    <TextInput
                        style={styles.input}
                        //underlineColorAndroid='transpaent'
                        ref={(comp) => (this.experience = comp)}
                        placeholderTextColor={Color.placeholder}
                        placeholder={Languages.Experience}
                        onChangeText={this.onExperienceEditHandle}
                        onSubmitEditing={this.focusCompany}
                        returnKeyType= 'next'
                        value={experience}
                    />
                </View>
                <View style={styles.inputwrap}>
                    <TextInput
                        style={styles.input}
                        //underlineColorAndroid='transpaent'
                        ref={(comp) => (this.company = comp)}
                        placeholderTextColor={Color.placeholder}
                        placeholder={Languages.Company}
                        onChangeText={this.onCompanyEditHandle}
                        onSubmitEditing={this.focusAllowance}
                        returnKeyType= 'next'
                        value={company}
                    />
                </View>
                <View style={styles.inputwrap}>
                    <TextInput
                        style={styles.input}
                        //underlineColorAndroid='transpaent'
                        ref={(comp) => (this.allowance = comp)}
                        placeholderTextColor={Color.placeholder}
                        placeholder={Languages.Allowance}
                        onChangeText={this.onAllowanceEditHandle}
                        onSubmitEditing={this.focusLicense}
                        returnKeyType= 'next'
                        value={allowance}
                    />
                </View>
                <View style={styles.inputwrap}>
                    <TextInput
                        style={styles.input}
                        //underlineColorAndroid='transpaent'
                        ref={(comp) => (this.license = comp)}
                        placeholderTextColor={Color.placeholder}
                        placeholder={Languages.License}
                        onChangeText={this.onLicenseEditHandle}
                        onSubmitEditing={this.focusVacancy}
                        returnKeyType= 'next'
                        value={license}
                    />
                </View>
                <View style={styles.inputwrap}>
                    <TextInput
                        style={styles.input}
                        //underlineColorAndroid='transpaent'
                        ref={(comp) => (this.vacancy = comp)}
                        placeholderTextColor={Color.placeholder}
                        placeholder={Languages.Vacancy}
                        onChangeText={this.onVacancyEditHandle}
                        //onSubmitEditing={this.focusPrice}
                        returnKeyType= 'go'
                        value={vacancy}
                    />
                </View>
                <View style={styles.options}>
                    <Text style={styles.infoText}>{Languages.PostedBy}</Text> 
                    <View style={styles.sortedView}>
                        {sellerTypeList && sellerTypeList.map((item)=>{
                            return(
                                <TouchableOpacity style={[styles.optionsView, styles.optionsMargin, sellerId == item.id && styles.selectedView]}
                                onPress={()=>{
                                    this.setState({sellerId: item.id, sellerType: item.option})
                                }}>
                                    <Text style={styles.optionText}>{Languages[item.option]}</Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>                    
                </View>
                <View style={styles.inputwrap}>
                    <TextInput
                        style={styles.inputDescription}
                        //underlineColorAndroid='transpaent'
                        ref={(comp) => (this.Description = comp)}
                        placeholderTextColor={Color.placeholder}
                        placeholder={Languages.Description}
                        onChangeText={this.onDescriptionEditHandle}
                        onSubmitEditing={this.focusLocation}
                        multiline={true}
                        returnKeyType= 'next'
                        value={description}
                    />
                </View>                        
                <TouchableOpacity style={styles.inputwrap}
                onPress={this.openLocation}>
                    {/* <TextInput
                        style={styles.input}
                        //underlineColorAndroid='transpaent'
                        ref={(comp) => (this.Location = comp)}
                        placeholderTextColor={Color.placeholder}
                        placeholder={Languages.Location}
                        onChangeText={this.onLocationEditHandle}
                        returnKeyType= 'go'
                        value={location}
                    /> */}
                    <Text style={styles.locationText}>{location == '' ? Languages.Location : location}</Text>
                    
                </TouchableOpacity>
            </View>
        );
    }

    viewPropertyHouse = () => {
        const { name, location, sellerTypeList, sellerId, description, price, saleList, 
            saleId, plotSize, plotPicker, facePicker, bedRoom, bathRoom, propertyPicker, financePicker,
            carPicker, conditionList, condition, conditionId} = this.state;
        return(
            <View style={styles.loginForm}>
                <View style={styles.inputwrap}>
                    <TextInput
                        style={styles.input}
                        //underlineColorAndroid='transpaent'
                        ref={(comp) => (this.Name = comp)}
                        placeholderTextColor={Color.placeholder}
                        placeholder={Languages.Name}
                        onChangeText={this.onNameEditHandle}                        
                        returnKeyType= 'go'
                        value={name}
                    />
                </View>
                <View style={styles.options}>
                    <Text style={styles.infoText}>{Languages.Type}</Text> 
                    <View style={styles.sortedView}>
                        {saleList && saleList.map((item)=>{
                            return(
                                <TouchableOpacity style={[styles.optionsView, styles.optionsMargin, saleId == item.id && styles.selectedView]}
                                onPress={()=>{
                                    this.setState({saleId: item.id, saleType: item.option})
                                }}>
                                    <Text style={styles.optionText}>{Languages[item.option]}</Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>                    
                </View>
                <Text style={styles.buttonText}>{Languages.PlotSize}</Text>
                <View style={styles.inputwrap}>
                    <TextInput
                        style={styles.inputPicker}
                        //underlineColorAndroid='transpaent'
                        ref={(comp) => (this.plotSize = comp)}
                        placeholderTextColor={Color.placeholder}
                        placeholder={Languages.PlotSize}
                        keyboardType='numeric'
                        onChangeText={this.onPlotSizeEditHandle}
                        returnKeyType= 'go'
                        value={plotSize}
                    />
                    <Picker
                        selectedValue={plotPicker}
                        style={styles.picker}
                        onValueChange={(itemValue, itemIndex) =>{
                            this.setState({plotPicker: itemValue})
                        }}>
                        <Picker.Item label={Languages['Select']} value='Select' />
                        <Picker.Item label={Languages['Sqft']} value='Sq.Ft' />
                        <Picker.Item label={Languages["Cent"]} value="Cent" />
                        <Picker.Item label={Languages['Ground']} value='Ground' />
                        <Picker.Item label={Languages["Acer"]} value="Acer" />
                    </Picker>                            
                </View>
                <Text style={styles.buttonText}>{Languages.Facing}</Text>
                <View style={styles.inputwrap}>
                    <Picker
                        selectedValue={facePicker}
                        style={styles.pickerSelect}
                        onValueChange={(itemValue, itemIndex) =>{
                            this.setState({facePicker: itemValue})
                        }}>
                        <Picker.Item label={Languages['Select']} value='Select' />
                        <Picker.Item label={Languages["East"]}  value="East" />
                        <Picker.Item label={Languages["West"]} value="West" />
                        <Picker.Item label={Languages["North"]} value="North" />
                        <Picker.Item label={Languages["South"]} value="South" />
                    </Picker>                    
                </View>
                <Text style={styles.buttonText}>{Languages.PropertyType}</Text>
                <View style={styles.inputwrap}>
                    <Picker
                        selectedValue={propertyPicker}
                        style={styles.pickerSelect}
                        onValueChange={(itemValue, itemIndex) =>{
                            this.setState({propertyPicker: itemValue})
                        }}>
                        <Picker.Item label={Languages['Select']} value='Select' />
                        <Picker.Item label={Languages["House"]}  value="House" />
                        <Picker.Item label={Languages["Appartement"]} value="Appartement" />
                        <Picker.Item label={Languages["Commercial"]} value="Commercial" />
                    </Picker>                    
                </View>
                <View style={styles.inputwrap}>
                    <TextInput
                        style={styles.input}
                        //underlineColorAndroid='transpaent'
                        ref={(comp) => (this.bedRoom = comp)}
                        placeholderTextColor={Color.placeholder}
                        placeholder={Languages.BedRoom}
                        keyboardType='numeric'
                        onChangeText={this.onBedRoomEditHandle}
                        onSubmitEditing={this.focusBathRoom}
                        returnKeyType= 'next'
                        value={bedRoom}
                    />
                </View>
                <View style={styles.inputwrap}>
                    <TextInput
                        style={styles.input}
                        //underlineColorAndroid='transpaent'
                        ref={(comp) => (this.bathRoom = comp)}
                        placeholderTextColor={Color.placeholder}
                        placeholder={Languages.BathRoom}
                        keyboardType='numeric'
                        onChangeText={this.onBathRoomEditHandle}
                        returnKeyType= 'go'
                        value={bathRoom}
                    />
                </View>
                <Text style={styles.buttonText}>{Languages.Finance}</Text>
                <View style={styles.inputwrap}>
                    <Picker
                        selectedValue={financePicker}
                        style={styles.pickerSelect}
                        onValueChange={(itemValue, itemIndex) =>{
                            this.setState({financePicker: itemValue})
                        }}>
                        <Picker.Item label={Languages['Select']} value='Select' />
                        <Picker.Item label="Yes"  value="Yes" />
                        <Picker.Item label="No" value="No" />
                    </Picker>                    
                </View>
                <Text style={styles.buttonText}>{Languages.CarParking}</Text>
                <View style={styles.inputwrap}>
                    <Picker
                        selectedValue={carPicker}
                        style={styles.pickerSelect}
                        onValueChange={(itemValue, itemIndex) =>{
                            this.setState({carPicker: itemValue})
                        }}>
                        <Picker.Item label={Languages['Select']} value='Select' />
                        <Picker.Item label="Yes"  value="Yes" />
                        <Picker.Item label="No" value="No" />
                    </Picker>                    
                </View>
                <View style={styles.inputwrap}>
                    <TextInput
                        style={styles.input}
                        //underlineColorAndroid='transpaent'
                        ref={(comp) => (this.Price = comp)}
                        placeholderTextColor={Color.placeholder}
                        placeholder={Languages.Price}
                        keyboardType='numeric'
                        onChangeText={this.onPriceEditHandle}
                        returnKeyType= 'go'
                        value={price}
                    />
                </View>
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
                <View style={styles.options}>
                    <Text style={styles.infoText}>{Languages.SellerType}</Text> 
                    <View style={styles.sortedView}>
                        {sellerTypeList && sellerTypeList.map((item)=>{
                            return(
                                <TouchableOpacity style={[styles.optionsView, styles.optionsMargin, sellerId == item.id && styles.selectedView]}
                                onPress={()=>{
                                    this.setState({sellerId: item.id, sellerType: item.option})
                                }}>
                                    <Text style={styles.optionText}>{Languages[item.option]}</Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>                    
                </View>
                <View style={styles.inputwrap}>
                    <TextInput
                        style={styles.inputDescription}
                        //underlineColorAndroid='transpaent'
                        ref={(comp) => (this.Description = comp)}
                        placeholderTextColor={Color.placeholder}
                        placeholder={Languages.Description}
                        onChangeText={this.onDescriptionEditHandle}
                        onSubmitEditing={this.focusLocation}
                        multiline={true}
                        returnKeyType= 'next'
                        value={description}
                    />
                </View>                        
                <TouchableOpacity style={styles.inputwrap}
                onPress={this.openLocation}>
                    {/* <TextInput
                        style={styles.input}
                        //underlineColorAndroid='transpaent'
                        ref={(comp) => (this.Location = comp)}
                        placeholderTextColor={Color.placeholder}
                        placeholder={Languages.Location}
                        onChangeText={this.onLocationEditHandle}
                        returnKeyType= 'go'
                        value={location}
                    /> */}
                    <Text style={styles.locationText}>{location == '' ? Languages.Location : location}</Text>
                    
                </TouchableOpacity>
            </View>
        )
    }
    viewPropertyLand = () => {
        const { name, propertyPicker, facePicker, plotSize, location, 
            description, sellerId, sellerTypeList, price, plotPicker } = this.state;
        return(
            <View style={styles.loginForm}>
                 <View style={styles.inputwrap}>
                    <TextInput
                        style={styles.input}
                        //underlineColorAndroid='transpaent'
                        ref={(comp) => (this.Name = comp)}
                        placeholderTextColor={Color.placeholder}
                        placeholder={Languages.Name}
                        onChangeText={this.onNameEditHandle}                        
                        returnKeyType= 'go'
                        value={name}
                    />
                </View>
                <Text style={styles.buttonText}>{Languages.PropertyType}</Text>
                <View style={styles.inputwrap}>
                    <Picker
                        selectedValue={propertyPicker}
                        style={styles.pickerSelect}
                        onValueChange={(itemValue, itemIndex) =>{
                            this.setState({propertyPicker: itemValue})
                        }}>
                        <Picker.Item label={Languages["Housing"]}  value="Housing Land" />
                        <Picker.Item label={Languages["Agriculture"]} value="Agriculture" />
                        <Picker.Item label={Languages["CommercialLand"]} value="Commercial Land" />
                    </Picker>                    
                </View>
                <Text style={styles.buttonText}>{Languages.PlotSize}</Text>
                <View style={styles.inputwrap}>
                    <TextInput
                        style={styles.inputPicker}
                        //underlineColorAndroid='transpaent'
                        ref={(comp) => (this.plotSize = comp)}
                        placeholderTextColor={Color.placeholder}
                        placeholder={Languages.PlotSize}
                        keyboardType='numeric'
                        onChangeText={this.onPlotSizeEditHandle}
                        returnKeyType= 'go'
                        value={plotSize}
                    />
                    <Picker
                        selectedValue={plotPicker}
                        style={styles.picker}
                        onValueChange={(itemValue, itemIndex) =>{
                            this.setState({plotPicker: itemValue})
                        }}>
                        <Picker.Item label={Languages['Sqft']} value='Sq.Ft' />
                        <Picker.Item label={Languages["Cent"]} value="Cent" />
                        <Picker.Item label={Languages['Ground']} value='Ground' />
                        <Picker.Item label={Languages["Acer"]} value="Acer" />
                    </Picker>                            
                </View>
                <Text style={styles.buttonText}>{Languages.Facing}</Text>
                <View style={styles.inputwrap}>
                    <Picker
                        selectedValue={facePicker}
                        style={styles.pickerSelect}
                        onValueChange={(itemValue, itemIndex) =>{
                            this.setState({facePicker: itemValue})
                        }}>
                        <Picker.Item label={Languages["East"]}  value="East" />
                        <Picker.Item label={Languages["West"]} value="West" />
                        <Picker.Item label={Languages["North"]} value="North" />
                        <Picker.Item label={Languages["South"]} value="South" />
                    </Picker>                    
                </View>
                <View style={styles.inputwrap}>
                    <TextInput
                        style={styles.input}
                        //underlineColorAndroid='transpaent'
                        ref={(comp) => (this.Price = comp)}
                        placeholderTextColor={Color.placeholder}
                        placeholder={Languages.Price}
                        keyboardType='numeric'
                        onChangeText={this.onPriceEditHandle}
                        returnKeyType= 'go'
                        value={price}
                    />
                </View>
                <View style={styles.options}>
                    <Text style={styles.infoText}>{Languages.SellerType}</Text> 
                    <View style={styles.sortedView}>
                        {sellerTypeList && sellerTypeList.map((item)=>{
                            return(
                                <TouchableOpacity style={[styles.optionsView, styles.optionsMargin, sellerId == item.id && styles.selectedView]}
                                onPress={()=>{
                                    this.setState({sellerId: item.id, sellerType: item.option})
                                }}>
                                    <Text style={styles.optionText}>{Languages[item.option]}</Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>                    
                </View>
                <View style={styles.inputwrap}>
                    <TextInput
                        style={styles.inputDescription}
                        //underlineColorAndroid='transpaent'
                        ref={(comp) => (this.Description = comp)}
                        placeholderTextColor={Color.placeholder}
                        placeholder={Languages.Description}
                        onChangeText={this.onDescriptionEditHandle}
                        onSubmitEditing={this.focusLocation}
                        multiline={true}
                        returnKeyType= 'next'
                        value={description}
                    />
                </View>                        
                <TouchableOpacity style={styles.inputwrap}
                onPress={this.openLocation}>
                    {/* <TextInput
                        style={styles.input}
                        //underlineColorAndroid='transpaent'
                        ref={(comp) => (this.Location = comp)}
                        placeholderTextColor={Color.placeholder}
                        placeholder={Languages.Location}
                        onChangeText={this.onLocationEditHandle}
                        returnKeyType= 'go'
                        value={location}
                    /> */}
                    <Text style={styles.locationText}>{location == '' ? Languages.Location : location}</Text>
                    
                </TouchableOpacity>
            </View>
        );
    }
    
    renderItem = ({item}) => {
        return(
            <TouchableOpacity style={styles.locationView}
            onPress={()=>{
                this.setState({location: item.LocationEN})
                this.closeLocation();
            }}>
                <Text style={styles.locationItem}>{item.LocationEN}</Text>
            </TouchableOpacity>
        )
    }

    openLocation = () => {
        this.setState({locationList: this.props.locationList});
        this.locationModal.open();
    }

    closeLocation = () => {
        this.locationModal.close();
    }

    showLocation = () => {        
        const { search, locationList } = this.state;
        return(
            <Modal
            ref={(modal) => (this.locationModal = modal)}
            backButtonClose={true}
            onClosed={this.closeLocation}>
                <View style={styles.container1}>
                <View style={styles.searchView}>
                    <View style={styles.searchbox}>
                        {/* <TouchableOpacity 
                        onPress={this.closeLocation}>
                            <CommunityIcons name={Icons.MaterialCommunityIcons.Back} size={30} color={Color.cancelButton}/>
                        </TouchableOpacity> */}
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
                        onPress={this.searchLocation}>
                            <Icon name={Icons.FontAwesome.Search} color={ Color.cancelButton } size={24} />
                        </TouchableOpacity>
                    </View>
                </View>
                <FlatList
                    overScrollMode='never'
                    contentContainerStyle={styles.flatlist}
                    keyExtractor={(item, index) => index.toString()}
                    data={locationList}
                    horizontal={false}
                    showsVerticalScrollIndicator={false}
                    renderItem={this.renderItem}/>
                </View>
                {/* <Search 
                location={true}
                selectedValue={(value)=>{
                    this.setState({location: value});
                    this.closeLocation();
                }}
                onClose={this.closeLocation}/> */}
            </Modal>
        );
    }

    render(){        
        const { uploadImage, postData, category, subCategory } = this.props;
        return(
            <View style={styles.container}>
                {this.showLocation()}
                {uploadImage == true? (
                    <PostImages 
                    data={postData}
                    goBack={this.props.goBack}/>
                ) : (
                <ScrollView>
                    <View style={styles.subContain}>
                    {((category.id == 1) || (category.id == 2) || (category.id == 3) || (category.id == 4) || (category.id == 5) || (category.id == 6) || (category.id == 7)|| (category.id == 8) || (category.id == 9)) && ( this.viewBusiness(category.id, subCategory.id))}
                    {(category.id == 10 && subCategory.id == 10001) && ( this.viewPropertyHouse())}
                    {(category.id == 10 && (subCategory.id == 10002 || subCategory.id == 10003)) && ( this.viewPropertyLand())}
                    {category.id == 11 && ( this.viewJob())}
                    {category.id == 12 && ( this.viewContribution())}                    
                    <TouchableOpacity
                            style={styles.submitButton}
                            onPress={()=>{
                                this.onSubmitPressHandle(category.id, subCategory.id, subCategory.subCategory != null ? subCategory.subCategory.id : 0);
                            }}>
                            <Text style={styles.buttonText}>{Languages.Next}</Text>
                        </TouchableOpacity>                       
                    </View>
                </ScrollView>
                )}                
            </View>
        );
    }
}
const mapStateToProps = (state) => ({
    language: state.user.language,
    token: state.user.token,
    locationList: state.user.locations
});
export default connect(
    mapStateToProps,
    null
)(PostAdItem);
//export default PostAdItem;

 