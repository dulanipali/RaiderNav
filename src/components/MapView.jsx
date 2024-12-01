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
  const [query, setQuery] = useState("");

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

    mapRef.current.addControl(
      new MapboxGeocoder({
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
      })
    );


    //Stellite View
    mapRef.current.addControl(new MapboxStyleSwitcherControl());

    return () => {
      mapRef.current.remove(); // Clean up map on component unmount
    };
  }, []);

  // const handleSearch = () => {
  //   const selectedLocation = locations.find((loc) => loc.name.toLowerCase() === query.toLowerCase());
  //   if (selectedLocation) {
  //     // Pan the map to the selected location
  //     mapRef.current.flyTo({
  //       center: selectedLocation.coordinates,
  //       zoom: 14,
  //       essential: true,
  //     });
  //   } else {
  //     alert("Location not found!");
  //   }
  // };

  return (
    <div>
      {/* Search Bar */}
      <div style={{ marginBottom: "10px" }}>
        {/* <input
          type="text"
          placeholder="Search for a location"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch(); // Trigger search on Enter key
          }}
          style={{
            width: "300px",
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
        <button
          onClick={handleSearch}
          style={{
            marginLeft: "10px",
            padding: "8px 16px",
            backgroundColor: "#007BFF",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Search
        </button> */}
      </div>

      {/* Map Container */}
      <div
        ref={mapContainerRef}
        style={{
          width: "100%",
          height: "500px",
        }}
      ></div>
    </div>
  );
};

export default MapWithSearch;