import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import AntIcon from 'react-native-vector-icons/AntDesign';
import { Color, Icons, Languages } from '@common';
import styles from './styles';
import { AdDetails } from '@services';
import Toast from 'react-native-simple-toast';

class Like extends React.PureComponent {
    constructor(props){
        super(props);
        this.state = {
            like: false,
            totalLikes: props.details.TotalLiked
        }

    }

    componentDidMount(){
        const { details, userId } = this.props;
        let data = details.Liked.filter(item => item.CustId == userId);
        this.setState({like: data.length > 0 ? true : false});
    }

    onLikePressHandle = async () => {
        const { like } = this.state;
        const { details, token, userId } = this.props;
        var data = new FormData();
        data.append('ads_id', details.Id);
        data.append('cust_id', userId);
        let response = null;
        if(like){
            response = await AdDetails.unLike(token, data);
        }else{
            response = await AdDetails.like(token, data);
        }
        if(response !== undefined){
            if(response.flag == true){
                if(like){
                    this.setState({like: false, totalLikes: response.response.TotalLiked});
                }else{
                    this.setState({like: true, totalLikes: response.response.TotalLiked});
                }
            }else{
                Toast.show(response.message, Toast.LONG);
            }
        }else{
            Toast.show(Languages.ServerError, Toast.LONG);
        }
    }
    render(){
        const { like, totalLikes } = this.state;
        return(
            <TouchableOpacity
            onPress={this.onLikePressHandle}>
                <AntIcon name={Icons.AntDesign.Like} color={like ? Color.primary : Color.white} size={20} />
                <Text style={styles.likeText}>{totalLikes}</Text>                
            </TouchableOpacity>
        )
    }
}
export default Like;