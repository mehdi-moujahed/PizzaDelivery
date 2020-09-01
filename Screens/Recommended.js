import * as React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';

const FirstRoute = () => (
  <View style={[styles.scene, {backgroundColor: 'black'}]} />
);

const SecondRoute = () => (
  <View style={[styles.scene, {backgroundColor: '#673ab7'}]} />
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
    {key: 'third', title: 'Three Stars'},
  ]);

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
  });
  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{backgroundColor: 'white'}}
      style={{backgroundColor: '#F34949', elevation: 0}}
      activeColor={'white'}
      inactiveColor="black"
    />
  );
  return (
    <View style={styles.main_container}>
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
    marginTop: 120,
  },
});
