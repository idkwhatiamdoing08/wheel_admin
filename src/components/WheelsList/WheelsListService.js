import axios from 'axios';

const API_URL = 'http://try-your-luck.worktools.space/api/wheel'; // замени на свой

export const fetchWheels = async (page = 1, pageSize = 10) => {
  const token = localStorage.getItem('access_token');
  const response = await axios.get(`${API_URL}?page=${page}&per_page=${pageSize}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

export const deleteWheel = async (id) => {
  const token = localStorage.getItem('access_token');
  return await axios.delete(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const createWheel = async (wheelData) => {
  const token = localStorage.getItem('access_token');
  const response = await axios.post(API_URL, wheelData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export const updateWheel = async (id, data) => {
  const response = await axios.put(`http://try-your-luck.worktools.space/api/wheel/${id}`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });
  return response.data;
};