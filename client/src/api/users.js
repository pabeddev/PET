import { axiosInstance } from "../utilities/axiosInstance";

// Las petciones a la API son generalmente reutilizadas por lo que manejar los errores dentro de la misma funcion no suele ser una idea muy buena
// debido a que se pierde la capacidad de manejar los errores de manera personalizada en cada componente que haga uso de la funcion.
// Por lo tanto, es mejor manejar los errores en el componente que haga uso de la funcion, de esta manera se puede personalizar el mensaje de error
// Y por ello se retorna solamente la accion de la peticion a la API, en este caso un objeto de tipo Promise.
export const createAccount = async (data) => {
    return axiosInstance.post("/users/", data);
};

export const loginUser = async (data) => {
    return axiosInstance.post("/auth/login/", data);
};



export const getPetsUser = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return axiosInstance.get("/users/posts/", config);

};

export const validateAuth = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axiosInstance.get("/auth/token/status/", config);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

