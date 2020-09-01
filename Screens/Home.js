import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import Icons from 'react-native-vector-icons/FontAwesome';
import CustomMenu from '../Components/CustomMenu';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    console.log('looooog', this.props);
  }

  render() {
    return (
      <ScrollView style={styles.main_container}>
        {this.props.isFocused ? (
          <StatusBar barStyle="dark-content" />
        ) : (
          <StatusBar barStyle="dark-content" />
        )}
        <View style={styles.top_container}>
          <View>
            <Icons
              name="user-o"
              size={16}
              style={{color: '#F34949', marginLeft: 15}}>
              {'  '}
              <Text>Welcome</Text>
            </Icons>

            <Text style={styles.text_name}>Mehdi Moujahed</Text>
          </View>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Profile')}>
            <Image
              source={require('../Images/me.png')}
              style={styles.img_profile}></Image>
          </TouchableOpacity>
        </View>
        <View style={styles.recommended}>
          <View>
            <Text style={styles.recommended_text}>Recommended</Text>
            <Text style={styles.subtitle}>Based on the best ratings</Text>
          </View>
          <View>
            <Text
              style={styles.viewAll_text}
              onPress={() => this.props.navigation.navigate('Recommended')}>
              View All
            </Text>
          </View>
        </View>
        <View style={styles.pizza_container}>
          <View style={{alignItems: 'center'}}>
            <Image
              source={require('../Images/pizza_2.jpg')}
              style={styles.img_pizza}
            />
          </View>
          <View
            style={{
              marginLeft: 20,
              marginTop: 15,
            }}>
            <Text
              style={{
                fontSize: 18,
                fontFamily: 'SFProDisplay-Medium',
                color: '#3B3B3B',
              }}>
              Veggie Cheese Extravagenza
            </Text>
            <View style={{flexDirection: 'row', marginTop: 10}}>
              <Icons name="star" size={18} style={{color: '#F34949'}} />
              <Icons name="star" size={18} style={{color: '#F34949'}} />
              <Icons name="star" size={18} style={{color: '#F34949'}} />
              <Icons name="star" size={18} style={{color: '#F34949'}} />
              <Icons name="star" size={18} style={{color: '#A9A9B0'}} />
            </View>
            <View style={styles.pizza_size}>
              <TouchableOpacity
                style={{
                  borderColor: '#F34949',
                  borderWidth: 1.5,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
                onPress={() => console.log('Small pizza selected !')}>
                <Text
                  style={{
                    color: '#F34949',
                    fontSize: 13,
                    fontFamily: 'SFProDisplay-Medium',
                    margin: 4,
                  }}>
                  Small{' '}
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    fontFamily: 'SFProDisplay-Medium',
                    margin: 4,
                    color: '#F34949',
                  }}>
                  10DT
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => console.log('medium pizza selected !')}
                style={{
                  borderColor: '#A9A9B0',
                  borderWidth: 1.5,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: '#A9A9B0',
                    fontSize: 13,
                    fontFamily: 'SFProDisplay-Medium',
                    margin: 4,
                  }}>
                  Medium{' '}
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    fontFamily: 'SFProDisplay-Medium',
                    margin: 4,
                    color: '#A9A9B0',
                  }}>
                  15DT
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => console.log('large pizza selected !')}
                style={{
                  borderColor: '#A9A9B0',
                  borderWidth: 1.5,
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginRight: 15,
                }}>
                <Text
                  style={{
                    color: '#A9A9B0',
                    fontSize: 13,
                    fontFamily: 'SFProDisplay-Medium',
                    margin: 4,
                  }}>
                  Large{' '}
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    fontFamily: 'SFProDisplay-Medium',
                    margin: 4,
                    color: '#A9A9B0',
                  }}>
                  20DT
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.button_container}>
            <TouchableOpacity
              style={styles.customize_button}
              onPress={() => this.props.navigation.navigate('Details')}>
              <Text style={styles.customizeButtonText}>Customize & Add</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.addCart_button}
              onPress={() => console.log('Add to Cart Pressed !')}>
              <Text style={styles.addCartButtonText}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.menu_container}>
          <View style={styles.menu}>
            <View>
              <Text style={styles.recommended_text}>Menu</Text>
              <Text style={styles.subtitle}>What's on our menu</Text>
            </View>
            <View>
              <Text
                style={styles.viewAll_text}
                onPress={() => this.props.navigation.navigate('Menu')}>
                View All
              </Text>
            </View>
          </View>
          <View style={styles.customMenu_container}>
            <View style={styles.customMenu}>
              <CustomMenu
                img={require('../Images/pizza0.jpg')}
                title="Pizza Margheritta"
                subtitle="Starts From 8 DT"></CustomMenu>
              <CustomMenu
                img={require('../Images/pizza_margherita.jpg')}
                title="Pizza Napolitana"
                subtitle="Starts From 10 DT"></CustomMenu>
            </View>
            <View style={styles.customMenu}>
              <CustomMenu
                img={require('../Images/pizza11.jpg')}
                title="Pizza Veg"
                subtitle="Starts From 8 DT"></CustomMenu>
              <CustomMenu
                img={require('../Images/pizza11.jpeg')}
                title="Pizza Fromage"
                subtitle="Starts From 10 DT"></CustomMenu>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    backgroundColor: 'white',
  },
  top_container: {
    flex: 0.2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40,
    alignItems: 'center',
    // backgroundColor: 'white',
  },
  text_name: {
    fontSize: 16,
    marginLeft: 15,
    marginTop: 5,
  },
  img_profile: {
    height: 45,
    width: 45,
    borderRadius: 50,
    marginRight: 15,
  },
  recommended: {
    flex: 0.2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40,
    marginLeft: 15,
  },
  recommended_text: {
    fontSize: 20,
    fontFamily: 'SFProDisplay-Bold',
    color: '#3B3B3B',
  },
  subtitle: {
    fontSize: 12,
    fontFamily: 'SFProDisplay-Regular',
    color: '#A9A9B0',
  },
  viewAll_text: {
    color: '#F34949',
    fontFamily: 'SFProDisplay-Semibold',
    fontSize: 14,
    marginRight: 15,
  },
  pizza_container: {
    flex: 0.8,
    marginTop: 30,
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 8,
    // height: 415,
    // width: 335,

    elevation: 10,
    backgroundColor: '#FBFBFB',
  },
  img_pizza: {
    width: 295,
    height: 172,
    borderRadius: 13,
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menu_container: {
    flex: 1,
  },
  menu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    marginLeft: 15,
  },
  pizza_size: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button_container: {
    marginTop: 15,
    alignItems: 'center',
  },
  customize_button: {
    backgroundColor: '#e8e8e8',
    width: 295,
    height: 30,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addCart_button: {
    backgroundColor: '#F34949',
    width: 295,
    height: 30,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 15,
  },
  customizeButtonText: {
    fontSize: 12,
    color: '#3B3B3B',
    fontFamily: 'SFProDisplay-Semibold',
  },
  addCartButtonText: {
    fontSize: 12,
    color: '#fff',
    fontFamily: 'SFProDisplay-Semibold',
  },
  customMenu_container: {
    flex: 1,
    marginBottom: 10,
  },
  customMenu: {
    flexDirection: 'row',
    // marginBottom: 10,
  },
});
