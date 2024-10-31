import { useParams, Link } from 'react-router-dom'
import React, { useState, useEffect } from 'react';

const BookDetails = () => {
  /**
   * @returns books from the database
   * loading and error states for loading and error
   * setBooks is used to update the state of the books
   *  useParams is used to get the id of the book from the url
   */
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [error, setError] = useState(null);

  /**
   * useEffect is used to fetch the books from the database
   * calls fetchSingleBook to fetch the book details
   */
  useEffect(() => {
    fetchSingleBook();
  }, []);

  /**
   *  @returns books from the database
   * loading and error states for loading and error
   * setBooks is used to update the state of the books
   *  await response.json(); is used to get the response in json formats
   */
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

  /**
   * @returns error message
   * if there is an error, it will display an error message
   */
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

  /**
   * @returns loading message
   * if there is no book, it will display a loading message
   */
  if (!book) return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    </div>
  );

  /**
   * @returns book details
   * displays the book details
   * back button is used to go back to the book collection
   */
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