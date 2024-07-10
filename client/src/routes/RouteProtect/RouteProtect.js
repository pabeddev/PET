import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { authUserStore } from "context/globalContext";

import { usersRoutes } from "routes/routes";

const RouteProtect = ({ children }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = authUserStore();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(usersRoutes.login);
    }
  }, []);

  return children;
};

export default RouteProtect;
