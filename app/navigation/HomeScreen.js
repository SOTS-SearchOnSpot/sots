import React, { PureComponent } from 'react'
import { BackHandler } from 'react-native';
import { Home } from '@components'

class HomeScreen extends PureComponent {
    constructor (props) {
        super(props);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }
    // componentWillMount() {
    //     BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    // }
    
    // componentWillUnmount() {
    //     BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    // }
    handleBackButtonClick() {
        this.props.navigation.goBack(null);
        //BackHandler.exitApp();
        return true;
    }
    render() {
        return(
            <Home navigation={this.props.navigation}
            gotoNotification={()=> {
                this.props.navigation.navigate('NotificationInboxScreen');
            }}
            goSearch={(value)=>{
                this.props.navigation.navigate('SearchScreen', {location: value});
            }}/>
        );
    }
}
export default HomeScreen;