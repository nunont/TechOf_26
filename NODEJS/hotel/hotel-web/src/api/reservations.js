import apiClient from './client';

export const getMyReservations = () => apiClient.get('/reservations/me').then((res) => res.data);

export const getMyHotelReservations = () => apiClient.get('/reservations/hotel-me').then((res) => res.data);

export const createReservation = (data) => apiClient.post('/reservations', data).then((res) => res.data);

export const updateReservation = (id, data) => apiClient.put(`/reservations/${id}`, data).then((res) => res.data);

export const deleteReservation = (id) => apiClient.delete(`/reservations/${id}`).then((res) => res.data);
