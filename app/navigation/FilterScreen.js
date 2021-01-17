import React, { PureComponent } from 'react'
import { Filter } from '@components';

class FilterScreen extends PureComponent {
    constructor (props) {
        super(props);

    }
    render() {
        return(
            <Filter navigation={this.props.navigation}
            id={this.props.navigation.state.params.id}/>
        );
    }
}
export default FilterScreen;