import "css/MapView.css";
import { useEffect, useRef, useState } from "react";
import { useLayoutEffect } from "react";
import mapboxgl from "mapbox-gl";


const MapView = ({
  markerCordinates,
  setMarkerCordinates,
  defaultMapCenterCordinates,
  edit = true,
  markers = [],
  height = "400px",
  width = "100%",
}) => {
  const mapDiv = useRef(null);
  const markerRef = useRef(null);
  const [defaultCordinates, setDefaultCordinates] = useState(
    defaultMapCenterCordinates
      ? defaultMapCenterCordinates
      : [-92.266184, 14.902344]
  );

  const mapRef = useRef(null); // Referencia para el mapa

  useLayoutEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoibWFpbmxha2UiLCJhIjoiY2x5dmFiOWIwMDBwNDJrcHoyNDhmcmJoNCJ9.-3AL3FN0XWB5D-vJpEkWqA";
    // Inicializa el mapa solo una vez
    mapRef.current = new mapboxgl.Map({
      container: mapDiv.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: defaultCordinates,
      zoom: 12,
    });

    mapRef.current.addControl(new mapboxgl.NavigationControl());
    mapRef.current.addControl(new mapboxgl.FullscreenControl());
    mapRef.current.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
      })
    );

    // Agrega el marcador inicial si hay coordenadas
    if (markerCordinates !== null && markerCordinates !== undefined) {
      if (Object.keys(markerCordinates).length > 0) {
        markerRef.current = new mapboxgl.Marker()
          .setLngLat([markerCordinates.lng, markerCordinates.lat])
          .addTo(mapRef.current);
      }
    }

    // Configura el evento de clic para agregar un nuevo marcador si `edit` es verdadero
    if (edit) {
      mapRef.current.on("click", (event) => {
        if (markerRef.current) {
          markerRef.current.setLngLat(event.lngLat);
          setMarkerCordinates(event.lngLat);
        } else {
          markerRef.current = new mapboxgl.Marker()
            .setLngLat(event.lngLat)
            .addTo(mapRef.current);
          setMarkerCordinates(event.lngLat);
        }
      });
    }

    // Limpia el mapa al desmontar el componente
    return () => mapRef.current.remove();
  }, []);

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoibWFpbmxha2UiLCJhIjoiY2x5dmFiOWIwMDBwNDJrcHoyNDhmcmJoNCJ9.-3AL3FN0XWB5D-vJpEkWqA";
    if (!mapRef.current) return; // Asegurar que el mapa esté inicializado

    // Limpiar marcadores anteriores
    const markerElements = document.querySelectorAll(".marker");
    markerElements.forEach((el) => el.remove());

    // Agrega los marcadores de la lista
    if (markers.length > 0) {
      markers.forEach((marker) => {
        if (marker.publication.location === null) {
          return;
        }

        const coordinates = [
          marker.publication.location.lng,
          marker.publication.location.lat,
        ];

        // Crea el elemento DOM para el marcador
        const el = document.createElement("div");
        const size = 40; // Tamaño del marcador (ancho y alto)
        el.className = "marker";
        el.style.backgroundImage = `url(${marker.identify.image.url})`;
        el.style.width = `${size}px`;
        el.style.height = `${size}px`;
        el.style.backgroundSize = "cover"; // Asegura que la imagen cubra todo el marcador
        el.style.backgroundRepeat = "no-repeat"; // Evita que la imagen se repita
        el.style.borderRadius = "50%"; // Hace que el marcador sea circular
        el.style.cursor = "pointer"; // Cambia el cursor cuando está sobre el marcador

        // Define el contenido del popup
        const popupContent = `
        <div class="popup-content" style="text-align: center; padding: 30px; border-radius: 15px; background-color: #fff; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
          <img src="${marker.identify.image.url}" alt="Imagen de la mascota" style="width: 120px; height: auto; margin-bottom: 15px; border: 2px solid #ddd;"/>
          <h4 style="color: #333; margin-bottom: 8px; font-weight: bold;">${marker.name}</h4>
          <p style="color: #555; margin-bottom: 5px; font-size: 14px; font-style: italic;">${marker.publication.lost_date.split("T")[0]}</p>
          <p style="color: #555; margin-bottom: 5px; font-size: 14px; font-style: italic;">Especie: ${marker.details.specie}</p>
          <p style="color: #555; margin-bottom: 10px; font-size: 14px; font-style: italic;">Raza: ${marker.details.breed}</p>
          <a href="/Mascota-Perdida/${marker._id}" class="btn btn-primary" border-color: #ff6600; font-size: 14px; padding: 10px 20px; text-transform: uppercase; font-weight: bold;">Ver más</a>
        </div>
      `;
      
      
      

        // Crea y configura el popup
        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(popupContent);

        // Agrega el marcador al mapa con el popup
        new mapboxgl.Marker(el)
          .setLngLat(coordinates)
          .setPopup(popup)
          .addTo(mapRef.current);
      });
    }
  }, [markers]); // Este efecto se ejecutará cada vez que cambie la lista de marcadores

  return (
    <div>
      <div ref={mapDiv} style={{ height: height, width: width }}></div>
    </div>
  );
};

export default MapView;
