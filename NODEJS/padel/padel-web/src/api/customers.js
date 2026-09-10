import apiClient from './client';

export const getMyCustomer = () => apiClient.get('/customers/me').then((res) => res.data);

export const createCustomer = (data) => apiClient.post('/customers', data).then((res) => res.data);

export const updateCustomer = (id, data) => apiClient.put(`/customers/${id}`, data).then((res) => res.data);
