import React, { PureComponent } from 'react'
import { ViewProfile } from '@components'

class ViewProfileScreen extends PureComponent {
    constructor (props) {
        super(props);

    }
    goViewEdit = () => {
        this.props.navigation.navigate('EditProfileScreen');
    }
    render() {
        return(
            <ViewProfile navigation={this.props.navigation}
            goViewEdit={this.goViewEdit}
            id={this.props.navigation.state.params.id}/>
        );
    }
}
export default ViewProfileScreen;