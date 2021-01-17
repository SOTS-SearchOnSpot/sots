import React, { PureComponent } from 'react'
import { NotificationInbox } from '@components'

class NotificationInboxScreen extends PureComponent {
    constructor (props) {
        super(props);

    }
    render() {
        return(
            <NotificationInbox navigation={this.props.navigation}/>
        );
    }
}
export default NotificationInboxScreen;