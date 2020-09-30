import React from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  StatusBar,
  ToastAndroid,
} from 'react-native';
import {PRIMARY_COLOR} from '../assets/colors/colors';
import Icons from 'react-native-vector-icons/Ionicons';
import {sendPasswordResetEmail} from '../API/Users';

export default class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newEmail: '',
    };
  }

  componentWillUnmount() {
    StatusBar.setBarStyle('light-content');
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('rgba(0,0,0,0)');
      StatusBar.setTranslucent(true);
    }
  }

  changeEmail = (text) => {
    this.setState({
      newEmail: text,
    });
  };

  //   _updateEmail() {
  //     updateEmail(this.state.newEmail)
  //       .then((response) => {
  //         console.log(response);
  //         ToastAndroid.show('Email updated with success', ToastAndroid.SHORT);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //         ToastAndroid.show('Error updating email', ToastAndroid.SHORT);
  //       });
  //   }
  render() {
    StatusBar.setBarStyle('dark-content');
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('rgba(0,0,0,0)');
      StatusBar.setTranslucent(true);
    }
    return (
      <View style={styles.main_container}>
        <View style={styles.top_container}>
          <View style={{flex: 0.2}}>
            <Icons
              name="ios-arrow-back-sharp"
              size={30}
              onPress={() => this.props.navigation.navigate('LoginHooks')}
            />
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flex: 0.6,
            }}>
            <Text
              style={{
                fontSize: 20,
                fontFamily: 'SFProDisplay-Bold',
              }}>
              Forgot Password
            </Text>
          </View>
        </View>

        <View style={styles.second_container}>
          <View style={{marginBottom: 50}}>
            <Text style={styles.label}>
              Please enter your email so we can send you your password reset
            </Text>
          </View>
          <View>
            <View>
              <Text style={styles.label}>Email Address</Text>
            </View>
            <TextInput
              onChangeText={(text) => this.changeEmail(text)}
              placeholder="Enter your email address"
              style={styles.input}></TextInput>
          </View>
          <View>
            <TouchableOpacity
              style={styles.button_container}
              onPress={() => {
                sendPasswordResetEmail(this.state.newEmail);
              }}>
              <Text style={styles.button_text}>send email</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    backgroundColor: 'white',
  },
  second_container: {
    flex: 1,
    // justifyContent: 'center',
  },
  label: {
    marginLeft: 30,
    fontFamily: 'SFProDisplay-Semibold',
    fontSize: 15,
    marginBottom: 5,
  },
  top_container: {
    flexDirection: 'row',
    marginTop: 40,
    marginHorizontal: 20,
    marginBottom: 30,
    alignItems: 'center',
  },
  button_text: {
    textTransform: 'uppercase',
    color: 'white',
  },
  input: {
    backgroundColor: 'transparent',
    paddingLeft: 15,
    borderColor: PRIMARY_COLOR,
    borderWidth: 1.5,
    height: 50,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  button_container: {
    height: 40,
    backgroundColor: PRIMARY_COLOR,
    marginHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
});
