import React, { PureComponent } from 'react'
import { Details } from '@components'

class DetailScreen extends PureComponent {
    constructor (props) {
        super(props);

    }
    render() {
        const { navigation } = this.props;
        return(
            <Details navigation={this.props.navigation}
            id={navigation.state.params.id}
            adDetails={navigation.state.params.details}
            imageUrl={navigation.state.params.url}
            goLogin={()=>{
                navigation.navigate('LoginScreen');
            }}
            goProfile={(id)=>{
                navigation.navigate('ViewProfileScreen', {id: id});
            }}
            gotoReport={(id)=>{
                navigation.navigate('ReportAdScreen', {id: id});
            }}
            goDetails={(item, Url)=>{
                navigation.navigate('DetailScreen', {id: item.MCId, details: item, url: Url});
            }}
            gotoChat={(fuser)=>{
                this.props.navigation.navigate('ChatScreen', {fuser: fuser});
            }}/>
            
        );
    }
}
export default DetailScreen;