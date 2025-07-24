import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { z } from "zod";
import zxcvbn from "zxcvbn";
import { zodResolver } from "@hookform/resolvers/zod";

const registerSchema = z
  .object({
    email: z.string().email({
      message: "Invalid email!!",
    }),
    password: z.string().min(8, {
      message: "Password must be more then 8 charecters.",
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password don't matched",
    path: ["confirmPassword"],
  });

const Register = () => {
  const [passwordStrong, setPasswordStrong] = useState(0);
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const validatePassword = () => {
    let password = watch().password;
    return zxcvbn(password ? password : "").score;
  };

  useEffect(() => {
    setPasswordStrong(validatePassword());
  }, [watch().password]);

  const onSubmit = async (data) => {
    // const passwordSecure = zxcvbn(data.password).score;
    // if (passwordSecure < 2) {
    //   return toast.warn("Your password is not secure.");
    // }

    try {
      const res = await axios.post(
        "https://ecommerce-react-nodejs.vercel.app/api/register",
        data
      );
      console.log("res", res);
      toast.success(res.data);
    } catch (error) {
      const errMsg = error.response?.data?.message;
      toast.error(errMsg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-100 to-blue-200">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Create Account
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email
            </label>
            {/* <input
              onChange={handleOnChange}
              type="email"
              name="email"
              placeholder="Enter your email"
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
              required
            /> */}
            <input
              placeholder="Enter your email"
              {...register("email")}
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              {...register("password")}
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
            {watch().password?.length > 0 && (
              <div className="flex mt-3">
                {Array.from(Array(5).keys()).map((item, key) => {
                  return (
                    <span className="w-1/5 px-1" key={key}>
                      <div
                        className={`rounded-md h-2 w-10 ${
                          passwordStrong <= 2
                            ? "bg-red-400"
                            : passwordStrong < 4
                            ? "bg-yellow-200"
                            : "bg-green-400"
                        }`}
                      ></div>
                    </span>
                  );
                })}
              </div>
            )}
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-600"
            >
              Confirm Password
            </label>
            <input
              type="password"
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
              placeholder="Enter your confirm password"
              {...register("confirmPassword")}
            />
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">
              {errors.confirmPassword.message}
            </p>
          )}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold py-2 rounded-lg hover:shadow-md transition duration-300"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
