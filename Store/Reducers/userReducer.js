const initialState = {currentUser: {}};
export default function setCurrentUser(state = initialState, action) {
  let nextState = {};
  switch (action.type) {
    case 'SET_CURRENT_USER':
      nextState = {
        ...state,
        currentUser: action.value,
      };

      console.log('NEXT STATE', nextState);
      return nextState || state;

    default:
      return state;
  }
}
