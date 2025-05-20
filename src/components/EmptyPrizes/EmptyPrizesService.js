import axios from "axios";

const BASE_URL = "http://try-your-luck.worktools.space/api/empty-prize";

function getAuthHeader() {
  return {
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  };
}
export async function fetchEmptyPrizes(page = 1, pageSize = 10) {
  const response = await axios.get(`${BASE_URL}?page=${page}&per_page=${pageSize}`, {
    headers: getAuthHeader(),
  });
 return response.data;
}
export async function addEmptyPrize(name) {
  await axios.post(
    BASE_URL,
    { name },
    { headers: getAuthHeader() }
  );
}
export async function deleteEmptyPrize(id) {
  await axios.delete(`${BASE_URL}/${id}`, {
    headers: getAuthHeader(),
  });
}

export async function updateEmptyPrize(id, newName) {
    await axios.put(`${BASE_URL}/${id}`, {name: newName}, {headers: getAuthHeader()});
}