import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import AwesomeIcon from 'react-native-vector-icons/FontAwesome'
import AntDesignIcon from 'react-native-vector-icons/AntDesign'
import styles from './styles';
import { Color, Constants, Languages } from '@common';

class Category extends PureComponent {
    constructor(props) {
        super(props);
        this.state= {
            categories: []
        }
    }
    componentDidMount(){
        const { categories, limit, start } = this.props;
        let category = [];
        for(let i = start; i < (start + limit); i++){
            category.push(categories[i])
        }
        this.setState({categories: category});
    }
    
    itemPress = (item) => {
        this.props.onPress(item);
    }

    setText = (id, from) => {
        switch(id){
            case 1: 
                return(<Text style={[styles.categoryText1, from == Constants.PostAd && styles.categoryTextWidth]}>{Languages.Business}</Text>);
            case 2: 
                return(<Text style={[styles.categoryText1, from == Constants.PostAd && styles.categoryTextWidth]}>{Languages.Agriculture}</Text>);
            case 3: 
                return(<Text style={[styles.categoryText1, from == Constants.PostAd && styles.categoryTextWidth]}>{Languages.Services}</Text>);
            case 4: 
                return(<Text style={[styles.categoryText1, from == Constants.PostAd && styles.categoryTextWidth]}>{Languages.Gadgets}</Text>);
            case 5: 
                return(<Text style={[styles.categoryText1, from == Constants.PostAd && styles.categoryTextWidth]}>{Languages.Electronics}</Text>);
            case 6: 
                return(<Text style={[styles.categoryText1, from == Constants.PostAd && styles.categoryTextWidth]}>{Languages.Automobiles}</Text>);
            case 7: 
                return(<Text style={[styles.categoryText1, from == Constants.PostAd && styles.categoryTextWidth]}>{Languages.Fashion}</Text>);
            case 8: 
                return(<Text style={[styles.categoryText1, from == Constants.PostAd && styles.categoryTextWidth]}>{Languages.Pets}</Text>);
            case 9: 
                return(<Text style={[styles.categoryText1, from == Constants.PostAd && styles.categoryTextWidth]}>{Languages.Furniture}</Text>);
            case 10: 
                return(<Text style={[styles.categoryText1, from == Constants.PostAd && styles.categoryTextWidth]}>{Languages.Properties}</Text>);
            case 11: 
                return(<Text style={[styles.categoryText1, from == Constants.PostAd && styles.categoryTextWidth]}>{Languages.Job}</Text>);
            case 12: 
                return(<Text style={[styles.categoryText1, from == Constants.PostAd && styles.categoryTextWidth]}>{Languages.FreeGiveaway}</Text>);
        }
    }

    render(){
        const { categories } = this.state;
        const { limit, start, from } = this.props;
        return(
            <View style={styles.category}>
                {categories && categories.map((item)=>{
                    return(
                    <View style={from != Constants.PostAd && styles.categoryItem1}>
                        <TouchableOpacity style={[styles.categoryItem, from == Constants.PostAd && styles.categoryItemAd ]}
                        onPress={() => {
                            this.itemPress(item);
                        }}>
                            <Image source={item.icon} style={[styles.categoryImage, from == Constants.PostAd && styles.categoryIconAd]}/>
                            <View style={styles.categoryTextView}>
                                {/* {this.setText(item.id, from)} */}
                                <Text style={[styles.categoryText1, from == Constants.PostAd && styles.categoryTextWidth]}>{Languages[item.name]}</Text>
                            </View>                   
                        </TouchableOpacity>
                    </View>
                )})}                
            </View>
        );
    }
}
export default Category;