import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { MapboxStyleSwitcherControl } from "mapbox-gl-style-switcher";
import "mapbox-gl-style-switcher/styles.css";

mapboxgl.accessToken = "pk.eyJ1IjoiZHBhbGloYXAiLCJhIjoiY20zZmJrazF1MG9kbDJrb20wNWY3dDh2aiJ9.lq28a_QkzTTzklqoo7R6Jw";

const locations = [
  {
    id: 1,
    name: "Commons",
    coordinates: [-101.87395876405218, 33.57972144641611],
  },
  {
    id: 2,
    name: "Sneed",
    coordinates: [-101.87136622161312, 33.58559986838839],
  },
  {
    id: 3,
    name: "Wiggins",
    coordinates: [-101.88367560321792, 33.57990305976761],
  },
];

const MapWithSearch = () => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const [showDirections, setShowDirections] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    // Initialize the map
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-101.883, 33.586], // Initial center
      zoom: 14, // Initial zoom
    });

    // Add markers for locations
    locations.forEach((location) => {
      new mapboxgl.Marker().setLngLat(location.coordinates).addTo(mapRef.current);
    });

    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      bbox: [-101.911212, 33.577901, -101.870573, 33.607982],
      autocomplete: true,
      fuzzyMatch: true,
      localGeocoder: (query) => {
        if (!query.toLowerCase().includes("ttu - ")) {
          query = `ttu - ${query}`; // Append "ttu" if not already in the query
        }
        return null; // Continue with the default geocoder behavior
      },
      placeholder: 'Search for a location',
    });

    // Handle the result of the search
    geocoder.on('result', (event) => {
      const { geometry, place_name } = event.result;
      setSelectedLocation({ coordinates: geometry.coordinates, name: place_name });
      setShowDirections(true); // Show the directions button
      mapRef.current.flyTo({ center: geometry.coordinates, zoom: 14 }); // Fly to the selected location
    });

    mapRef.current.addControl(geocoder);

    // Satellite View
    mapRef.current.addControl(new MapboxStyleSwitcherControl());

    return () => {
      mapRef.current.remove(); // Clean up map on component unmount
    };
  }, []);

  const handleDirectionsClick = () => {
    if (selectedLocation) {
      const { coordinates } = selectedLocation;
      // Here you can implement the logic to show directions
      // For example, open a new window with Google Maps directions
      const url = `https://www.google.com/maps/dir/?api=1&destination=${coordinates[1]},${coordinates[0]}`;
      window.open(url, "_blank");
    }
  };

  return (
    <div>
      {/* Map Container */}
      <div
        ref={mapContainerRef}
        style={{
          width: "100%",
          height: "500px",
        }}
      ></div>

      {showDirections && (
        <button onClick={handleDirectionsClick} style={{ marginTop: '10px', padding: '10px', fontSize: '16px' }}>
          Directions
        </button>
      )}

      <style jsx>{`
        .mapboxgl-ctrl-geocoder {
          position: relative; /* Ensure the container is positioned correctly */
          top: 10px; /* Distance from the top */
          left: -200px; /* Distance from the left */
          z-index: 1000; /* Keep it above the map */
          width: 300px; /* Set a fixed width */
          max-width: 90%; /* Ensure it fits on smaller screens */
          box-sizing: border-box; 
        }

        .mapboxgl-ctrl-geocoder input {
          padding-left: 40px; /* Adjust this value to create space for the icon */
          height: 40px; /* Adjust height if necessary */
          font-size: 16px; /* Adjust font size if necessary */
        }

        .mapboxgl-ctrl-geocoder .mapboxgl-ctrl-geocoder--icon {
          position: absolute; /* Position the icon absolutely */
          left: 230px; /* Adjust this value to position the icon */
          top: 50%; /* Center the icon vertically */
          transform: translateY(-50%); /* Adjust for vertical centering */
          pointer-events: none; /* Prevent icon from interfering with input events */
        }
      `}</style>
    </div>
  );
};

export default MapWithSearch;