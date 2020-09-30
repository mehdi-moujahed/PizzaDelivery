import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  StatusBar,
  Text,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import CustomMenu from '../Components/CustomMenu';
import Icons from 'react-native-vector-icons/Ionicons';
import database from '@react-native-firebase/database';

export default class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pizzas: [],
      isLoading: true,
    };
  }

  componentWillUnmount() {
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('rgba(255,255,255,255)');
      StatusBar.setTranslucent(true);
      StatusBar.setBarStyle('dark-content');
    }
  }
  _displayLoading() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size="large" color="black" />
        </View>
      );
    }
  }
  _getAllPizzas() {
    database()
      .ref('/pizzas')
      .orderByChild('smallPrice')
      .on('value', (snapshot) => {
        let pizzas = [];
        snapshot.forEach((child) => {
          console.log('StackOverFLow', child.key, child.val());
          pizzas = [...pizzas, child.val()];
        });
        this.setState({
          pizzas,
          isLoading: false,
        });
      });
  }
  componentDidMount() {
    this._getAllPizzas();
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

  render() {
    StatusBar.setBarStyle('dark-content');
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('rgba(0,0,0,0)');
      StatusBar.setTranslucent(true);
    }
    if (this.state.pizzas.length !== 0) {
      console.log('PI', this.state.pizzas[0]);
      console.log('ID', this.state.pizzas['id']);
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
              Menu
            </Text>
          </View>
        </View>

        {/* <ScrollView style={styles.scrollView_container}> */}
        <View style={styles.scrollView_container}>
          {this._displayLoading()}
          <FlatList
            data={this.state.pizzas}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({item}) => this.renderPizzaItem(item)}
            numColumns={2}
          />
        </View>

        {/* </ScrollView> */}
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
  scrollView_container: {
    flex: 1,
    backgroundColor: 'white',
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 10,
    bottom: 0,
  },
});
