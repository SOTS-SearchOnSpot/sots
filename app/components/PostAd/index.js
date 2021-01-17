import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, ScrollView, BackHandler } from 'react-native';
import { Container, Header, Content } from 'native-base';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Color, Icons, Languages, Constants } from '@common';
import { Categories, Subcategories, PostAdItem } from '@components';
import { connect } from 'react-redux';

class PostAd extends PureComponent {
    constructor(props){
        super(props);
        this.state = {
            showCategory: true,
            category: {},
            showPostAd: false,
            subCategory: {},
            headerText: Languages.SelectCategory,
            uploadImage: false,
            data: new FormData()
        }
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }
    componentDidMount(){
    }
    componentWillMount() {
        //BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    
    componentWillUnmount() {
        //BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    handleBackButtonClick() {
        const { category, showCategory, showPostAd, uploadImage } = this.state;
        if(showCategory == false && showPostAd == true && uploadImage == true){
            this.setState({ uploadImage: false, headerText: Languages.IncludeDetails})
        }else if(showCategory == false && showPostAd == true && uploadImage == false){
            this.setState({showPostAd: false, headerText: category.name})
        }else if(showCategory == false && showPostAd == false && uploadImage == false){
            this.setState({showCategory: true, headerText: Languages.SelectCategory})
        }else if(showCategory == true){                                
            this.props.goBack();
        }
        return true;
    }
    gotoSubCategory = (item) => {
        this.setState({showCategory: false, category: item, headerText: item.name})
    }
    gotoAd = (item) => {
        this.setState({showCategory: false, showPostAd: true, subCategory: item, headerText: Languages.IncludeDetails});
    }

    gotoUpload = async (value, data) => {
        await this.props.removeImages();
        this.setState({showPostAd: true, uploadImage: value, headerText: Languages.UploadImage, data: data});
    }
    render() {
        const { category, showCategory, showPostAd, subCategory, uploadImage, headerText, data } = this.state;
        return(
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.actionBarLeft}>
                        <TouchableOpacity 
                        style={{marginLeft: 5}}
                        onPress={() => {
                            if(showCategory == false && showPostAd == true && uploadImage == true){
                                this.setState({ uploadImage: false, headerText: Languages.IncludeDetails})
                            }else if(showCategory == false && showPostAd == true && uploadImage == false){
                                this.setState({showPostAd: false, headerText: Languages[category.name]})
                            }else if(showCategory == false && showPostAd == false && uploadImage == false){
                                this.setState({showCategory: true, headerText: Languages.SelectCategory})
                            }else if(showCategory == true){                                
                                this.props.goBack();
                            }
                        }}>
                            <Icon name={Icons.MaterialCommunityIcons.Back} size={30} color={Color.cancelButton}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.actionBarMiddle}>
                        <Text style={styles.barCentertext}>{(showCategory == false && showPostAd == false && uploadImage == false) ? Languages[category.name] : headerText}</Text>
                    </View>
                    <View style={styles.actionBarRight}>
                    </View>
                </View>
                {showCategory == true ? (
                    <ScrollView>
                        <View style={styles.categories}>
                            <Categories 
                            navigation={this.props.navigation}
                            from={Constants.PostAd}
                            gotoSubCategory={this.gotoSubCategory}/>
                        </View>
                    </ScrollView>
                ) : (showPostAd == true && showCategory == false) ? (
                    <PostAdItem 
                    gotoUpload={this.gotoUpload}
                    uploadImage={uploadImage}
                    category={category}
                    subCategory={subCategory}
                    postData={data}
                    goBack={()=>{
                        this.setState({
                            showCategory: true,
                            category: {},
                            showPostAd: false,
                            subCategory: {},
                            uploadImage: false,
                        })
                        this.props.goBack()
                    }}/>
                ) : (
                    <Subcategories 
                    navigation={this.props.navigation}
                    from={Constants.PostAd}
                    category={category}
                    gotoAd={this.gotoAd}/>
                )}
            </View>
        );
    }
}
const mapStateToProps = (state) => ({
    user: state.user.user
});
const mapDispatchToProps = (dispatch) => {
    const { action } = require('@redux/UserRedux');
    return {
        removeImages: () => dispatch(action.removeImages()),
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PostAd);
//export default PostAd;