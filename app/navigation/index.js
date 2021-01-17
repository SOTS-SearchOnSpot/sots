import React from 'react';
import { createAppContainer, createNavigationContainer, NavigationActions } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { TabBarIcon, TabBar } from '@components';
import { Languages, Icons, Constants, Color } from '@common'

import LoginScreen from './LoginSceen';
import SignupScreen from './SignupScreen';
import ForgotPasswordScreen from './ForgotPasswordScreen';
import HomeScreen from './HomeScreen';
import MyAdScreen from './MyAdScreen';
import PostAdScreen from './PostAdScreen';
import ChatHomeScreen from './ChatHomeScreen';
import ProfileScreen from './ProfileScreen';
import SubCategoryScreen from './SubCategoryScreen';
import ItemListScreen from './ItemListScreen';
import SettingScreen from './SettingScreen';
import ChangePasswordScreen from './ChangePasswordScreen';
import DetailScreen from './DetailScreen';
import ContactListScreen from './ContactListScreen';
import EditProfileScreen from './EditProfileScreen';
import ViewProfileScreen from './ViewProfileScreen';
import NotificationSettingScreen from './NotificationSettingScreen';
import NotificationInboxScreen from './NotificationInboxScreen';
import SupportScreen from './SupportScreen';
import FavouriteScreen from './FavouriteScreen';
import SearchScreen from './SearchScreen';
import ReportAdScreen from './ReportAdScreen';
import ChatScreen from './ChatScreen';
import FilterScreen from './FilterScreen';

const HomeStack = createStackNavigator({
    HomeScreen: {
        screen: HomeScreen
    },
    SubCategoryScreen: {
        screen: SubCategoryScreen
    },
    ItemListScreen: {
        screen: ItemListScreen
    },
    FilterScreen: {
        screen: FilterScreen
    },
    DetailScreen: {
        screen: DetailScreen
    },
    ViewProfileScreen: {
        screen: ViewProfileScreen
    },
    ContactListScreen: {
        screen: ContactListScreen
    },
    NotificationInboxScreen: {
        screen: NotificationInboxScreen
    },
    SearchScreen: {
        screen: SearchScreen
    },
    ReportAdScreen: {
        screen: ReportAdScreen
    }
},
{
    headerMode: 'none',
    navigationOptions: {
        gestureDirection: 'default'
    }
});
const ProfileStack = createStackNavigator({
    ProfileScreen: {
        screen: ProfileScreen
    },
    ViewProfileScreen: {
        screen: ViewProfileScreen
    },
    EditProfileScreen: {
        screen: EditProfileScreen
    },
    SettingScreen: {
        screen: SettingScreen
    },
    NotificationSettingScreen: {
        screen: NotificationSettingScreen
    },
    SupportScreen: {
        screen: SupportScreen
    },
    ChangePasswordScreen: {
        screen: ChangePasswordScreen
    },
    FavouriteScreen: {
        screen: FavouriteScreen
    },
},
{
    headerMode: 'none',
    navigationOptions: {
        gestureDirection: 'default'
    }
});
const MyAdStack = createStackNavigator({
    MyAdScreen: {
        screen: MyAdScreen
    },
    DetailScreen: {
        screen: DetailScreen
    },
    ViewProfileScreen: {
        screen: ViewProfileScreen
    },
    ReportAdScreen: {
        screen: ReportAdScreen
    }
    
},
{
    headerMode: 'none',
    navigationOptions: {
        gestureDirection: 'default'
    }
});
const AddPostStack = createStackNavigator({
    PostAdScreen: {
        screen: PostAdScreen
    },
    
},
{
    headerMode: 'none'
});
const ChatStack = createStackNavigator({
    ChatHomeScreen: {
        screen: ChatHomeScreen
    },
    ChatScreen: {
        screen: ChatScreen
    }    
},
{
    headerMode: 'none'
});
const LoginStack = createStackNavigator({
    LoginScreen: {
        screen: LoginScreen
    },
    SignupScreen: {
        screen: SignupScreen
    },
    ForgotPasswordScreen: {
        screen: ForgotPasswordScreen
    },
    ReportAdScreen: {
        screen: ReportAdScreen
    }
},
{
    headerMode: 'none'
})
const BottomTab = createBottomTabNavigator({
    Home: {
        screen: HomeStack,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
                <TabBarIcon
                type={Constants.Icon.CommunityIcons}
                icon={Icons.MaterialCommunityIcons.Home}
                tintColor={tintColor}
                label={Languages.Home} />
            )
        }
    },
    MyAds: {
        screen: MyAdStack,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
                <TabBarIcon
                icon={Icons.FontAwesome.MyAds}
                type={Constants.Icon.FontAwesome}
                tintColor={tintColor}
                label={Languages.Myads} />
            )
        }
    },
    PostAd: {
        screen: AddPostStack,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
                <TabBarIcon
                type={Constants.Icon.CommunityIcons}
                icon={Icons.MaterialCommunityIcons.Add}
                tintColor={tintColor}
                label={Languages.Postad} />
            )
        }
    },
    Chat: {
        screen: ChatStack,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
                <TabBarIcon
                type={Constants.Icon.CommunityIcons}
                icon={Icons.MaterialCommunityIcons.Chat}
                tintColor={tintColor}
                label={Languages.Chat} />
            )
        }
    },
    Profile: {
        screen: ProfileStack,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
                <TabBarIcon
                type={Constants.Icon.CommunityIcons}
                icon={Icons.MaterialCommunityIcons.Profile}
                tintColor={tintColor}
                label={Languages.Profile} />
            )
        }
    },
    LoginStack: {
        screen: LoginStack
    }
},
{
    tabBarComponent: TabBar,
    //initialRouteName: 'Home',
    tabBarOptions: {
        showLabel: false,
        activeTintColor: Color.primary,
        inactiveTintColor: Color.tabbartintcolor
    },
    //lazy: true,
    navigationOptions: {
        gestureDirection: 'default'
    }    
}
);
const Navigation = createAppContainer(BottomTab);
export default Navigation;

const navigateOnce = (getStateForAction) => (action, state) => {
    const { type, routeName } = action;
    return state &&
      type === NavigationActions.NAVIGATE &&
      routeName === state.routes[state.routes.length - 1].routeName
      ? null
      : getStateForAction(action, state);
};

HomeStack.router.getStateForAction = navigateOnce(
    HomeStack.router.getStateForAction
);
MyAdStack.router.getStateForAction = navigateOnce(
    MyAdStack.router.getStateForAction
);
AddPostStack.router.getStateForAction = navigateOnce(
    AddPostStack.router.getStateForAction
);
ChatStack.router.getStateForAction = navigateOnce(
    ChatStack.router.getStateForAction
);
ProfileStack.router.getStateForAction = navigateOnce(
    ProfileStack.router.getStateForAction
);
LoginStack.router.getStateForAction = navigateOnce(
    LoginStack.router.getStateForAction
);
