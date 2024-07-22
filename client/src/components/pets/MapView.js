import { useLayoutEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";

const MapView = ({ markerCordinates, setMarkerCordinates, defaultMapCenterCordinates }) => {

  const mapDiv = useRef(null);
  const markerRef = useRef(null);

  console.log('marker default', defaultMapCenterCordinates)

  const [defaultCordinates, setDefaultCordinates] = useState(defaultMapCenterCordinates ? defaultMapCenterCordinates : [-92.266184, 14.902344]);

  useLayoutEffect(() => {
    const map = new mapboxgl.Map({
      container: mapDiv.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: defaultCordinates,
      zoom: 12,
    });

    map.addControl(new mapboxgl.NavigationControl());
    map.addControl(new mapboxgl.FullscreenControl());
    map.addControl(new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true
    }));

    if (typeof(markerCordinates) === 'object' && Object.keys(markerCordinates).length > 0) {
        console.log('Dentro de la condicion')
        markerRef.current = new mapboxgl.Marker()
            .setLngLat(markerCordinates)
            .addTo(map);
    }

    map.on("click", (event) => {
      if (markerRef.current) {
        markerRef.current.setLngLat(event.lngLat);
        setMarkerCordinates(event.lngLat);
      } else {
        markerRef.current = new mapboxgl.Marker()
          .setLngLat(event.lngLat)
          .addTo(map);
          setMarkerCordinates(event.lngLat);
      }
    });
    return () => map.remove();
  }, [defaultCordinates]);

  return (
    <div>
      <div ref={mapDiv} style={{ height: "400px", width: "100%" }}></div>
    </div>
  );
};

export default MapView;
