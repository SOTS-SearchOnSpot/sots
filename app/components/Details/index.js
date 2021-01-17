import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Share, ImageBackground, FlatList, Linking, Dimensions, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AntIcon from 'react-native-vector-icons/AntDesign';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import currencyFormatter from 'currency-formatter';
import Toast from 'react-native-simple-toast';
import { SliderBox } from "react-native-image-slider-box";
import { Color, Icons, Images, Languages, Constants } from '@common';
import { Rating, Like, FavouriteIcon } from '@components';
import styles from './styles';
import { AdDetails, UserDetails } from '@services';
import { connect } from "react-redux";
import ImageSlider from 'react-native-image-slider';
import Modal from 'react-native-modalbox';
import ImageViewer from 'react-native-image-zoom-viewer';
import Communications from 'react-native-communications';
import firebase from '../../FireBase/Config';
import { TabHeading } from 'native-base';

class Details extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
           count: 0,
           adImages: [],
           images: [],
           ItemList: [],
           active: 1,
           profileData: null,
           chatUser: null
        }
    }
    share = () => {
        Share.share({
            message: 'AIO',
            title: 'Shopping'
        });
    }
    componentDidMount(){
        const { adDetails } = this.props;
        if(adDetails.Images != null){
            var data = [];
            var urls = [];
            adDetails.Images.forEach(element => {
                data.push(element.Image);
                urls.push({url: element.Image});
            });
            if(data.length > 0){
                this.setState({adImages: data, count: data.length, images: urls})
            }
        }
        this.getRelatedAds();
        this.getUser();
    }

    getRelatedAds = async () =>{
        const { adDetails, token } = this.props;
        var data = new FormData();
        data.append('cat_id', adDetails.MCId);
        data.append('sub_cat_id', adDetails.SCId);
        data.append('skip_ads_id', adDetails.Id);
        data.append('limit', 10);
        const response = await AdDetails.getAds(token, data);
        if(response !== undefined){
            if(response.flag == true){
                this.setState({ItemList: response.response});
            }else{
                this.setState({ItemList: []});
            }
        }else{
            this.setState({ItemList: []});
        }

    }

    getUser = async () => {
        const { adDetails, token } = this.props;
        var data = new FormData();
        data.append('id', adDetails.CustId);
        const response = await UserDetails.userProfile(token, data);
        if(response !== undefined){
            if(response.flag == true){
                this.setState({profileData: response.response});
            }
        }
    }

    getChatUser= () => {
        const { profileData } = this.state;
        try{            
            let chatUser = {
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
                    if(profileData.CustChatId == child.val().uuid){
                        chatUser.name = child.val().name,
                        chatUser.email = child.val().email,
                        chatUser.uuid = child.val().uuid,
                        chatUser.img = ''
                    }
                })
                this.setState({chatUser: chatUser})
                this.openChatInfo();
            }) 
        }catch (e) {
            console.log('Get User Error => ', e)
        }
    }

    getCurrencyFormat = (price) => {
        let currency = currencyFormatter.format(price, {
            ...Constants.DefaultCurrency
        })
        return currency;
    }

    openChatInfo = () => {        
        this.chatInfoModal.open();
    }

    closeChatInfo = () => {
        this.chatInfoModal.close();
    }

    onChatPressHandle = () => {
        const {chatUser} = this.state;
        if(chatUser != null){
            this.props.gotoChat(chatUser);
        }
        this.closeChatInfo();
    }

    showChatInfo = () => {
        return(
            <Modal
            ref={(modal) => (this.chatInfoModal = modal)}
            backButtonClose={true}
            swipeToClose={false}
            position={'bottom'}
            //coverScreen={true}
            onClosed={this.closeChatInfo}
            style={styles.chatInfoView}>
                <View style={styles.chatInfoView}>
                    <Text style={styles.tipHeaderText}>Tips for safe deal</Text>
                    <View style={styles.tipContentItemView}>
                        <Text style={styles.contentNumber}>1 : </Text>
                        <Text style={styles.tipContent}>Don't pay any money before see the product</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.chatButton}
                        onPress={this.onChatPressHandle}>
                        <Text style={styles.buttonText}>{Languages.Continue}</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        );
    }

    renderItem = ({item}) => {
        const { imageUrl, goDetails } = this.props;
        return(
            <TouchableOpacity style={styles.item}
            onPress={() => {
                goDetails(item, imageUrl);
            }}>
                <Image source={item.Images == null ? Images.Automobile : {uri: item.Images[0].Image}} style={styles.itemImage} resizeMode='contain' />
                <View style={styles.itemDetails}>
                    <Text style={styles.relatedItemName}>{item.Title}</Text>
                    <View style={styles.priceView}>
                        <Text style={styles.itemInfo}>{item.Description}</Text>
                        <Text style={styles.itemPrice}>{this.getCurrencyFormat(item.Price)}</Text>
                    </View>                    
                </View>
                <View style={styles.topView}>
                    <Text style={[styles.relatedItemName, { color: Color.white }]}>{item.Date}</Text>                    
                </View>
            </TouchableOpacity>
        );
    }

    viewCommon = () => {
        return(
            <View style={{width: '100%'}}>
                <Text style={[styles.infoView, styles.marginItem]}>{'Seller type: '}<Text style={styles.infoView}>{'Owner'}
                        </Text> 
                    </Text>
                <Text style={[styles.infoView, styles.marginItem]}>{'Post Date: '}<Text style={styles.infoView}>{'09-Aug-2020'}
                    </Text> 
                </Text>
                <View style={[styles.locationView, {marginTop: 5}]}>
                    <EvilIcon name={Icons.EvilIcons.Location} color={Color.black} size={24} />
                    <Text style={[styles.infoView, styles.locationText, {width: '75%'}]}>{'Akkulam, Thiruvananthapuram'}</Text>
                </View>
            </View>
        );
    }

    viewAgriculture = () => {
        const { adDetails } = this.props;
        return(
            <View style={styles.itemView}>
                <Text style={styles.itemName}>{adDetails.Title}</Text>
                <Text style={[styles.infoView, styles.marginItem]}>{'Total quantity in: '}<Text style={styles.infoView}>{adDetails.Quantity + ' ' + adDetails.QuantityUnit}
                    </Text> 
                </Text>
                <Text style={[styles.infoView, styles.marginItem]}>{'Price for: '}<Text style={styles.infoView}>{this.getCurrencyFormat(adDetails.Price) + '/' + adDetails.PriceUnit}
                    </Text> 
                </Text>
                <Text style={[styles.infoView, styles.marginItem]}>{'Seller type: '}<Text style={styles.infoView}>{adDetails.SellerType == 1? Languages['Owner'] : Languages['Agent']}
                        </Text> 
                    </Text>
                <Text style={[styles.infoView, styles.marginItem]}>{'Post Date: '}<Text style={styles.infoView}>{adDetails.Date}
                    </Text> 
                </Text>
                <View style={[styles.locationView, {marginTop: 5}]}>
                    <EvilIcon name={Icons.EvilIcons.Location} color={Color.black} size={24} />
                    <Text style={[styles.infoView, styles.locationText, {width: '75%'}]}>{adDetails.Location}</Text>
                </View>
            </View>
        );
    }

    viewBusiness = () => {
        const {adDetails} = this.props;
        return(
            <View style={styles.itemView}>
                <Text style={styles.itemName}>{adDetails.Title}</Text>
                <Text style={[styles.infoView, styles.marginItem]}>{'Price: '}<Text style={styles.infoView}>{this.getCurrencyFormat(adDetails.Price)}
                    </Text> 
                </Text>
                <Text style={[styles.infoView, styles.marginItem]}>{'Type: '}<Text style={styles.infoView}>{adDetails.Type}
                    </Text> 
                </Text>
                <Text style={[styles.infoView, styles.marginItem]}>{'Seller type: '}<Text style={styles.infoView}>{adDetails.SellerType == 1? Languages['Owner'] : Languages['Agent']}
                    </Text> 
                </Text>
                <Text style={[styles.infoView, styles.marginItem]}>{'Post Date: '}<Text style={styles.infoView}>{adDetails.Date}
                    </Text> 
                </Text>
                <View style={[styles.locationView, {marginTop: 5}]}>
                    <EvilIcon name={Icons.EvilIcons.Location} color={Color.black} size={24} />
                    <Text style={[styles.infoView, styles.locationText, {width: '75%'}]}>{adDetails.Location}</Text>
                </View>
            </View>
        );
    }

    viewServices = () => {
        const { adDetails } = this.props;
        return(
            <View style={styles.itemView}>
                <Text style={styles.itemName}>{adDetails.Title}</Text>
                <Text style={[styles.infoView, styles.marginItem]}>{'Price: '}<Text style={styles.infoView}>{this.getCurrencyFormat(adDetails.Price)}
                    </Text> 
                </Text>
                <Text style={[styles.infoView, styles.marginItem]}>{'Type: '}<Text style={styles.infoView}>{adDetails.Type}
                    </Text> 
                </Text>
                <Text style={[styles.infoView, styles.marginItem]}>{'Seller type: '}<Text style={styles.infoView}>{adDetails.SellerType == 1? Languages['Owner'] : Languages['Agent']}
                        </Text> 
                    </Text>
                <Text style={[styles.infoView, styles.marginItem]}>{'Post Date: '}<Text style={styles.infoView}>{adDetails.Date}
                    </Text> 
                </Text>
                <View style={[styles.locationView, {marginTop: 5}]}>
                    <EvilIcon name={Icons.EvilIcons.Location} color={Color.black} size={24} />
                    <Text style={[styles.infoView, styles.locationText, {width: '75%'}]}>{adDetails.Location}</Text>
                </View>
            </View> 
        );
    }

    viewAutomobile = () => {
        const { adDetails } = this.props;
        return(
            <View style={styles.itemView}>
                <View style={styles.itemNameView}>
                    <Text style={styles.itemName}>{adDetails.Title}</Text>
                    {/* <Text style={[styles.itemName, styles.year]}>{'2020'}</Text> */}
                </View>                    
                <Text style={[styles.price, {marginLeft: 5}]}>{this.getCurrencyFormat(adDetails.Price)}</Text>
                <View style={[styles.itemNameView, {marginTop: 5}]}>
                    <Text style={[styles.infoView, {marginLeft: 5}]}>{'KM: '}<Text style={styles.infoView}>{adDetails.Kilometers}
                        </Text> 
                    </Text>
                    <Text style={[styles.infoView, styles.year]}>{'DT: '}<Text style={styles.infoView}>{adDetails.Date}
                        </Text> 
                    </Text>
                </View>
                <View style={[styles.itemNameView, {marginTop: 5}]}>
                    <Text style={[styles.infoView, {marginLeft: 5}]}>{'Fuel type: '}<Text style={styles.infoView}>{adDetails.FuelType}
                        </Text> 
                    </Text>
                    <Text style={[styles.infoView, styles.year]}>{'Seller type: '}<Text style={styles.infoView}>{adDetails.SellerType == 1? Languages['Owner'] : Languages['Agent']}
                        </Text> 
                    </Text>
                </View>
                <View style={[styles.itemNameView, {marginTop: 5}]}>
                    <Text style={[styles.infoView, {marginLeft: 5}]}>{'Brand: '}<Text style={styles.infoView}>{adDetails.BrandName}
                        </Text> 
                    </Text>
                    <Text style={[styles.infoView, styles.year]}>{'Model: '}<Text style={styles.infoView}>{adDetails.Model}
                        </Text> 
                    </Text>
                </View>
            </View>            
        );
    }

    viewAutomobile2 = () => {
        const { adDetails } = this.props;
        return(
            <View style={styles.itemView}>
                <View style={[styles.itemNameView, {marginTop: 5}]}>
                    <Text style={[styles.infoView, {marginLeft: 5}]}>{'Insurance: '}<Text style={styles.infoView}>{adDetails.Insurance}
                        </Text> 
                    </Text>
                    <Text style={[styles.infoView, styles.year]}>{'Finance: '}<Text style={styles.infoView}>{adDetails.Finance}
                        </Text> 
                    </Text>
                </View>
                <View style={[styles.itemNameView, {marginTop: 5}]}>
                    <View style={styles.locationView}>
                        <EvilIcon name={Icons.EvilIcons.Location} color={Color.black} size={24} />
                        <Text style={[styles.infoView, styles.locationText]}>{adDetails.Location}</Text>
                    </View>
                    <View style={styles.year}>
                        <Text style={[styles.infoView, {textAlign: 'right'}]}>{'Type: '}<Text style={styles.infoView}>{adDetails.VehicleType}
                            </Text> 
                        </Text>
                        {/* <Text style={[styles.infoView, {textAlign: 'right', marginTop: 5}]}>{'Seat: '}<Text style={styles.infoView}>{'4'}
                            </Text> 
                        </Text> */}
                        <Text style={[styles.infoView, {textAlign: 'right', marginTop: 5}]}>{'Owner: '}<Text style={styles.infoView}>{adDetails.Owner}
                        </Text> 
                    </Text>
                    </View>                        
                </View>                    
            </View>
        );
    }

    viewItems = () => {
        const { adDetails } = this.props;
        return(
            <View>
                <Text style={styles.itemName}>{adDetails.Title}</Text>
                <Text style={[styles.price, {marginLeft: 5}]}>{this.getCurrencyFormat(adDetails.Price)}</Text>
                <Text style={[styles.infoView, styles.marginItem]}>{'Type: '}<Text style={styles.infoView}>{adDetails.Type}
                    </Text> 
                </Text>
                {adDetails.Condition != "" && (<Text style={[styles.infoView, styles.marginItem]}>{'Condition: '}<Text style={styles.infoView}>{adDetails.Condition}
                    </Text> 
                </Text>)}               
                {adDetails.BrandName != "" && (<Text style={[styles.infoView, styles.marginItem]}>{'Brand: '}<Text style={styles.infoView}>{adDetails.BrandName}
                    </Text> 
                </Text>)}
                {adDetails.Model != "" && (<Text style={[styles.infoView, styles.marginItem]}>{'Model: '}<Text style={styles.infoView}>{adDetails.Model}
                    </Text> 
                </Text>)}
            </View>            
        );
    }

    viewElectronics = () => {
        const { adDetails } = this.props
        return(
            <View style={styles.itemView}>
                {this.viewItems()}
                {adDetails.Size != "" && (<Text style={[styles.infoView, styles.marginItem]}>{'Screen size: '}<Text style={styles.infoView}>{adDetails.Size}
                    </Text> 
                </Text>)} 
                <Text style={[styles.infoView, styles.marginItem]}>{'Seller type: '}<Text style={styles.infoView}>{adDetails.SellerType == 1? Languages['Owner'] : Languages['Agent']}
                        </Text> 
                    </Text>
                <Text style={[styles.infoView, styles.marginItem]}>{'Post Date: '}<Text style={styles.infoView}>{adDetails.Date}
                    </Text> 
                </Text>
                <View style={[styles.locationView, {marginTop: 5}]}>
                    <EvilIcon name={Icons.EvilIcons.Location} color={Color.black} size={24} />
                    <Text style={[styles.infoView, styles.locationText, {width: '75%'}]}>{adDetails.Location}</Text>
                </View>
            </View>
        );
    }

    viewGadget = () => {
        const { adDetails} = this.props;
        return(
            <View style={styles.itemView}>                
                {this.viewItems()}
                {(adDetails.SCId ==  4001 || adDetails.SCId ==  4002) && (this.viewGadget2())}
                <Text style={[styles.infoView, styles.marginItem]}>{'Seller type: '}<Text style={styles.infoView}>{adDetails.SellerType == 1? Languages['Owner'] : Languages['Agent']}
                        </Text> 
                    </Text>
                <Text style={[styles.infoView, styles.marginItem]}>{'Post Date: '}<Text style={styles.infoView}>{adDetails.Date}
                    </Text> 
                </Text>
                <View style={[styles.locationView, {marginTop: 5}]}>
                    <EvilIcon name={Icons.EvilIcons.Location} color={Color.black} size={24} />
                    <Text style={[styles.infoView, styles.locationText, {width: '75%'}]}>{adDetails.Location}</Text>
                </View>
            </View>
        );
    }
    
    viewGadget2 = () => {
        const { adDetails } = this.props;
        return(
            <View>
                {adDetails.Ram != "" && (<Text style={[styles.infoView, styles.marginItem]}>{'RAM: '}<Text style={styles.infoView}>{adDetails.Ram}
                    </Text> 
                </Text>)}
                {adDetails.Storage != "" && (<Text style={[styles.infoView, styles.marginItem]}>{'Storage: '}<Text style={styles.infoView}>{adDetails.Storage}
                    </Text> 
                </Text>)}
               {adDetails.Size != "" && (<Text style={[styles.infoView, styles.marginItem]}>{'Screen size: '}<Text style={styles.infoView}>{adDetails.Size}
                    </Text> 
                </Text>)}         
            </View>
        );
    }

    viewFashion = () => {
        const { adDetails} = this.props;
        return(
            <View style={styles.itemView}>                
                {this.viewItems()}
                {adDetails.Size != "" && (<Text style={[styles.infoView, styles.marginItem]}>{'Size: '}<Text style={styles.infoView}>{adDetails.Size}
                    </Text> 
                </Text>)}
                {adDetails.Color != "" && (<Text style={[styles.infoView, styles.marginItem]}>{'Color: '}<Text style={styles.infoView}>{adDetails.Color}
                    </Text> 
                </Text>)}
                <Text style={[styles.infoView, styles.marginItem]}>{'Seller type: '}<Text style={styles.infoView}>{adDetails.SellerType == 1? Languages['Owner'] : Languages['Agent']}
                        </Text> 
                    </Text>
                <Text style={[styles.infoView, styles.marginItem]}>{'Post Date: '}<Text style={styles.infoView}>{adDetails.Date}
                    </Text> 
                </Text>
                <View style={[styles.locationView, {marginTop: 5}]}>
                    <EvilIcon name={Icons.EvilIcons.Location} color={Color.black} size={24} />
                    <Text style={[styles.infoView, styles.locationText, {width: '75%'}]}>{adDetails.Location}</Text>
                </View>
            </View>            
        );
    }

    viewPets = () => {
        const { adDetails } = this.props;
        return(
            <View style={styles.itemView}>                
                <Text style={styles.itemName}>{adDetails.Title}</Text>
                <Text style={[styles.price, {marginLeft: 5}]}>{this.getCurrencyFormat(adDetails.Price)}</Text>
                {/* <Text style={[styles.infoView, styles.marginItem]}>{'Pet Type: '}<Text style={styles.infoView}>{'New'}
                    </Text> 
                </Text>
                <Text style={[styles.infoView, styles.marginItem]}>{'Age: '}<Text style={styles.infoView}>{'1 Year'}
                    </Text> 
                </Text> */}
                <Text style={[styles.infoView, styles.marginItem]}>{'Seller type: '}<Text style={styles.infoView}>{adDetails.SellerType == 1? Languages['Owner'] : Languages['Agent']}
                        </Text> 
                    </Text>
                <Text style={[styles.infoView, styles.marginItem]}>{'Post Date: '}<Text style={styles.infoView}>{adDetails.Date}
                    </Text> 
                </Text>
                <View style={[styles.locationView, {marginTop: 5}]}>
                    <EvilIcon name={Icons.EvilIcons.Location} color={Color.black} size={24} />
                    <Text style={[styles.infoView, styles.locationText, {width: '75%'}]}>{adDetails.Location}</Text>
                </View>
            </View>            
        );
    }

    viewFurniture = () => {        
        const { adDetails } = this.props;
        return(
            <View style={styles.itemView}>                
                <Text style={styles.itemName}>{adDetails.Title}</Text>
                <Text style={[styles.price, {marginLeft: 5}]}>{this.getCurrencyFormat(adDetails.Price)}</Text>
                <Text style={[styles.infoView, styles.marginItem]}>{'Type: '}<Text style={styles.infoView}>{adDetails.Type}
                    </Text> 
                </Text>
                <Text style={[styles.infoView, styles.marginItem]}>{'Condition: '}<Text style={styles.infoView}>{adDetails.Condition}
                    </Text> 
                </Text>
                {/* <Text style={[styles.infoView, styles.marginItem]}>{'Age: '}<Text style={styles.infoView}>{'1 Year'}
                    </Text> 
                </Text> */}
                <Text style={[styles.infoView, styles.marginItem]}>{'Seller type: '}<Text style={styles.infoView}>{adDetails.SellerType == 1? Languages['Owner'] : Languages['Agent']}
                        </Text> 
                    </Text>
                <Text style={[styles.infoView, styles.marginItem]}>{'Post Date: '}<Text style={styles.infoView}>{adDetails.Date}
                    </Text> 
                </Text>
                <View style={[styles.locationView, {marginTop: 5}]}>
                    <EvilIcon name={Icons.EvilIcons.Location} color={Color.black} size={24} />
                    <Text style={[styles.infoView, styles.locationText, {width: '75%'}]}>{adDetails.Location}</Text>
                </View>
            </View>            
        );        
    }

    viewProperties = () => {
        const { adDetails } = this.props;
        return(
            <View style={styles.itemView}>                
                <Text style={styles.itemName}>{adDetails.Title}</Text>
                <Text style={[styles.price, {marginLeft: 5}]}>{this.getCurrencyFormat(adDetails.Price)}</Text>
                {adDetails.Type != "" && (<Text style={[styles.infoView, styles.marginItem]}>{'Type: '}<Text style={styles.infoView}>{adDetails.Type}
                    </Text> 
                </Text>)}
                <Text style={[styles.infoView, styles.marginItem]}>{'Total Plot size: '}<Text style={styles.infoView}>{adDetails.PlotSize + ' ' + adDetails.PlotSizeUnit}
                    </Text> 
                </Text>
                <Text style={[styles.infoView, styles.marginItem]}>{'Property Type: '}<Text style={styles.infoView}>{adDetails.PropertyType}
                    </Text> 
                </Text>
                <Text style={[styles.infoView, styles.marginItem]}>{'Facing: '}<Text style={styles.infoView}>{adDetails.Facing}
                    </Text> 
                </Text>
                {adDetails.Bathroom != "" && (<Text style={[styles.infoView, styles.marginItem]}>{'Bathroom: '}<Text style={styles.infoView}>{adDetails.Bathroom}
                    </Text> 
                </Text>)}
                {adDetails.Bedroom != "" && (<Text style={[styles.infoView, styles.marginItem]}>{'Bed room: '}<Text style={styles.infoView}>{adDetails.Bedroom}
                    </Text> 
                </Text>)}
                {adDetails.Finance != "" && (<Text style={[styles.infoView, styles.marginItem]}>{'Finance: '}<Text style={styles.infoView}>{adDetails.Finance}
                    </Text> 
                </Text>)}
                {adDetails.CarParking != "" && (<Text style={[styles.infoView, styles.marginItem]}>{'Car parking: '}<Text style={styles.infoView}>{adDetails.CarParking}
                    </Text> 
                </Text>)}
                <Text style={[styles.infoView, styles.marginItem]}>{'Seller type: '}<Text style={styles.infoView}>{adDetails.SellerType == 1? Languages['Owner'] : Languages['Agent']}
                        </Text> 
                    </Text>
                <Text style={[styles.infoView, styles.marginItem]}>{'Post Date: '}<Text style={styles.infoView}>{adDetails.Date}
                    </Text> 
                </Text>
                <View style={[styles.locationView, {marginTop: 5}]}>
                    <EvilIcon name={Icons.EvilIcons.Location} color={Color.black} size={24} />
                    <Text style={[styles.infoView, styles.locationText, {width: '75%'}]}>{adDetails.Location}</Text>
                </View>
            </View>            
        );        
    }

    viewContribution = () => {
        const { adDetails } = this.props;
        return(
            <View style={styles.itemView}>
                <Text style={styles.itemName}>{adDetails.Title}</Text>
                <Text style={[styles.infoView, styles.marginItem]}>{'Post Date: '}<Text style={styles.infoView}>{adDetails.Date}
                    </Text> 
                </Text>
                <View style={[styles.locationView, {marginTop: 5}]}>
                    <EvilIcon name={Icons.EvilIcons.Location} color={Color.black} size={24} />
                    <Text style={[styles.infoView, styles.locationText, {width: '75%'}]}>{adDetails.Location}</Text>
                </View>
            </View>
        );
    }
    
    viewJobs = () => {
        const { adDetails } = this.props;
        return(
            <View style={styles.itemView}>                
                <Text style={styles.itemName}>{adDetails.Title}</Text>
                <Text style={[styles.infoView, styles.marginItem]}>{'Job Type: '}<Text style={styles.infoView}>{adDetails.JobType}
                    </Text> 
                </Text>
                {/* <Text style={[styles.infoView, styles.marginItem]}>{'Working Hours: '}<Text style={styles.infoView}>{'8H'}
                    </Text> 
                </Text> */}
                <Text style={[styles.infoView, styles.marginItem]}>{'Qualification: '}<Text style={styles.infoView}>{adDetails.Qualification}
                    </Text> 
                </Text>
                <Text style={[styles.infoView, styles.marginItem]}>{'Salary: '}<Text style={styles.infoView}>{adDetails.Salary}
                    </Text> 
                </Text>
                <Text style={[styles.infoView, styles.marginItem]}>{'allowance: '}<Text style={styles.infoView}>{adDetails.Allowance}
                    </Text> 
                </Text>
                <Text style={[styles.infoView, styles.marginItem]}>{'License: '}<Text style={styles.infoView}>{adDetails.License}
                    </Text> 
                </Text>
                <Text style={[styles.infoView, styles.marginItem]}>{'Role: '}<Text style={styles.infoView}>{adDetails.Role}
                    </Text> 
                </Text>
                <Text style={[styles.infoView, styles.marginItem]}>{'Experiance: '}<Text style={styles.infoView}>{adDetails.Experience}
                    </Text> 
                </Text>
                <Text style={[styles.infoView, styles.marginItem]}>{'Company Name: '}<Text style={styles.infoView}>{adDetails.Company}
                    </Text> 
                </Text>
                <Text style={[styles.infoView, styles.marginItem]}>{'No.of vacancies: '}<Text style={styles.infoView}>{adDetails.Vacancy}
                    </Text> 
                </Text>
                <Text style={[styles.infoView, styles.marginItem]}>{'Posted by: '}<Text style={styles.infoView}>{adDetails.SellerType == 1? Languages['Owner'] : Languages['Agent']}
                        </Text> 
                    </Text>
                <Text style={[styles.infoView, styles.marginItem]}>{'Post Date: '}<Text style={styles.infoView}>{adDetails.Date}
                    </Text> 
                </Text>
                <View style={[styles.locationView, {marginTop: 5}]}>
                    <EvilIcon name={Icons.EvilIcons.Location} color={Color.black} size={24} />
                    <Text style={[styles.infoView, styles.locationText, {width: '75%'}]}>{adDetails.Location}</Text>
                </View>
            </View>
        );
    }

    openUrl = async (url) => {
        const supported = await Linking.canOpenURL(url);

        if (supported) {
          // Opening the link with some app, if the URL scheme is "http" the web link should be opened
          // by some browser in the mobile
          await Linking.openURL(url);
        } else {
            Toast.show(`Don't know how to open this URL: ${url}`, Toast.LONG);
        }
    }

    onChange = ({nativeEvent}) => {
        const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
        if(slide != this.state.active){
            this.setState({active: slide})
        }
    }

    openImageView = () => {        
        this.imageModal.open();
    }

    closeImageView = () => {
        this.imageModal.close();
    }

    showImageView = () => {
        const {images} = this.state;
        return(
            <Modal
            ref={(modal) => (this.imageModal = modal)}
            backButtonClose={true}
            swipeToClose={false}
            onClosed={this.closeImageView}>
                <ImageViewer 
                show={true}
                imageUrls={images}
                enableImageZoom={true}
                style={{height: Dimensions.get('window').height, width: Dimensions.get('window').width}}/>                
            </Modal>
        );
    }

    render() {
        const { id, navigation, adDetails, user, token, imageUrl, gotoReport } = this.props;
        const { ItemList, count, active, profileData } = this.state;
        return(
            <View style={styles.container}>
                {this.showImageView()}
                {this.showChatInfo()}
                <ScrollView style={styles.scrollView}>                              
                    <View style={styles.imageView}>
                        <View style={styles.image}>
                            <ImageSlider
                            images={this.state.adImages}
                            style={styles.imageList}
                            onPress={(value)=>{
                                this.openImageView();
                            }}
                            onPositionChanged={(position)=>{
                                this.setState({active: position + 1});
                            }}/>
                            {/* <SliderBox
                            images={this.state.adImages}
                            sliderBoxHeight={'100%'}
                            currentImageEmitter={index => this.setState({count: index + 1})}
                            dotColor={Color.primary}
                            inactiveDotColor={Color.cancelButton}/> */}
                        </View>
                        {/* <ImageBackground source={Images.Contribution} style={styles.image} /> */}
                        {/* <View style={styles.imageCountView}>
                            <Text style={styles.countText}>{'10/10'}</Text>
                        </View> */}
                        <View style={styles.likeView}>
                            <View style={styles.likeItemView}>
                                {/* <View style={styles.likeItem}>
                                    <AntIcon name={Icons.AntDesign.Warning} color={Color.white} size={20} />
                                   
                                </View> */}
                                {user != null && (
                                <View>
                                    <View style={[styles.likeItem, {marginTop: 30}]}>
                                    <FavouriteIcon 
                                        details={adDetails}
                                        userId={user.Id}
                                        token={token}/>
                                    </View>                            
                                    <View style={[styles.likeItem, {marginTop: 30}]}>
                                        <Like 
                                        details={adDetails}
                                        userId={user.Id}
                                        token={token}/>
                                    </View>
                                </View>)}
                                <View style={[styles.likeItem, {marginTop: 20}]}>
                                    <Text style={styles.likeText}>{count == 0 ? "" : active + '/' + count}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    {id == 1 && ( this.viewBusiness())}
                    {id == 2 && ( this.viewAgriculture())}
                    {id == 3 && ( this.viewServices())}
                    {id == 4 && ( this.viewGadget())}
                    {id == 5 && ( this.viewElectronics())}
                    {id == 6 && ( this.viewAutomobile())}
                    {id == 7 && ( this.viewFashion())}
                    {id == 8 && ( this.viewPets())}
                    {id == 9 && ( this.viewFurniture())}
                    {id == 10 && ( this.viewProperties())}
                    {id == 11 && ( this.viewJobs())}
                    {id == 12 && ( this.viewContribution())}
                    <View style={styles.googleAd}>
                        {imageUrl != "" && (<Image style={styles.ourImage} source={{uri: imageUrl}} />)}
                    </View>
                    {id == 6 && (this.viewAutomobile2())}
                    <View style={styles.divider}/>
                    <Text style={[styles.itemName, styles.descriptionText]}>{Languages.Description}</Text>
                    <Text style={styles.descriptionContent}>{adDetails.Description}</Text>                    
                    <View style={styles.divider}/>
                    {adDetails.Video != "" && (<View>
                        <Text style={[styles.itemName, styles.descriptionText, {fontSize: 22, textAlign: 'center'}]}>{Languages.LinkText}</Text>
                        <TouchableOpacity
                        onPress={() => {this.openUrl(Constants.Link + adDetails.Video)}}>
                            <Text style={[styles.descriptionContent, {color: Color.primary, fontSize: 18, textAlign: 'center'}]}>{Constants.Link}</Text>
                        </TouchableOpacity>                    
                        <View style={styles.divider}/>
                    </View>)}
                    {(this.props.user != null && profileData != null && adDetails.CustId != null && user.Id != adDetails.CustId) && (
                        <View>
                            <Text style={[styles.itemName, styles.descriptionText]}>{Languages.PostedBy}</Text>
                            <TouchableOpacity style={styles.profileView}
                            onPress={() => {                                
                                this.props.goProfile(adDetails.CustId);
                            }}>
                                <Image style={styles.profileImage} source={adDetails.ProfilePic == "" ? Images.LoginTopImage : {uri: adDetails.ProfilePic}} resizeMode='contain' />
                                <View style={styles.profileInfoView}>
                                    <Text style={styles.profileName}>{adDetails.FirstName + " " + adDetails.LastName}</Text>
                                    <Text style={styles.profileDate}>{adDetails.CreatedOn}</Text>
                                    <View style={styles.rating}>
                                        <Text style={styles.ratingText}>{adDetails.Rating}</Text>
                                        <Rating rating={adDetails.Rating} size={14} count={6} style={styles.rating} />
                                        <Text style={[styles.ratingText, {marginLeft: 4}]}>{'(' + adDetails.TotalReviews + ')'}</Text>
                                    </View>
                                    <View style={styles.profileIconView}>
                                        <Text style={styles.viewProfile}>{Languages.ViewProfile}</Text>
                                        <View style={styles.communicationView}>
                                            {user.Id != adDetails.CustId && (<TouchableOpacity
                                                style={styles.communicationIcon}
                                                onPress={()=>{                                                    
                                                    this.getChatUser();
                                                }}>
                                                    <View style={styles.communicationIconView}>
                                                        <Icon name={Icons.MaterialCommunityIcons.Chat} size={26} color={Color.primary}/>
                                                        <Text style={[styles.viewProfile, {color: Color.primary, marginLeft: 3, fontSize: 16}]}>{Languages.Chat}</Text>
                                                    </View>
                                                    
                                            </TouchableOpacity>)}
                                            {profileData.MobilePrivate != 0 && (
                                                <TouchableOpacity
                                                    style={styles.communicationIcon}
                                                    onPress={()=>{
                                                        Communications.phonecall(profileData.Mobile, true)
                                                    }}>
                                                        <View style={styles.communicationIconView}>
                                                            <Icon name={Icons.MaterialCommunityIcons.Phone} size={26} color={Color.primary}/>
                                                            <Text style={[styles.viewProfile, {color: Color.primary, marginLeft: 3, fontSize: 16}]}>{Languages.Call}</Text>
                                                        </View>
                                                </TouchableOpacity>
                                            )}                                            
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.profileRightIcon}>
                                    <EntypoIcon name={Icons.Entypo.Right} color={Color.cancelButton} size={24}/>
                                </View>
                            </TouchableOpacity>
                            <View style={styles.divider}/>
                        </View>
                    )}
                    
                    {user != null && (
                        <View>                        
                            <View style={styles.report}>
                                <Text style={[styles.itemName, {marginLeft: 10}]}>{Languages.AdId}
                                    <Text style={styles.itemName}>{adDetails.Id}</Text>
                                </Text>
                                <TouchableOpacity style={styles.reportView}
                                onPress={()=>{
                                    gotoReport(adDetails.Id);
                                }}>
                                    <Text style={styles.reportText}>{Languages.ReportAd}</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.divider}/>
                        </View>
                    )}
                   {ItemList.length > 0 && (<View>
                        <Text style={[styles.itemName, styles.descriptionText]}>{Languages.RelatedAds}</Text>
                        <FlatList
                        overScrollMode='never'
                        //contentContainerStyle={styles.flatlist}
                        keyExtractor={(item, index) => index.toString()}
                        showsHorizontalScrollIndicator={false}
                        data={ItemList}
                        horizontal={true}                                              
                        renderItem={this.renderItem}/>
                    </View>)}
                    {/* <View style={styles.googleAd1}>                    
                    </View> */}
                    <View style={styles.emptyView} />
                </ScrollView> 
                <View style={[styles.header, Platform.OS == 'ios' && {marginTop: 30}]}>
                    <TouchableOpacity 
                        onPress={() => {
                            this.props.navigation.goBack(null);
                        }}
                        style={styles.backArrow}>
                            <Icon name={Icons.MaterialCommunityIcons.Back} size={25} color={Color.white}/>
                    </TouchableOpacity>
                    {(user.Id != adDetails.CustId && profileData != null) && (<View style={styles.headerRight}>
                    <TouchableOpacity 
                        onPress={()=>{
                            this.getChatUser();
                        }}>
                            <Icon name={Icons.MaterialCommunityIcons.Chat} size={25} color={Color.white}/>
                    </TouchableOpacity>
                    {(profileData.MobilePrivate != 0) && (<TouchableOpacity 
                        onPress={()=>{
                            Communications.phonecall(profileData.Mobile, true);
                        }}
                        style={styles.rightIcon}>
                            <Icon name={Icons.MaterialCommunityIcons.Phone} size={25} color={Color.white}/>
                    </TouchableOpacity>)}
                    </View>)}
                    {/* <TouchableOpacity 
                        onPress={this.share}
                        style={styles.headerRight}>
                            <Icon name={Icons.MaterialCommunityIcons.Share} size={25} color={Color.white}/>
                    </TouchableOpacity> */}
                </View>                
            </View>
        );
    }
}
const mapStateToProps = (state) => ({
    token: state.user.token,
    user: state.user.user
  });
  const mapDispatchToProps = (dispatch) => {
    const { action } = require("@redux/UserRedux");
  
    return {
      logout: () => dispatch(action.logout())
    };
  };
  export default
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(Details);
//export default Details;