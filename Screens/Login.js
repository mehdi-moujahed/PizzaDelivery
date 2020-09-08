import React from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  StatusBar,
  Platform,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import CustomTextInput from '../Components/CustomTextInput';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Icons from 'react-native-vector-icons/FontAwesome';

export default class Login extends React.Component {
  render() {
    StatusBar.setBarStyle('light-content');
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('rgba(0,0,0,0)');
      StatusBar.setTranslucent(true);
    }
    return (
      <KeyboardAwareScrollView style={styles.main_container}>
        <View style={styles.imgBackground_container}>
          <ImageBackground
            style={styles.imgBackground}
            source={require('../Images/pizza_login.jpg')}>
            <Icons
              name="arrow-left"
              color="white"
              size={20}
              style={{margin: 20}}
              onPress={() => this.props.navigation.navigate('Welcome')}
            />
          </ImageBackground>
          <View style={styles.label_container}>
            <View style={{flex: 0.4, alignItems: 'center'}}>
              <Text style={styles.login_text}>Login</Text>
            </View>
            <View style={styles.text_container}>
              <Text style={styles.seperator}>|</Text>
            </View>
            <View style={{flex: 0.4, alignItems: 'center'}}>
              <Text
                style={styles.signup_text}
                onPress={() => {
                  this.props.navigation.navigate('Register');
                }}>
                Signup
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.second_container}>
          <View style={styles.forgetPassword_container}>
            <Text style={{color: '#b5b5b5'}}>Forgot password?</Text>
          </View>
          <TouchableOpacity
            style={styles.login_button}
            onPress={() => this.props.navigation.navigate('Home')}>
            <Text style={styles.loginButton_text}>LOGIN</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.input_container}>
          <View style={{paddingTop: 20}}>
            <CustomTextInput placeHolder="Username" iconName="user" />
            <CustomTextInput
              placeHolder="Password"
              iconName="lock"
              secureTextEntry={true}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}
const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    backgroundColor: 'white',
  },
  text_container: {
    flex: 0.2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgBackground_container: {
    backgroundColor: 'black',
  },
  imgBackground: {
    height: 350,
    opacity: 0.55,
  },
  label_container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    top: 200,
  },
  login_text: {
    color: '#E1B894',
    textTransform: 'uppercase',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'SFProDisplay-Regular',
    marginLeft: 50,
  },
  signup_text: {
    color: '#fff',
    textTransform: 'uppercase',
    fontSize: 20,
    fontFamily: 'SFProDisplay-Regular',
    //fontWeight: 'bold',
    marginRight: 50,
  },
  seperator: {
    color: '#fff',
    fontSize: 20,
  },
  second_container: {
    borderTopLeftRadius: 48.5,
    borderTopRightRadius: 48.5,
    top: -45,
    backgroundColor: 'white',
    height: 300,
  },
  forgetPassword_container: {
    top: 170,
    left: 210,
  },
  login_button: {
    backgroundColor: '#E1B894',
    borderRadius: 30,
    width: 290,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 220,
    marginLeft: 35,
    elevation: 5,
  },
  loginButton_text: {
    color: 'white',
    fontFamily: 'sans-serif-medium',
    fontSize: 15,
  },
  input_container: {
    backgroundColor: '#E1B894',
    position: 'absolute',
    left: 35,
    top: 250,
    width: 290,
    height: 200,
    elevation: 15,
    borderRadius: 20,
  },
});
