import { useEffect } from "react";
import { authUserStore, loaderData } from "../../context/globalContext";
import { getDataLocalStorage } from "../../localstorage/sesionLocalStorage";
import { validateAuth } from "api/users";

const Initializer = ({ children }) => {
  const { login } = authUserStore();
  const { loadingData, loadingDataComplete } = loaderData();

  useEffect(() => {
    const initializerData = async () => {
      const dataSesion = await getDataLocalStorage();
      if (dataSesion !== null) {

        const token = dataSesion.dataToken.token;

        try {
          const data = await validateAuth(token);
          await login(dataSesion);
        } catch (error) {
          console.log(error)
          if (error.response.status === 401) {
            loadingDataComplete();
            return;
          }
          if (error.response.status === 500) {
            loadingDataComplete();
            return;
          }
        }
      }
      loadingDataComplete();
    }
    initializerData();
  }, [loadingData]);
  return children;
};

export default Initializer;
