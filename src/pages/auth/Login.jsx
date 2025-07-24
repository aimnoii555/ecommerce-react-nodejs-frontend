import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import useBearProvider from "../../providers/Provider";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const store = useBearProvider((state) => state.actionLogin);
  const user = useBearProvider((state) => state.user);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await store(form);
      const role = res.data.payload.role;

      if (role === "admin") {
        navigate("/admin");
      } else {
        navigate(-1);
      }

      toast.success("Login Success");
    } catch (error) {
      const errMsg = error.response?.data?.message;
      toast.error(errMsg);
    }
  };

     return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-200">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Welcome Back
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              onChange={handleOnChange}
              type="email"
              name="email"
              placeholder="Enter your email"
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              onChange={handleOnChange}
              type="password"
              name="password"
              placeholder="Enter your password"
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-400 to-purple-500 text-white font-semibold py-2 rounded-lg hover:shadow-md transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
