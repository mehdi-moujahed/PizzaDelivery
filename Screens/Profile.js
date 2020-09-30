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
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import Icons from 'react-native-vector-icons/SimpleLineIcons';
import Icon from 'react-native-vector-icons/Feather';
import Iconn from 'react-native-vector-icons/MaterialCommunityIcons';
import Iconss from 'react-native-vector-icons/Ionicons';
import {Avatar} from 'react-native-elements';
import {PRIMARY_COLOR} from '../assets/colors/colors';
import ImagePicker from 'react-native-image-picker';
import uuid from 'react-native-uuid';
import storage from '@react-native-firebase/storage';

import {MenuProvider} from 'react-native-popup-menu';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {signOut, fetchUser, updateProfile} from '../API/Users';
import {connect} from 'react-redux';
import {AuthContext} from '../Components/authContext';

class Profile extends React.Component {
  static contextType = AuthContext;

  constructor() {
    super();
    this.state = {
      isLoading: true,
      TextInputDisableStatus: false,
      buttonDisableStatus: true,
      username: '',
      email: '',
      address: '',
      photoURL: '',
      uploadUri: '',
      usernameDB: '',
      emailDB: '',
      oldPic: '',
    };
  }

  onLogout = () => {
    const {logout} = this.context;
    logout();
  };

  // _getUsername() {
  //   fetchUser()
  //     .then((data) => {
  //       console.log('DATA', data);
  //       const username = data.val.name;
  //       return username;
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // }

  // _getUserEmail() {
  //   fetchUser()
  //     .then((data) => {
  //       console.log('DATA', data);
  //       const email = data.email;
  //       return email;
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // }
  _getCurrentUser() {
    fetchUser().then((data) => {
      console.log('DATA', data);

      this.setState({
        username: data.val.name,
        email: data.email,
        address: data.val.address,
        isLoading: false,
        photoURL: data.val.photoURL,
        usernameDB: data.val.name,
        emailDB: data.email,
        oldPic: data.val.photoURL,
      });
    });
  }

  componentDidMount() {
    this._getCurrentUser();
  }

  componentWillUnmount() {
    StatusBar.setBarStyle('dark-content');
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('rgba(255,255,255,255)');
      StatusBar.setTranslucent(true);
    }
  }

  _updateProfil = async () => {
    const {username, address, photoURL, email, oldPic} = this.state;
    let newPic = photoURL;
    if (oldPic !== photoURL) {
      newPic = await this._uploadPicture();
    }

    const userProfile = {
      photoURL: newPic,
      username,
      address,
    };

    const userToState = {
      photoURL: newPic,
      username,
      email,
    };

    updateProfile(userProfile)
      .then(() => {
        ToastAndroid.show('PROFILE UPDATED with success', ToastAndroid.SHORT);
        const action = {type: 'SET_CURRENT_USER', value: userToState};
        this.props.dispatch(action);
        console.log(username, address, photoURL);
      })
      .catch((error) => console.log(error));
  };

  async _uploadPicture() {
    const imageName = 'Picture ' + uuid.v4();
    return storage()
      .ref(imageName)
      .putFile(this.state.photoURL)
      .then((snapshot) => {
        // console.log(snapshot);
        //You can check the image is now uploaded in the storage bucket
        // console.log(`${imageName} has been successfully uploaded.`);
        let imageRef = storage().ref('/' + imageName);
        // console.log('IMAGE REF', imageRef);
        return imageRef
          .getDownloadURL()
          .then((url) => {
            //from url you can fetched the uploaded image easily
            return url;
            // console.log('URL', url);
            // this.setState({photoURL: url});
          })
          .catch((e) =>
            console.log('getting downloadURL of image error => ', e),
          );
      })
      .catch((e) => console.log('uploading image error => ', e));
  }
  _selectPicture() {
    const options = {
      title: 'Select Photo',
      storageOptions: {
        skipBackup: true,
        path: 'Pizza Delivery',
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const uri = response.uri;
        this.setState({
          photoURL: uri,
        });
        // console.log('image uri', this.state.photoURL);
      }
    });
  }

  _displayLoading() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size="large" color="white" />
        </View>
      );
    }
  }

  changeName = (text) => {
    this.setState({
      username: text,
    });
  };

  changeEmail = (text) => {
    this.setState({
      email: text,
    });
  };

  changeAddress = (text) => {
    this.setState({
      address: text,
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
              {this._displayLoading()}
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
                      onPress={() => this.props.navigation.navigate('Home')}
                    />
                  </View>
                </View>
                <View>
                  <Menu style={{}}>
                    <MenuTrigger>
                      <Iconn name="dots-vertical" color="white" size={30} />
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
                          this.setState({
                            TextInputDisableStatus: true,
                            buttonDisableStatus: false,
                          })
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
                        customStyles={{
                          optionWrapper: {
                            paddingBottom: 20,
                          },
                        }}
                        onSelect={() => {
                          this.props.navigation.navigate('UpdateEmail');
                        }}
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <Icon name="mail" size={15} color="black" />
                        <Text
                          style={{
                            paddingLeft: 10,
                            fontSize: 16,
                          }}>
                          Change Email
                        </Text>
                      </MenuOption>
                      <MenuOption
                        customStyles={{
                          optionWrapper: {
                            paddingBottom: 20,
                          },
                        }}
                        onSelect={() => {
                          this.props.navigation.navigate('ResetPassword');
                        }}
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <Icon name="lock" size={15} color="black" />
                        <Text
                          style={{
                            paddingLeft: 10,
                            fontSize: 16,
                          }}>
                          Reset Password
                        </Text>
                      </MenuOption>
                      <MenuOption
                        onSelect={() =>
                          signOut().then((response) => {
                            if (response) {
                              this.onLogout();
                              ToastAndroid.show('Sing Out', ToastAndroid.SHORT);
                              this.props.navigation.navigate('Welcome');
                            }
                          })
                        }
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
                <Text style={styles.text}>
                  {this.props.currentUser.username}
                </Text>
                <Text style={styles.text}>{this.props.currentUser.email}</Text>
              </View>
            </View>
            <View style={styles.img_container}>
              <Avatar
                size={130}
                source={{
                  uri: this.state.photoURL,
                }}
                onPress={() => {
                  this._selectPicture();
                }}
                activeOpacity={0.7}
              />
              {/* <Image source={require('../Images/me.png')} style={styles.img} /> */}
            </View>
            <View style={styles.input_container}>
              <View>
                <Text style={styles.label}>Username</Text>

                <TextInput
                  onChangeText={(text) => this.changeName(text)}
                  defaultValue={this.state.username}
                  style={styles.input}
                  editable={this.state.TextInputDisableStatus}></TextInput>
              </View>
              {/* <View>
                <Text style={styles.label}>Email </Text>
                <TextInput
                  onChangeText={(text) => this.changeEmail(text)}
                  defaultValue={this.state.email}
                  style={styles.input}
                  editable={this.state.TextInputDisableStatus}></TextInput>
              </View> */}
              <View>
                <Text style={styles.label}>Address</Text>
                <TextInput
                  onChangeText={(text) => this.changeAddress(text)}
                  defaultValue={this.state.address}
                  style={styles.input}
                  editable={this.state.TextInputDisableStatus}></TextInput>
              </View>
              <TouchableOpacity
                style={styles.button_container}
                disabled={this.state.buttonDisableStatus}
                onPress={() => this._updateProfil()}>
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
    // backgroundColor: 'white',
  },
  top_container: {
    width: 360,
    height: 300,
    backgroundColor: PRIMARY_COLOR,
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    height: 130,
    width: 130,
  },
  button_container: {
    marginTop: 20,
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

const mapStateToProps = (state) => {
  return {
    currentUser: state.setCurrentUser.currentUser,
  };
};

export default connect(mapStateToProps)(Profile);
