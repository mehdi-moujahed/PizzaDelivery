import React from 'react';
import {View, FlatList} from 'react-native';
import RecommendedItem from '../Components/RecommendedItem';
class Favorites extends React.Component {
  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View style={{flex: 1, marginTop: 20}}>
          <RecommendedItem
            img={require('../Images/pizza_2.jpg')}
            title="Pizza Margherita"
            Smallprice={12}
            Mediumprice={15}
            Largeprice={20}
            navigation={this.props.navigation}
          />
        </View>
      </View>
    );
  }
}

export default Favorites;
