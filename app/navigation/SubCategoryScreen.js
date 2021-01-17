import React, { PureComponent } from 'react';
import { Constants } from '@common';
import { Subcategories } from '@components';

class SubCategoryScreen extends PureComponent {
    constructor (props) {
        super(props);

    }
    render() {
        return(
            <Subcategories 
            navigation={this.props.navigation}
            from={Constants.Home}
            category={this.props.navigation.state.params.category}/>
        );
    }
}
export default SubCategoryScreen;