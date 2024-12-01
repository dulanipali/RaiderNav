import axios from "axios";

const mapboxToken = "pk.eyJ1IjoiZHBhbGloYXAiLCJhIjoiY20zZmJrazF1MG9kbDJrb20wNWY3dDh2aiJ9.lq28a_QkzTTzklqoo7R6Jw";

export const fetchGeocode = async (query) => {
    const url = `https://api.mapbox.com/search/geocode/v6/forward`;

    try {
        const response = await axios.get(url, {
            params: {
                q: query,
                country: "us",
                bbox: "-101.9049894560196,33.5779927380198,-101.87059642323055,33.60704353401326",
                proximity: "ip",
                types: "neighborhood",
                access_token: mapboxToken,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching geocode data:", error);
        return null;
    }
};
