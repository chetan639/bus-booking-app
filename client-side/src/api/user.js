import axios from "./axios.js";

export const getUser = (emailId)=>{ axios.get(`/api/internal/user/${emailId}`);}

export const updateUser = (userDetails)=>{ axios.put(`/api/internal/user`,userDetails);}

export const deleteUser = (emailId)=>{ axios.delete(`/api/internal/user/${emailId}`);}

export const login = (email,password)=> axios.post(`/api/internal/user/login`,{email, password});


export const logout = ()=>{ axios.post(`/api/internal/user/logout`);}

export const signup = (userDetails)=>{ axios.post(`/api/internal/user/signup`,userDetails);}
