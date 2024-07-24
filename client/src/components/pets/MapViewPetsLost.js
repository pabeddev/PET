import { useEffect, useState } from "react";
import { obtenerMascotas } from "api/pets";
import MapView from "./MapView";

const MapViewPetsLost = () => {

  const [pets, setPets] = useState([]);

  useEffect(() => {
    const getPets = async () => {
      try{
        const dataPets = await obtenerMascotas();
        setPets(dataPets);
      }catch(error){
        
      }
    };
    getPets();
  },[]);

  return (
    <div className="container p-4 mt-5">
      <h1 className="text-center">Mascotas perdidas</h1>
      <MapView markers={pets} edit={false} height={"500px"}/>
    </div>
  );
};

export default MapViewPetsLost;