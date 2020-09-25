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
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import CustomTextInput from '../Components/CustomTextInput';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Icons from 'react-native-vector-icons/FontAwesome';
import {addUser} from '../API/Users';

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      name: '',
      address: '',
      loading: false,
    };
  }
  signupUser = () => {
    this.setState({loading: true});
    const {name, address, email, password} = this.state;
    const newUser = {
      name,
      address,
      email,
      password,
    };

    addUser(newUser);
  };
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
              <Text
                style={styles.login_text}
                onPress={() => this.props.navigation.navigate('Login')}>
                Login
              </Text>
            </View>
            <View style={styles.text_container}>
              <Text style={styles.seperator}>|</Text>
            </View>
            <View style={{flex: 0.4, alignItems: 'center'}}>
              <Text style={styles.signup_text}>Signup</Text>
            </View>
          </View>
        </View>

        <View style={styles.second_container}>
          <TouchableOpacity
            style={styles.SignUP_button}
            onPress={() => this.signupUser()}>
            <Text style={styles.SignUPButton_text}>SIGN UP</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.input_container}>
          <View style={{paddingTop: 20}}>
            <CustomTextInput
              placeHolder="Username"
              iconName="user"
              onChangeText={(text) => this.setState({name: text})}
            />
            <CustomTextInput
              placeHolder="E-mail"
              iconName="envelope"
              size={15}
              onChangeText={(text) => this.setState({email: text})}
            />
            <CustomTextInput
              placeHolder="Password"
              iconName="lock"
              secureTextEntry={true}
              onChangeText={(text) =>
                this.setState({password: text})
              }></CustomTextInput>
            <CustomTextInput
              placeHolder="Home address"
              iconName="home"
              size={18}
              onChangeText={(text) =>
                this.setState({address: text})
              }></CustomTextInput>
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
  imgBackground_container: {
    backgroundColor: 'black',
  },
  imgBackground: {
    height: 350,
    opacity: 0.55,
  },
  text_container: {
    flex: 0.2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label_container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    top: 200,
  },
  login_text: {
    color: 'white',
    textTransform: 'uppercase',
    fontSize: 20,
    // fontWeight: 'bold',
    fontFamily: 'SFProDisplay-Regular',
    marginLeft: 50,
  },
  signup_text: {
    color: '#E1B894',
    textTransform: 'uppercase',
    fontSize: 20,
    fontFamily: 'SFProDisplay-Regular',
    fontWeight: 'bold',
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
    height: Dimensions.get('window').height - 350,
  },
  SignUP_button: {
    backgroundColor: '#E1B894',
    borderRadius: 30,
    width: Dimensions.get('window').width - 70,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 320,
    marginLeft: 35,
    elevation: 5,
  },
  SignUPButton_text: {
    color: 'white',
    fontFamily: 'sans-serif-medium',
    fontSize: 15,
  },
  input_container: {
    backgroundColor: '#E1B894',
    position: 'absolute',
    left: 35,
    top: 250,
    width: Dimensions.get('window').width - 70,
    height: 350,
    elevation: 15,
    borderRadius: 20,
  },
});
