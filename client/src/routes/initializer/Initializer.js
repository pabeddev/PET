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

        // Obtener si el token es valido aun
        try {
          // TODO: Eliminar el console.log
          const data = await validateAuth(token);
          console.log(data)
          await login(dataSesion);
        } catch (error) {
          if (error.response.status === 401) {
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
