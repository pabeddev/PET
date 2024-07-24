// PopupContent.js
import React from 'react';
import { Link } from 'react-router-dom';
import 'css/PopUpContentMapView.css'; // Crea un archivo CSS para los estilos

const PopUpContentMapView = ({ marker }) => {
  return (
    <div className="popup-content">
      <img src={marker.identify.image.url} alt="Imagen de la mascota" />
      <h4>{marker.name}</h4>
      <p>Especie: {marker.details.specie}</p>
      <p>Raza: {marker.details.breed}</p>
      <Link to={`/pets/${marker.id}`} className="btn btn-primary">
        Ver más
      </Link>
    </div>
  );
};

export default PopUpContentMapView;
