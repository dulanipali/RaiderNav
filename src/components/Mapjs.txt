import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';
import { Navigate, useNavigate } from 'react-router-dom'; // Import useHistory

mapboxgl.accessToken = 'pk.eyJ1IjoidGFubmVyb3dlbnMyMyIsImEiOiJjbTFpZGp1bW4wcGQxMmtwc3NmcDhoaGFnIn0.xGzAWEofvML7fSWb22kq1g';

const containerStyle = {
  width: '100vw',
  height: '100vh',
};

// Define the bounding box for the TTU campus
const boundingBoxSW = {
  lat: 33.578136490204116,
  lng: -101.90501695636554,
};

const boundingBoxNE = {
  lat: 33.592222480055064,
  lng: -101.87078794597112,
};

function Map() {
  const mapContainer = useRef(null);
  const directions = useRef(null);
  const navigate = useNavigate(); // Initialize useHistory hook for navigation
  const [errorMessage, setErrorMessage] = useState(''); // Declare state for error messages
  const [userLocation, setUserLocation] = useState(null); // State for user location

  useEffect(() => {
    // Get the user's current location using the Geolocation API
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { longitude, latitude } = position.coords;
        setUserLocation({ lng: longitude, lat: latitude }); // Store user location
      },
      (error) => {
        console.error('Error getting user location:', error);
        setErrorMessage('Unable to retrieve your location.'); // Handle errors
      }
    );
  }, []);

  useEffect(() => {
    if (!mapContainer.current || !userLocation) {
      return; // Wait until we have a map container and user location
    }

    // Initialize Mapbox map
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v10',
      center: [userLocation.lng, userLocation.lat], // Center map on user location
      zoom: 14,
    });

    // Set the map bounds to the TTU campus area
    const bounds = new mapboxgl.LngLatBounds(
      [boundingBoxSW.lng, boundingBoxSW.lat],
      [boundingBoxNE.lng, boundingBoxNE.lat]
    );

    map.fitBounds(bounds, {
      padding: 20,
      maxZoom: 16,
    });

    // Initialize Directions control
    directions.current = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      unit: 'metric',
      profile: 'mapbox/walking',
      interactive: true,
      bbox: [boundingBoxSW.lng, boundingBoxSW.lat, boundingBoxNE.lng, boundingBoxNE.lat], // Limit to city
    });

    // Add directions to the map
    map.addControl(directions.current, 'top-left');

    // Set origin to user's location
    directions.current.setOrigin([userLocation.lng, userLocation.lat]);

    // Event listener for route updates
    directions.current.on('route', (event) => {
      if (!event.route || event.route.length === 0) {
        console.error('No route found. Please check the origin and destination.');
        return;
      }

      const route = event.route[0];
      const routeBounds = new mapboxgl.LngLatBounds();

      if (route.geometry && route.geometry.coordinates) {
        route.geometry.coordinates.forEach((coord) => {
          routeBounds.extend(coord);
        });

        // Check if the entire route is within the bounding box
        if (!(
          boundingBoxSW.lng <= routeBounds.getNorthEast().lng &&
          boundingBoxSW.lat <= routeBounds.getNorthEast().lat &&
          boundingBoxNE.lng >= routeBounds.getSouthWest().lng &&
          boundingBoxNE.lat >= routeBounds.getSouthWest().lat
        )) {
          setErrorMessage("The route goes outside of the TTU campus area. Please choose a different location.");
          directions.current.setDestination(); // Clear the destination
        } else {
          setErrorMessage(''); // Clear any error messages
        }
      } else {
        console.error('Route geometry is undefined or empty.');
      }
    });

    // Add marker to the map for user's current location
    new mapboxgl.Marker({ color: 'red' }) // Use a red marker for user location
      .setLngLat([userLocation.lng, userLocation.lat])
      .addTo(map);

    // Clean up on component unmount
    return () => map.remove();
  }, [userLocation]); // Depend on userLocation to re-run when it changes

  return (
    <div style={{ margin: 0, padding: 0, width: '100vw', height: '100vh' }}>
      <button
        style={{
          position: 'absolute',
          top: '10px',
          left: '325px',
          zIndex: 10,
          padding: '10px',
          backgroundColor: 'white',
          color: 'red',
        }}
        onClick={() => navigate('/')} // Navigate back to home on click
      >
        Back to Home
      </button>
      <h2 style={{ top: '50px', left: '325px', position: 'absolute', zIndex: 1, color: 'white', backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: '10px' }}>Map with Directions</h2>
      <div ref={mapContainer} style={containerStyle} />
      {errorMessage && <div style={{ color: 'red', zIndex: 1 }}>{errorMessage}</div>}
    </div>
  );
}


export default Map;
