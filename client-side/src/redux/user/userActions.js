import { LOGIN,LOGOUT } from "./actionTypes"
export const actionLogin = ()=>{
    return{
        type: LOGIN
    }
};

export const actionLogout = ()=>{
    return{
        type: LOGOUT
    }
}