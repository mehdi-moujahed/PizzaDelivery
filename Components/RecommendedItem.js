import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Dimensions,
} from 'react-native';
import Icons from 'react-native-vector-icons/FontAwesome';
import {PRIMARY_COLOR, SECONDARY_COLOR} from '../assets/colors/colors';
import DetailItem from './DetailItem';

const DATA = [
  {
    id: '1',
    size: 'Small',
    price: '10DT',
  },
  {
    id: '2',
    size: 'Medium',
    price: '15DT',
  },
  {
    id: '3',
    size: 'Large',
    price: '20DT',
  },
];

const Item = ({item, onPress, isSelected, isRecommended}) => (
  <DetailItem
    size={item.size}
    price={item.price}
    onPress={onPress}
    isSelected={isSelected}
    isRecommended={isRecommended}
  />
);

export default class RecommendedItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedId: DATA[0].id,
    };
  }

  render() {
    const {
      img = require('../Images/pizza11.jpg'),
      title = 'Veggie Cheese Extravagenza',
      navigation,
    } = this.props;

    renderItem = ({item}) => {
      return (
        <Item
          item={item}
          onPress={() =>
            this.setState({
              selectedId: item.id,
            })
          }
          isSelected={item.id === this.state.selectedId}
          isRecommended={true}
        />
      );
    };
    return (
      <ScrollView style={{flex: 1}}>
        <View style={styles.main_container}>
          <View style={styles.pizza_container}>
            <View style={{alignItems: 'center'}}>
              <Image source={img} style={styles.img_pizza} />
            </View>
            <View style={styles.second_container}>
              <Text style={styles.pizza_title}>{title}</Text>
              <View style={{flexDirection: 'row', marginTop: 10}}>
                <Icons name="star" size={18} style={{color: PRIMARY_COLOR}} />
                <Icons name="star" size={18} style={{color: PRIMARY_COLOR}} />
                <Icons name="star" size={18} style={{color: PRIMARY_COLOR}} />
                <Icons name="star" size={18} style={{color: PRIMARY_COLOR}} />
                <Icons name="star" size={18} style={{color: PRIMARY_COLOR}} />
              </View>
              <View style={styles.pizza_size}>
                <FlatList
                  data={DATA}
                  renderItem={renderItem}
                  keyExtractor={(item) => item.id}
                  extraData={this.state.selectedId}
                  horizontal={true}
                  contentContainerStyle={styles.flatlist}
                />
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
    borderRadius: 8,
    marginLeft: 20,
    height: 390,
    width: Dimensions.get('window').width - 40,
    elevation: 10,
    backgroundColor: '#FBFBFB',
  },
  main_container: {
    flex: 1,
  },
  flatlist: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
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
    backgroundColor: PRIMARY_COLOR,
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
  second_container: {
    marginLeft: 15,
    marginTop: 15,
    marginRight: 15,
  },
  pizza_title: {
    fontSize: 18,
    fontFamily: 'SFProDisplay-Medium',
    color: '#3B3B3B',
  },
});
