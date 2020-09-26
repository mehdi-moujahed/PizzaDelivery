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
import {updateEmail} from '../API/Users';

export default class UpdateEmail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      oldEmail: '',
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
  changeOldEmail = (text) => {
    this.setState({
      oldEmail: text,
    });
  };
  changeNewEmail = (text) => {
    this.setState({
      newEmail: text,
    });
  };
  _updateEmail() {
    updateEmail(this.state.newEmail)
      .then((response) => {
        console.log(response);
        ToastAndroid.show('Email updated with success', ToastAndroid.SHORT);
      })
      .catch((error) => {
        console.log(error);
        ToastAndroid.show('Error updating email', ToastAndroid.SHORT);
      });
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
              Updating Email
            </Text>
          </View>
        </View>
        <View style={styles.second_container}>
          {/* <View>
            <Text style={styles.label}>Old Email Address</Text>
            <TextInput
              onChangeText={(text) => this.changeOldEmail(text)}
              placeholder="Enter your old email address"
              style={styles.input}></TextInput>
          </View> */}
          <View>
            <Text style={styles.label}>New Email Address</Text>
            <TextInput
              onChangeText={(text) => this.changeNewEmail(text)}
              placeholder="Enter your new email address"
              style={styles.input}></TextInput>
          </View>
          <View>
            <TouchableOpacity
              style={styles.button_container}
              onPress={() => {
                this._updateEmail();
              }}>
              <Text style={styles.button_text}>update email</Text>
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
