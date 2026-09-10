import apiClient from './client';

export const getClubs = (params) => {
    return apiClient.get('/clubs', { params }).then((res) => res.data);
}

export const getClubById = (id) => apiClient.get(`/clubs/${id}`).then((res) => res.data);

export const getMyClub = () => apiClient.get('/clubs/me').then((res) => res.data);

export const createClub = (data) => apiClient.post('/clubs', data).then((res) => res.data);

export const updateClub = (id, data) => apiClient.put(`/clubs/${id}`, data).then((res) => res.data);
