
const reducer = (state, action) => {

  return {...state}

  switch (action.type) {
    case 'ADD':

    let ddd = {
      ...state,
      count: action.num,
    }
    return ddd;

    default:
    return {...state}
  }
}
export default reducer;
