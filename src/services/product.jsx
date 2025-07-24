import axios from "axios";

export const createProduct = async (token, data) =>
  axios.post("https://ecommerce-react-nodejs.vercel.app/api/product", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const getProduct = async (count = 100) =>
  axios.get(`https://ecommerce-react-nodejs.vercel.app/api/products/${count}`);

export const getProductById = async (token, id) => {
  return axios.post(
    `https://ecommerce-react-nodejs.vercel.app/api/product_by_id/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const updateProduct = async (token, id, data) => {
  return axios.put(
    `https://ecommerce-react-nodejs.vercel.app/api/product/${id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const deletePrdouct = async (token, id) => {
  return axios.delete(
    `https://ecommerce-react-nodejs.vercel.app/api/product/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const uploadFiles = async (token, data) => {
  return await axios.post(
    "https://ecommerce-react-nodejs.vercel.app/api/images",

    {
      image: data,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const removeFiles = async (token, public_id) => {
  return await axios.post(
    "https://ecommerce-react-nodejs.vercel.app/api/remove-img",
    {
      public_id: public_id,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const searchFilters = async (args) =>
  axios.post(
    `https://ecommerce-react-nodejs.vercel.app/api/search/filters`,
    args
  );

export const listProductBy = async (sort, order, limit) =>
  axios.post(`https://ecommerce-react-nodejs.vercel.app/api/productby`, {
    sort,
    order,
    limit,
  });
