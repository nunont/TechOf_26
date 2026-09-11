import apiClient from './client';

export const getRooms = (params) => apiClient.get('/rooms', { params }).then((res) => res.data);

export const getRoomById = (id) => apiClient.get(`/rooms/${id}`).then((res) => res.data);

export const createRoom = (data) => apiClient.post('/rooms', data).then((res) => res.data);

export const updateRoom = (id, data) => apiClient.put(`/rooms/${id}`, data).then((res) => res.data);

export const deleteRoom = (id) => apiClient.delete(`/rooms/${id}`).then((res) => res.data);
