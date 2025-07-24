import React, { useEffect, useState } from "react";
import useBearProvider from "../providers/Provider";
import { currentAdmin } from "../services/auth";
import LoadingToRedirect from "./LoadingToRedirect";

const ProtectRouteAdmin = ({ element }) => {
  const [isCheck, setIsCheck] = useState(false);
  const user = useBearProvider((state) => state.user);
  const token = useBearProvider((state) => state.token);

  useEffect(() => {
    console.log("after Effect");
    if (user && token) {
      // send to back

      currentAdmin(token)
        .then((res) => setIsCheck(true))
        .catch((err) => setIsCheck(false));
    }
  }, [user, token]);

  console.log(user);
  return isCheck ? element : <LoadingToRedirect />;
};

export default ProtectRouteAdmin;
