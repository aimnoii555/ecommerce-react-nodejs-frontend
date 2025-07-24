import axios from "axios";

export const createUserCart = async (token, cart) => {
  return axios.post(
    "https://ecommerce-react-nodejs.vercel.app/api/user/cart",
    cart,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getUserCart = async (token) => {
  return axios.get("https://ecommerce-react-nodejs.vercel.app/api/user/cart", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const saveAddress = async (token, address) => {
  return axios.post(
    "https://ecommerce-react-nodejs.vercel.app/api/user/address",
    { address },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const payment = async (token) => {
  return axios.post(
    "https://ecommerce-react-nodejs.vercel.app/api/user/create-payment",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const createOrder = async (token, payload) => {
  return axios.post(
    "https://ecommerce-react-nodejs.vercel.app/api/user/order",
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getMyOrders = async (token) => {
  return axios.get("https://ecommerce-react-nodejs.vercel.app/api/user/order", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
