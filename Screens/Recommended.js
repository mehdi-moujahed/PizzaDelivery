import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  ScrollView,
  StatusBar,
  FlatList,
} from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons';
import RecommendedItem from '../Components/RecommendedItem';
import database from '@react-native-firebase/database';
import {ActivityIndicator} from 'react-native';

export default class Recommended extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      recommendedItems: [],
    };
  }
  componentWillUnmount() {
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('rgba(255,255,255,255)');
      StatusBar.setTranslucent(true);
      StatusBar.setBarStyle('dark-content');
    }
  }
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
  _displayLoading() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size="large" color="black" />
        </View>
      );
    }
  }
  _getRecommendedItems = () => {
    database()
      .ref('/pizzas')
      .orderByChild('isRecommended')
      .equalTo('true')
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
  componentDidMount() {
    this._getRecommendedItems();
  }
  render() {
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('rgba(255,255,255,255)');
      StatusBar.setTranslucent(true);
      StatusBar.setBarStyle('dark-content');
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
              Recommended
            </Text>
          </View>
        </View>
        <View style={styles.items_container}>
          {this._displayLoading()}

          <FlatList
            data={this.state.recommendedItems}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({item}) => this.renderRecommenedItem(item)}
            style={{marginTop: 20}}
          />
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
    marginTop: 40,
    marginHorizontal: 20,
    marginBottom: 30,
    alignItems: 'center',
  },
  items_container: {
    flex: 1,
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
});
