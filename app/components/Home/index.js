import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, TextInput, FlatList, Platform } from 'react-native';
import { Container, Header, Content } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5'
import CommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AwesomeIcon from 'react-native-vector-icons/FontAwesome'
import AntDesignIcon from 'react-native-vector-icons/AntDesign'
import Modal from 'react-native-modalbox';
import Toast from 'react-native-simple-toast';
import { connect } from 'react-redux'
import styles from './styles';
import { Languages, Icons, Color, Constants, Validate } from '@common';
import { Categories, NotificationIcon } from '@components';
import { AdDetails } from '@services';


class Home extends PureComponent {
    constructor(props){
        super(props);
        this.state = {
            search: '',
            gotoLocation: false,
            locationList: []
        }
        this.onSearchEditHandle = (search) => {
            this.setState({ search });
            this.searchLocation();
        };
    }
    componentDidMount(){
        console.log('uuid => ', this.props.uuid);
        this.getAllLocations();
    }

    getAllLocations = async () => {
        const { setLocationList, token } = this.props;
        try{
            const response = await AdDetails.getLocations(token);
            if(response !== undefined){
                if(response.flag == true){
                    setLocationList(response.response);
                }
            }
        }catch(e){
            console.log('Fetch all location error ', e);
        }        
    }

    validateForm = () => {
        const { search } = this.state;
        if(Validate.isEmpty(search)){
            return Languages.LocationError;
        }
        return undefined;
    }

    searchLocation = async () => {
        const { search } = this.state;
        const { language, token } = this.props;
        if(search.length >= 1){
        // const error = this.validateForm();
        // if(error) return Toast.show(error, Toast.LONG);        
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

    renderItem = ({item}) => {
        return(
            <TouchableOpacity style={styles.locationView}
            onPress={async()=>{
                await this.props.setLocation(item.LocationEN);
                //this.setState({location: item.LocationEN})
                this.closeLocation();
            }}>
                <Text style={styles.locationItem}>{item.LocationEN}</Text>
            </TouchableOpacity>
        )
    }

    openLocation = () => {   
        this.setState({gotoLocation: true, locationList: this.props.locationList});     
        this.locationModal.open();
    }

    closeLocation = () => {
        this.setState({gotoLocation: false}); 
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
                <View style={[styles.searchView, Platform.OS == 'ios' && {marginTop: 40}]}>
                    <View style={styles.searchbox}>
                        <TouchableOpacity 
                        onPress={this.closeLocation}>
                            <CommunityIcons name={Icons.MaterialCommunityIcons.Back} size={30} color={Color.cancelButton}/>
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

    render() {
        const { gotoLocation } = this.state;
        const { location } = this.props;
        return(
            <Container style={styles.container}>                
                {this.showLocation()}
                <View style={[styles.homeHeader, Platform.OS == 'ios' && {marginTop: 40}]}>
                    <Text style={styles.headerText}>{Languages.HomeHeader}</Text>
                </View>
                <View style={styles.location}>
                    <AwesomeIcon name={Icons.FontAwesome.Location} color={ Color.black } size={18} />
                    <TouchableOpacity
                    onPress={this.openLocation}>
                    <Text style={styles.locationText}>{location}</Text>
                    </TouchableOpacity>
                    {/* <AntDesignIcon name={Icons.AntDesign.Down} color={ Color.black } size={16} /> */}
                    <TouchableOpacity style={styles.notification}
                    onPress={()=> {
                        this.props.gotoNotification();
                    }}>
                        <NotificationIcon />
                        {/* <CommunityIcons name={Icons.MaterialCommunityIcons.Notification} color={ Color.black } size={16}/> */}
                    </TouchableOpacity>
                </View>
                {gotoLocation == false && (
                    <TouchableOpacity style={styles.search}
                    onPress={()=>{                        
                        this.props.goSearch(location);
                    }}>
                        <Text style={styles.searchText}>{Languages.Search}</Text>
                        <View style={styles.searchSymbol}>
                            <Icon name={Icons.FontAwesome.Search} color={ Color.cancelButton } size={18} />
                        </View>
                    </TouchableOpacity>
                )}
                <Content style={styles.container1}>   
                    <View style={styles.categories}>
                        <Categories 
                        navigation={this.props.navigation}
                        from={Constants.Home}/>
                    </View>
                </Content>
            </Container>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user.user,
    token: state.user.token,
    language: state.user.language,
    location: state.user.selectedLocation,
    locationList: state.user.locations,
    uuid: state.user.uid
});
const mapDispatchToProps = (dispatch) => {
    const { action } = require('@redux/UserRedux');
    return {
        login: (user) => dispatch(action.login(user)),
        setLocation: (location) => dispatch(action.setLocation(location)),
        setLocationList: (list) => dispatch(action.setLocationList(list)),
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);
//export default Home;