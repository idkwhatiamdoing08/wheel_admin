import axios from "axios";

const BASE_URL = "http://try-your-luck.worktools.space/api/attempt";

function getAuthHeader() {
  return {
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  };
}
export async function fetchAttempts(page = 1, pageSize = 10) {
  const response = await axios.get(`${BASE_URL}?page=${page}&per_page=${pageSize}`, {
    headers: getAuthHeader(),
  });
  console.log(response);
  return response.data;
}
export async function addAttempt(name) {
  await axios.post(
    BASE_URL,
    { name },
    { headers: getAuthHeader() }
  );
}
export async function deleteAttempt(id) {
  await axios.delete(`${BASE_URL}/${id}`, {
    headers: getAuthHeader(),
  });
}

export async function updateAttempt(id, newName) {
    await axios.put(`${BASE_URL}/${id}`, {name: newName}, {headers: getAuthHeader()});
}