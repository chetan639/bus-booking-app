import axios from "./axios";

export const getBooking = (bookingId)=>{ axios.get(`/api/internal/booking/${bookingId}`) }

export const createBooking = (bookingDetails)=>{ axios.post('/api/internal/booking',bookingDetails);}

export const updateBooking = (bookingDetails)=>{ axios.put(`/api/internal/booking/${bookingId}`,bookingDetails);}

export const deleteBooking = (bookingId)=>{ axios.delete(`/api/internal/booking/${bookingId}`);}