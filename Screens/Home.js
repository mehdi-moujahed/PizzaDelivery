import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import Icons from 'react-native-vector-icons/FontAwesome';
import CustomMenu from '../Components/CustomMenu';
import RecommendedItem from '../Components/RecommendedItem';
import {fetchUser, getCurrentUser} from '../API/Users';
import {connect} from 'react-redux';
import database from '@react-native-firebase/database';
import {PRIMARY_COLOR} from '../assets/colors/colors';
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pizzas: [],
      recommendedItems: [],
      isLoading: true,
    };
  }

  _getCurrentUsername() {
    fetchUser().then((data) => {
      console.log('DATA', data);
      const action = {
        type: 'SET_CURRENT_USER',
        value: {
          username: data.val.name,
          email: data.email,
          address: data.val.address,
          photoURL: data.val.photoURL,
        },
      };
      this.props.dispatch(action);
      this.setState({
        isLoading: false,
      });
    });
  }
  _getPizzas() {
    database()
      .ref('/pizzas')
      .orderByChild('smallPrice')
      .limitToFirst(4)
      .on('value', (snapshot) => {
        let pizzas = [];
        snapshot.forEach((child) => {
          pizzas = [...pizzas, child.val()];
        });
        this.setState({
          pizzas,
          isLoading: false,
        });
      });
  }

  _displayLoading() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size="large" color={PRIMARY_COLOR} />
        </View>
      );
    }
  }
  renderPizzaItem = (item) => {
    return (
      <CustomMenu
        img={item.imgURL}
        title={item.name}
        subtitle={`Starts From ${item.smallPrice} DT`}
        onPress={() =>
          this.props.navigation.navigate('Details', {
            pizzaItem: item,
          })
        }
      />
    );
  };
  _getFristRecommendedItem = () => {
    database()
      .ref('/pizzas')
      .orderByChild('isRecommended')
      .equalTo('true')
      .limitToFirst(1)
      .on('value', (snapshot) => {
        console.log('aa', snapshot);
        let recommendedItems = [];
        snapshot.forEach((child) => {
          console.log('CHILD kEY & CHILD VAL', child.key, child.val());
          recommendedItems = [...recommendedItems, child.val()];
        });
        // console.log('cart items', cartItems);
        this.setState({
          recommendedItems,
          isLoading: false,
        });
      });
  };
  renderRecommenedItem = (item) => {
    return (
      <RecommendedItem
        img={item.imgURL}
        title={item.name}
        Smallprice={item.smallPrice}
        Mediumprice={item.mediumPrice}
        Largeprice={item.largePrice}
        onPress={() =>
          this.props.navigation.navigate('Details', {
            pizzaItem: item,
          })
        }
      />
    );
  };
  componentDidMount() {
    this._getCurrentUsername();
    this._getPizzas();
    this._getFristRecommendedItem();
  }
  componentWillMount() {
    StatusBar.setBarStyle('dark-content');
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('rgba(255,255,255,255)');
      StatusBar.setTranslucent(true);
    }
  }
  render() {
    // console.log('recommended items ', this.state.recommendedItems['imgURL']);
    return (
      <ScrollView style={styles.main_container}>
        <View style={styles.top_container}>
          {this._displayLoading()}
          <View>
            <View style={styles.welcome_container}>
              <Icons name="user-o" size={16} style={styles.user_icon}></Icons>
              <Text style={styles.welcome_text}>Welcome</Text>
            </View>
            <Text style={styles.text_name}>
              {this.props.currentUser.username}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Profile')}>
            <Image
              source={{uri: this.props.currentUser.photoURL}}
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
          <FlatList
            data={this.state.recommendedItems}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({item}) => this.renderRecommenedItem(item)}
          />
          {/* <RecommendedItem
            img={require('../Images/pizza_2.jpg')}
            title="Pizza Margherita"
            Smallprice={12}
            Mediumprice={15}
            Largeprice={20}
            navigation={this.props.navigation}
          /> */}
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
            <View>
              <FlatList
                data={this.state.pizzas}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => this.renderPizzaItem(item)}
                numColumns={2}
              />
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
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
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
    flex: 1,
    marginTop: 20,
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
  welcome_container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  user_icon: {
    color: '#F34949',
    marginLeft: 15,
  },
  welcome_text: {
    color: '#F34949',
    fontSize: 16,
    paddingLeft: 5,
  },
});

const mapStateToProps = (state) => {
  return {
    currentUser: state.setCurrentUser.currentUser,
  };
};

export default connect(mapStateToProps)(Home);
