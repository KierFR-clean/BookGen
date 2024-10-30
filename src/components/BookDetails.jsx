import { useParams, Link } from 'react-router-dom'
import React, { useState, useEffect } from 'react';

const BookDetails = () => {
  const { loading, setLoading } = useState(false);
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSingleBook();
  }, []);

  const fetchSingleBook = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/books/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch book details');
      }

      const singleBookData = await response.json();
      setBook(singleBookData.data);
    } catch (error) {
      setError(error.message);
    }
  };

  if (error) {
    return (
      <div className='container mx-auto py-8 px-4'>
        <div className='bg-red-50 p-4 rounded-lg'>
          <p className='text-red-500 font-medium'>
            Error: {error}
          </p>
        </div>
      </div>
    );
  }

  if (!book) return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    </div>
  );

  console.log(book);


  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">

        <div className="p-8">
          <Link
            to='/'
            className="bg-[#a7d28d]  hover:bg-[#fff] shadow-lg hover:shadow-md rounded-xl px-2 py-2 font-medium text-white"
          >
            Back to Book Collection
          </Link>
          <div className=" p-8 flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">{book.title}</h2>

          </div>

          <div className="space-y-4">
            <hr />

            <div className="flex items-center justify-center">
              <span className="text-gray-600 font-medium w-32">Genre:</span>
              <span className="ml-2 inline-block bg-[#b0d699] text-green-50 px-2 py-1 rounded-full text-sm">
                {book.genre}
              </span>
            </div>

            <div className="flex items-center">
              <span className="text-gray-600 font-medium w-32">Author:</span>
              <span className="text-gray-800">{book.author}</span>
            </div>

            <div className="flex items-center">
              <span className="text-gray-600 font-medium w-32"> Published:</span>
              <span className="text-gray-800">{book.published_year}</span>
            </div>

            <div>
              <span className="text-gray-600 font-medium block mb-2 ">Book Description:</span>
              <p className="text-black bg-[#f4f3f3] p-4 shadow-lg hover:shadow-xl cursor-pointer rounded-lg">
                {book.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BookDetails