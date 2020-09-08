import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {PRIMARY_COLOR, SECONDARY_COLOR} from '../assets/colors/colors';

export default class DetailItem extends React.Component {
  constructor(props) {
    super(props);
  }
  testSelected() {}
  render() {
    return (
      <TouchableOpacity
        style={[
          styles.main_container,
          this.props.isSelected ? {borderColor: PRIMARY_COLOR} : {},
          this.props.toppingId ? {borderColor: PRIMARY_COLOR} : {},
          this.props.crustId ? {borderColor: PRIMARY_COLOR} : {},
          this.props.isRecommended ? {width: 90} : {},
        ]}
        onPress={() => {
          this.props.onPress();
        }}>
        <Text
          style={[
            styles.text,
            this.props.isSelected ? {color: PRIMARY_COLOR} : {},
            this.props.toppingId ? {color: PRIMARY_COLOR} : {},
            this.props.crustId ? {color: PRIMARY_COLOR} : {},
          ]}>
          {this.props.size}
        </Text>
        <Text
          style={[
            styles.text,
            this.props.isSelected ? {color: PRIMARY_COLOR} : {},
            this.props.toppingId ? {color: PRIMARY_COLOR} : {},
            this.props.crustId ? {color: PRIMARY_COLOR} : {},
          ]}>
          {this.props.price}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  main_container: {
    borderWidth: 1.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 30,
    width: 100,
    borderColor: SECONDARY_COLOR,
  },
  text: {
    fontSize: 10,
    fontFamily: 'SFProDisplay-Medium',
    margin: 4,
    color: SECONDARY_COLOR,
  },
});
