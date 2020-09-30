import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import {ToastAndroid} from 'react-native';

export const deleteItem = async (itemID) => {
  await database()
    .ref(`/cart/${itemID}`)
    .remove(() => {
      console.log('item deleted');
      ToastAndroid.show('item deleted from cart !', ToastAndroid.SHORT);
    })
    .catch((error) => {
      ToastAndroid.show(
        'error while deleting from cart !',
        error,
        ToastAndroid.SHORT,
      );
    });
};

export const getRecommendedItems = () => {
  return database()
    .ref('/pizzas')
    .orderByChild('isRecommended')
    .equalTo('true')
    .on('value', function (snapshot) {
      console.log('les items recommandé sont :', snapshot.val());
      snapshot.forEach(function (data) {
        console.log('items recommande ', data.key);
      });
    });
};

export const getCartItems = () => {
  const userID = auth().currentUser.uid;
  return database()
    .ref('/cart')
    .orderByChild('userID')
    .equalTo(userID)
    .on('value', function (snapshot) {
      console.log('les valeurs sont :', snapshot.val());
      snapshot.forEach(function (data) {
        console.log('data key ', data.key);
      });
    });
};

export const addToCart = (newOrder) => {
  const newReference = database().ref('/cart').push();
  const userId = auth().currentUser.uid;
  return newReference
    .set({
      itemID: newReference.key,
      userID: userId,
      pizzaName: newOrder.pizzaName,
      pizzaImgURL: newOrder.pizzaImgURL,
      pizzaSize: newOrder.pizzaSize,
      pizzaPrice: newOrder.pizzaPrice,
      pizzaCrust: newOrder.pizzaCrust,
      pizzaToppings: newOrder.pizzaToppings,
    })
    .then(() => {
      console.log('Pizza added to cart ');
    })
    .catch((error) => console.log('error while adding pizza to cart', error));
};
// export const getPizzas = () => {
//   return database()
//     .ref('/pizzas')
//     .on('value', (snapshot) => {
//       let pizzas = [];
//       snapshot.forEach((child) => {
//         //console.log(child.key, child.val());

//         pizzas = [...pizzas, child.val()];
//       });
//       //console.log('P', pizzas);
//       // return () => {
//       //   return new Promise((resolve, reject) => {
//       //     resolve(pizzas);
//       //   });
//       // };
//     });
// };
