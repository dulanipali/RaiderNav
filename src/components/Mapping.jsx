import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import axios from "axios";
import { useLocation } from "react-router-dom";

mapboxgl.accessToken = "pk.eyJ1IjoiZHBhbGloYXAiLCJhIjoiY20zZmJrazF1MG9kbDJrb20wNWY3dDh2aiJ9.lq28a_QkzTTzklqoo7R6Jw";

const MapPage = () => {
    const mapContainerRef = useRef(null);
    const mapRef = useRef(null);
    const [locationData, setLocationData] = useState(null);
    const location = useLocation();

    // Parse query parameters
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get("q") || "texas tech university"; // Default query
    const defaultCenter = [-101.878, 33.584]; // Fallback coordinates for Texas Tech

    useEffect(() => {
        const fetchLocationData = async () => {
            try {
                const response = await axios.get(
                    `https://api.mapbox.com/search/geocode/v6/forward?q=${encodeURIComponent(query)}&country=us&access_token=${mapboxgl.accessToken}`
                );

                if (response.data.features.length > 0) {
                    const { center } = response.data.features[0]; // Get first result's coordinates
                    console.log("Location Data:", center); // Debugging log
                    setLocationData(center); // Update location data
                } else {
                    console.error("No location found. Using default center.");
                    setLocationData(defaultCenter); // Fallback
                }
            } catch (error) {
                console.error("Error fetching location data:", error);
                setLocationData(defaultCenter); // Fallback
            }
        };

        fetchLocationData();
    }, [query]);

    useEffect(() => {
        if (locationData && !mapRef.current) {
            console.log("Initializing Map with:", locationData);

            mapRef.current = new mapboxgl.Map({
                container: mapContainerRef.current,
                style: "mapbox://styles/mapbox/streets-v11",
                center: locationData,
                zoom: 14,
            });

            new mapboxgl.Marker().setLngLat(locationData).addTo(mapRef.current);
        }
    }, [locationData]);

    return (
        <div
            ref={mapContainerRef}
            style={{
                width: "100%",
                height: "500px",
            }}
        ></div>
    );
};

export default MapPage;
