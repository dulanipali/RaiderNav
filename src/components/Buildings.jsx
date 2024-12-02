import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { MapboxStyleSwitcherControl } from "mapbox-gl-style-switcher";
import "mapbox-gl-style-switcher/styles.css";
import Layout from "./layout";
import { useNavigate } from 'react-router-dom';

mapboxgl.accessToken = "pk.eyJ1IjoiZHBhbGloYXAiLCJhIjoiY20zZmJrazF1MG9kbDJrb20wNWY3dDh2aiJ9.lq28a_QkzTTzklqoo7R6Jw";

const buildings = [
    {
        id: 1,
        name: "Student Union Building",
        address: "2625 15th Street, Box 42031, Lubbock, Texas 79409",
        phone: "806.742.3636 | Activities: 806.742.4708",
        email: "studentunion@ttu.edu",
        website: "https://www.depts.ttu.edu/sub/Docs/2024MapForWebsite.pdf",
    },
    {
        id: 2,
        name: "Library",
        address: "2802 18th Street, Lubbock, TX 79409",
        phone: "(806)742-2265",
        email: "libraries.website@ttu.edu",
        website: "https://www.depts.ttu.edu/library/about/facility/maps/ground.php",
    },
]
const BuildingInfo = () => {
    const mapContainerRef = useRef(null);
    const mapRef = useRef(null);
    const [showDirections, setShowDirections] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Initialize the map
        mapRef.current = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: "mapbox://styles/mapbox/streets-v11",
            center: [-101.883, 33.586], // Initial center
            zoom: 14, // Initial zoom
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
            const matchedBuilding = buildings.find(building =>
                place_name.toLowerCase().includes(building.name.toLowerCase())
            );

            if (matchedBuilding) {
                setSelectedLocation({ coordinates: geometry.coordinates, name: matchedBuilding.name, info: matchedBuilding });
                setShowDirections(true); // Show the directions button
                mapRef.current.flyTo({ center: geometry.coordinates, zoom: 14 }); // Fly to the selected location
            } else {
                setSelectedLocation({ coordinates: geometry.coordinates, name: place_name });
                setShowDirections(false); // Hide the directions button if not a matched building
                mapRef.current.flyTo({ center: geometry.coordinates, zoom: 14 }); // Fly to the selected location
            }
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
            navigate('/directions')
        }
    };

    return (
        <Layout>
            <div>
                {/* Map Container */}
                <div
                    ref={mapContainerRef}
                    style={{
                        width: "100%",
                        height: "500px",
                    }}
                ></div>

                {selectedLocation && selectedLocation.info && (
                    <div className="building-info">
                        <h2>{selectedLocation.info.name}</h2>
                        <p><span className="label">Address: </span>{selectedLocation.info.address}</p>
                        <p><span className="label">Phone: </span>{selectedLocation.info.phone}</p>
                        <p><span className="label">Email: </span>{selectedLocation.info.email}</p>
                        <p><span className="label">View Floor Maps: </span><a href={selectedLocation.info.website} target="_blank" rel="noopener noreferrer">{selectedLocation.info.website}</a></p>
                        <button
                            onClick={handleDirectionsClick}
                            style={{
                                marginTop: '10px',
                                padding: '10px 20px', // Added padding for better size
                                fontSize: '16px',
                                color: '#FFFFFF',
                                backgroundColor: '#660708',
                                border: 'none', // Remove border
                                borderRadius: '8px', // Rounded corners
                                cursor: 'pointer', // Change cursor to pointer on hover
                                transition: 'background-color 0.3s, transform 0.2s', // Smooth transition for color and scale
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.backgroundColor = '#490506'; // Change background on hover
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.backgroundColor = '#660708'; // Reset background color
                            }}
                        >
                            Directions
                        </button>
                    </div>
                )}

                <style jsx>{`
            .building-info {
                margin-top: 20px;
                padding: 10px;
                background-color: #f9f9f9;
                border: 1px solid #ccc;
                border-radius: 5px;
            }
            .label {
                font-weight: bold;
                color: #660708; /* Change this color to whatever you prefer */
            }
        `}</style>

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
        </Layout>
    );
};

export default BuildingInfo;