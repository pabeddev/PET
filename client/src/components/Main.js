import React from "react";
import { Link } from "react-router-dom";
import "../css/main.css";
import M01 from "../imagenes/main01-p.png";
import M1 from "../imagenes/icon-m1.png";
import M2 from "../imagenes/icon-m2.png";
import M3 from "../imagenes/icon-m3.png";
import { usersRoutes } from "routes/routes";

const Main = () => {
  return (
    <div className="container-main">
      <div className="main-content">
        <h1 className="main-title-font">Perdidos En Tapachula</h1>
        <Link to={usersRoutes.signUp}>
          <button>Regístrate</button>
        </Link>
          <img src={M01} alt="Dog and Cat" className="main-image" />
      </div>
      <div className="info-sections">
        <div className="info-section section1">
          <Link to={usersRoutes.userPetAdoption}>
            <img src={M1} alt="Icon 1" />  
          </Link>
        </div> 
        <div className="info-section section2">
          <Link to={usersRoutes.userPetImportance}>
            <img src={M2} alt="Icon 2" />
          </Link>
        </div>
        <div className="info-section section3">
          <Link to={usersRoutes.userPetCare}>
            <img src={M3} alt="Icon 3" />
          </Link>
        </div>
      </div>
      <div>
      </div>
    </div>
    
  );
};

export default Main;
