import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from './styles';
import { Color, Styles, Languages } from '@common'
import { SliderBox } from "react-native-image-slider-box";
//import ImagePicker from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import { connect } from 'react-redux';
// "https://source.unsplash.com/1024x768/?nature",
//               "https://source.unsplash.com/1024x768/?water",
//               "https://source.unsplash.com/1024x768/?girl",
//               "https://source.unsplash.com/1024x768/?tree",

class PostImages extends React.PureComponent {
    constructor(props){
        super(props);
        this.state = {
            image: [],
            count: 1,
            limit: 10,
            img: {},
            imageData: [],
            im: 'file:///data/user/0/com.business.shopping/cache/react-native-image-crop-picker/Screenshot_20200824-215721_AIO.jpg',
          };
    }

    onSubmitPressHandle = () => {
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
        const options = {
            multiple: true,
            //includeBase64: true
        }
    

        ImagePicker.openPicker(options).then(images => {
            let img = image;
            let data = imageData;
            let path = null;
            for(let i = 0; i < images.length; i++){
                if(data.length <= 10){
                    data.push(images[i]);
                    path = { uri: images[i].path };
                    // path = path.replace('file:///', '')
                    img.push(path)
                }else{
                    break;
                }
            }
            this.updateState(img, data);
                       
        })
    }

    render(){
        const { image, count, limit, im } = this.state;
        return(
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
                        <Text style={styles.countText}>{((this.props.selectedImages.length > 0) ? count : 0) + "/" + this.props.selectedImages.length}</Text>
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
        );
    }
}
const mapStateToProps = (state) => ({
    selectedImages: state.user.images
});
const mapDispatchToProps = (dispatch) => {
    const { action } = require('@redux/UserRedux');
    return {
        selectImages: (images) => dispatch(action.selectImages(images))
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PostImages);
//export default PostImages;