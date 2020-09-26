import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Platform,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import CarouselItem from '../Components/CarouselItem';
import Carousel, {Pagination} from 'react-native-snap-carousel';

export default class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      items: [
        {
          img: require('../Images/pizza_3.jpg'),
          title: 'Love At First Slice',
          description:
            "Our pizza's taste is the best in the entire city, try it and you will never regret it ! ",
        },
        {
          img: require('../Images/pizza_2.jpg'),
          title: 'Crispy & Soft ',
          description:
            'What are you waiting for? \n Order now the best pizza in Sousse ',
        },
        {
          img: require('../Images/pizza_1.jpg'),
          title: 'Fast Fresh Delicious',
          description:
            'We offer the fast, fresh and delecious pizza ever and with the size that fits you ',
        },
      ],
    };
  }

  _renderItem({item, index}) {
    return <CarouselItem data={item} />;
  }
  get pagination() {
    const {items, activeIndex} = this.state;
    return (
      <Pagination
        dotsLength={items.length}
        activeDotIndex={activeIndex}
        containerStyle={{
          backgroundColor: 'rgba(0, 0, 0, 0)',
          paddingVertical: 15,
        }}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 8,
          backgroundColor: 'rgba(0, 0, 0, 0.92)',
        }}
        inactiveDotStyle={{}}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    );
  }

  render() {
    StatusBar.setBarStyle('dark-content');
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('rgba(0,0,0,0)');
      StatusBar.setTranslucent(true);
    }

    return (
      <ScrollView style={styles.main_container}>
        <View style={{flex: 1}}>
          <View style={styles.carouselView}>
            <Carousel
              layout={'default'}
              ref={(ref) => (this.carousel = ref)}
              data={this.state.items}
              sliderWidth={Dimensions.get('window').width}
              itemWidth={Dimensions.get('window').width - 65}
              renderItem={this._renderItem}
              onSnapToItem={(index) => this.setState({activeIndex: index})}
            />
            {this.pagination}
          </View>
          <View style={styles.button_container}>
            <TouchableOpacity
              style={styles.fb_button}
              onPress={() => console.log('Facebook button pressed')}>
              <Text style={styles.button_text}>Signup with Facebook</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.google_button}
              onPress={() => console.log('Google button pressed')}>
              <Text style={styles.button_text}>Signup with Google</Text>
            </TouchableOpacity>
            <Text style={styles.or}>or</Text>
            <TouchableOpacity
              style={styles.mail_button}
              onPress={() => this.props.navigation.navigate('Register')}>
              <Text style={styles.mail_text}>Signup with Email</Text>
            </TouchableOpacity>
            <View style={styles.register_container}>
              <Text style={styles.newUser_text}>Existing user?</Text>
              <TouchableOpacity
                style={{paddingLeft: 20}}
                onPress={() => this.props.navigation.navigate('Login')}>
                <Text style={styles.register_text}>Login now</Text>
              </TouchableOpacity>
            </View>
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
  carouselView: {
    flex: 1,
    marginTop: 60,
  },
  or: {
    color: '#929292',
    paddingTop: 5,
    fontSize: 10,
  },
  fb_button: {
    backgroundColor: '#3B5998',
    width: 215,
    height: 30,
    borderRadius: 8,
  },
  google_button: {
    backgroundColor: '#F14336',
    width: 215,
    height: 30,
    borderRadius: 8,
    marginTop: 15,
  },
  mail_button: {
    marginTop: 15,
  },
  mail_text: {
    fontFamily: 'SFProDisplay-Semibold',
    fontSize: 12,
  },
  button_container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 50,
  },
  button_text: {
    fontFamily: 'SFProDisplay-Semibold',
    fontSize: 12,
    color: 'white',
    textAlign: 'center',
    paddingTop: 6,
  },
  register_container: {
    marginTop: 20,
    flexDirection: 'row',
  },
  register_text: {
    fontFamily: 'SFProDisplay-Semibold',
    color: '#F34949',
    fontSize: 12,
  },

  newUser_text: {
    fontFamily: 'SFProDisplay-Regular',
    fontSize: 12,
    color: '#BDBABA',
  },
});
