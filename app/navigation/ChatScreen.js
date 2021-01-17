import React, { PureComponent } from 'react'
import { Chat } from '@components'

class ChatScreen extends PureComponent {
    constructor (props) {
        super(props);

    }
    render() {
        return(
            <Chat navigation={this.props.navigation}
            fuser={this.props.navigation.state.params.fuser}/>
        );
    }
}
export default ChatScreen;