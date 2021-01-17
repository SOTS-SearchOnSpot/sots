import React, {PureComponent} from 'react';
import { View, FlatList, TouchableOpacity, Text, Image, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import StarRating from 'react-native-star-rating';
import Toast from 'react-native-simple-toast';
import { Icons, Color, Constants, Languages } from '@common';
import styles from './styles';
import { UserDetails } from '@services';
import { connect } from 'react-redux';

class AddReview extends PureComponent {
    constructor(props){
        super(props);
        this.state = {
            starCount: 0,
            comment: ''
        };
    }
    onStarRatingPress = (rating) => {
        this.setState({
          starCount: rating
        });
    }

    onSubmitPressHandle = async () => {
        const { id, token, user, onClosed } = this.props;
        const { comment, starCount } = this.state;
        var data = new FormData();
        data.append('customer_id', id);
        data.append('rating', starCount);
        data.append('comment', comment);
        data.append('posting_customer_id', user.Id);
        const response = await UserDetails.sendRating(token, data);
        if(response !== undefined){
            if(response.flag == true){
                Toast.show(Languages.ReviewMessage, Toast.LONG);
                onClosed();
            }else{
                Toast.show(response.message, Toast.LONG);
            }          
        }else{
            Toast.show(Languages.ServerError, Toast.LONG);
        }
    }

    render(){        
        return(
            <View style={styles.container}>
                <Text style={styles.reviewHeader}>{Languages.Review}</Text>
                <View style={styles.review}>
                    <StarRating
                        disabled={false}
                        maxStars={5}
                        starSize={26}
                        emptyStar="star-o"
                        fullStar="star"
                        starColor="#f57913"
                        fullStarColor="#f57913"
                        halfStarColor="#f57913"
                        emptyStarColor="#ccc"
                        rating={this.state.starCount}
                        selectedStar={this.onStarRatingPress}
                    />
                </View>
                <Text style={styles.commentText}>{Languages.Comment}</Text>
                <TextInput 
                    multiline                
                    placeholder={Languages.PlaceComment}
                    placeholderTextColor={Color.placeholder}
                    style={styles.comment}
                    onChangeText={(text) => {
                        this.setState({comment: text});
                    }}
                    returnKeyType= 'go'
                    value={this.state.comment}
                />
                <TouchableOpacity
                    style={styles.submitButton}
                    onPress={this.onSubmitPressHandle}>
                    <Text style={styles.buttonText}>{Languages.Submit}</Text>
                </TouchableOpacity>

            </View>
        )
    }
}
const mapStateToProps = (state) => ({
    user: state.user.user,
    token: state.user.token,
});
const mapDispatchToProps = (dispatch) => {
    const { action } = require('@redux/UserRedux');
    return {
        login: (user) => dispatch(action.login(user)),
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddReview);
//export default AddReview;