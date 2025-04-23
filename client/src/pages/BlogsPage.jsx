import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogs } from './home/blogSplice';
import Card from './blogs/SmallCards';

const BlogsPage = () => {
  const dispatch = useDispatch();
  const { blogs, isLoading, isError, error } = useSelector((state) => state.blogs);
  const { tags, search } = useSelector((state) => state.filter);

  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 24;

  useEffect(() => {
    dispatch(fetchBlogs({ tags, search }));
  }, [dispatch, tags, search]);

  // Reverse the blogs to show the latest first
  const reversedBlogs = [...blogs].reverse();
  const paginatedBlogs = reversedBlogs.slice(
    (currentPage - 1) * blogsPerPage,
    currentPage * blogsPerPage
  );

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl sm:text-4xl font-bold text-center mb-8">Latest Articles</h1>

      {/* Grid for the blogs */}
      <div className="grid grid-cols-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {!isError && !isLoading && paginatedBlogs?.length > 0 ? (
          paginatedBlogs.map((blog, index) => (
            <Card key={index} blog={blog} />
          ))
        ) : (
          <div className="col-span-12 text-center py-10 text-gray-500">No blogs found!</div>
        )}
      </div>

      {/* Pagination */}
      <div className="text-center mt-6">
        <button
          className="px-3 py-1 bg-red-500 text-white rounded disabled:opacity-50"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="px-3">{currentPage}</span>
        <button
          className="px-3 py-1 bg-indigo-500 text-white rounded"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage * blogsPerPage >= reversedBlogs.length}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BlogsPage;
