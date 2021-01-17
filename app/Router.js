import React, { PureComponent } from 'react'
import { View, Text } from 'react-native';
import Navigation from '@navigation'
import { connect } from 'react-redux'
import { UserDetails } from '@services'
import { AppIntro } from '@components';
import { Languages } from '@common';
class Router extends React.Component {
    constructor(props){
        super(props);
    }
    componentDidMount(){
        this.getToken();
        //this.sartTime();

    }

    componentWillUnmount(){
        //this.endTime();
    }

    sartTime = async () => {

    }

    endTime = async () => {

    }

    getToken = async () => {
        const response = await UserDetails.getToken();
        if(response.flag){
            if(response.response !== undefined){
                this.props.saveToken(response.response.Token);
            }
        }
    }

    render() {
        Languages.setLanguage(this.props.language);
        if(this.props.appIntro){
            return <AppIntro />
        }
        return(
            <Navigation ref ={(comp) => (this.navigator = comp)}/>            
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user.user,
    language: state.user.language,
    appIntro: state.user.appIntro
});
const mapDispatchToProps = (dispatch) => {
    const { action } = require('@redux/UserRedux');
    return {
        saveToken: (token) => dispatch(action.saveToken(token))
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Router);
