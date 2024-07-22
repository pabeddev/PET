import { useEffect, useState } from "react";
import "../../css/mascotasperdidas.css";
import { useNavigate } from "react-router-dom"; 

// Obtener mascotas
import { obtenerMascotas } from "../../api/pets";
import CardPet from "./CardPet";
import { searchPet } from "context/globalContext";
console.log("mascotas",obtenerMascotas);
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
          <h1 className="text-center mt-5">
            <div className="container">
              <div className="cargando">
                <div className="pelotas"></div>
                <div className="pelotas"></div>
                <div className="pelotas"></div>
                <span className="texto-cargando">Cargando...</span>
              </div>
            </div>
          </h1>
        ) : filteredPets.length === 0 ? (
          <h1 className="text-center mt-5">No hay mascotas perdidas en este momento</h1>
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
