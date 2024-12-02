import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import { MapboxStyleSwitcherControl } from "mapbox-gl-style-switcher";
import "mapbox-gl-style-switcher/styles.css";
import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";
import Layout from "./layout";

mapboxgl.accessToken = "pk.eyJ1IjoiZHBhbGloYXAiLCJhIjoiY20zZmJrazF1MG9kbDJrb20wNWY3dDh2aiJ9.lq28a_QkzTTzklqoo7R6Jw";

const MapWithDirections = () => {
    const mapContainerRef = useRef(null);
    const instructionBoxRef = useRef(null);
    const [showInstructions, setShowInstructions] = useState(true);

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: "mapbox://styles/mapbox/streets-v12",
            center: [-101.883, 33.586], // Initial center (TTU)
            zoom: 14, // Initial zoom
        });

        const directions = new MapboxDirections({
            accessToken: mapboxgl.accessToken,
            unit: "metric",
            profile: "mapbox/walking",
            controls: {
                inputs: true, // Keep search inputs visible
            },
        });

        map.addControl(directions, "top-left");
        map.addControl(new MapboxStyleSwitcherControl());

        // Click outside listener for instructions box
        const handleClickOutside = (event) => {
            if (
                instructionBoxRef.current &&
                !instructionBoxRef.current.contains(event.target)
            ) {
                setShowInstructions(false); // Hide instructions if clicked outside
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            map.remove(); // Cleanup on unmount
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <Layout>
            <div>
                {/* Instruction Box */}
                {showInstructions && (
                    <div
                        ref={instructionBoxRef}
                        style={{
                            position: "absolute",
                            top: "10px",
                            left: "10px",
                            backgroundColor: "rgba(255, 255, 255, 0.9)",
                            padding: "10px",
                            borderRadius: "5px",
                            zIndex: 1000,
                            boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
                        }}
                    >
                        <p style={{ margin: 0, fontSize: "14px", fontWeight: "bold" }}>
                            Instructions:
                        </p>
                        <p style={{ margin: "5px 0 0 0", fontSize: "12px" }}>
                            Please type <strong>"TTU"</strong> in the origin and destination
                            fields to begin.
                        </p>
                    </div>
                )}

                {/* Map Container */}
                <div ref={mapContainerRef} style={{ width: "100%", height: "100vh" }} />
            </div>
        </Layout>
    );
};

export default MapWithDirections;
