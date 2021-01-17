import React, { PureComponent } from 'react'
import { Favourites } from '@components'

class FavouriteScreen extends PureComponent {
    constructor (props) {
        super(props);

    }
    render() {
        return(
            <Favourites navigation={this.props.navigation}/>
        );
    }
}
export default FavouriteScreen