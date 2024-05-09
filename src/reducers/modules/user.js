/*
 * @file: user.js
 * @description: Reducers and actions for store/manipulate user's  data
 * @date: 28.11.2019
 * @author: Poonam
 */

/******** Reducers ********/

const initialState = {
  loggedIn: false,
  notifications: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return { ...state, ...{ loggedIn: true }, ...action.data, supplier_id: action.data?.supplier_id?.id || action.data?.supplier_id?.id ? { ...action.data.supplier_id, id: action.data.supplier_id?.id || action.data.supplier_id?._id }:null };
    case 'LOG_OUT':
      localStorage.removeItem('token')
      return initialState;

    default:
      if(localStorage.getItem('token')){
      return state;
      }else{
        return initialState
      }
  }
}
