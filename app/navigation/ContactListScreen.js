import React, { PureComponent } from 'react'
import { ContactList } from '@components'

class ContactListScreen extends PureComponent {
    constructor (props) {
        super(props);
    }
    render() {
        return(
            <ContactList navigation={this.props.navigation}
            catId={this.props.navigation.state.params.id}
            subId={this.props.navigation.state.params.subId}
            value={this.props.navigation.state.params.item}
            goProfile={(id)=>{
                this.props.navigation.navigate('ViewProfileScreen', {id: id});
            }}/>
        );
    }
}
export default ContactListScreen;