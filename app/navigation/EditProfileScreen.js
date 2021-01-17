import React, { PureComponent } from 'react'
import { EditProfile } from '@components'

class EditProfileScreen extends PureComponent {
    constructor (props) {
        super(props);

    }
    render() {
        return(
            <EditProfile navigation={this.props.navigation}/>
        );
    }
}
export default EditProfileScreen;