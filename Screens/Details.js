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
  FlatList,
  ToastAndroid,
} from 'react-native';
import Icons from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';
import DetailItem from '../Components/DetailItem';
import Comments from '../Components/Comments';
import {connect} from 'react-redux';
import {PRIMARY_COLOR} from '../assets/colors/colors';
import {addToCart} from '../API/Pizzas';
// const PIZZA = [
//   {
//     name: 'Pizza Margherita',
//     img: '../Images/pizza_margherita.jpg',
//     price: '10DT',
//   },
//   {
//     name: 'Pizza Thon',
//     img: '../Images/pizza.jpg',
//     price: '15DT',
//   },
//   {
//     name: 'pizza Pineapple',
//     img: '../Images/pineapple.jpg',
//     price: '20DT',
//   },
// ];

// const DATA = [
//   {
//     id: '1',
//     size: 'Small',
//     price: '10DT',
//   },
//   {
//     id: '2',
//     size: 'Medium',
//     price: '15DT',
//   },
//   {
//     id: '3',
//     size: 'Large',
//     price: '20DT',
//   },
// ];

const CRUST = [
  {
    id: '1',
    size: 'Standard',
  },
  {
    id: '2',
    size: 'Garlic Roasted',
    price: 'Free',
  },
  {
    id: '3',
    size: 'Cheese Brust',
    price: 'Free',
  },
];

const TOPPINGS = [
  {
    id: '1',
    size: 'Standard',
  },
  {
    id: '2',
    size: 'Extra Cheese',
    price: 'Free',
  },
  {
    id: '3',
    size: 'Extra Spice',
    price: 'Free',
  },
];
const Item = ({item, onPress, isSelected, crustId, toppingId}) => (
  <DetailItem
    size={item.size}
    price={item.price}
    onPress={onPress}
    isSelected={isSelected}
    crustId={crustId}
    toppingId={toppingId}
  />
);

class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      SIZES: [
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
      ],

      selectedSizeId: '1',
      toppingId: TOPPINGS[0].id,
      crustId: CRUST[0].id,
      // pizza: PIZZA[0],
    };

    this.pizza = this.props.navigation.state.params.pizzaItem;
  }

  componentDidMount() {}
  _toggleFavorite() {
    const action = {type: 'TOGGLE_FAVORITE', value: this.pizza};
    this.props.dispatch(action);
  }

  getSelectedSize = () => {
    const size = this.state.SIZES.find(
      (item) => item.id === this.state.selectedSizeId,
    );
    return size;
  };

  getSelectedCrust = () => {
    const crust = CRUST.find((item) => item.id === this.state.crustId);
    return crust;
  };

  getSelectedToppings = () => {
    const toppings = TOPPINGS.find((item) => item.id === this.state.toppingId);
    return toppings;
  };

  _addToCart() {
    const newOrder = {
      pizzaName: this.pizza.name,
      pizzaImgURL: this.pizza.imgURL,
      pizzaSize: this.getSelectedSize().size,
      pizzaPrice: this.getSelectedSize().price,
      pizzaCrust: this.getSelectedCrust().size,
      pizzaToppings: this.getSelectedToppings().size,
    };
    addToCart(newOrder)
      .then((response) => {
        console.log('Pizza ajouté avec succes', response);
        ToastAndroid.show('Pizza added to cart', ToastAndroid.SHORT);
      })
      .catch((error) => {
        console.log('error while adding to cart', error);
        ToastAndroid.show('error while adding to cart', ToastAndroid.SHORT);
      });
  }
  _displayFavoriteIcon() {
    if (
      this.props.favoritesPizza.findIndex(
        (item) => item.id == this.pizza.id,
      ) !== -1
    ) {
      return (
        <Icons
          name="heart"
          color="#fff"
          size={30}
          onPress={() => this._toggleFavorite()}
        />
      );
    }

    return (
      <Icons
        name="heart-o"
        color="#fff"
        size={30}
        onPress={() => this._toggleFavorite()}
      />
    );
  }

  componentDidUpdate() {
    console.log('Favorites Pizza : ', this.props.favoritesPizza);
  }
  componentWillUnmount() {
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('rgba(255,255,255,255)');
      StatusBar.setTranslucent(true);
      StatusBar.setBarStyle('dark-content');
    }
  }
  renderSizesItem = (item) => {
    let price = 0;
    if (item.size === 'Small') {
      price = this.pizza.smallPrice;
    }
    if (item.size === 'Medium') {
      price = this.pizza.mediumPrice;
    }
    if (item.size === 'Large') {
      price = this.pizza.largePrice;
    }
    item.price = price + ' DT';
    return (
      <Item
        item={item}
        onPress={() =>
          this.setState({
            selectedSizeId: item.id,
          })
        }
        isSelected={item.id === this.state.selectedSizeId}
      />
    );
  };

  renderItemSecond = (item) => {
    return (
      <Item
        item={item}
        onPress={() => {
          this.setState({
            crustId: item.id,
          });
        }}
        crustId={item.id === this.state.crustId}
      />
    );
  };

  renderItemthree = (item) => {
    return (
      <Item
        item={item}
        onPress={() => {
          this.setState({
            toppingId: item.id,
          });
        }}
        toppingId={item.id === this.state.toppingId}
      />
    );
  };
  render() {
    console.log('My pizza :', this.pizza);
    StatusBar.setBarStyle('light-content');
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('rgba(0,0,0,0)');
      StatusBar.setTranslucent(true);
    }

    return (
      <View style={{flex: 1}}>
        <ScrollView style={styles.main_container}>
          <View style={styles.imgBackground_container}>
            <ImageBackground
              source={{uri: this.pizza.imgURL}}
              style={styles.imgBackground}></ImageBackground>
          </View>

          <View style={styles.second_container}>
            <Text style={styles.title_text}>{this.pizza.name}</Text>
            {/* <View style={{flexDirection: 'row', marginTop: 5}}>
              <Icons name="star" size={18} style={{color: '#F34949'}} />
              <Icons name="star" size={18} style={{color: '#F34949'}} />
              <Icons name="star" size={18} style={{color: '#F34949'}} />
              <Icons name="star" size={18} style={{color: '#F34949'}} />
              <Icons name="star" size={18} style={{color: '#A9A9B0'}} />
            </View> */}
            <View style={styles.description_container}>
              <Text style={styles.description_text}>
                {this.pizza.description}
              </Text>
            </View>
            <View style={styles.supplements_container}>
              <View style={{flex: 1}}>
                <Text style={styles.supplement_title}>Sizes</Text>
                <FlatList
                  data={this.state.SIZES}
                  renderItem={({item}) => this.renderSizesItem(item)}
                  keyExtractor={(item) => item.id}
                  extraData={this.state.selectedSizeId}
                  horizontal={true}
                  contentContainerStyle={styles.flatlist}
                />
              </View>

              <View style={{flex: 1, marginTop: 15}}>
                <Text style={styles.supplement_title}>Crust</Text>
                <FlatList
                  data={CRUST}
                  renderItem={({item}) => this.renderItemSecond(item)}
                  keyExtractor={(item) => item.id}
                  extraData={this.state.crustId}
                  horizontal={true}
                  contentContainerStyle={styles.flatlist}
                />
              </View>

              <View style={{flex: 1, marginTop: 15, marginBottom: 15}}>
                <Text style={styles.supplement_title}>Toppings</Text>
                <FlatList
                  data={TOPPINGS}
                  renderItem={({item}) => this.renderItemthree(item)}
                  keyExtractor={(item) => item.id}
                  extraData={this.state.toppingId}
                  horizontal={true}
                  contentContainerStyle={styles.flatlist}
                />
              </View>
            </View>
            <View style={styles.button_container}>
              <TouchableOpacity
                onPress={() => console.log('Size selected', this._addToCart())}
                style={styles.btnAdd}>
                <Text style={styles.btnAdd_text}>Add to Cart</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        <View style={styles.top_container}>
          <View>
            <Icon
              name="ios-arrow-back-sharp"
              color="#fff"
              size={30}
              onPress={() => this.props.navigation.goBack()}
            />
          </View>
          <View style={styles.icon}>{this._displayFavoriteIcon()}</View>
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
  top_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    top: 0,
    height: 90,
    paddingTop: 25,
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatlist: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  btnAdd: {
    width: Dimensions.get('window').width - 20,
    height: 40,
    backgroundColor: '#F34949',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 13,
  },
  btnAdd_text: {
    fontFamily: 'SFProDisplay-Semibold',
    fontSize: 12,
    color: 'white',
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
    // position: 'absolute',
    // top: 65,
    // left: 0,
    // right: 0,
    // bottom: 0,
    // paddingTop: Dimensions.get('window').height - 60,
    // marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  supplement_title: {
    fontFamily: 'SFProDisplay-Regular',
    fontSize: 14,
    color: '#3B3B3B',
    marginBottom: 5,
  },
});

const mapStateToProps = (state) => {
  return {
    favoritesPizza: state.toggleFavorite.favoritesPizza,
  };
};
export default connect(mapStateToProps)(Details);
