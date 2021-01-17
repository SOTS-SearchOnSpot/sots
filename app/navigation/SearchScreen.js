import React, { PureComponent } from 'react'
import { Search } from '@components'

class SearchScreen extends PureComponent {
    constructor (props) {
        super(props);

    }
    render() {
        return(
            <Search 
            navigation={this.props.navigation}
            location={this.props.navigation.state.params.location}/>
        );
    }
}
export default SearchScreen;