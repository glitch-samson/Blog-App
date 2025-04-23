import React from 'react';
import { Link } from 'react-router-dom';

const SmallCards = ({ blog }) => {
  const { id, title, image, author, authorPic, published_date } = blog;

  return (
    <div className="w-full lg:w-4/4 p-4">
      <Link
        className="block rounded-lg  shadow-lg hover:shadow-xl transition-all"
        to={`/blogs/${blog.id}`}
      >
        <div
          className="h-48 bg-cover bg-center w-100"
          style={{ backgroundImage: `url(${image})` }}
          title={title}
        ></div>
        <div className="bg-white p-4">
          <div className="text-gray-700 font-bold text-lg mb-2">{title}</div>
          <div className="flex items-center space-x-3">
            <img
              src={authorPic}
              className="h-10 w-10 rounded-full object-cover"
              alt={`Author ${author}`}
            />
            <div>
              <p className="font-semibold text-gray-800 text-sm">{author}</p>
              <p className="text-gray-600 text-xs">{published_date}</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default SmallCards;
