import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getPet } from "../../api/pets";
import "../../css/mascotaperdida.css";
import CommentsPet from "./CommentsPet";

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString("es-ES", options);
};

const MascotaPerdida = () => {
  const { id_pet } = useParams();

  const [dataUser, setDataUser] = useState({});
  const [dataPet, setDataPet] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const getPetData = async () => {
      try {
        const response = await getPet(id_pet);
        setDataPet(response.data);
        setDataUser(response.data.user_id);
        setComments(response.data.feedback.comments);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(error.message);
        setTimeout(() => {
          setError("");
        }, 3000);
      }
    };

    getPetData();
  }, [id_pet]);

  return (
    <div className="container my-4 p-4 rounded shadow-lg bg-light">
      {loading ? (
        <div className="d-flex justify-content-center align-items-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      ) : (
        <>
          {error && <div className="alert alert-danger">{error}</div>}
          <div className="row mb-4">
            <div className="col-md-6">
              <div
                id="carouselExampleControls"
                className="carousel slide"
                data-bs-ride="carousel"
              >
                <div className="carousel-inner">
                  {dataPet.identify?.gallery?.map((image, index) => (
                    <div
                      key={index}
                      className={`carousel-item ${index === 0 ? "active" : ""}`}
                    >
                      <img
                        src={image.url}
                        className="d-block w-100 rounded"
                        alt={`Imagen ${index}`}
                      />
                    </div>
                  ))}
                </div>
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#carouselExampleControls"
                  data-bs-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Anterior</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#carouselExampleControls"
                  data-bs-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Siguiente</span>
                </button>
              </div>
            </div>
            <div className="col-md-6">
              <h1 className="fw-bold text-primary">{dataPet.name}</h1>
              <div className="mb-3">
                <h5 className="fw-bold">Información de contacto</h5>
                <p>
                  <strong>Teléfono:</strong>{" "}
                  {dataUser.phone_number || "No disponible"}
                </p>
                <p>
                  <strong>Correo Electrónico:</strong>{" "}
                  {dataUser.auth_id?.email || "No disponible"}
                </p>
              </div>
              <div className="mb-3">
                <h5 className="fw-bold">Información de la mascota</h5>
                <ul className="list-unstyled">
                  <li>
                    <strong>Especie:</strong> {dataPet.details.specie}
                  </li>
                  <li>
                    <strong>Tamaño:</strong> {dataPet.details.size}
                  </li>
                  <li>
                    <strong>Género:</strong> {dataPet.details.gender}
                  </li>
                  <li>
                    <strong>Edad:</strong> {dataPet.details.age} años
                  </li>
                  <li>
                    <strong>Raza:</strong> {dataPet.details.breed}
                  </li>
                  <li>
                    <strong>Última vez visto:</strong>{" "}
                    {formatDate(dataPet.publication?.lost_date)}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mb-4">
            <h5 className="fw-bold">Descripción:</h5>
            <p>{dataPet.details.description}</p>
          </div>
          <CommentsPet
            comments={comments}
            idPet={id_pet}
            idUser={dataUser._id}
            setComments={setComments}
          />
        </>
      )}
    </div>
  );
};

export default MascotaPerdida;
