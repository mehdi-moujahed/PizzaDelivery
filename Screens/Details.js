import React from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  Text,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Icons from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';
import DetailItem from '../Components/DetailItem';
import Comments from '../Components/Comments';

export default class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      smallSelected: true,
      mediumSelected: false,
      largeSelected: false,
      name: 'Small',
    };
  }

  SelectedSmall() {
    this.setState({
      smallSelected: true,
      mediumSelected: false,
      largeSelected: false,
      name: 'Small',
    });
  }
  SelectedMedium() {
    this.setState({
      smallSelected: false,
      mediumSelected: true,
      largeSelected: false,
      name: 'Medium',
    });
  }
  SelectedLarge() {
    this.setState({
      smallSelected: false,
      mediumSelected: false,
      largeSelected: true,
      name: 'Large',
    });
  }
  componentWillUnmount() {
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('rgba(255,255,255,255)');
      StatusBar.setTranslucent(true);
      StatusBar.setBarStyle('dark-content');
    }
  }
  render() {
    StatusBar.setBarStyle('light-content');
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('rgba(0,0,0,0)');
      StatusBar.setTranslucent(true);
    }

    return (
      <View style={{flex: 1}}>
        <ScrollView style={styles.main_container}>
          <View style={{paddingBottom: 30}}>
            <View style={styles.imgBackground_container}>
              <ImageBackground
                source={require('../Images/pizza_margherita.jpg')}
                style={styles.imgBackground}></ImageBackground>
            </View>

            <View style={styles.second_container}>
              <Text style={styles.title_text}>Pizza Margheritta</Text>
              <View style={{flexDirection: 'row', marginTop: 5}}>
                <Icons name="star" size={18} style={{color: '#F34949'}} />
                <Icons name="star" size={18} style={{color: '#F34949'}} />
                <Icons name="star" size={18} style={{color: '#F34949'}} />
                <Icons name="star" size={18} style={{color: '#F34949'}} />
                <Icons name="star" size={18} style={{color: '#A9A9B0'}} />
              </View>
              <View style={styles.description_container}>
                <Text style={styles.description_text}>
                  For a vegetarian looking for a BIG treat that goes easy on the
                  spices, this one's got it all.. The onions, the capsicum,
                  those delectable mushrooms - with paneer and golden corn to
                  top it all.
                </Text>
              </View>
              <View style={styles.supplements_container}>
                <View style={{flex: 1}}>
                  <Text
                    style={{
                      fontFamily: 'SFProDisplay-Regular',
                      fontSize: 14,
                      color: '#3B3B3B',
                    }}>
                    Sizes
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: 5,
                    }}>
                    <DetailItem
                      selectedItem={this.state.smallSelected}
                      size="Small"
                      price={10}
                      action={() => this.SelectedSmall()}
                    />
                    <DetailItem
                      selectedItem={this.state.mediumSelected}
                      size="Medium"
                      price={15}
                      action={() => this.SelectedMedium()}
                    />
                    <DetailItem
                      selectedItem={this.state.largeSelected}
                      size="Large"
                      price={100}
                      action={() => this.SelectedLarge()}
                    />
                  </View>
                </View>

                <View style={{flex: 1, marginTop: 15}}>
                  <Text
                    style={{
                      fontFamily: 'SFProDisplay-Regular',
                      fontSize: 14,
                      color: '#3B3B3B',
                    }}>
                    Crust
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: 5,
                    }}>
                    <TouchableOpacity
                      style={{
                        borderColor: '#F34949',
                        borderWidth: 1.5,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        height: 30,
                        width: 100,
                      }}
                      onPress={() => console.log('Small pizza selected !')}>
                      <Text
                        style={{
                          color: '#F34949',
                          fontSize: 10,
                          fontFamily: 'SFProDisplay-Medium',
                          margin: 4,
                        }}>
                        Standard
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => console.log('medium pizza selected !')}
                      style={{
                        borderColor: '#A9A9B0',
                        borderWidth: 1.5,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        height: 30,
                        width: 100,
                      }}>
                      <Text
                        style={{
                          color: '#A9A9B0',
                          fontSize: 10,
                          fontFamily: 'SFProDisplay-Medium',
                          margin: 4,
                        }}>
                        Garlic Roasted
                      </Text>
                      <Text
                        style={{
                          fontSize: 10,
                          fontFamily: 'SFProDisplay-Medium',
                          margin: 4,
                          color: '#A9A9B0',
                        }}>
                        Free
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => console.log('large pizza selected !')}
                      style={{
                        borderColor: '#A9A9B0',
                        borderWidth: 1.5,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        height: 30,
                        width: 100,
                      }}>
                      <Text
                        style={{
                          color: '#A9A9B0',
                          fontSize: 10,
                          fontFamily: 'SFProDisplay-Medium',
                          margin: 4,
                        }}>
                        Cheese Brust
                      </Text>
                      <Text
                        style={{
                          fontSize: 10,
                          fontFamily: 'SFProDisplay-Medium',
                          margin: 4,
                          color: '#A9A9B0',
                        }}>
                        Free
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={{flex: 1, marginTop: 15}}>
                  <Text
                    style={{
                      fontFamily: 'SFProDisplay-Regular',
                      fontSize: 14,
                      color: '#3B3B3B',
                    }}>
                    Toppings
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: 5,
                    }}>
                    <TouchableOpacity
                      style={{
                        borderColor: '#F34949',
                        borderWidth: 1.5,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        height: 30,
                        width: 100,
                      }}
                      onPress={() => console.log('Small pizza selected !')}>
                      <Text
                        style={{
                          color: '#F34949',
                          fontSize: 10,
                          fontFamily: 'SFProDisplay-Medium',
                          margin: 4,
                        }}>
                        Standard
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => console.log('medium pizza selected !')}
                      style={{
                        borderColor: '#A9A9B0',
                        borderWidth: 1.5,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        height: 30,
                        width: 100,
                      }}>
                      <Text
                        style={{
                          color: '#A9A9B0',
                          fontSize: 10,
                          fontFamily: 'SFProDisplay-Medium',
                          margin: 4,
                        }}>
                        Extra Cheese
                      </Text>
                      <Text
                        style={{
                          fontSize: 10,
                          fontFamily: 'SFProDisplay-Medium',
                          margin: 4,
                          color: '#A9A9B0',
                        }}>
                        5DT
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => console.log('large pizza selected !')}
                      style={{
                        borderColor: '#A9A9B0',
                        borderWidth: 1.5,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        height: 30,
                        width: 100,
                      }}>
                      <Text
                        style={{
                          color: '#A9A9B0',
                          fontSize: 10,
                          fontFamily: 'SFProDisplay-Medium',
                          margin: 4,
                        }}>
                        Extra Spice
                      </Text>
                      <Text
                        style={{
                          fontSize: 10,
                          fontFamily: 'SFProDisplay-Medium',
                          margin: 4,
                          color: '#A9A9B0',
                        }}>
                        Free
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              <View>
                <Comments />
              </View>
            </View>
          </View>
        </ScrollView>

        <View style={styles.button_container}>
          <TouchableOpacity
            onPress={() => console.log('ss')}
            style={{
              width: Dimensions.get('window').width - 20,
              height: 40,
              backgroundColor: '#F34949',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 13,
            }}>
            <Text
              style={{
                fontFamily: 'SFProDisplay-Semibold',
                fontSize: 12,
                color: 'white',
              }}>
              Add to Cart
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            position: 'absolute',
            top: 0,
            height: 90,
            paddingTop: 25,
            width: '100%',
            backgroundColor: 'rgba(0,0,0,0.2)',
            // opacity: 0.5,
            alignItems: 'center',
            paddingHorizontal: 20,
            // marginLeft: 15,
            // marginRight: 30,
          }}>
          <View>
            <Icon
              name="ios-arrow-back-sharp"
              color="#fff"
              size={30}
              onPress={() => this.props.navigation.goBack()}
            />
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icons name="heart-o" color="#fff" size={30} />
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

  imgBackground_container: {
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: 'hidden',
  },
  imgBackground: {
    height: 360,
    width: Dimensions.get('window').width,
    borderRadius: 15,
  },
  second_container: {
    flex: 1,
    margin: 15,
  },
  title_text: {
    fontFamily: 'SFProDisplay-Bold',
    fontSize: 20,
    color: '#3B3B3B',
  },
  description_container: {
    marginTop: 5,
  },
  description_text: {
    fontFamily: 'SFProDisplay-Regular',
    fontSize: 12,
    color: '#A9A9B0',
  },
  supplements_container: {
    marginTop: 15,
  },
  button_container: {
    marginTop: 15,
    position: 'absolute',
    top: 0,
    paddingTop: Dimensions.get('window').height - 60,
    marginHorizontal: 10,
  },
});
