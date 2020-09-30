import React from 'react';
import {View, Image, StyleSheet, Text, TouchableOpacity} from 'react-native';

export default class CustomMenu extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {img, title, subtitle, onPress} = this.props;
    return (
      <View style={styles.main_container}>
        <TouchableOpacity onPress={() => onPress()}>
          <Image source={{uri: img}} style={styles.img_pizza} />
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    marginTop: 15,
    marginLeft: 15,
  },
  img_pizza: {
    width: 155,
    height: 155,
    borderRadius: 13,
  },
  title: {
    fontFamily: 'SFProDisplay-Semibold',
    fontSize: 14,
    color: '#3B3B3B',
    marginTop: 5,
  },
  subtitle: {
    fontFamily: 'SFProDisplay-Regular',
    fontSize: 12,
    color: '#A9A9B0',
    marginTop: 3,
  },
});
