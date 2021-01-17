import React, { PureComponent } from 'react'
import { ReportAd } from '@components'

class ReportAdScreen extends PureComponent {
    constructor (props) {
        super(props);

    }
    render() {
        return(
            <ReportAd navigation={this.props.navigation}
            adId={this.props.navigation.state.params.id}/>
        );
    }
}
export default ReportAdScreen;