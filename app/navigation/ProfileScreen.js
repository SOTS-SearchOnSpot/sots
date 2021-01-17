import React, { PureComponent } from 'react'
import { Profile } from '@components'

class ProfileScreen extends PureComponent {
    constructor (props) {
        super(props);
    }
    goToLogin = () => {
        this.props.navigation.navigate('LoginScreen', {screen: 'ProfileScreen'});
    }
    goViewEdit = (id) => {
        this.props.navigation.navigate('ViewProfileScreen', {id: id});
    }
    goSupport = () => {
        this.props.navigation.navigate('SupportScreen');
    }
    render() {
        return(
            <Profile navigation={this.props.navigation}
            goToLogin={this.goToLogin}
            goViewEdit={this.goViewEdit}
            goSupport={this.goSupport}/>
        );
    }
}
export default ProfileScreen;