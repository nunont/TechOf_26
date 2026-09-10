import apiClient from './client';

export const getFields = (params) => apiClient.get('/fields', { params }).then((res) => res.data);

export const getFieldById = (id) => apiClient.get(`/fields/${id}`).then((res) => res.data);

export const createField = (data) => apiClient.post('/fields', data).then((res) => res.data);

export const updateField = (id, data) => apiClient.put(`/fields/${id}`, data).then((res) => res.data);

export const deleteField = (id) => apiClient.delete(`/fields/${id}`).then((res) => res.data);