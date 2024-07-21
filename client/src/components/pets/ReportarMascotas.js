import { useState } from "react";

import "../../css/imagen.css";
import "../../css/ReportarMascotas.css";
import ImagenesMascotas from "./ImagenesMascotas";

import { CSpinner } from "@coreui/react";
import { createPost } from "../../api/pets";
import { authUserStore } from "../../context/globalContext";
import { useNavigate } from "react-router-dom";

import {
  breeds,
  genders,
  species,
  size,
  extenstionsOfImages,
} from "utilities/maps";

import {
  BiSolidRightArrowSquare,
  BiSolidLeftArrowSquare,
} from "react-icons/bi";

const ReportarMascotas = () => {
  const navigate = useNavigate();
  const { user, logout } = authUserStore();
  
  const [formPage, setFormPage] = useState(1);
  const [gallery, setGallery] = useState([]);
  const [post, setPost] = useState({
    name: "",
    specie: "Perro",
    gender: "Macho",
    age: "",
    last_seen: "",
    description: "",
    size: "Chico",
    breed: "Mestizo",
    lost_date: "",
    owner: false,
    image: "",
    images: "",
    location: "",
  });

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const formData = new FormData();

    formData.append("name", post.name);
    formData.append("specie", post.specie);
    formData.append("gender", post.gender);
    formData.append("age", post.age);
    formData.append("last_seen", post.last_seen);
    formData.append("description", post.description);
    formData.append("size", post.size);
    formData.append("breed", post.breed);
    formData.append("lost_date", post.lost_date);
    formData.append("owner", post.owner);
    formData.append("image", gallery[0].file);
    formData.append("images", gallery.file);

    gallery.forEach((file) => {
      formData.append("gallery", file.file);
    });
    formData.append("coordinates", post.coordinates);

    setTimeout(() => {
      console.log("Enviando formulario");
    }, 3000);

    const response = await createPost(formData, user.dataToken.token);
    console.log(response);

    if (response.error) {
      if (response.error.response.status === 401) {
        logout();
        navigate("/Login");
        return;
      }
      return;
    }

    setPost({
      name: "", // ok
      specie: "", // ok
      gender: "", // ok
      age: "", // ok
      last_seen: "", // ok
      description: "", // ok
      image: "",
      gallery: [],
      size: "", // ok
      breed: "", // ok
      lost_date: "", // ok
      owner: false, // ok
      location: "",
    });

    setGallery([]);
  };

  const handleChange = (evt) => {
    setPost({
      ...post,
      [evt.target.name]: evt.target.value,
    });
  }

  const handleNext = (evt) => {
    evt.preventDefault();
    setFormPage(formPage + 1);
  }

  const handlePrevious = (evt) => {
    evt.preventDefault();
    setFormPage(formPage - 1);
  }

  return (
    <div className="container-report-pet">
      <div className="container-image"></div>
      <div className="container-form">
        <h1>Reportar mascota</h1>
        <form className="form">
          {formPage === 1 && (
            <FormPartOne formData={post} handleChange={handleChange} />
          )}
          {formPage === 2 && (
            <FormPartTwo formData={post} handleChange={handleChange} gallery={gallery} setGallery={setGallery}/>
          )}

          <div className="item_center">
            <button className="form_button" onClick={handlePrevious}>
              <BiSolidLeftArrowSquare className="form_button_icon" />
              <span> Anterior</span>
            </button>
            <button className="form_button" onClick={handleNext}>
              <BiSolidRightArrowSquare className="form_button_icon" />
              <span> Siguiente</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const FormPartOne = ({formData, handleChange}) => {
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
            name="genero"
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
          {/* Size */}
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
}

const FormPartTwo = ({formData, handleChange, gallery, setGallery}) => {
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
          <ImagenesMascotas gallery={gallery} setGallery={setGallery}/>
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
}

export default ReportarMascotas;
