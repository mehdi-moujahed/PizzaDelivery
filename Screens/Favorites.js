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
import RecommendedItem from '../Components/RecommendedItem';
import {connect} from 'react-redux';
import Icons from 'react-native-vector-icons/Ionicons';

class Favorites extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favoritesPizza: [],
    };
  }
  renderFavoritesItem = (item) => {
    return (
      <View
        style={{
          backgroundColor: 'white',
          elevation: 10,
          margin: 10,
          marginBottom: 30,
          borderRadius: 10,
        }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={{
              uri: item.imgURL,
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
              {item.name}
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
              <Text style={{fontSize: 15, fontFamily: 'SFProDisplay-Regular'}}>
                Small : {item.smallPrice} DT
              </Text>
            </View>
            <View>
              <Text style={{fontSize: 15, fontFamily: 'SFProDisplay-Regular'}}>
                Medium : {item.mediumPrice} DT
              </Text>
            </View>
            <View>
              <Text style={{fontSize: 15, fontFamily: 'SFProDisplay-Regular'}}>
                Large : {item.largePrice} DT
              </Text>
            </View>
          </View>
        </View>
        {/* <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 15,
          }}>
          <TouchableOpacity
            style={styles.delete_button}
            onPress={() => console.log('ss')}>
            <Text style={styles.deleteButtonText}>
              Delete Item From Favorites
            </Text>
          </TouchableOpacity>
        </View> */}
      </View>
    );
  };
  _getFavoritesPizza() {
    this.setState({
      favoritesPizza: this.props.favoritesPizza,
    });
  }
  componentDidMount() {
    this._getFavoritesPizza();
  }
  render() {
    console.log('favorties pizza', this.state.favoritesPizza);
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
              Favorites
            </Text>
          </View>
        </View>
        {this.state.favoritesPizza.length === 0 ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 20, fontFamily: 'SFProDisplay-Bold'}}>
              There is no pizza in your favoirtes !
            </Text>
          </View>
        ) : (
          <FlatList
            data={this.state.favoritesPizza}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({item}) => this.renderFavoritesItem(item)}
            style={{marginTop: 20}}
          />
        )}
        {/* <RecommendedItem
            img={require('../Images/pizza_2.jpg')}
            title="Pizza Margherita"
            Smallprice={12}
            Mediumprice={15}
            Largeprice={20}
            navigation={this.props.navigation}
          /> */}
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
    marginBottom: 5,
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
});

const mapStateToProps = (state) => {
  return {
    favoritesPizza: state.toggleFavorite.favoritesPizza,
  };
};
export default connect(mapStateToProps)(Favorites);

// export default Favorites;
