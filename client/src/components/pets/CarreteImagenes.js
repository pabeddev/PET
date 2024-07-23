import "css/CarreteImagenes.css";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const CarreteImagenes = ({ imagenes, handleDeleteImage }) => {
  return (
    <>
      {imagenes.length > 0 ? (
        <div className="container_carrete_imagenes_custom">
          <h3 className="">Carrete de Imágenes</h3>
          <div className="carrete_imagenes_container">
            {imagenes.map((imagen, index) => (
              <div className="" key={index}>
                <DeleteForeverIcon
                  className="carrete_imagen_delete"
                  onClick={() => handleDeleteImage(index)}
                />
                <img
                  src={imagen.preview}
                  alt={imagen.name}
                  className="carrete_imagen"
                />
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default CarreteImagenes;
