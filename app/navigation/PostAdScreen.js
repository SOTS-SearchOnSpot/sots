import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { PostAd } from '@components'
import { connect } from 'react-redux';

class PostAdScreen extends PureComponent {
    constructor (props) {
        super(props);

    }
    goToLogin= () =>{
        //this.props.navigation.navigate('HomeScreen');
        this.props.navigation.navigate('LoginScreen', {screen: 'PostAdScreen'});
    }
    
    render() {       
        return(
            <PostAd navigation={this.props.navigation}
            goToLogin={this.goToLogin}
            goBack={() => {
                this.props.navigation.goBack(null);
            }}/>
        );
    }
}
const mapStateToProps = (state) => ({
    user: state.user.user
});
export default connect(
    mapStateToProps,
    null
)(PostAdScreen);