import React from 'react';
import {View, ScrollView, StyleSheet, Text, Image} from 'react-native';
import Icons from 'react-native-vector-icons/FontAwesome';

export default class Comments extends React.Component {
  render() {
    return (
      <ScrollView style={styles.main_container}>
        <View style={styles.comments_container}>
          <View style={styles.top_container}>
            <View style={{flexDirection: 'row'}}>
              <Image source={require('../Images/me.png')} style={styles.img} />
              <View style={{marginLeft: 5}}>
                <Text>Mehdi Moujahed</Text>
                <View style={{flexDirection: 'row'}}>
                  <Icons name="star" size={18} style={{color: '#F34949'}} />
                  <Icons name="star" size={18} style={{color: '#F34949'}} />
                  <Icons name="star" size={18} style={{color: '#F34949'}} />
                  <Icons name="star" size={18} style={{color: '#F34949'}} />
                  <Icons name="star" size={18} style={{color: '#A9A9B0'}} />
                </View>
              </View>
            </View>
            {/* <View style={{}}>
              
            </View> */}
            <View>
              <Text style={styles.date}>26/01/2020</Text>
            </View>
          </View>
          <View style={styles.comments_section}>
            <Text
              style={{
                fontSize: 14,
                fontFamily: 'SFProDisplay-Semibold',
              }}>
              Commented on Pizza Margherita :
            </Text>

            <Text style={styles.comments_text}>
              Lorem impsuim jksdksjdksj kjgfhkgdhgk hk khgfdkhfdk hkhf khfdkhdfk
              hkfhdkdfhkdhfkfhfdkhfkdh khfdkfhkdhf lfdklfdkdlfkfldfkldfklkflk
              dflkfdlkfdl
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
  },
  comments_container: {
    margin: 20,
    borderWidth: 1,
    borderColor: '#F34949',
    borderRadius: 10,
  },
  top_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 5,
    marginLeft: 10,
    marginTop: 10,
  },
  img: {
    height: 40,
    width: 40,
    borderRadius: 50,
  },
  comments_section: {
    marginLeft: 15,
    marginBottom: 10,
    marginTop: 5,
  },
  comments_text: {
    fontSize: 12,
    color: '#A9A9B0',
    marginTop: 5,
  },
  date: {
    fontSize: 12,
    marginRight: 5,
  },
});
