import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2';
import { BeatLoader } from "react-spinners";

import { Trash, ListCollapse, FilePenLine } from 'lucide-react';



const BookList = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchDataForBookCollection();
  }, []);

  const fetchDataForBookCollection = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8000/api/books');
      if (!response.ok) {
        throw new Error('HTTP error: Status ${response.status}');
      }
      const bookData = await response.json();
      setBooks(bookData.data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleBookRemoval = async (id) => {
    Swal.fire({
      title: 'Careful: Are you sure?',
      text: "You won't be able to revert the deleted book!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setLoading(true);
          const response = await fetch(`http://localhost:8000/api/books/${id}`, {
            method: 'DELETE',
          });

          if (!response.ok) {
            throw new Error('Error: Failed to delete book!');
          }

          setBooks(books.filter(book => book.id !== id));
          setLoading(false);
          Swal.fire(
            'Book Deleted!',
            'Wait for a while for it to reflect on the collection.',
            'success'
          );
        } catch (error) {
          setError(error.message);
        }
      }
    });
  };


  if (loading) {
    return (
      <div className="bg-[#c3d2ba] space-y-2 m-80  shadow-lg  rounded-xl  py-2 font-medium text-white">
        <BeatLoader color="#ffffff" />
      </div>

    );




  }

  if (error) {
    return (
      <div className='rounded-lg bg-red-50 '>
        <p className='text-red-500 font-medium'> Error:{error}</p>
      </div>
    );
  }

  return (
    <div className='container mx-auto px-7 py-9 rounded'>
      <div className='bg-[#8cc569]  flex justify-between items-center mb-8 shadow-lg rounded-md'>
        <h2 className='flex  text-1xl px-20 font-bold text-white-800   '>
          Book Collection (Current)
        </h2>
        <Link
          to="/add"
          className="bg-[#8cc569] hover:bg-[#fff]   text-white px-6 py-2 rounded-lg transition duration-200 ease-in-out flex justify-between place-items-end"
        >
          <span className="mr-2">+</span> Add New Book In Collection
        </Link>
      </div>
      <div className='overflow-x-hidden' style={{ maxHeight: '700px' }}>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          <div className="p-6">
            <div className="bookcard flex flex-col justify-center bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-200 cursor-pointer ">
              <h3 className="text-xl font-bold text-gray-800 mb-2 ">BookGen Guide</h3>
              <div className="space-y-3">
                <hr />

                <div className="flex items-center gap-4 group hover:bg-gray-50 p-3 rounded-lg transition-colors">
                  <div className="p-2 bg-[#5591c2] rounded-lg group-hover:bg-blue-400 transition-colors">
                    <FilePenLine className="text-white h-6 w-6" />
                  </div>
                  <p className="text-gray-700 font-medium">Click the update/edit icon to update a book</p>
                </div>
                <div className="flex items-center gap-4 group hover:bg-gray-50 p-3 rounded-lg transition-colors">
                  <div className="p-2 bg-[#a7d28d] rounded-lg group-hover:bg-[#9ebe89] transition-colors">
                    <ListCollapse className="text-white h-6 w-6" />
                  </div>
                  <p className="text-gray-700 font-medium">Click to view detailed book information</p>
                </div>
              </div>
            </div>
          </div>
          {books.map(book => (
            <div key={book.id} className="bookcard bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-200 cursor-pointer ">
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2 ">{book.title}</h3>
                <div className="space-y-3">
                  <hr />
                  <p className="text-gray-600">
                    <span className="font-medium">Genre:</span>
                    <span className="ml-2 inline-block bg-[#b0d699] text-green-50 px-2 py-1 rounded-full text-sm">
                      {book.genre}
                    </span>
                  </p>
                </div>
                <div className="mt-6 flex justify-end space-x-3">
                  <Link
                    to={`/view/${book.id}`}
                    className="bg-[#a7d28d] hover:bg-[#fff] shadow-lg hover:shadow-md rounded-xl px-5 py-2 font-medium text-white"
                  >
                    <ListCollapse size={20} />
                  </Link>
                  <Link
                    to={
                      loading ? (
                        <div className="bg-[#8cc569] flex justify-between items-center mb-8 shadow-lg rounded-md">
                          <BeatLoader color="#ffffff" />
                        </div>
                      ) : `/edit/${book.id}`
                    }
                    className={`bg-[#5591c2] hover:bg-[#fff] shadow-lg hover:shadow-md rounded-xl px-5 py-2 font-medium text-white ${loading ? 'pointer-events-none opacity-50' : ''
                      }`}
                  >
                    <FilePenLine size={20} />
                  </Link>

                  {loading ? (
                    <div className='bg-[#8cc569]  flex justify-between items-center mb-8 shadow-lg rounded-md'>
                      <BeatLoader color="#ffffff" />
                    </div>
                  ) : (
                    <button
                      onClick={() => handleBookRemoval(book.id)}
                      className="text-white hover:bg-red-600 font-medium bg-red-700"
                    >
                      <Trash size={20} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


export default BookList