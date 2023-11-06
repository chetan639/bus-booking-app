import axios from "./axios.js";

export const getBus = (busId)=>{ axios.get(`/api/internal/bus/${busId}`);}

export const createBus = (busDetails)=>{ axios.post(`/api/internal/bus`,busDetails) }

export const updateBus = (busDetails)=>{ axios.put(`/api/internal/bus`,busDetails) }

export const deleteBus = (busId)=>{ axios.delete(`/api/internal/bus/${busId}`) }

