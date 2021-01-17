import React, { PureComponent } from 'react'
import { Login } from '@components'

class LoginScreen extends PureComponent {
    constructor (props) {
        super(props);

    }
    render() {
        return(
            <Login navigation={this.props.navigation}
            // screen={this.props.navigation.state.params.screen}
            />
        );
    }
}
export default LoginScreen;