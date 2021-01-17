import React, { PureComponent } from 'react'
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import { Constants, Styles } from '@common'
import styles from './styles';
import { Rating } from '@components';

class ReviewTab extends PureComponent {
    constructor(props){
        super(props);
       
    }

    renderItem = ({item}) => {   

        return(
                <TouchableOpacity style={styles.item}
                onPress={() => {
                    this.props.onPress(item);
                }}>
                    <Image source={item.image} style={styles.image} />
                    <View style={styles.itemDetails}>
                        <Text style={styles.itemName}>{item.name}</Text>
                        <Rating rating={item.rating} size={14} count={6} style={styles.rating} />
                        {/* <Text 
                        style={[styles.itemName, {width: Styles.width - 90}]}
                        numberOfLines={3}>{item.comment}</Text> */}
                    </View>                
                </TouchableOpacity>
        );
    }
    render(){
        return(
            <View style={{flex: 1}}>
                <FlatList
                    overScrollMode='never'
                    contentContainerStyle={styles.flatlist}
                    keyExtractor={(item, index) => index.toString()}
                    data={this.props.reviewList}
                    horizontal={false}                 
                    renderItem={this.renderItem}/>
            </View>
        );
    }
}
export default ReviewTab