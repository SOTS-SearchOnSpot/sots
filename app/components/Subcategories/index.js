import React, { PureComponent } from 'react';
import { View, FlatList, TouchableOpacity, Text, TouchableHighlight } from 'react-native';
import { Container, Header, Content } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Icons, Color, Constants, Languages } from '@common';
import styles from './styles';


class Subcategories extends PureComponent {
    constructor(props){
        super(props);
        this.state = {
            dataList: [],
            subItems: false,
            itemValue: null,
        }
    }
    gotoItemListPage = (item) => {
        const { category, from, gotoAd } = this.props;
        const {itemValue} = this.state;
        if(category.id == 1 && item.id == 1003){
            this.setState({subItems: true, dataList: item.subCategory, itemValue: {id: item.id, name: item.name}})
        }else{
            let data = {
                id: 0,
                name: '',
                subCategory: null
            } 
            if(itemValue != null) {
                data.id = itemValue.id;
                data.name = itemValue.name;
                data.subCategory = item;
            }else {
                data.id = item.id;
                data.name = item.name;
                data.subCategory = null;
            }
            if(from == Constants.PostAd){
                gotoAd(data);
            }else{            
                this.props.navigation.navigate('ItemListScreen', {categoryId: category.id, subCategory: data});
            }            
        }
        
    }
    renderCategory = ({item}) => {
        return(
            <TouchableHighlight 
            //style={styles.subCategory}
            onPress={()=>{
                this.gotoItemListPage(item)
            }}
            underlayColor={Color.primary}>
                <View style={{width: '100%', height: 40, justifyContent: 'center'}}>
                <Text style={styles.subCategoryItem}>{Languages[item.name]}</Text>
                </View>                
            </TouchableHighlight>
        );

    }
    render() {
        const { category, from } = this.props;
        const {subItems, dataList} = this.state;
        var data = subItems ? dataList : category.subCategory;
        //data = category.subCategory.filter(item => item.name != Languages.Others);
        if(from == Constants.PostAd){
            data = data.filter(item => item.id != 16);
        }
        return(
            <Container style={styles.container}>
                {from == Constants.Home && (
                    <Header style={styles.header}>
                        <View style={styles.actionBarLeft}>
                            <TouchableOpacity 
                            onPress={() => {
                                this.props.navigation.goBack(null);
                            }}>
                                <Icon name={Icons.MaterialCommunityIcons.Back} size={25} color={Color.cancelButton}/>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.actionBarMiddle}>
                            <Text style={styles.barCentertext}>{Languages[category.name]}</Text>
                        </View>
                        <View style={styles.actionBarRight}></View>
                    </Header>
                )}                
                <View style={styles.container}>
                    <FlatList
                        overScrollMode='never'
                        contentContainerStyle={styles.flatlist}
                        keyExtractor={(item, index) => index.toString()}
                        data={data}
                        horizontal={false}
                        renderItem={this.renderCategory}/>
                        
                </View>
                {/* <View style={styles.container}>
                    
                </View> */}
            </Container>
        );
    }
}
export default Subcategories;