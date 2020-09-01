import * as React from 'react';
import {View, StyleSheet, Dimensions, Text} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import Icons from 'react-native-vector-icons/Ionicons';
import RecommendedItem from '../Components/RecommendedItem';

const FirstRoute = () => (
  <View style={[styles.scene, {backgroundColor: 'white'}]}>
    <RecommendedItem></RecommendedItem>
  </View>
);

const SecondRoute = () => (
  <View style={[styles.scene, {backgroundColor: 'white'}]}>
    <RecommendedItem></RecommendedItem>
  </View>
);

const ThirdRoute = () => (
  <View style={[styles.scene, {backgroundColor: 'green'}]} />
);

const initialLayout = {width: Dimensions.get('window').width};

export default function Recommended() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Five Stars'},
    {key: 'second', title: 'Four Stars'},
    {key: 'third', title: 'Comments'},
  ]);

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
  });
  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{backgroundColor: '#F34949'}}
      style={{backgroundColor: 'white', elevation: 0}}
      activeColor={'#F34949'}
      inactiveColor="grey"
    />
  );
  return (
    <View style={styles.main_container}>
      <View style={styles.top_container}>
        <View style={{flex: 0.2}}>
          <Icons
            name="ios-arrow-back-sharp"
            size={25}
            onPress={() => this.props.navigation.goBack()}
          />
        </View>
        <View
          style={{justifyContent: 'center', alignItems: 'center', flex: 0.6}}>
          <Text style={{fontSize: 20, fontFamily: 'SFProDisplay-Regular'}}>
            Recommended
          </Text>
        </View>
      </View>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        style={styles.tabview}
        renderTabBar={renderTabBar}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
  main_container: {
    flex: 1,
    backgroundColor: 'white',
  },
  tabview: {
    flex: 1,
  },
  top_container: {
    flexDirection: 'row',
    marginTop: 40,
    marginHorizontal: 20,
    marginBottom: 30,
    alignItems: 'center',
  },
});
