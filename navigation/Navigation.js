import React from 'react';
import {
  createStackNavigator,
  createSwitchNavigator,
  createBottomTabNavigator,
} from 'react-navigation';
import LoginScreen from '../Screens/Login';
import WelcomeScreen from '../Screens/Welcome';
import RegisterScreen from '../Screens/Register';
import SplashScreen from 'react-native-splash-screen';
import HomeScreen from '../Screens/Home';
import MenuScreen from '../Screens/Menu';
import DetailScreen from '../Screens/Details';
import ProfileScreen from '../Screens/Profile';
import RecommendedScreen from '../Screens/Recommended';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Favorites from '../Screens/Favorites';
import UpdateEmail from '../Screens/UpdateEmail';
import ResetPassword from '../Screens/ResetPassword';

export default class Navigation extends React.Component {
  render() {
    SplashScreen.hide();
    let isToken = true;
    const AppNavigator = createStackNavigator({
      Welcome: {
        screen: WelcomeScreen,
        navigationOptions: {
          header: null,
        },
      },
      Login: {
        screen: LoginScreen,
        navigationOptions: {
          header: null,
        },
      },
      Home: {
        screen: HomeScreen,
        navigationOptions: {
          header: null,
        },
      },
      Menu: {
        screen: MenuScreen,
        navigationOptions: {
          header: null,
        },
      },
      Details: {
        screen: DetailScreen,
        navigationOptions: {
          header: null,
        },
      },
      Profile: {
        screen: ProfileScreen,
        navigationOptions: {
          header: null,
        },
      },
      Recommended: {
        screen: RecommendedScreen,
        navigationOptions: {
          header: null,
        },
      },
      Favorites: {
        screen: Favorites,
        navigationOptions: {
          header: null,
        },
      },
      UpdateEmail: {
        screen: UpdateEmail,
        navigationOptions: {
          header: null,
        },
      },
      ResetPassword: {
        screen: ResetPassword,
        navigationOptions: {
          header: null,
        },
      },
    });

    const SwitchNavigator = createSwitchNavigator(
      {
        Login: {
          screen: LoginScreen,
          navigationOptions: {
            header: null,
          },
        },
        Register: {
          screen: RegisterScreen,
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

    const BottomTabNavigator = createBottomTabNavigator(
      {
        Home: HomeScreen,
        Profile: ProfileScreen,
      },
      {
        navigationOptions: ({navigation}) => ({
          tabBarIcon: ({focused, horizontal, tintColor}) => {
            const {routeName} = navigation.state;
            let iconName;
            if (routeName === 'Home') {
              iconName = `home${focused ? '' : '-outline'}`;
            } else if (routeName === 'Profile') {
              iconName = `person-circle${focused ? '' : '-outline'}`;
            }

            return (
              <Ionicons
                name={iconName}
                size={horizontal ? 20 : 25}
                color={tintColor}
              />
            );
          },
        }),
        tabBarOptions: {
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        },
      },
    );
    if (isToken) {
      return <SwitchNavigator />;
    } else {
      return <BottomTabNavigator />;
    }
  }
}
