import React from "react";
import { useLocation } from "react-router-dom";
import MapWithSearch from "./MapWithSearch";

const SearchResults = () => {
    const query = new URLSearchParams(useLocation().search).get("query");

    return (
        <div>
            <h1>Search Results for: {query}</h1>
            <MapWithSearch searchQuery={query} />
        </div>
    );
};

export default SearchResults;