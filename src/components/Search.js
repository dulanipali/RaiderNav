// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { fetchGeocode } from "./api";

// const SearchPage = () => {
//   const [query, setQuery] = useState("");
//   const navigate = useNavigate();

//   const handleSearch = async () => {
//     const geocodeData = await fetchGeocode(query);

//     if (geocodeData && geocodeData.features && geocodeData.features.length > 0) {
//       const { geometry } = geocodeData.features[0]; // Get the first result
//       const [lng, lat] = geometry.coordinates; // Extract coordinates

//       // Redirect to the map page with coordinates
//       navigate(`/map?lng=${lng}&lat=${lat}`);
//     } else {
//       alert("Location not found!");
//     }
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>Search for a Location</h1>
//       <input
//         type="text"
//         placeholder="Search for a location"
//         value={query}
//         onChange={(e) => setQuery(e.target.value)}
//         onKeyDown={(e) => {
//           if (e.key === "Enter") handleSearch();
//         }}
//         style={{
//           width: "300px",
//           padding: "8px",
//           border: "1px solid #ccc",
//           borderRadius: "4px",
//           marginRight: "10px",
//         }}
//       />
//       <button
//         onClick={handleSearch}
//         style={{
//           padding: "8px 16px",
//           backgroundColor: "#007BFF",
//           color: "#fff",
//           border: "none",
//           borderRadius: "4px",
//           cursor: "pointer",
//         }}
//       >
//         Search
//       </button>
//     </div>
//   );
// };

// export default SearchPage;

// // import { useState } from 'react';

// // function Search() {
// //   const [query, setQuery] = useState('');

// //   const handleSearch = (e) => {
// //     setQuery(e.target.value);
// //   };

// //   return (
// //     <div>
// //       <h2>Search for a building:</h2>
// //       <input
// //         type="text"
// //         value={query}
// //         onChange={handleSearch}
// //         placeholder="Enter building name"
// //       />
// //       {/* Display search results */}
// //     </div>
// //   );
// // }

// // export default Search;
