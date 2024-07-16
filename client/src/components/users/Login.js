import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CSpinner } from "@coreui/react";
import { loginUser } from "../../api/users";
import { authUserStore } from "../../context/globalContext";
import { saveDataLocalStorage } from "../../localstorage/sesionLocalStorage";
import Loginimg from "../../imagenes/login.jpg";
import logoPet from "../../imagenes/Logo.png";
import "../../css/login.css";

import { toastData } from "../../context/globalContext";

import jwtDecode from "jwt-decode";

const Login = () => {
  
  const { toastError } = toastData();
  const navigate = useNavigate();

  // Estado de autenticacion
  const { login, isAuthenticated } = authUserStore();

  // Estado de los datos del usuario
  const [dataUserLogin, setDataUserLogin] = useState({
    email: "",
    password: "",
  });

  // Estado de carga
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
      return;
    }
  }, [isAuthenticated]);

  const handleLogin = async (evt) => {
    // Prevencion de formulario por defecto
    evt.preventDefault();

    // Estado de carga para el boton de carga
    setIsLoading(true);

    // Validacion de campos vacios
    if (
      dataUserLogin.password.trim() === "" ||
      dataUserLogin.password.trim() === ""
    ) {
      setIsLoading(false);
      toastError("Correo y contraseña son necesarios!!");
      return;
    }

    try {
      // Manejar las variables de respuesta como response o data
      const response = await loginUser(dataUserLogin);

      // Decodificar el token
      const dataToken = await jwtDecode(response.data.token);

      // Guardar los datos en el estado global
      login({
        email: dataUserLogin.email,
        dataToken: response.data,
        role: dataToken.role,
      });

      // Guardar los datos en local storage
      saveDataLocalStorage({
        email: dataUserLogin.email,
        dataToken: response.data,
        role: dataToken.role,
      });

      // Limpiar los campos
      setDataUserLogin({ email: "", password: "" });

      // Cambiar el estado de carga
      setIsLoading(false);

      // Redireccionar a la pagina principal
      navigate("/");

    } catch (error) {
      // Validar si el error es de formato de correo
      if (error.response.status === 400) {
        setIsLoading(false);
        toastError("Ingresa un formato de correo válido");
        return;
      }
      // Validar si el error es de correo o contraseña incorrectos
      if (error.response.status === 401 || error.response.status === 404) {
        setIsLoading(false);
        toastError("Correo o contraseña incorrectos");
        return;
      }
    }
  };

  return (
    <div className="login-container">
      <div className="imgFromLog">
        <img
          src={Loginimg}
          alt="Imagen del formulario"
          className="imgFromLog"
        />
      </div>

      <form className="form-section-log" onSubmit={handleLogin}>
        <div className="logo-section">
          <img src={logoPet} alt="logo pet" className="logoPet"></img>
          <h2>Iniciar sesión</h2>
          <h6 className="welcome-title">Bienvenido!</h6>
        </div>
        <div className="form-group">
          <label htmlFor="email">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Correo Electrónico"
            className="form-control"
            required
            value={dataUserLogin.email}
            onChange={(evt) =>
              setDataUserLogin({ ...dataUserLogin, email: evt.target.value })
            }
          />
        </div>
        {/* TODO: Agregar funcionalidad de ver contrasena */}
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Contraseña"
            className="form-control"
            required
            value={dataUserLogin.password}
            onChange={(evt) =>
              setDataUserLogin({ ...dataUserLogin, password: evt.target.value })
            }
          />
        </div>

        <button type="submit" className="buttonLog">
          {!isLoading ? "Iniciar Sesión" : <CSpinner color="primary" />}
        </button>
      </form>
    </div>
  );
};

export default Login;
