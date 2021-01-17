import React, { PureComponent } from 'react'
import { Settings } from '@components'

class SettingScreen extends PureComponent {
    constructor (props) {
        super(props);

    }
    render() {
        return(
            <Settings navigation={this.props.navigation}
            goToHome={() => {
                this.props.navigation.navigate('HomeScreen');
            }}
            gotoNotification={() => {
                this.props.navigation.navigate('NotificationSettingScreen');
            }}/>
        );
    }
}
export default SettingScreen;