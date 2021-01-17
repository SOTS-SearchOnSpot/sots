import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Color, Icons } from '@common';
class Rating extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        const { style, rating, size, count } = this.props;
        const formatRating = Number(rating);
        const stars = [];
        for(let i = 1; i < count; i++){
            stars[i - 1] = (
                <Icon
                key={i}
                size={size}
                color={formatRating >= i? Color.accent : Color.blackDivide}
                name={Icons.MaterialCommunityIcons.Star}/>
            );
        }
        return(
              <View style={style}>{stars}</View>
        );
    }    
}
export default Rating;