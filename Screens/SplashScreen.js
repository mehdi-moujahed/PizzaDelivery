import React from 'react';
import {View, Image, Text} from 'react-native';

export default class SplashScreen extends React.Component {
  render() {
    return (
      <View
        style={{
          backgroundColor: '#333333',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={require('../Images/pizzaa.jpg')}
          style={{width: 400, height: 400}}></Image>
        {/* <Text
          style={{
            color: '#cb9e67',
            fontFamily: 'SFProDisplay-Regular',
            // fontSize: 20,
          }}>
          The Best Pizza In The City
        </Text> */}
      </View>
    );
  }
}
