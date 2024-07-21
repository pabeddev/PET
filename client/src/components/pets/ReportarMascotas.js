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

  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(false);
  const [showAdditionalFields, setShowAdditionalFields] = useState(false);

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
    setLoading(true);
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
      name: "",
      specie: "",
      gender: "",
      age: "",
      last_seen: "",
      description: "",
      image: "",
      gallery: [],
      size: "",
      breed: "",
      lost_date: "",
      owner: false,
      location: "",
    });

    setGallery([]);
    setLoading(false);
  };

  const handleNext = (evt) => {
    evt.preventDefault();
    setPage(page + 1);
  }
  const handleBack = (evt) => {
    evt.preventDefault();
    setPage(page - 1);
  }

  return (
    <div className="container-report-pet">
      <div className="container-image"></div>
      <div className="container-form">
        <h1>Reportar mascota</h1>
        <form className="form">
          <div className="page_1">
            <div className="form_group_row">
              <div className="form-control">
                <label htmlFor="name">Nombre</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Nombre"
                  value={post.name}
                  onChange={(evt) =>
                    setPost({ ...post, name: evt.target.value })
                  }
                />
              </div>
            </div>

            <div className="form_group_row">
              <div className="form-control">
                <label htmlFor="specie">Especie</label>
                <select
                  id="specie"
                  name="specie"
                  value={post.specie}
                  onChange={(evt) =>
                    setPost({ ...post, specie: evt.target.value })
                  }
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
                  value={post.breed}
                  onChange={(evt) =>
                    setPost({ ...post, breed: evt.target.value })
                  }
                >
                  {breeds[post.specie].map((breed) => (
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
                  value={post.gender}
                  onChange={(evt) =>
                    setPost({ ...post, gender: evt.target.value })
                  }
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
                <label htmlFor="age">Edad</label>
                <input
                  type="text"
                  id="age"
                  name="age"
                  placeholder="Edad"
                  value={post.age}
                  onChange={(evt) =>
                    setPost({ ...post, age: evt.target.value })
                  }
                />
              </div>

              <div className="form-control">
                {/* Size */}
                <label htmlFor="size">Tamaño</label>
                <select
                  id="size"
                  name="size"
                  value={post.size}
                  onChange={(evt) =>
                    setPost({ ...post, size: evt.target.value })
                  }
                >
                  {size.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="item_center">
              <button className="form_button" onClick={handleNext}>
                <BiSolidRightArrowSquare
                  className="form_button_icon"
                />
                <span> Siguiente</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportarMascotas;
