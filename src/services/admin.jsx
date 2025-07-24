import axios from "axios";

export const getOrdersAdmin = async (token) => {
  return await axios.get(
    "https://ecommerce-react-nodejs.vercel.app/api/admin/orders",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const changeOrderStatus = async (token, orderId, orderStatus) => {
  return axios.put(
    "https://ecommerce-react-nodejs.vercel.app/api/admin/order-status",
    { orderId, orderStatus },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getAllUsers = async (token) => {
  return axios.get("https://ecommerce-react-nodejs.vercel.app/api/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const changeStatusActive = (token, data) => {
  return axios.post(
    "https://ecommerce-react-nodejs.vercel.app/api/change-status",
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const changeRole = async (token, data) => {
  return axios.post(
    "https://ecommerce-react-nodejs.vercel.app/api/change-role",
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
