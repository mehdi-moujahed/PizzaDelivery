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
import {updatePassword} from '../API/Users';

export default class ResetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newPassword: '',
      retypedPassword: '',
    };
  }

  componentWillUnmount() {
    StatusBar.setBarStyle('light-content');
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('rgba(0,0,0,0)');
      StatusBar.setTranslucent(true);
    }
  }
  changeNewPassword = (text) => {
    this.setState({
      newPassword: text,
    });
  };
  changeRetypedPassword = (text) => {
    this.setState({
      retypedPassword: text,
    });
  };
  _resetPassword() {
    if (this.state.newPassword === this.state.retypedPassword) {
      updatePassword(this.state.retypedPassword)
        .then((response) => {
          console.log(response);
          ToastAndroid.show(
            'password updated with success',
            ToastAndroid.SHORT,
          );
        })
        .catch((error) => {
          console.log(error);
          ToastAndroid.show('Error updating password', ToastAndroid.SHORT);
        });
    } else ToastAndroid.show('Inputs does not match !', ToastAndroid.SHORT);
  }
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
              onPress={() => this.props.navigation.goBack()}
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
              Reset Password
            </Text>
          </View>
        </View>
        <View style={styles.second_container}>
          <View>
            <Text style={styles.label}>New Password</Text>
            <TextInput
              onChangeText={(text) => this.changeNewPassword(text)}
              placeholder="Enter your new Password"
              style={styles.input}></TextInput>
          </View>
          <View>
            <Text style={styles.label}>Retype New Password</Text>
            <TextInput
              onChangeText={(text) => this.changeRetypedPassword(text)}
              placeholder="Retype your new Password"
              style={styles.input}></TextInput>
          </View>
          <View>
            <TouchableOpacity
              style={styles.button_container}
              onPress={() => {
                this._resetPassword();
              }}>
              <Text style={styles.button_text}>reset password</Text>
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
    justifyContent: 'center',
  },
  label: {
    marginLeft: 30,
    marginBottom: 5,
    fontFamily: 'SFProDisplay-Semibold',
    fontSize: 15,
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
