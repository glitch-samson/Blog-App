import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [author, setAuthor] = useState('');
  const [authorPic, setAuthorPic] = useState('');
  const [publishedDate, setPublishedDate] = useState('');
  const [readingTime, setReadingTime] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [isPending, setIsPending] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const navigate = useNavigate();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const blog = {
      title,
      image,
      category,
      author,
      authorPic,
      published_date: publishedDate,
      reading_time: readingTime,
      content,
      tags: tags.split(',').map(tag => tag.trim())
    };

    setIsPending(true);

    try {
      const response = await fetch('http://localhost:3000/blogs', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blog)
      });

      if (!response.ok) {
        throw new Error('Failed to add blog');
      }

      setIsPending(false);
      alert('✅ Blog added successfully!');
      navigate('/');
    } catch (error) {
      setIsPending(false);
      console.error('Error:', error);
      alert('❌ Something went wrong. Please try again.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Add a New Blog</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-1">Blog Title:</label>
          <input type="text" required value={title} onChange={e => setTitle(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Upload Image:</label>
          <input type="file" accept="image/*" onChange={handleImageUpload}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-blue-50 file:text-blue-700 file:rounded-md hover:file:bg-blue-100" />
          {previewImage && (
            <img src={previewImage} alt="Preview" className="mt-2 w-48 rounded shadow-md" />
          )}
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Category:</label>
          <select 
            value={category} 
            onChange={e => setCategory(e.target.value)} 
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400">
            <option value="">Select a Category</option>
            <option value="Science">Science</option>
            <option value="Arts">Arts</option>
            <option value="Commerce">Commerce</option>
            <option value="Others">Others</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Author Name:</label>
          <input type="text" required value={author} onChange={e => setAuthor(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Author Picture URL:</label>
          <input type="text" required value={authorPic} onChange={e => setAuthorPic(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Published Date:</label>
          <input type="text" required placeholder="e.g., October 4, 2023" value={publishedDate} onChange={e => setPublishedDate(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Reading Time:</label>
          <input type="text" required placeholder="e.g., 4 minutes" value={readingTime} onChange={e => setReadingTime(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Blog Content:</label>
          <textarea required value={content} onChange={e => setContent(e.target.value)}
            className="w-full h-32 px-4 py-2 border rounded-md resize-y focus:outline-none focus:ring-2 focus:ring-blue-400"></textarea>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Tags (comma separated):</label>
          <input type="text" placeholder="e.g., Work, Blogging" value={tags} onChange={e => setTags(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
        </div>

        <div>
          {!isPending && <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">Add Blog</button>}
          {isPending && <button disabled className="px-6 py-2 bg-gray-400 text-white rounded-lg">Adding Blog...</button>}
        </div>
      </form>
    </div>
  );
};

export default Create;
