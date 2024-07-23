import React, { useEffect, useState } from "react";
import { getPetsUser } from "../../api/users";
import { authUserStore } from "../../context/globalContext";
import { useNavigate } from "react-router";
import { toastData } from "../../context/globalContext";
import '../../css/cards.css';

const UserPost = () => {
  const { toastError } = toastData();
  const [posts, setPosts] = useState([]);
  const { user, isAuthenticated } = authUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/Login');
      return;
    }

    const getDataPetsUser = async () => {
      try {
        const response = await getPetsUser(user.dataToken.token);
        setPosts(response.data);
      } catch (error) {
        toastError("Error al obtener las mascotas perdidas");
      }
    }

   

    getDataPetsUser();
  }, [isAuthenticated, navigate, toastError, user.dataToken.token]);

  return (
    <div className="container-fluid my-2">
      <h1 className="hero-title">Mis Mascotas</h1>

      {posts.length === 0 && (
        <p className="text-center">No tienes mascotas perdidas</p>
      )}

      <div className="row">
        {posts.map((post) => (
          <div key={post._id} className="col-lg-4 col-md-6 col-sm-12 mb-4">
            <div className="card">
              <div className="card-image">
                <img
                  src={post.identify?.image?.url || "https://via.placeholder.com/150"}
                  alt={post.name}
                  className="card-img-top"
                />
              </div>
              <div className="card-body">
                <h5 className="card-name-pet">{post.name}</h5>
                <p className="card-lost-pet">
                  <strong>Fecha de Pérdida:</strong> {new Date(post.publication.lost_date).toLocaleDateString("es-MX", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
                <p className="card-text">
                  <strong>Descripción:</strong> {post.details.description}
                </p>
                <p className="card-text">
                  <strong>Fecha de Publicación:</strong> {new Date(post.publication.published).toLocaleDateString("es-MX", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
                <p className="card-text">
                  <strong>Tamaño:</strong> {post.details.size}
                </p>
                <p className="card-text">
                  <strong>Especie:</strong> {post.details.specie}
                </p>
                <p className="card-text">
                  <strong>Raza:</strong> {post.details.breed}
                </p>
                <div className="form_input_container grid_col-6 container_checkbox_custom">
                    <label className="form_label_custom" htmlFor="found">¿La mascota ha sido encontrada?</label>
                    <input
                      className="form_input_checkbox_custom margin-top"
                      type="checkbox"
                      name="found"
                    />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserPost;
