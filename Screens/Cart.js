import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  Text,
  Dimensions,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {getCartItems, deleteItem} from '../API/Pizzas';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import Icons from 'react-native-vector-icons/Ionicons';

export default class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItems: [],
    };
  }

  _getCartItems = () => {
    const userID = auth().currentUser.uid;
    console.log('USER ID', userID);
    database()
      .ref('/cart')
      .orderByChild('userID')
      .equalTo(userID)
      .on('value', (snapshot) => {
        let cartItems = [];
        snapshot.forEach((child) => {
          console.log('CHILD kEY & CHILD VAL', child.key, child.val());
          cartItems = [...cartItems, child.val()];
        });
        // console.log('cart items', cartItems);
        this.setState({
          cartItems,
        });
      });
  };

  renderCartItem = (item) => {
    // console.log('image ', item.pizzaImgURL);
    return (
      <View
        style={{
          backgroundColor: 'white',
          elevation: 10,
          margin: 10,
          marginBottom: 30,
          //  marginHorizontal: 20,
          borderRadius: 10,
        }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={{
              uri: item.pizzaImgURL,
            }}
            style={{
              height: 150,
              width: Dimensions.get('window').width - 50,
              // marginHorizontal: 0,
              borderRadius: 10,
              marginTop: 20,
            }}
          />
        </View>
        <View style={{flex: 0.5}}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 5,
            }}>
            <Text style={{fontSize: 15, fontFamily: 'SFProDisplay-Bold'}}>
              {item.pizzaName}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 20,
              marginTop: 15,
              marginBottom: 20,
            }}>
            <View>
              <View style={{marginBottom: 10}}>
                <Text
                  style={{fontSize: 15, fontFamily: 'SFProDisplay-Regular'}}>
                  Size : {item.pizzaSize}
                </Text>
              </View>
              <View>
                <Text
                  style={{fontSize: 15, fontFamily: 'SFProDisplay-Regular'}}>
                  Price : {item.pizzaPrice}
                </Text>
              </View>
            </View>
            <View>
              <View style={{marginBottom: 10}}>
                <Text
                  style={{fontSize: 15, fontFamily: 'SFProDisplay-Regular'}}>
                  Toppings : {item.pizzaToppings}
                </Text>
              </View>
              <View>
                <Text
                  style={{fontSize: 15, fontFamily: 'SFProDisplay-Regular'}}>
                  Crust : {item.pizzaCrust}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 15,
          }}>
          <TouchableOpacity
            style={styles.delete_button}
            onPress={() => deleteItem(item.itemID)}>
            <Text style={styles.deleteButtonText}>Delete Item From Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  componentDidMount() {
    this._getCartItems();
  }
  render() {
    console.log('State', this.state);
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
              Cart
            </Text>
          </View>
        </View>
        {this.state.cartItems.length === 0 ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 20, fontFamily: 'SFProDisplay-Bold'}}>
              Your Cart is Empty !
            </Text>
          </View>
        ) : (
          <FlatList
            data={this.state.cartItems}
            keyExtractor={(item) => item.itemID.toString()}
            renderItem={({item}) => this.renderCartItem(item)}
            style={{marginTop: 20}}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    backgroundColor: 'white',
  },
  delete_button: {
    backgroundColor: '#F34949',
    width: 310,
    height: 30,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButtonText: {
    fontSize: 12,
    color: '#fff',
    fontFamily: 'SFProDisplay-Semibold',
  },
  top_container: {
    flexDirection: 'row',
    marginTop: 40,
    marginHorizontal: 20,
    marginBottom: 5,
  },
});
