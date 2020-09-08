import React from 'react';
import {View, ScrollView, StyleSheet, StatusBar, Text} from 'react-native';
import CustomMenu from '../Components/CustomMenu';
import Icons from 'react-native-vector-icons/Ionicons';

export default class Menu extends React.Component {
  componentWillUnmount() {
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('rgba(255,255,255,255)');
      StatusBar.setTranslucent(true);
      StatusBar.setBarStyle('dark-content');
    }
  }
  render() {
    StatusBar.setBarStyle('dark-content');
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('rgba(0,0,0,0)');
      StatusBar.setTranslucent(true);
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
            style={{justifyContent: 'center', alignItems: 'center', flex: 0.6}}>
            <Text style={{fontSize: 20, fontFamily: 'SFProDisplay-Bold'}}>
              Menu
            </Text>
          </View>
        </View>
        <ScrollView style={styles.scrollView_container}>
          <View style={{flexDirection: 'row'}}>
            <CustomMenu
              img={require('../Images/pizza0.jpg')}
              title="Pizza Margheritta"
              subtitle="Starts From 8 DT"></CustomMenu>
            <CustomMenu
              img={require('../Images/pizza_margherita.jpg')}
              title="Pizza Napolitana"
              subtitle="Starts From 10 DT"></CustomMenu>
          </View>
          <View style={{flexDirection: 'row'}}>
            <CustomMenu
              img={require('../Images/pizza11.jpg')}
              title="Pizza Veg"
              subtitle="Starts From 12 DT"></CustomMenu>
            <CustomMenu
              img={require('../Images/pizza11.jpeg')}
              title="Pizza Cheese"
              subtitle="Starts From 11 DT"></CustomMenu>
          </View>
          <View style={{flexDirection: 'row'}}>
            <CustomMenu
              img={require('../Images/pineapple.jpg')}
              title="Pineapple Pizza"
              subtitle="Starts From 15 DT"></CustomMenu>
            <CustomMenu
              img={require('../Images/fries.jpg')}
              title="Fries"
              subtitle="Starts From 5 DT"></CustomMenu>
          </View>
          <View style={{flexDirection: 'row'}}>
            <CustomMenu
              img={require('../Images/pizza0.jpg')}
              title="Pizza Margheritta"
              subtitle="Starts From 8 DT"></CustomMenu>
            <CustomMenu
              img={require('../Images/pizza0.jpg')}
              title="Pizza Margheritta"
              subtitle="Starts From 8 DT"></CustomMenu>
          </View>
        </ScrollView>
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
});
