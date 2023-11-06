import {LOGIN,LOGOUT} from './actionTypes.js';
const initialState = {
    isLoggedIn: false
}

const cakeReducer = (state = initialState, action)=>{
    switch(action.type){
        case LOGIN:
            return {
                ...state,
                isLoggedIn: true
            }

        case LOGOUT:
            return {
                ...state,
                isLoggedIn: false
            }
        default:
            return state;
    }
}

export default cakeReducer;