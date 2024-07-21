import { useEffect, useState } from "react";
import "../../css/mascotasperdidas.css";
import Footer from "../Footer";
import { useNavigate } from "react-router-dom"; // Asegúrate de importar desde 'react-router-dom'

// Obtener mascotas
import { obtenerMascotas } from "../../api/pets";
import CardPet from "./CardPet";
import { searchPet } from "context/globalContext"; // Asegúrate de importar correctamente

const MascotasPerdidas = () => {
  const navigate = useNavigate();
  const { pets, searchTerm, setPets, setSearchTerm } = searchPet();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPets = async () => {
      const dataPets = await obtenerMascotas();
      setPets(dataPets);
      setLoading(false);
    };
    getPets();
  }, [setPets]);

  const filteredPets = pets.filter(pet =>
    pet.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="container mt-4 contenido">
        <div className="selector-section">
          <input
            type="search"
            placeholder="Buscar..."
            className="searching"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {loading ? (
          <h1 className="text-center mt-5">Cargando...</h1>
        ) : filteredPets.length === 0 ? (
          <h1 className="text-center mt-5">No hay mascotas perdidas</h1>
        ) : (
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {filteredPets.map((pet) => (
              <div key={pet._id} className="col">
                <CardPet pet={pet} />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default MascotasPerdidas;
