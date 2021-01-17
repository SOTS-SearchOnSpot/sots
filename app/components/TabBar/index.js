/** @format */

import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import {
  View,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { StackActions } from "react-navigation";
import * as Animatable from "react-native-animatable";
import { connect } from "react-redux";
import Toast from 'react-native-simple-toast';
import { UserDetails } from '@services';
import { Color } from '@common';


const styles = StyleSheet.create({
  tabbar: {
    height: 49,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    backgroundColor: Color.white,
  },
  tab: {
    alignSelf: "stretch",
    flex: 1,
    alignItems: "center",
    ...Platform.select({
      ios: {
        justifyContent: "center",
        paddingTop: 0,
      },
      android: {
        justifyContent: "center",
      },
    }),
  },
});

class TabBar extends PureComponent {

  getProfileDetails = async () => {
    const {token, user, logout} = this.props;
    var data = new FormData();
    data.append('id', user.Id);
    const response = await UserDetails.userProfile(token, data);
    if(response !== undefined){
      if(response.flag == false){
        Toast.show(response.message, Toast.LONG);
        logout();
      }
    }    
}

  onPress = (index, route) => {
    this.refs[`tabItem${index}`].flipInY(900);
    //back to main screen when is staying child route
    if (route.routes && route.routes.length > 1) {
      if(this.props.user !== null){
        this.getProfileDetails();
      }
      try{
        this.props.navigation.navigate(route.routes[0].routeName); 
        //this.props.navigation.dispatch(
          //StackActions.popToTop({ key: route.key, immediate: true })
        //);
      
      }catch(e){
        console.log('home => ', e); 
      }
      
    } else {      
      if((this.props.user === null || this.props.user === undefined) && (route.key == "Profile" || route.key == "PostAd" || route.key == "MyAds" || route.key == "Chat")){
        this.props.navigation.navigate("LoginScreen");
      }else{
        if(this.props.user !== null){
          this.getProfileDetails();
        }     
        this.props.navigation.navigate(route.key); 
      }      
   }
  };

  render() {
    const {
      navigation,
      renderIcon,
      activeTintColor,
      inactiveTintColor,     
    } = this.props;

    const { routes } = navigation.state;
    const ignoreScreen = [
      'LoginStack',
      'LoginScreen',
      'SignupScreen',
      'ForgotPasswordScreen',
      'ReportAdScreen'
    ]
    
    //alert(JSON.stringify(routes)); "WishListScreen",
    return (
      <View
        style={[
          styles.tabbar
        ]}>
        {routes &&
          routes.map((route, index) => {
            const focused = index === navigation.state.index;
            const tintColor = focused ? activeTintColor : inactiveTintColor;

            if (ignoreScreen.indexOf(route.key) > -1) {
              return <View key={route.key} />;
            }
            return (
              <TouchableWithoutFeedback
                key={route.key}
                style={styles.tab}
                onPress={() => this.onPress(index, route)}>
                <Animatable.View ref={`tabItem${index}`} style={styles.tab}>
                  {renderIcon({
                    route,
                    index,
                    focused,
                    tintColor,
                  })}
                </Animatable.View>
              </TouchableWithoutFeedback>
            );
          })}
      </View>
    );
  }
}

TabBar.propTypes = {
  user: PropTypes.object,
  navigation: PropTypes.object,
  renderIcon: PropTypes.any,
  activeTintColor: PropTypes.string,
  inactiveTintColor: PropTypes.string,
  jumpTo: PropTypes.func,
};

const mapStateToProps = (state) => ({
  token: state.user.token,
  user: state.user.user
});
const mapDispatchToProps = (dispatch) => {
  const { action } = require("@redux/UserRedux");

  return {
    logout: () => dispatch(action.logout())
  };
};
export default
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TabBar);
