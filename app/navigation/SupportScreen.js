import React, { PureComponent } from 'react'
import { Support } from '@components'

class SupportScreen extends PureComponent {
    constructor (props) {
        super(props);

    }
    render() {
        return(
            <Support navigation={this.props.navigation}/>
        );
    }
}
export default SupportScreen;