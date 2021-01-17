import React, { PureComponent } from 'react'
import { NotificationSettings } from '@components'

class NotificationSettingScreen extends PureComponent {
    constructor (props) {
        super(props);

    }
    render() {
        return(
            <NotificationSettings navigation={this.props.navigation}/>
        );
    }
}
export default NotificationSettingScreen;