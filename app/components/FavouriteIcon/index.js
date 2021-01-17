import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Color, Icons, Languages } from '@common';
import styles from './styles';
import { AdDetails } from '@services';
import Toast from 'react-native-simple-toast';

class FavouriteIcon extends React.PureComponent {
    constructor(props){
        super(props);
        this.state = {
            favourite: false
        }
    }

    componentDidMount(){
        const { details, userId } = this.props;
        try{
            let data = details.Favorites.filter(item => item.CustId == userId);
            this.setState({favourite: data.length > 0 ? true : false});
        }catch(e){
            console.log('error => ', e);
        }
    }

    onFavouritePressHandle = async () => {
        const { favourite } = this.state;
        const { details, token, userId } = this.props;
        var data = new FormData();
        data.append('ads_id', details.Id);
        data.append('cust_id', userId);
        let response = null;        
        if(favourite){
            response = await AdDetails.unFavourites(token, data);
        }else{
            response = await AdDetails.favourites(token, data);
        }
        if(response !== undefined){
            if(response.flag == true){
                if(favourite){
                    this.setState({favourite: false});
                }else{
                    this.setState({favourite: true});
                }
            }else{
                Toast.show(response.message, Toast.LONG);
            }
        }else{
            Toast.show(Languages.ServerError, Toast.LONG);
        }
    }
    render(){
        const { favourite } = this.state;
        return(
            <TouchableOpacity
            onPress={this.onFavouritePressHandle}>
                <Icon name={Icons.MaterialCommunityIcons.Favorite} color={favourite? Color.primary : Color.white} size={20} />
                {/* <Text style={styles.favouriteText}>50K</Text>                 */}
            </TouchableOpacity>
        )
    }
}
export default FavouriteIcon;