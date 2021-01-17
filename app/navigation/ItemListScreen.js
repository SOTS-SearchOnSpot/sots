import React, { PureComponent } from 'react'
import { ItemList } from '@components'

class ItemListScreen extends PureComponent {
    constructor (props) {
        super(props);

    }
    render() {
        const { navigation } = this.props;
        return(
            <ItemList navigation={navigation}
            categoryId={navigation.state.params.categoryId}
            subCategory={navigation.state.params.subCategory}/>
        );
    }
}
export default ItemListScreen;