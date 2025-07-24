import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import { createOrder } from "../../services/user";
import useBearProvider from "../../providers/Provider";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CheckOutForm = () => {
  const navigate = useNavigate();

  const stripe = useStripe();
  const elements = useElements();
  const useStore = useBearProvider((state) => state);

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);
    setMessage(null); // เคลียร์ข้อความเก่า

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // return_url: "https://ecommerce-react-nodejs.vercel.app/payment-success",
      },
      redirect: "if_required",
    });

    if (error) {
      console.error(error);
      setMessage(error.message);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      createOrder(useStore.token, paymentIntent)
        .then((res) => {
          toast.success("Payment successful!");
          useStore.clearCartUser();
          navigate("/user/history");
        })
        .catch((err) => console.log(err));
    } else {
      toast.warn("Payment failed or canceled.");
    }

    setIsLoading(false);
  };

  const PaymentElementOption = {
    layout: "tabs",
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement options={PaymentElementOption} />

      <button
        disabled={isLoading || !stripe || !elements}
        className={`w-full py-2 text-white rounded ${
          isLoading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
        type="submit"
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <svg
              className="animate-spin h-4 w-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4l3.5-3.5L12 0v4a8 8 0 00-8 8h4z"
              ></path>
            </svg>
            Processing...
          </span>
        ) : (
          "Pay"
        )}
      </button>

      {message && (
        <div className="text-red-500 text-sm text-center mt-2">{message}</div>
      )}
    </form>
  );
};

export default CheckOutForm;
