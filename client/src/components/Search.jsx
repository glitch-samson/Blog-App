import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { searched } from "../redux/features/filter/filterSlice";
import { fetchBlogs } from "../redux/features/blogs/blogsSlice";
import SearchPage from "./SearchPage";

const Search = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { blogs } = useSelector((state) => state.blogs);
  const [input, setInput] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    dispatch(fetchBlogs()); // Fetch all blogs initially
  }, [dispatch]);

  useEffect(() => {
    const trimmed = input.trim();

    if (!trimmed) {
      setResults([]);
      setError("");
      return;
    }

    setIsSearching(true);

    const timer = setTimeout(() => {
      const filtered = blogs.filter((blog) =>
        blog.title.toLowerCase().includes(trimmed.toLowerCase())
      );

      if (filtered.length > 0) {
        setResults(filtered.slice(0, 3)); // Show only the first 3 results
        setError("");
      } else {
        setResults([]);
        setError("No matching results found.");
      }

      setIsSearching(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [input, blogs]);

  const handleSelect = (query) => {
    setInput(query);
    dispatch(searched(query));
    navigate("/search"); // Navigate to the search results page
  };

  const handleSearch = () => {
    if (input.trim()) {
      dispatch(searched(input.trim()));
      navigate("/search"); // Trigger the search manually when the button is clicked
    }
  };

  return (
    <div className="relative w-full max-w-xl mx-auto">
      <div className="flex items-center h-12 rounded-lg shadow bg-white px-2">
        <div className="text-gray-400 mr-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          className="flex-grow outline-none text-sm text-gray-700"
          placeholder="Search blogs..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        {input && (
          <button onClick={() => setInput("")} className="text-gray-400 hover:text-gray-600 ml-2">
            ✖
          </button>
        )}
        {isSearching && (
          <div className="ml-2 animate-spin h-4 w-4 border-t-2 border-gray-500 rounded-full"></div>
        )}
        {/* Add Search Button next to the input */}
        <button
          onClick={handleSearch}
          className="ml-2 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
        >
          Search
        </button>
      </div>

      {(results.length > 0 || error) && (
        <div className="absolute w-full bg-white border mt-1 rounded shadow z-10 max-h-60 overflow-y-auto">
          {results.map((blog) => (
            <div
              key={blog.id}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
              onClick={() => handleSelect(blog.title)}
            >
              {blog.title}
            </div>
          ))}
          {error && (
            <div className="px-4 py-2 text-sm text-red-500">{error}</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
