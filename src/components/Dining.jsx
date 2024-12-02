import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { MapboxStyleSwitcherControl } from "mapbox-gl-style-switcher";
import "mapbox-gl-style-switcher/styles.css";
import Layout from "./layout";
import { Box, Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom';


mapboxgl.accessToken = "pk.eyJ1IjoiZHBhbGloYXAiLCJhIjoiY20zZmJrazF1MG9kbDJrb20wNWY3dDh2aiJ9.lq28a_QkzTTzklqoo7R6Jw";

const locations = [
    {
        id: 1,
        name: "Commons",
        open: "Mon - Thu | 11 am - 10 pm, Fri & Sat | 11 am - 8 pm, Sun | 11 am - 10 pm",
        coordinates: [-101.87395876405218, 33.57972144641611],
    },
    {
        id: 2,
        name: "Sneed",
        open: "Mon - Fri | 7 am - 10 pm, Sat & Sun | 9 am - 9 pm",
        coordinates: [-101.87136622161312, 33.58559986838839],
    },
    {
        id: 3,
        name: "Sub food court",
        open: "Mon - Fri | 9am - 4pm",
        coordinates: [- 101.87479387179201, 33.58131311998538],
    },
    {
        id: 4,
        name: "Wiggins",
        open: "Mon - Sat | 10:30am - 10:00pm",
        coordinates: [-101.88364237345277, 33.57972966735108],
    },
    {
        id: 5,
        name: "The Market",
        open: "Mon - Thu | 7 am - 11 pm, Fri | 7 am - 8 pm, Sat | 11 am - 8 pm, Sun | 11 am - 9 pm",
        coordinates: [-101.88033853696706, 33.583701118161045],
    },
    {
        id: 6,
        name: "Chick-Fil-A Rawls",
        open: "Mon - Fri | 10:30am - 9:00pm, Sat | 11:00am - 7:00pm",
        coordinates: [-101.87989367534837, 33.58754360323075],
    },
    {
        id: 7,
        name: "Sam's Express",
        open: "Mon - Thu | 8 am - 4 pm, Fri | 8 am - 1 pm",
        coordinates: [-101.87372124609917, 33.58572374437906],
    },
    {
        id: 8,
        name: "Sam's Express",
        open: "Mon - Thu | 8 am - 4 pm, Fri | 8 am - 1 pm",
        coordinates: [-101.87614805330712, 33.581509132053384],
    },
];

const Dining = () => {
    const mapContainerRef = useRef(null);
    const mapRef = useRef(null);
    const [showDirections, setShowDirections] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const instructionBoxRef = useRef(null);
    const [showInstructions, setShowInstructions] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        // Initialize the map
        mapRef.current = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: "mapbox://styles/mapbox/streets-v11",
            center: [-101.878, 33.585], // Initial center
            zoom: 14, // Initial zoom
        });

        // Add markers for locations
        locations.forEach((location) => {
            const marker = new mapboxgl.Marker({ color: "red", }).setLngLat(location.coordinates).addTo(mapRef.current);
            // Create a popup for each marker
            const popup = new mapboxgl.Popup({ offset: 25 })
                .setHTML(`<h3>${location.name}</h3><p>${location.open}</p>`);

            // Attach the popup to the marker
            marker.setPopup(popup);

            // Optional: Open the popup on marker click
            marker.getElement().addEventListener('click', () => {
                popup.addTo(mapRef.current);
            });
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
            navigate('/directions')
        }
    };

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

    return (
        <Layout>
            <Box display="flex"
                flexDirection="column"
                alignItems="center"
                paddingX={2}
                boxSizing="border-box"
                width="100vw"
                overflowX="hidden"
            >
                <Box position="relative" bgcolor="white" style={{ marginTop: '16px' }}>
                    <Box >
                        <Typography variant="h5"
                            component="div"
                            sx={{
                                fontFamily: 'Roboto, Helvetica', fontWeight: 'normal', color: 'black'
                            }}>
                            Dining Options
                        </Typography>
                    </Box>
                    <Box sx={{ mt: '20px', mb: '15px' }}>
                        <Typography variant="body1" component="div" sx={{ fontFamily: 'Roboto, Helvetica', fontWeight: 'normal', color: 'black' }}>
                            Explore various dining options available on campus.
                        </Typography>
                    </Box>
                    <div>
                        {showInstructions && (
                            <div
                                ref={instructionBoxRef}
                                style={{
                                    position: "absolute",
                                    top: "160px",
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
                        <div
                            ref={mapContainerRef}
                            style={{
                                width: "100%",
                                height: "500px",
                            }}
                        ></div>

                        {showDirections && (
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

                        )}

                        <style jsx>{`
        .mapboxgl-ctrl-geocoder {
          position: relative; /* Ensure the container is positioned correctly */
          top: 10px; /* Distance from the top */
          left: -100px; /* Distance from the left */
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
                    <Box >
                        <Typography variant="body1" component="div" sx={{ fontFamily: 'Roboto, Helvetica', fontWeight: 'normal', color: 'black', mt: '20px' }}>
                            For more information, check out the Hospitality website.
                        </Typography>
                        <Typography
                            variant="body1"
                            component="p"
                            sx={{
                                fontFamily: 'Roboto, Helvetica', fontWeight: 'normal', color: 'grey', mb: '16px'
                            }}>
                            <a href="https://www.depts.ttu.edu/hospitality/" target="_blank" rel="noopener noreferrer" style={{ color: '#660708' }}>
                                https://www.depts.ttu.edu/hospitality/
                            </a>
                        </Typography>
                    </Box>
                </Box>
            </Box >

        </Layout>

    );
};

export default Dining;