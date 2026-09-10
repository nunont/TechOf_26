import apiClient from './client';

export const getMyBookings = () => apiClient.get('/bookings/me').then((res) => res.data);

export const getMyClubBookings = () => apiClient.get('/bookings/club-me').then((res) => res.data);

export const createBooking = (data) => apiClient.post('/bookings', data).then((res) => res.data);

export const updateBooking = (id, data) => apiClient.put(`/bookings/${id}`, data).then((res) => res.data);

export const deleteBooking = (id) => apiClient.delete(`/bookings/${id}`).then((res) => res.data);
