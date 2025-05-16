import axios from "axios";
const API_BASE_URL = "http://try-your-luck.worktools.space/api/sector"; 


export const updateSector = async (sectorId, updatedData) => {
  const response = await axios.put(
    `${API_BASE_URL}/${sectorId}`,
    updatedData
  );
  return response.data;
};

export const deleteSector = async (sectorId) => {
    const response = await axios.delete(`${API_BASE_URL}/${sectorId}`);
    return response.data;
  };

  export const getPrizes = async () =>
    (await axios.get('http://try-your-luck.worktools.space/api/material-thing', { headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      } })).data;

  export const createSector = async (payload) => {
    const response = await axios.post(`${API_BASE_URL}`, payload, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    return response.data;
  };