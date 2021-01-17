import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'
import AwesomeIcon from 'react-native-vector-icons/FontAwesome'
import AntDesignIcon from 'react-native-vector-icons/AntDesign'
import styles from './styles';
import Category from './Category' 
import { Languages, Icons, Color, Constants } from '@common';

class Categories extends PureComponent {

    categoryItemPress = (item) => {
        const { from, gotoSubCategory } = this.props;
        if(from == Constants.PostAd){
            gotoSubCategory(item);
        }else{
            this.props.navigation.navigate('SubCategoryScreen', { category: item});
        }        
    }
    render(){
        const { from } = this.props;
        return(
            <View style={from == Constants.PostAd ? styles.containerAd : styles.container}>
                <Category categories={Constants.Categories}
                onPress={this.categoryItemPress}
                start={0}
                from={from}
                limit={from == Constants.PostAd? 2 : 3}/>
                <Category categories={Constants.Categories}
                onPress={this.categoryItemPress}
                start={from == Constants.PostAd? 2 : 3}
                from={from}
                limit={from == Constants.PostAd? 2 : 3}/>
                <Category categories={Constants.Categories}
                onPress={this.categoryItemPress}
                start={from == Constants.PostAd? 4 : 6}
                from={from}
                limit={from == Constants.PostAd? 2 : 3}/>
                <Category categories={Constants.Categories}
                onPress={this.categoryItemPress}
                start={from == Constants.PostAd? 6 : 9}
                from={from}
                limit={from == Constants.PostAd? 2 : 3}/>
                {from == Constants.PostAd && (
                    <View>
                        <Category categories={Constants.Categories}
                        onPress={this.categoryItemPress}
                        start={8}
                        from={from}
                        limit={2}/>
                        <Category categories={Constants.Categories}
                        onPress={this.categoryItemPress}
                        start={10}
                        from={from}
                        limit={2}/>
                    </View>
                )}
            </View>
        );
    }
}
export default Categories;