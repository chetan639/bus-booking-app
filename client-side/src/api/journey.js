import axios from "./axios";

export const getJourney = (journeyId)=>{ axios.get(`/api/internal/journey/${journeyId}`);}

export const createJourney = (journeyDetails)=>{ axios.post('/api/internal/journey',journeyDetails);}

export const updateJourney = (journeyDetails)=>{ axios.put(`/api/internal/journey/${journeyId}`,journeyDetails);}

export const deleteJourney = (journeyId)=>{ axios.delete(`/api/internal/journey/${journeyId}`);}