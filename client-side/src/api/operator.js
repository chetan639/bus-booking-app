import axios from "./axios";

export const getOperator = (operatorId)=>{ axios.get(`/api/internal/operator/${operatorId}`) }

export const createOperator = (operatorDetails)=>{ axios.post('/api/internal/operator',operatorDetails);}

export const updateOperator = (operatorDetails)=>{ axios.put(`/api/internal/operator/${operatorId}`,operatorDetails);}

export const deleteOperator = (operatorId)=>{ axios.delete(`/api/internal/operator/${operatorId}`);}