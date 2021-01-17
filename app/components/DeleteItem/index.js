import React, { PureComponent } from 'react';
import { View, TouchableOpacity, Text, FlatList, Image, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Icons, Color } from '@common';
import { AdDetails, UserDetails } from '@services';
import Toast from 'react-native-simple-toast';

class DeleteItem extends PureComponent {
    constructor(props){
        super(props);
        this.state = {
            deleting: false
        }
    }

    deleteAd = async () => { 
        const { id, onDelete, token, isMyAds, isfavourite, user, isNotification } = this.props;        
        this.setState({deleting: true});
        var data = new FormData();
        let response = undefined;
        if(isMyAds) {
            data.append('id', id);
            data.append('deleted', 1);
            response = await AdDetails.deleteAd(token, data);
        }else if(isfavourite){
            data.append('ads_id', id);
            data.append('cust_id', user.Id);
            response = await AdDetails.unFavourites(token, data);
        }else if(isNotification){
            data.append('id', id);
            data.append('cust_id', user.Id);
            response = await UserDetails.deleteNotification(token, data);
        }
        if(response !== undefined){
            if(response.flag == true){
                if(isMyAds){
                    Toast.show(response.response, Toast.LONG);
                }
                //Toast.show(response.response, Toast.LONG);
                onDelete();
            }else{
                Toast.show(response.message, Toast.LONG);
            }
        }else{
            Toast.show(Languages.ServerError, Toast.LONG);
        }
        this.setState({deleting: false});
    }

    render(){
        const {deleting} = this.state;
        return(
            <TouchableOpacity 
            onPress={this.deleteAd}>
                {deleting == false ? (
                        <Icon name={Icons.MaterialCommunityIcons.Delete} color={Color.cancelButton} size={30} />
                    ) : (
                        <ActivityIndicator size={'small'} color={Color.primary}/>
                    )}
            </TouchableOpacity>
        )
    }
}
export default DeleteItem;