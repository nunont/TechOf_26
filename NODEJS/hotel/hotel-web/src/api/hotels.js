import apiClient from './client';

export const getHotels = (params) => {
    return apiClient.get('/hotels', { params }).then((res) => res.data);
}

export const getHotelById = (id) => apiClient.get(`/hotels/${id}`).then((res) => res.data);

export const getMyHotel = () => apiClient.get('/hotels/me').then((res) => res.data);

export const createHotel = (data) => apiClient.post('/hotels', data).then((res) => res.data);

export const updateHotel = (id, data) => apiClient.put(`/hotels/${id}`, data).then((res) => res.data);
