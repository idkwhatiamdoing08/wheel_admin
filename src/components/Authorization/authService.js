// services/authService.js
import axios from "axios";

const API_URL = "http://try-your-luck.worktools.space/api/auth";


function setTokens({ access_token, refresh_token }) {
  localStorage.setItem("access_token", access_token);
  localStorage.setItem("refresh_token", refresh_token);
}

function getAccessToken() {
  return localStorage.getItem("access_token");
}

function getRefreshToken() {
  return localStorage.getItem("refresh_token");
}

function clearTokens() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
}

export async function login({ username, password }) {
  const response = await axios.post(`${API_URL}/login`, { username, password });
  setTokens(response.data);
  return response.data;
}


export async function refreshAccessToken() {
  try {
    const access_token = getAccessToken();
    console.log('access_token', access_token)
    const response = await axios.post(`${API_URL}/refresh`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
        "Accept": "application/json",
      },

    });
    
    console.log('RESPONSE', response)
    localStorage.setItem('access_token', response.data.access_token);
    return response.data.access_token;
  } catch (error) {
    console.error("Ошибка обновления токена:", error);
    // clearTokens();
    throw error;
  }
}


axios.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      getRefreshToken()
    ) {
      originalRequest._retry = true;
      try {
        const newAccessToken = await refreshAccessToken();
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axios(originalRequest);
      } catch (refreshError) {
        console.error("Не удалось обновить токен:", refreshError);
      }
    }
    return Promise.reject(error);
  }
);
