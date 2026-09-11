import apiClient from './client';

export const getMyGuest = () => apiClient.get('/guests/me').then((res) => res.data);

export const createGuest = (data) => apiClient.post('/guests', data).then((res) => res.data);

export const updateGuest = (id, data) => apiClient.put(`/guests/${id}`, data).then((res) => res.data);
