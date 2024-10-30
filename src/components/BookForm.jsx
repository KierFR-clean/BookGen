import React, { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { BeatLoader } from "react-spinners";


const BookForm = ({ isUpdating = false }) => {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [bookFormData, setBookFormData] = useState({
    title: '',
    author: '',
    published_year: '',
    genre: '',
    description: ''
  });

  useEffect(() => {
    if (isUpdating) {
      fetchSingleBook();
    }
  }, [isUpdating]);

  const fetchSingleBook = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:8000/api/books/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch book');
      }

      const singleBookData = await response.json();
      setBookFormData(singleBookData.data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
    }
  }

  const handleBookFormSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const givenURL = isUpdating
        ? `http://localhost:8000/api/books/${id}`
        : 'http://localhost:8000/api/books';

      const response = await fetch(givenURL, {
        method: isUpdating ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookFormData)
      });

      if (!response.ok) {
        const errorBookData = await response.json();
        throw new Error(JSON.stringify(errorBookData.errors));
      }
      Swal.fire({ title: 'Success', text: `${bookFormData.id ? bookFormData.title + ' updated successfully' : bookFormData.title + ' added successfully'}`, icon: "success" });

      setLoading(false);
      navigate('/');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleBookChange = (e) => {
    setBookFormData({
      ...bookFormData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className='container mx-auto py-8 px-4'>
      <div className='max-w-2xl mx-auto rounded-lg bg-white shadow-lg p-8 '>
        <Link
          to='/'
          className="bg-[#a7d28d]  hover:bg-[#fff] shadow-lg hover:shadow-md rounded-xl px-2 py-2 font-medium text-white"
        >
          Back to Book Collection
        </Link>

        <div className='flex items-center justify-between mb-8 4'>

          <h2 className='text-2xl font-bold text-gray-800 '>
            {isUpdating ? 'Update A Book' : 'Add A New Book'}
          </h2>
        </div>

        {error && (
          <div className="bg-red-50 text-red-500 p-4 rounded-lg mb-6">
            Error: {error}
          </div>
        )}
        <hr />

        <form onSubmit={handleBookFormSubmit} className='space-y-3'>
          <div>
            <label className='block text-left text-2xl  text-gray-700 font-bold mb-2'>
              Title
            </label>
            <input
              type="text"
              name="title"
              value={bookFormData.title}
              onChange={handleBookChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 bg-white text-gray-900 focus:ring-green-200"
              required
            />
          </div>
          <div>
            <label className='block text-left text-2xl  text-gray-700 font-bold mb-2'>
              Author
            </label>
            <input
              type="text"
              name="author"
              value={bookFormData.author}
              onChange={handleBookChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 bg-white text-gray-900 focus:ring-green-200"
              required
            />
          </div>
          <div>
            <label className='block text-left text-2xl  text-gray-700 font-bold mb-2'>
              Published Year
            </label>
            <input
              type="number"
              name="published_year"
              value={bookFormData.published_year}
              onChange={handleBookChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 bg-white text-gray-900 focus:ring-green-200"
              required
              min='1000'
              max={new Date().getFullYear()}
            />
          </div>
          <div>
            <label className='block text-left text-2xl  text-gray-700 font-bold mb-2'>
              Genre
            </label>
            <input
              type="text"
              name="genre"
              value={bookFormData.genre}
              onChange={handleBookChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 bg-white text-gray-900 focus:ring-green-200"
              required
            />
          </div>
          <div>
            <label className='block text-left text-2xl  text-gray-700 font-bold mb-2'>
              Description
            </label>
            <textarea
              name="description"
              value={bookFormData.description}
              onChange={handleBookChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 bg-white text-gray-900 focus:ring-green-200"
              required
              rows="5"
            />
          </div>
          <div className='flex justify-center'>
            {loading ? (
              <div className="flex justify-center">
                <BeatLoader color="#ffffff" />
              </div>
            ) : (
              <button
                type='submit'
                className='bg-[#a7d28d]  hover:bg-[#99b488] shadow-lg hover:shadow-md rounded-xl px-2 py-2 font-medium text-white'
              >
                {isUpdating ? 'Update ' : 'Add '} This Book
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default BookForm