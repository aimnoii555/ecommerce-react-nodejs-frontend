import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import React, { useState, useEffect } from "react";
import { payment } from "../../services/user";
import useBearProvider from "../../providers/Provider";
import CheckOutForm from "../../components/payment/CheckOutForm";
const stripePromise = loadStripe(
  "pk_test_51RaBbP2chfzp2uGjBmG0kdxWPCJE3RckMpK2miHEhZo9EoFDafTp5VorbmcSu236lUmF3KgLZ07S71esYTfrQuGp00pisv7EPy"
);

const Payment = () => {
  const [clientSecret, setClientSecret] = useState("");
  const useStore = useBearProvider((state) => state);

  useEffect(() => {
    payment(useStore.token)
      .then((res) => {
        console.log("🔐 clientSecret:", res.data.clientSecret);
        setClientSecret(res.data.clientSecret);
      })
      .catch((err) => console.log(err));
  }, []);

  const appearance = {
    theme: "stripe",
  };

  const loader = "auto";

  return (
    <div>
      {clientSecret && (
        <Elements
          options={{ clientSecret, appearance, loader }}
          stripe={stripePromise}
        >
          <CheckOutForm />
        </Elements>
      )}
    </div>
  );
};

export default Payment;
