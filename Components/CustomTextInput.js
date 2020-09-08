import React from 'react';
import {TextInput, View, StyleSheet, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class CustomTextInput extends React.Component {
  render() {
    const {
      placeHolder,
      iconName,
      size = 20,
      secureTextEntry = false,
    } = this.props;

    return (
      <View style={styles.main_container}>
        <Icon name={iconName} size={size} style={styles.icon} />
        <TextInput
          placeholder={placeHolder}
          style={styles.input}
          placeholderTextColor="#8E8E8E"
          secureTextEntry={secureTextEntry}></TextInput>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  main_container: {
    flexDirection: 'row',
    alignItems: 'center',
    opacity: 0.7,
    backgroundColor: '#f8f8f8',
    borderRadius: 20,
    margin: 15,
  },
  input: {
    flex: 0.9,
  },
  icon: {
    flex: 0.1,
    marginLeft: 20,
    color: '#8E8E8E',
  },
});
