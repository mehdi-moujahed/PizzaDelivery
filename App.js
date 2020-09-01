import React from 'react';
import {createStackNavigator, createSwitchNavigator} from 'react-navigation';
import Login from './Screens/Login';
import Welcome from './Screens/Welcome';
import Register from './Screens/Register';
import Splash from './Screens/SplashScreen';
import SplashScreen from 'react-native-splash-screen';
import Home from './Screens/Home';
import CustomMenu from './Components/CustomMenu';
import Menu from './Screens/Menu';
import Details from './Screens/Details';
import Profile from './Screens/Profile';
import Recommended from './Screens/Recommended';
export default class App extends React.Component {
  render() {
    SplashScreen.hide();
    const AppNavigator = createStackNavigator({
      Welcome: {
        screen: Welcome,
        navigationOptions: {
          header: null,
        },
      },
      Login: {
        screen: Login,
        navigationOptions: {
          header: null,
        },
      },
      Home: {
        screen: Home,
        navigationOptions: {
          header: null,
        },
      },
      Menu: {
        screen: Menu,
        navigationOptions: {
          header: null,
        },
      },
      Details: {
        screen: Details,
        navigationOptions: {
          header: null,
        },
      },
      Profile: {
        screen: Profile,
        navigationOptions: {
          header: null,
        },
      },
      Recommended: {
        screen: Recommended,
        navigationOptions: {
          header: null,
        },
      },
      Splash: {
        screen: Splash,
        navigationOptions: {
          header: null,
        },
      },
    });

    const SwitchNavigator = createSwitchNavigator(
      {
        Login: {
          screen: Login,
          navigationOptions: {
            header: null,
          },
        },
        Register: {
          screen: Register,
          navigationOptions: {
            header: null,
          },
        },
        MainNavigator: {
          screen: AppNavigator,
        },
      },
      {initialRouteName: 'MainNavigator'},
    );

    return <SwitchNavigator />;
  }
}
