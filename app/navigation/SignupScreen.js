import React, { PureComponent } from 'react'
import { Signup } from '@components'

class SignupScreen extends PureComponent {
    constructor (props) {
        super(props);

    }
    render() {
        return(
            <Signup navigation={this.props.navigation}/>
        );
    }
}
export default SignupScreen;