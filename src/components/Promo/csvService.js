import axios from "axios";

const API_URL = "http://try-your-luck.worktools.space/api";

export const uploadPromocodeCsv = async (promocodeId, file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axios.post(
    `${API_URL}/promocodes-code/${promocodeId}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response;
};

export const fetchPromocodeCsv = async () => {
  const response = await axios.get(`${API_URL}/promocodes-code`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};
