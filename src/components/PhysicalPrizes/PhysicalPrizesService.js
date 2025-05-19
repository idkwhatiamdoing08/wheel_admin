import axios from "axios";

const BASE_URL = "http://try-your-luck.worktools.space/api/material-thing";

function getAuthHeader() {
  return {
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  };
}
export async function fetchPhysicalPrizes(page = 1, pageSize = 10) {
  const response = await axios.get(`${BASE_URL}?page=${page}&per_page=${pageSize}`, {
    headers: getAuthHeader(),
  });
  console.log(response);
  return response.data;
}
export async function addPhysicalPrize(name, count) {
  await axios.post(
    BASE_URL,
    { name, 
      count,  
     },
    
    { headers: getAuthHeader() }
  );
}
export async function deletePhysicalPrize(id) {
  await axios.delete(`${BASE_URL}/${id}`, {
    headers: getAuthHeader(),
  });
}

export async function updatePhysicalPrize(id, newName, newCount) {
    await axios.put(`${BASE_URL}/${id}`, {name: newName, count: newCount}, {headers: getAuthHeader()});
}