import React, {useEffect} from 'react';
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
import FavoritesScreen from '../Screens/Favorites';
import UpdateEmail from '../Screens/UpdateEmail';
import ResetPassword from '../Screens/ResetPassword';
import CartScreen from '../Screens/Cart';
import AsyncStorage from '@react-native-community/async-storage';
import {loginReducer} from '../Store/Reducers/loginReducer';
import {AuthContext} from '../Components/authContext';
import LoginHooks from '../Screens/LoginHooks';
import {Provider} from 'react-redux';
import Store from '../Store/configureStore';
import {PRIMARY_COLOR, SECONDARY_COLOR} from '../assets/colors/colors';
import ForgotPassword from '../Screens/ForgotPassword';
const NavigationHooks = () => {
  const initialLoginState = {
    isLoading: true,
    userToken: null,
    loggedUserId: null,
  };

  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState,
  );

  const authContext = React.useMemo(
    () => ({
      login: async (jwt) => {
        console.log('JWT NAV', jwt);
        const userToken = jwt.token;
        try {
          await AsyncStorage.setItem('userToken', userToken);
        } catch (e) {
          console.log(e);
        }
        dispatch({type: 'LOGIN', token: userToken});
      },
      logout: async () => {
        try {
          await AsyncStorage.removeItem('userToken');
        } catch (e) {
          console.log(e);
        }
        dispatch({type: 'LOGOUT'});
      },
    }),
    [],
  );

  useEffect(() => {
    SplashScreen.hide();
    AsyncStorage.getItem('userToken')
      .then((userToken) => {
        dispatch({type: 'RETRIEVE_TOKEN', token: userToken});
      })
      .catch((e) => console.error(e));
  }, []);

  const AppNavigator = createStackNavigator(
    {
      // Welcome: {
      //   screen: WelcomeScreen,
      //   navigationOptions: {
      //     header: null,
      //   },
      // },
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
      // Favorites: {
      //   screen: FavoritesScreen,
      //   navigationOptions: {
      //     header: null,
      //   },
      // },
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
      // Cart: {
      //   screen: CartScreen,
      //   navigationOptions: {
      //     header: null,
      //   },
      // },
    },
    {initialRouteName: 'Home'},
  );

  const SwitchNavigator = createSwitchNavigator(
    {
      LoginHooks: {
        screen: LoginHooks,
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
      ForgotPassword: {
        screen: ForgotPassword,
        navigationOptions: {
          header: null,
        },
      },
    },
    {initialRouteName: 'LoginHooks'},
  );

  const BottomTabNavigator = createBottomTabNavigator(
    {
      Home: AppNavigator,
      // Home: HomeScreen,
      Favorites: FavoritesScreen,
      Cart: CartScreen,
      // Profile: ProfileScreen,
    },
    {
      navigationOptions: ({navigation}) => ({
        tabBarIcon: ({focused, horizontal, tintColor}) => {
          const {routeName} = navigation.state;
          let iconName;
          if (routeName === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
            // iconName = `home${focused ? '' : '-outline'}`;
            console.log('focused home :', focused);
          } else if (routeName === 'Profile') {
            iconName = focused ? 'person-circle' : 'person-circle-outline';
            console.log('focused Profile :', focused);

            // iconName = `person-circle${focused ? '' : '-outline'}`;
          } else if (routeName === 'Cart') {
            iconName = focused ? 'cart' : 'cart-outline';
            console.log('focused Cart :', focused);

            // iconName = `cart${focused ? '' : '-outline'}`;
          } else if (routeName === 'Favorites') {
            iconName = focused ? 'heart' : 'heart-outline';
            console.log('focused Favorites :', focused);

            // iconName = `heart${focused ? '-outline' : '-outline'}`;
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
        activeTintColor: PRIMARY_COLOR,
        inactiveTintColor: SECONDARY_COLOR,
        showIcon: true,
      },
    },
  );

  return (
    <AuthContext.Provider value={authContext}>
      {loginState.userToken !== null ? (
        <Provider store={Store}>
          <BottomTabNavigator />
        </Provider>
      ) : (
        <SwitchNavigator />
      )}
    </AuthContext.Provider>
  );
};

export default NavigationHooks;
