import React, { useEffect, useState } from "react";
import useBearProvider from "../providers/Provider";
import { currentUser } from "../services/auth";
import LoadingToRedirect from "./LoadingToRedirect";

const ProtectRouteUser = ({ element }) => {
  const [isCheck, setIsCheck] = useState(false);
  const user = useBearProvider((state) => state.user);
  const token = useBearProvider((state) => state.token);

  useEffect(() => {
    if (user && token) {
      // send to back

      currentUser(token)
        .then((res) => setIsCheck(true))
        .catch((err) => setIsCheck(false));
    }
  }, []);

  return isCheck ? element : <LoadingToRedirect />;
};

export default ProtectRouteUser;
