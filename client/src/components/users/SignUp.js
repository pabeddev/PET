import { useState } from "react";
import { CSpinner } from "@coreui/react";

import { useNavigate } from "react-router-dom";

import SignupImg from "../../imagenes/signup.jpg";
import SingUpLogo from "../../imagenes/Logo.png";
import { createAccount } from "../../api/users";
import "../../css/SignUp.css";

import { toastData } from "context/globalContext";

// Expresiones regulares
const nameRegExp = /^[a-zA-Z\s]*$/;
const phoneRegExp = /^[0-9]{10}$/;
const passwordRegExp = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{6,}$/;
const isNumber = /^[0-9]*$/;

const Signup = () => {
  const navigate = useNavigate();
  const { toastSuccess, toastError } = toastData();
  const [newUser, setNewUser] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    phone_number: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (evt) => {
    setLoading(true);
    evt.preventDefault();

    if (!phoneRegExp.test(newUser.phone_number)) {
      toastError("El número de teléfono debe contener 10 dígitos");
      setLoading(false);

      return;
    }

    if (!nameRegExp.test(newUser.name) || !nameRegExp.test(newUser.lastname)) {
      toastError("El nombre y apellidos solo pueden contener letras");
      setLoading(false);
      return;
    }

    if (!passwordRegExp.test(newUser.password)) {
      toastError(
        "La contraseña debe contener al menos 6 caracteres, una letra mayúscula y un número"
      );
      setLoading(false);
      return;
    }

    try {
      await createAccount(newUser);
      toastSuccess("Usuario registrado correctamente");
      navigate("/user/login");
      
    } catch (error) {

      if (error.response.status === 400) {
        toastError("El correo electrónico ya está registrado");
        setLoading(false);
        return;
      }
      if (error.response.status === 500) {
        toastError("Error en el servidor");
        setLoading(false);
        return;
      }

    }
  };

  return (
    <div className="register-container">
      <div className="signup-container">
        <form onSubmit={handleSubmit}>
          <div className="logo-section">
            <img
              src={SingUpLogo}
              alt="Icono de nuevo usuarios"
              className="logoPet"
            />
            <h2>Regístrate</h2>
            <h6 className="welcome-title">Bienvenido!</h6>
          </div>
          <div className="input-group">
            <div className="form-group">
              <label htmlFor="textName">Nombre:</label>
              <input
                type="text"
                id="textName"
                name="name"
                placeholder="Nombre"
                className="form-control"
                required
                value={newUser.name}
                onChange={(evt) =>
                  setNewUser({ ...newUser, name: evt.target.value })
                }
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastname">Apellidos:</label>
              <input
                type="text"
                id="lastname"
                name="lastname"
                placeholder="Apellidos"
                className="form-control"
                required
                value={newUser.lastname}
                onChange={(evt) =>
                  setNewUser({ ...newUser, lastname: evt.target.value })
                }
              />
            </div>
          </div>
          <div className="input-group">
            <div className="form-group">
              <label htmlFor="email">Correo Electrónico:</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Correo electronico"
                className="form-control"
                required
                value={newUser.email}
                onChange={(evt) =>
                  setNewUser({ ...newUser, email: evt.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Contraseña:</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Contraseña"
                className="form-control"
                required
                value={newUser.password}
                onChange={(evt) =>
                  setNewUser({ ...newUser, password: evt.target.value })
                }
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="phone_number">Número de Teléfono:</label>
            <input
              type="string"
              id="phone_number"
              name="phone_number"
              placeholder="Telefono"
              className="form-control"
              required
              value={newUser.phone_number}
              maxLength={10}
              onChange={(evt) => {
                if (isNumber.test(evt.target.value)) {
                  setNewUser({ ...newUser, phone_number: evt.target.value });
                }
              }}
            />
          </div>

          <div className="button-container">
            {loading ? (
              <div>
                <CSpinner color="primary" />
              </div>
            ) : (
              <button type="submit" className="buttonSing">
                Registrarse
              </button>
            )}
          </div>
        </form>
      </div>
      <div className="img-container">
        <img
          src={SignupImg}
          alt="Imagen de que contiene el logo de la página y un perro"
          className="register-img"
        />
      </div>
    </div>
  );
};

export default Signup;
