import React, { PureComponent } from 'react'
import { ForgotPassword} from '@components'

class ForgotPasswordScreen extends PureComponent {
    constructor (props) {
        super(props);

    }
    render() {
        return(
            <ForgotPassword navigation={this.props.navigation}/>
        );
    }
}
export default ForgotPasswordScreen;