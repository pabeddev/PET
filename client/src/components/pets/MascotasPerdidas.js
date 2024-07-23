import "../../css/mascotasperdidas.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CardPet from "./CardPet";
import { obtenerMascotas } from "../../api/pets";
import { genders, breeds, species } from "utilities/maps";
import { Accordion } from "react-bootstrap";
import SearchOffIcon from "@mui/icons-material/SearchOff";

const MascotasPerdidas = () => {
  const [filteredPets, setFilteredPets] = useState([]);
  const [allPets, setAllPets] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    name: "",
    description: "",
    specie: "",
    breed: "",
    gender: "",
  });

  useEffect(() => {
    const getPets = async () => {
      const dataPets = await obtenerMascotas();
      setAllPets(dataPets);
      setFilteredPets(dataPets);
      setLoading(false);
    };
    getPets();
  }, []);

  useEffect(() => {
    searchPet(filters);
  }, [filters]);

  const handleSearch = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const searchPet = (filters) => {
    let filtered = allPets;

    if (filters.name) {
      filtered = filtered.filter((pet) =>
        pet.name.toLowerCase().includes(filters.name.toLowerCase())
      );
    }

    if (filters.description) {
      const searchDescription = filters.description.toLowerCase();
      filtered = filtered.filter((pet) =>
        pet.details.description.toLowerCase().includes(searchDescription)
      );
    }

    if (filters.specie) {
      filtered = filtered.filter((pet) =>
        pet.details.specie.toLowerCase().includes(filters.specie.toLowerCase())
      );
    }

    if (filters.breed) {
      filtered = filtered.filter((pet) =>
        pet.details.breed.toLowerCase().includes(filters.breed.toLowerCase())
      );
    }

    if (filters.gender) {
      filtered = filtered.filter(
        (pet) =>
          pet.details.gender.toLowerCase() === filters.gender.toLowerCase()
      );
    }

    setFilteredPets(filtered);
  };

  const handleReset = () => {
    setFilters({
      name: "",
      description: "",
      specie: "",
      breed: "",
      gender: "",
    });
    setFilteredPets(allPets);
  };

  return (
    <>
      <div className="container mt-4 contenido">
        {/* Sección de filtros */}
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Filtros</Accordion.Header>
            <Accordion.Body>
              <div className="selector-grid">
                <div className="selector">
                  <input
                    type="text"
                    name="name"
                    placeholder="Buscar por nombre"
                    onChange={handleSearch}
                    value={filters.name}
                    className="form-control"
                  />
                </div>
                <div className="selector">
                  <input
                    type="text"
                    name="description"
                    placeholder="Buscar por descripción"
                    onChange={handleSearch}
                    value={filters.description}
                    className="form-control"
                  />
                </div>
                <div className="selector">
                  <select
                    name="specie"
                    onChange={handleSearch}
                    value={filters.specie}
                    className="form-select"
                  >
                    <option value="">Especie</option>
                    {species.map((specie) => (
                      <option key={specie} value={specie}>
                        {specie}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="selector">
                  <select
                    name="breed"
                    onChange={handleSearch}
                    value={filters.breed}
                    className="form-select"
                    disabled={!filters.specie}
                  >
                    <option value="">Raza</option>
                    {filters.specie &&
                      breeds[filters.specie]?.map((breed) => (
                        <option key={breed} value={breed}>
                          {breed}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="selector">
                  <select
                    name="gender"
                    onChange={handleSearch}
                    value={filters.gender}
                    className="form-select"
                  >
                    <option value="">Género</option>
                    {genders.map((gender) => (
                      <option key={gender} value={gender}>
                        {gender}
                      </option>
                    ))}
                  </select>
                </div>
                {/* Botón de reset */}
                <div className="selector">
                  <button className="button_filters" onClick={handleReset}>
                    <SearchOffIcon />
                  </button>
                </div>
              </div>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

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
          <h1 className="text-center mt-5">
            No hay mascotas perdidas en este momento
          </h1>
        ) : (
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mt-1">
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
