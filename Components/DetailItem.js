import React from 'react';
import {TouchableOpacity, Text} from 'react-native';

export default class DetailItem extends React.Component {
  constructor(props) {
    super(props);
  }
  testSelected() {}
  render() {
    let borderStyle = {borderColor: '#A9A9B0', color: '#A9A9B0'};
    if (this.props.selectedItem) {
      borderStyle = {borderColor: '#F34949', color: '#F34949'};
    }
    return (
      <TouchableOpacity
        style={[
          {
            borderWidth: 1.5,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: 30,
            width: 100,
          },
          borderStyle,
        ]}
        onPress={() => {
          this.props.action();
        }}>
        <Text
          style={[
            {
              fontSize: 10,
              fontFamily: 'SFProDisplay-Medium',
              margin: 4,
            },
            borderStyle,
          ]}>
          {this.props.size}
        </Text>
        <Text
          style={[
            {
              fontSize: 10,
              fontFamily: 'SFProDisplay-Medium',
              margin: 4,
            },
            borderStyle,
          ]}>
          {this.props.price}DT
        </Text>
      </TouchableOpacity>
    );
  }
}
