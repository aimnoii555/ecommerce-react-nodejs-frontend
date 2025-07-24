import axios from "axios";

export const createCategory = async (token, data) =>
  axios.post("https://ecommerce-react-nodejs.vercel.app/api/category", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const categoryList = async () =>
  axios.get("https://ecommerce-react-nodejs.vercel.app/api/category");

export const deleteCategory = async (token, id) =>
  axios.delete(`https://ecommerce-react-nodejs.vercel.app/api/category/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const updateCategory = async (token, data, id) =>
  axios.put(
    `https://ecommerce-react-nodejs.vercel.app/api/category/${id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
