import React, { PureComponent } from 'react'
import { ChangePassword } from '@components'

class ChangePasswordScreen extends PureComponent {
    constructor (props) {
        super(props);

    }
    render() {
        return(
            <ChangePassword navigation={this.props.navigation}/>
        );
    }
}
export default ChangePasswordScreen;