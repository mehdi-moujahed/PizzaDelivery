import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Icons from 'react-native-vector-icons/SimpleLineIcons';
import Icon from 'react-native-vector-icons/Feather';
import Iconn from 'react-native-vector-icons/MaterialCommunityIcons';
import Iconss from 'react-native-vector-icons/Ionicons';
import {Avatar} from 'react-native-elements';
import {PRIMARY_COLOR} from '../assets/colors/colors';

import {MenuProvider} from 'react-native-popup-menu';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
export default class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      TextInputDisableStatus: false,
      username: 'Mehdi Moujahed',
      email: 'moujahedmehdi@gmail.com',
      password: 'azerty',
    };
  }

  componentWillUnmount() {
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('rgba(255,255,255,255)');
      StatusBar.setTranslucent(true);
      StatusBar.setBarStyle('dark-content');
    }
  }

  changeName = (text) => {
    this.setState({
      username: text,
    });
  };
  render() {
    StatusBar.setBarStyle('light-content');
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('rgba(0,0,0,0)');
      StatusBar.setTranslucent(true);
    }
    return (
      <KeyboardAwareScrollView>
        <MenuProvider>
          <View style={styles.main_container}>
            <View style={styles.top_container}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingTop: 40,
                  paddingHorizontal: 20,
                }}>
                <View>
                  <View>
                    <Iconss
                      name="ios-arrow-back-sharp"
                      size={30}
                      color="white"
                      onPress={() => this.props.navigation.goBack()}
                    />
                  </View>
                </View>
                <View>
                  <Menu style={{}}>
                    <MenuTrigger>
                      <Iconn name="dots-vertical" color="white" size={35} />
                    </MenuTrigger>
                    <MenuOptions
                      customStyles={{
                        optionsContainer: {
                          padding: 10,
                        },
                      }}>
                      <MenuOption
                        customStyles={{
                          optionWrapper: {
                            paddingBottom: 20,
                          },
                        }}
                        onSelect={() =>
                          this.setState({TextInputDisableStatus: true})
                        }
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <Icon name="edit-2" size={15} color="black" />
                        <Text
                          style={{
                            paddingLeft: 10,
                            fontSize: 16,
                          }}>
                          Edit Profile
                        </Text>
                      </MenuOption>
                      <MenuOption
                        onSelect={() => alert(`Delete`)}
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <Icons name="logout" size={15} color="red" />
                        <Text
                          style={{
                            color: 'red',
                            paddingLeft: 11,
                            fontSize: 16,
                          }}>
                          Logout
                        </Text>
                      </MenuOption>
                    </MenuOptions>
                  </Menu>
                </View>
              </View>
              <View style={styles.name_container}>
                <Text style={styles.text}>Mehdi Moujahed</Text>
                <Text style={styles.text}>moujahedmehdi@gmail.com</Text>
              </View>
            </View>
            <View style={styles.img_container}>
              <Avatar
                size={130}
                source={require('../Images/me.png')}
                title="MM"
                activeOpacity={0.7}
              />
              {/* <Image source={require('../Images/me.png')} style={styles.img} /> */}
            </View>
            <View style={styles.input_container}>
              <View>
                <Text style={styles.label}>Username</Text>

                <TextInput
                  onChangeText={(text) => this.changeName}
                  defaultValue={this.state.username}
                  style={styles.input}
                  editable={this.state.TextInputDisableStatus}></TextInput>
              </View>
              <View>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  onChangeText={(text) => this.changeName}
                  defaultValue={this.state.email}
                  style={styles.input}
                  editable={this.state.TextInputDisableStatus}></TextInput>
              </View>
              <View>
                <Text style={styles.label}>Password</Text>
                <TextInput
                  onChangeText={(text) => this.changeName}
                  defaultValue={this.state.password}
                  style={styles.input}
                  editable={this.state.TextInputDisableStatus}></TextInput>
              </View>
              <TouchableOpacity style={styles.button_container}>
                <Text style={styles.button_text}>update profile</Text>
              </TouchableOpacity>
            </View>
          </View>
        </MenuProvider>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
  },
  top_container: {
    width: 360,
    height: 300,
    backgroundColor: PRIMARY_COLOR,
  },
  img: {
    height: 130,
    width: 130,
  },
  button_container: {
    height: 40,
    backgroundColor: PRIMARY_COLOR,
    marginHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  button_text: {
    textTransform: 'uppercase',
    color: 'white',
  },
  label: {
    marginLeft: 30,
    marginBottom: 5,
    fontFamily: 'SFProDisplay-Semibold',
    fontSize: 15,
  },
  img_container: {
    position: 'absolute',
    top: 230,
    left: Dimensions.get('window').width / 2 - 65,
    alignItems: 'center',
    borderColor: 'white',
    borderWidth: 2,
    // borderRadius: 20,
    overflow: 'hidden',
  },
  name_container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 55,
  },
  text: {
    color: 'white',
    fontFamily: 'SFProDisplay-Bold',
    fontSize: 20,
    paddingBottom: 5,
    // fontStyle: 'italic',
  },
  input_container: {
    // justifyContent: 'center',
    // alignItems: 'center',
    marginTop: 80,
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
});
