import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
class CarouselItem extends React.Component {
  render() {
    const {data} = this.props;
    return (
      <View>
        <View style={styles.image_container}>
          <Image style={styles.image} source={data.img} />
        </View>
        <View style={styles.title_container}>
          <Text style={styles.text_name}> {data.title} </Text>
        </View>
        <View style={styles.desc_container}>
          <Text style={styles.text_desc}>{data.description}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image_container: {
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 15,
  },
  title_container: {
    paddingTop: 10,
  },
  text_name: {
    fontFamily: 'SFProDisplay-Bold',
    fontSize: 20,
    color: '#3B3B3B',
    textAlign: 'center',
  },
  desc_container: {
    paddingTop: 5,
  },
  text_desc: {
    fontFamily: 'SFProDisplay-Regular',
    fontSize: 12,
    color: '#A9A9B0',
    textAlign: 'center',
    marginLeft: 25,
    marginRight: 25,
  },
});
// });
// import React from 'react';
// import {
//   View,
//   Text,
//   Image,
//   StyleSheet,
//   Dimensions,
//   TouchableOpacity,
// } from 'react-native';

// class CarouselItem extends React.Component {
//   render() {
//     const {data} = this.props;
//     return (
//       <TouchableOpacity
//         style={styles.mainContainer}
//         onPress={() => displayDetails()}>
//         <Image source={data.img} style={styles.recipeImage} />
//         <View style={styles.recipeSummary}>
//           <Text style={styles.textRecipeTitle}>{data.title}</Text>
//           <Text style={styles.textRecipeCategory}>{data.description}</Text>
//         </View>
//       </TouchableOpacity>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   mainContainer: {
//     borderRadius: 13,
//     borderWidth: 1,
//     borderColor: '#e3e3e3',
//     height: 170,
//     marginLeft: 2,
//     marginRight: 2,
//     overflow: 'hidden',
//   },
//   textRecipeCategory: {
//     fontSize: 12,
//     color: '#b5b5b5',
//   },
//   textRecipeTitle: {
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
//   recipeImage: {
//     height: 100,
//     width: Dimensions.get('window').width - 100,
//   },
//   recipeSummary: {
//     marginLeft: 10,
//     marginTop: 5,
//   },
//   recipeRating: {
//     marginTop: 3,
//     flexDirection: 'row',
//   },
// });
export default CarouselItem;
