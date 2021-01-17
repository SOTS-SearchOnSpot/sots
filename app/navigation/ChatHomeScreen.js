import React, { PureComponent } from 'react'
import { ChatHome } from '@components'

class ChatHomeScreen extends PureComponent {
    constructor (props) {
        super(props);

    }
    render() {
        return(
            <ChatHome navigation={this.props.navigation}
            gotoChat={(fuser)=>{
                this.props.navigation.navigate('ChatScreen', {fuser: fuser});
            }}/>
        );
    }
}
export default ChatHomeScreen;