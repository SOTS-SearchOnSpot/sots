import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

class AppIntro extends React.PureComponent {
    constructor(props){
        super(props);
    }
    componentDidMount(){        
        this.props.finishIntro();
    }
    render(){
        return <View />
    }
}
const mapStateToProps = (state) => ({
    user: state.user.user
});
const mapDispatchToProps = (dispatch) => {
    const { action } = require('@redux/UserRedux');
    return {
        finishIntro: () => dispatch(action.finishIntro())
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AppIntro);