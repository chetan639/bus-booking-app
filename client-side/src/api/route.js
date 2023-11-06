import axios from "./axios";

export const getRoute = (routeId)=>{ axios.get(`/api/internal/route/${routeId}`) }

export const createRoute = (routeDetails)=>{ axios.post('/api/internal/route',routeDetails);}

export const updateRoute = (routeDetails)=>{ axios.put(`/api/internal/route/${routeId}`,routeDetails);}

export const deleteRoute = (routeId)=>{ axios.delete(`/api/internal/route/${routeId}`);}