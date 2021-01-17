import React, { PureComponent } from 'react'
import { MyAds } from '@components'

class MyAdScreen extends PureComponent {
    constructor (props) {
        super(props);

    }
    render() {
        return(
            <MyAds navigation={this.props.navigation}/>
        );
    }
}
export default MyAdScreen;