import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions"; // Import directions control
import { MapboxStyleSwitcherControl } from "mapbox-gl-style-switcher";
import "mapbox-gl-style-switcher/styles.css";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css"; // Import directions CSS

mapboxgl.accessToken = "pk.eyJ1IjoiZHBhbGloYXAiLCJhIjoiY20zZmJrazF1MG9kbDJrb20wNWY3dDh2aiJ9.lq28a_QkzTTzklqoo7R6Jw";

const MapWithDirections = () => {
    const mapContainerRef = useRef(null);

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [-101.883, 33.586], // Initial center
            zoom: 14, // Initial zoom

        });

        // Add the directions control
        const directions = new MapboxDirections({
            accessToken: mapboxgl.accessToken,
            bbox: [-101.911212, 33.577901, -101.870573, 33.607982],
            autocomplete: true,
        });
        map.addControl(directions, 'top-left');
        map.addControl(new MapboxStyleSwitcherControl());

        return () => {
            map.remove(); // Cleanup on unmount
        };
    }, []);

    return (
        <div>
            <div ref={mapContainerRef} style={{ width: "100%", height: "100vh" }} />
        </div>
    );
};

export default MapWithDirections;