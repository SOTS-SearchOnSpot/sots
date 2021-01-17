/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import Router from './app/Router'
import { Languages } from '@common';
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/es/integration/react'
import OneSignal from 'react-native-onesignal';
import store from '@store/configureStore';
import AsyncStorage from '@react-native-community/async-storage';

function myCallback(permission){
  
}

export default class AIO extends Component {
  constructor(props){
    super(props)
    OneSignal.setLogLevel(6, 0);
    OneSignal.init("bd6fd2ff-fec6-4851-a99d-13e7915cab22", {kOSSettingsKeyAutoPrompt : false, kOSSettingsKeyInAppLaunchURL : false, kOSSettingsKeyInFocusDisplayOption: 2});
    OneSignal.inFocusDisplaying(2);
    OneSignal.promptForPushNotificationsWithUserResponse(myCallback);
    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);
  }

  onReceived = (notification) => {
    console.log('Received => ', notification);
  }

  onOpened = (openResult) => {
    console.log('Message => ', openResult.notification.payload.body);
    console.log('Data => ', openResult.notification.payload.additionalData);
    console.log('isActive => ', openResult.notification.isAppInFocus);
    console.log('openResult => ', openResult);
  }

  onIds = async (device) => {
    console.log('device => ', device);
    try{
      await AsyncStorage.setItem("Player_id", device.userId);
    }catch(e){
      console.log('player_id error => ', e);
    }
  }

  render() {
    //let language = store.getState().user.language
    Languages.setLanguage('en');
    const persistor = persistStore(store);
    return(
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Router />
        </PersistGate>
      </Provider>      
    );
  }
}
