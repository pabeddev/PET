import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../../css/cards.css'
import MoodIcon from "@mui/icons-material/Mood";
import MoodBadIcon from '@mui/icons-material/MoodBad';

const CardPet = ({ pet, user = false }) => {
    const navigate = useNavigate();
    const [isExpanded, setIsExpanded] = useState(false)
    const [showAllDetails, setShowAllDetails] = useState(false);

    const onClickInformacionContacto = (idPet, idUser) => {
        navigate(`/Mascota-Perdida/${idPet}`);
        return;
    }

    const handleImageClick = () => {
        setIsExpanded(!isExpanded)
    }

    const handleCloseClick = () => {
        setIsExpanded(false)
    }

    return (
      <>
        <div /* className="animate__animated animate__fadeInUp" */>
          <div className={`card ${isExpanded ? "expanded" : ""}`}>
            <div className="card-image">
              <img
                src={
                  pet.identify?.image?.url || "https://via.placeholder.com/150"
                }
                alt={pet.name}
              />
            </div>
            <div className="card-body">
              <h5 className="card-name-pet">{pet.name}</h5>
              <p className="card-lost-pet">
                Última vez Visto: {pet.publication.lost_date.split("T")[0]}
              </p>
              <p className={`card-status-pet ${pet.found ? "found" : "lost"}`}>
                {pet.found ? (
                  <>
                    <MoodIcon />
                    {"Encontrado"}
                  </>
                ) : (
                  <>
                    <MoodBadIcon />
                    {" Perdido"}
                  </>
                )}
              </p>
              <div className="card-information">
                <p className="card-race">
                  {" "}
                  <span className="race">Raza:</span> {pet.details.breed}
                </p>
                <p className="card-place">Ultima vez visto :</p>
                <p className="card-text-place">{pet.publication.last_seen}</p>
              </div>
              {showAllDetails && (
                <>
                  <p className="card-text">Tamaño: {pet.details.size}</p>

                  <p className="card-text">Edad: {pet.details.age}</p>
                  <p className="card-text">Género: {pet.details.gender}</p>
                  <p className="card-text">Especie: {pet.details.specie}</p>
                </>
              )}
              {user ? (
                <div className="button-group button">
                  <button
                    onClick={(evt) =>
                      onClickInformacionContacto(pet._id, pet.user)
                    }
                    className=""
                  >
                    Ver más
                  </button>
                </div>
              ) : (
                <div className="button-group button">
                  <button
                    className={` ${showAllDetails ? "" : ""}`}
                    onClick={() => setShowAllDetails(!showAllDetails)}
                  >
                    {showAllDetails ? "Ver menos" : "Ver más"}
                  </button>
                  <button
                    onClick={(evt) =>
                      onClickInformacionContacto(pet._id, pet.user)
                    }
                    className=""
                  >
                    Contactar
                  </button>
                </div>
              )}

              {/* TODO: REVISAR SI ESTO FUNCIONA PARA ALGO */}
              {/* {isExpanded && (
                <button className="close-button" onClick={handleCloseClick}>
                  X
                </button>
              )} */}
            </div>
          </div>
        </div>
      </>
    );
};

export default CardPet;
