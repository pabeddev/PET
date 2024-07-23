import { useEffect, useState } from "react";
import { getPetsUser } from "../../api/users";
import { authUserStore } from "../../context/globalContext";
import { useNavigate } from "react-router";

import { toastData } from "../../context/globalContext";

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

  }, [isAuthenticated]);

  return (
    <div>
      <h1>Mis mascotas perdidas</h1>
     
      {
        posts.length === 0 && (
          <p>No tienes mascotas perdidas</p>
        )
      }

      <div>
        {posts.map((post) => (
          <div key={post._id}>
            <div>
             
              <img
                src={post.identify.image.url}
                alt={post.name}
              />

              <div>
                <h5>Nombre: {post.name}</h5>
              
                <p>
                  <strong>Descripción:</strong> {post.details.description}
                </p>
              
                <p>
                  <strong>Fecha de Publicación:</strong>{" "}
                  {new Date(post.publication.published).toLocaleDateString("es-MX", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                  <strong>Fecha de Pérdida:</strong>{" "}
                  {new Date(post.publication.lost_date).toLocaleDateString("es-MX", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              
                <p>
                  <strong>Tamaño:</strong> {post.details.size}
                </p>
              
                <p>
                  <strong>Especie:</strong> {post.details.specie}
                </p>
              
                <p>
                  <strong>Raza:</strong> {post.details.breed}
                </p>
              
              </div>
            
            </div>
          
          </div>
        ))}
      </div>
    </div>

  );
};

export default UserPost;