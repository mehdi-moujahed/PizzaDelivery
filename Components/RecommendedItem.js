import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icons from 'react-native-vector-icons/FontAwesome';

export default class RecommendedItem extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      img = require('../Images/pizza11.jpg'),
      title = 'Veggie Cheese Extravagenza',
      Smallprice = '10',
      Mediumprice = '12',
      Largeprice = '18',
      navigation,
    } = this.props;
    return (
      <ScrollView style={{flex: 1}}>
        <View style={styles.main_container}>
          <View style={styles.pizza_container}>
            <View style={{alignItems: 'center'}}>
              <Image source={img} style={styles.img_pizza} />
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
                {title}
              </Text>
              <View style={{flexDirection: 'row', marginTop: 10}}>
                <Icons name="star" size={18} style={{color: '#F34949'}} />
                <Icons name="star" size={18} style={{color: '#F34949'}} />
                <Icons name="star" size={18} style={{color: '#F34949'}} />
                <Icons name="star" size={18} style={{color: '#F34949'}} />
                <Icons name="star" size={18} style={{color: '#F34949'}} />
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
                    {Smallprice}DT
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
                    {Mediumprice}DT
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
                    {Largeprice}DT
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.button_container}>
              <TouchableOpacity
                style={styles.customize_button}
                onPress={() => navigation.navigate('Details')}>
                <Text style={styles.customizeButtonText}>Customize & Add</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.addCart_button}
                onPress={() => console.log('Add to Cart Pressed !')}>
                <Text style={styles.addCartButtonText}>Add to Cart</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  pizza_container: {
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 8,
    height: 390,
    width: 335,
    elevation: 10,
    backgroundColor: '#FBFBFB',
  },
  main_container: {
    flex: 1,
  },
  img_pizza: {
    width: 295,
    height: 172,
    borderRadius: 13,
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
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
});
