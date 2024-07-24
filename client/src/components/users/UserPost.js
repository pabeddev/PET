import React, { useEffect, useState } from "react";
import { getPetsUser } from "../../api/users";
import { authUserStore } from "../../context/globalContext";
import { useNavigate } from "react-router";
import { toastData } from "../../context/globalContext";
import "../../css/cards.css";
import { CardPet } from "components/pets";

const UserPost = () => {
  const { toastError } = toastData();
  const [posts, setPosts] = useState([]);
  const { user, isAuthenticated } = authUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/Login");
      return;
    }

    const getDataPetsUser = async () => {
      try {
        const response = await getPetsUser(user.dataToken.token);
        console.log(response);
        setPosts(response.data);
      } catch (error) {
        toastError("Error al obtener las mascotas perdidas");
      }
    };

    getDataPetsUser();
  }, [isAuthenticated, navigate, toastError, user.dataToken.token]);

  return (
    <div className="container-fluid my-2">
      <h1 className="text-center hero-title">Mis Mascotas</h1>
      <div className="container">
        {posts.length === 0 && (
          <p className="text-center">No tienes mascotas perdidas</p>
        )}
        <div className="row justify-content-center row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mt-1">
          {posts.map((post) => (
            <div key={post._id} className="col d-flex justify-content-center">
              <CardPet pet={post} user={true} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserPost;
