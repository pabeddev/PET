import { useEffect, useState } from "react";

import "../../css/imagen.css";
import "../../css/ReportarMascotas.css";
import ImagenesMascotas from "./ImagenesMascotas";

import { CSpinner } from "@coreui/react";
import { createPost } from "../../api/pets";
import { authUserStore } from "../../context/globalContext";
import { useNavigate } from "react-router-dom";

import { toastData } from "../../context/globalContext";

import mapboxgl from "mapbox-gl";

import { breeds, genders, species, size } from "utilities/maps";

import {
  BiSolidRightArrowSquare,
  BiSolidLeftArrowSquare,
} from "react-icons/bi";
import MapView from "./MapView";

const ReportarMascotas = () => {

  const navigate = useNavigate();

  const { user } = authUserStore();
  const { toastError, toastSuccess } = toastData();
  const [formPage, setFormPage] = useState(1);
  const [gallery, setGallery] = useState([]);

  const [formData, setFormData] = useState({
    // Data de la primero seccion del formulario
    name: "",
    specie: "Perro",
    breed: "Mestizo",
    gender: "Macho",
    age: "",
    size: "Chico",
    description: "",

    // Data de la segunda seccion del formulario
    last_seen: "",
    lost_date: "",
    image: "",
    images: [],
    location: "",
    owner: false,
  });

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    if (formData.description.trim() === "") {
      toastError("La descripción es requerida");
      return;
    }
    if (formData.last_seen.trim() === "") {
      toastError("El lugar donde se extravió es requerido");
      return;
    }

    const formDataToSend = new FormData();

    console.log(formData);

    formDataToSend.append("name", formData.name);
    formDataToSend.append("specie", formData.specie);
    formDataToSend.append("breed", formData.breed);
    formDataToSend.append("gender", formData.gender);
    formDataToSend.append("age", formData.age);
    formDataToSend.append("size", formData.size);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("last_seen", formData.last_seen);
    formDataToSend.append("lost_date", formData.lost_date);
    formDataToSend.append("owner", formData.owner);
    formDataToSend.append("location", JSON.stringify(formData.location));
    formDataToSend.append("image", gallery[0].file);
    
    gallery.forEach((image) => {
      formDataToSend.append("images", image.file);
    });
    
    try {
      const response = await createPost(formDataToSend, user.dataToken.token);
      console.log(response);
      toastSuccess("Mascota reportada exitosamente");
      navigate("/pets");
    }catch(error) {
      console.log(error);
      toastError("Error al reportar la mascota");
    }


  };

  const handleNext = (evt) => {
    evt.preventDefault();
    setFormPage(formPage + 1);
  };

  const handlePrevious = (evt) => {
    evt.preventDefault();
    setFormPage(formPage - 1);
  };

  return (
    <div className="container-report-pet">
      <div className="container-image"></div>
      <div className="container-form">
        <h1>Reportar mascota</h1>
        <form className="form">
          {formPage === 1 && (
            <FormPartOne formData={formData} setFormData={setFormData} />
          )}
          {formPage === 2 && (
            <FormPartTwo
              formData={formData}
              setFormData={setFormData}
              gallery={gallery}
              setGallery={setGallery}
            />
          )}

          <div className="item_center">
            {formPage > 1 && (
              <button className="form_button" onClick={handlePrevious}>
                <BiSolidLeftArrowSquare />
                Anterior
              </button>
            )}
            {formPage < 2 && (
              <button className="form_button" onClick={handleNext}>
                Siguiente
                <BiSolidRightArrowSquare />
              </button>
            )}
            {formPage === 2 && (
              <button className="form_button" onClick={handleSubmit}>
                Enviar
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

const FormPartOne = ({ formData, setFormData }) => {
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <>
      <div className="form_group_row">
        <div className="form-control">
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Nombre"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form_group_row">
        <div className="form-control">
          <label htmlFor="specie">Especie</label>
          <select
            id="specie"
            name="specie"
            value={formData.specie}
            onChange={handleChange}
          >
            {species.map((specie) => (
              <option key={specie} value={specie}>
                {specie}
              </option>
            ))}
          </select>
        </div>

        <div className="form-control">
          <label htmlFor="breed">Raza</label>
          <select
            id="breed"
            name="breed"
            value={formData.breed}
            onChange={handleChange}
          >
            {breeds[formData.specie].map((breed) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
        </div>

        <div className="form-control">
          <label htmlFor="genero">Genero</label>
          <select
            id="genero"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            {genders.map((gender) => (
              <option key={gender} value={gender}>
                {gender}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="form_group_row">
        <div className="form-control">
          <label htmlFor="age">Edad (opcional)</label>
          <input
            type="text"
            id="age"
            name="age"
            placeholder="Edad"
            value={formData.age}
            onChange={handleChange}
          />
        </div>

        <div className="form-control">
          <label htmlFor="size">Tamaño</label>
          <select
            id="size"
            name="size"
            value={formData.size}
            onChange={handleChange}
          >
            {size.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="form_group_row">
        {/* Description */}
        <div className="form-control">
          <label htmlFor="description">Descripción</label>
          <textarea
            id="description"
            name="description"
            placeholder="Descripción"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
      </div>
    </>
  );
};

const FormPartTwo = ({ formData, setFormData, gallery, setGallery }) => {
  mapboxgl.accessToken =
    "pk.eyJ1IjoibWFpbmxha2UiLCJhIjoiY2x5dmFiOWIwMDBwNDJrcHoyNDhmcmJoNCJ9.-3AL3FN0XWB5D-vJpEkWqA";

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [markerCordinates, setMarkerCordinates] = useState(null);
  useEffect(() => {
    if (markerCordinates) {
      setFormData({
        ...formData,
        location: {
          x: markerCordinates.lng,
          y: markerCordinates.lat,
        },
      });
    }
  }, [markerCordinates]);

  return (
    <>
      <div className="form_group_row">
        {/* Last seen */}
        <div className="form-control">
          <label htmlFor="last_seen">Lugar donde se extravió</label>
          <input
            type="text"
            id="last_seen"
            name="last_seen"
            placeholder="Lugar"
            value={formData.last_seen}
            onChange={handleChange}
          />
        </div>
        {/* Lost date */}
        <div className="form-control">
          <label htmlFor="lost_date">Fecha de extravío</label>
          <input
            type="date"
            id="lost_date"
            name="lost_date"
            value={formData.lost_date}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="form_group_row">
        <div className="form-control">
          <label htmlFor="image">Imagen</label>
          <ImagenesMascotas gallery={gallery} setGallery={setGallery} />
        </div>
      </div>

      <div className="form_group_row">
        <div className="form-control">
          <label htmlFor="location">Ubicación</label>
          <MapView
            defaultMapCenterCordinates={[-92.264907, 14.893214]}
            markerCordinates={markerCordinates}
            setMarkerCordinates={setMarkerCordinates}
          />
        </div>
      </div>

      <div className="form_group_row">
        <div className="form-control">
          <label htmlFor="owner">¿Eres el dueño?</label>
          <input
            type="checkbox"
            id="owner"
            name="owner"
            value={formData.owner}
            onChange={handleChange}
          />
        </div>
      </div>
    </>
  );
};

export default ReportarMascotas;
