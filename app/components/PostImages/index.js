import React from 'react';
import { View, Text, TouchableOpacity, Image, ActivityIndicator, Platform } from 'react-native';
import styles from './styles';
import { Color, Styles, Languages } from '@common'
import { SliderBox } from "react-native-image-slider-box";
//import ImagePicker from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import { connect } from 'react-redux';
import { AdDetails } from '@services';
import Toast from 'react-native-simple-toast';

class PostImages extends React.PureComponent {
    constructor(props){
        super(props);
        this.state = {
            image: [],
            count: 1,
            limit: 5,
            img: {},
            imageData: [],
            im: 'file:///data/user/0/com.business.shopping/cache/react-native-image-crop-picker/Screenshot_20200824-215721_AIO.jpg',
            loading: false
          };
    }

    cleanTempFile = () => {
        ImagePicker.clean().then(() => {
            console.log('removed all tmp images from tmp directory');
          }).catch(e => {
            console.log(e);
          });
    }

    onSubmitPressHandle = async () => {
        const { data, user, token } = this.props;
        const { imageData } = this.state;
        this.setState({loading: true})
        var details = data;
        details.append('customer_id', user.Id);
        if(imageData.length > 0){
            let images = [], pathdata = [], path = '', name = '', img = {};
            for(let i = 0; i < imageData.length; i++){
                path = imageData[i].path;
                path = path.replace('file:///', '');
                pathdata = path.split('/');
                name = pathdata[pathdata.length - 1];
                img = {
                    name: name,
                    uri: imageData[i].path,
                    type: imageData[i].mime
                }
                details.append('images[]', img) 
            }       
        }
        const response = await AdDetails.createAd(token, details);
        if(response !== undefined){
            if(response.flag == true){
                Toast.show(Languages.PostMessage, Toast.LONG);
                this.setState({
                    image: [],
                    count: 1,
                    limit: 5,
                    img: {},
                    imageData: []
                })
                this.cleanTempFile();
                await this.props.removeImages();
                await this.props.setIntro();
            }else{
                Toast.show(response.message, Toast.LONG);
            }
        }else{
            Toast.show(Languages.ServerError, Toast.LONG);
        }
        this.setState({loading: false})
    }

    updateState = async (img, data) =>{
        await this.props.selectImages(img);
        this.setState({
            image: img,
            imageData: data
        })

    }

    onSelectImagePressHandle = () => {
        const { image, limit, imageData } = this.state;
        Toast.show(Languages.ImageMessage, Toast.LONG);
        const options = {
            compressImageMaxWidth: 480,
            compressImageMaxHeight: 800,
            compressImageQuality: Platform.OS == 'android' ? 1 : 0.8,
            multiple: true,
            //includeBase64: true
        }
    

        ImagePicker.openPicker(options).then(images => {
            let img = image;
            let data = imageData;
            let path = null;
            for(let i = 0; i < images.length; i++){
                if(data.length < limit){
                    data.push(images[i]);
                    path = { uri: images[i].path };
                    img.push(path)
                }else{
                    break;
                }
            }
            this.updateState(img, data)                       
        })
    }

    render(){
        const { image, count, limit, im, loading } = this.state;
        return(
            <View style={styles.container}>
                <View style={styles.container}>
                <View style={styles.imageView}>
                    {/* <Image source={selectedImages.length > 0 ? selectedImages[0] : {uri: im}}
                    style={styles.image}/> */}
                    <SliderBox
                    images={this.props.selectedImages}
                    sliderBoxHeight={Styles.height / 3}
                    currentImageEmitter={index => this.setState({count: index + 1})}
                    dotColor={Color.primary}
                    inactiveDotColor={Color.cancelButton}/>
                    <View style={styles.countView}>
                        <Text style={styles.countText}>{((this.props.selectedImages.length > 0) ? count : 0) + "/" + limit}</Text>
                    </View>
                </View>
                <View style={styles.selectImageView}>
                    <TouchableOpacity style={styles.selectButtonView}
                    onPress={this.onSelectImagePressHandle}>
                        <Text style={styles.selectText}>{Languages.SelectImage}</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    style={[styles.submitButton, styles.uploadDetails]}
                    onPress={this.onSubmitPressHandle}>
                    <Text style={[styles.selectText, {fontSize: 18, fontWeight: 'bold'}]}>{Languages.UploadDetails}</Text>
                </TouchableOpacity>
                </View>
                {loading == true && (
                    <View style={styles.loading}>
                        <ActivityIndicator size={'large'} color={Color.primary}/>
                    </View>
                )}
            </View>
        );
    }
}
const mapStateToProps = (state) => ({
    selectedImages: state.user.images,
    user: state.user.user,
    token: state.user.token
});
const mapDispatchToProps = (dispatch) => {
    const { action } = require('@redux/UserRedux');
    return {
        selectImages: (images) => dispatch(action.selectImages(images)),
        removeImages: () => dispatch(action.removeImages()),
        setIntro: () => dispatch(action.setIntro())
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PostImages);
//export default PostImages;