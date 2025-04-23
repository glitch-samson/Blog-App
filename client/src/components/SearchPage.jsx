import React from "react";
import { useSelector } from "react-redux";
import Card from "../pages/blogs/Card";

const SearchPage = () => {
  const { blogs } = useSelector((state) => state.blogs);
  const { search } = useSelector((state) => state.filter);

  // Case-insensitive title match
  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full max-w-4xl mx-auto mt-6">
      <h2 className="text-xl font-semibold mb-4">
        Search Results for: <span className="text-indigo-600">"{search}"</span>
      </h2>

      {filteredBlogs.length > 0 ? (
        <div className="space-y-4">
          {filteredBlogs.map((blog) => (
            <Card key={blog.id} blog={blog} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-6">
          No blogs found for "<strong>{search}</strong>"
        </p>
      )}
    </div>
  );
};

export default SearchPage;
