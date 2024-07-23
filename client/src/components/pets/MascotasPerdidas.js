import { useEffect, useState } from "react";
import "../../css/mascotasperdidas.css";
import { useNavigate } from "react-router-dom";

import { obtenerMascotas } from "../../api/pets";
import CardPet from "./CardPet";
import { searchPet } from "context/globalContext";

const MascotasPerdidas = () => {
  const navigate = useNavigate();
  const {
    filteredPets,
    searchTerm,
    setPets,
    setSearchTerm,
    setGenderFilter,
    setSpeciesFilter
  } = searchPet();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPets = async () => {
      const dataPets = await obtenerMascotas();
      setPets(dataPets);
      setLoading(false);
    };
    getPets();
  }, [setPets]);


  console.log(filteredPets);
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
          <div className="section-filters">
            <select onChange={(e) => setGenderFilter(e.target.value)} className="section-gender">
              <option value="">Género</option>
              <option value="Macho">Macho</option>
              <option value="Hembra">Hembra</option>
            </select>
            <select onChange={(e) => setSpeciesFilter(e.target.value)} className="section-specie">
              <option value="">Especies</option>
              <option value="Perro">Perro</option>
              <option value="Gato">Gato</option>
              <option value="Ave">Ave</option>
            </select>
          </div>
        </div>
        {loading ? (
          <h1 className="text-center mt-5">
            <div className="container-animation">
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
