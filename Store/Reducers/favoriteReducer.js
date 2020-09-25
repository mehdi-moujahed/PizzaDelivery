import {ToastAndroid} from 'react-native';

const initialState = {favoritesPizza: []};
function toggleFavorite(state = initialState, action) {
  let nextState;
  switch (action.type) {
    case 'TOGGLE_FAVORITE':
      const favoritePizzaIndex = state.favoritesPizza.findIndex(
        (item) => item.id === action.value.id,
      );
      if (favoritePizzaIndex !== -1) {
        //supression
        nextState = {
          ...state,
          favoritesPizza: state.favoritesPizza.filter(
            (item, index) => index !== favoritePizzaIndex,
          ),
        };
        ToastAndroid.show('Pizza retiré des favoris !', ToastAndroid.SHORT);
      } else {
        //ajout
        nextState = {
          ...state,
          favoritesPizza: [...state.favoritesPizza, action.value],
        };
        ToastAndroid.show('Pizza ajouté au favoris !', ToastAndroid.SHORT);
      }
      return nextState || state;

    default:
      return state;
  }
}

export default toggleFavorite;
