import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  ScrollView,
  StatusBar,
} from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons';
import RecommendedItem from '../Components/RecommendedItem';

export default class Recommended extends React.Component {
  componentWillUnmount() {
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('rgba(255,255,255,255)');
      StatusBar.setTranslucent(true);
      StatusBar.setBarStyle('dark-content');
    }
  }
  render() {
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('rgba(255,255,255,255)');
      StatusBar.setTranslucent(true);
      StatusBar.setBarStyle('dark-content');
    }

    return (
      <ScrollView style={styles.main_container}>
        <View style={{backgroundColor: 'white'}}>
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
              <Text style={{fontSize: 20, fontFamily: 'SFProDisplay-Bold'}}>
                Recommended
              </Text>
            </View>
          </View>
          <View style={styles.items_container}>
            <RecommendedItem
              img={require('../Images/pizza_2.jpg')}
              title="Pizza Margherita"
              Smallprice={12}
              Mediumprice={15}
              Largeprice={20}
              navigation={this.props.navigation}
            />
            <RecommendedItem
              img={require('../Images/pizza_margherita.jpg')}
              title="Pizza Margherita"
              Smallprice={12}
              Mediumprice={15}
              Largeprice={20}
              navigation={this.props.navigation}
            />
            <RecommendedItem
              img={require('../Images/pizza_2.jpg')}
              title="Pizza Margherita"
              Smallprice={12}
              Mediumprice={15}
              Largeprice={20}
              navigation={this.props.navigation}
            />
            <RecommendedItem
              img={require('../Images/pizza_2.jpg')}
              title="Pizza Margherita"
              Smallprice={12}
              Mediumprice={15}
              Largeprice={20}
              navigation={this.props.navigation}
            />
            <RecommendedItem
              img={require('../Images/pizza_2.jpg')}
              title="Pizza Margherita"
              Smallprice={12}
              Mediumprice={15}
              Largeprice={20}
              navigation={this.props.navigation}
            />
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
    flexDirection: 'row',
    marginTop: 40,
    marginHorizontal: 20,
    marginBottom: 30,
    alignItems: 'center',
  },
  items_container: {
    flex: 1,
  },
});
