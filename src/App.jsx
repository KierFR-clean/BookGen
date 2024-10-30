
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import BookList from './components/BookList'
import BookForm from './components/BookForm'
import BookDetails from './components/BookDetails'



function App() {

  return (

    <Router>
      <div className=" flex flex-col h-screen w-full bg-gray-50 shadow-lg">
        <nav className=" border-gray-200  bg-[#8cc569] shadow-sm ">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
              <img src="https://www.svgrepo.com/show/528059/book-bookmark.svg" className="h-8" alt="BookGen Logo" />
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">BookGen</span>
            </a>
            <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
              <a href="https://github.com/KierFR-clean/KierFR-clean" target="_blank" rel="noopener noreferrer">
                <button type="button" className="text-white bg-[#c4dce9] hover:bg-[#b0c7d6] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-[#fff] dark:hover:bg-[#9bb3c0]">
                  <h3 className='text-black'>Github Repo</h3>
                </button>
              </a>
            </div>

            <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-cta">
            </div>
          </div>
        </nav>

        <main className='flex-grow'>
          <Routes>
            <Route path="/" element={<BookList />} />
            <Route path="/add" element={<BookForm isUpdating={false} />} />
            <Route path="/edit/:id" element={<BookForm isUpdating={true} />} />
            <Route path="/view/:id" element={<BookDetails />} />
          </Routes>
        </main>

        <footer className='bg-[#8cc569] shadow-sm mt-8'>
          <div className='container mx-auto px-4 py-4'>
            <p className='text-center text-white'>
              © {new Date().getFullYear()} BookGen
            </p>
          </div>

        </footer>
      </div>


    </Router>
  )
}

export default App
