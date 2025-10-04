import { useAuthStore } from './features/auth/useAuthStore.js';
import { useEffect } from 'react';
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import { Routes, Route, Navigate } from 'react-router-dom';
import Index from "./pages/listings/Index.jsx";
import Signup from "./pages/auth/Signup.jsx";
import Login from './pages/auth/login.jsx';
import CreateNew from "./pages/listings/CreateNew.jsx";
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import FilterDisplay from './pages/listings/FilterDisplay.jsx';
import SearchResult from './pages/listings/SearchResult.jsx';
import Show from './pages/listings/Show.jsx';
import Edit from './pages/listings/Edit.jsx';
import UserPage from './pages/auth/UserPage.jsx';

function App() {
  const { user, checkAuth, isCheckingAuth, isAuthenticated } = useAuthStore();

  useEffect(()=> {
    checkAuth()
  }, [checkAuth])

  if(isCheckingAuth && !isAuthenticated) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <Loader className='size-10 animate-spin'/>
      </div>
    )
  }

  return (
    <div data-theme="light" className='font-[Poppins] flex flex-col min-h-screen'>
      <Navbar />
      <div className="flex-grow">
      <Routes>
        <Route path='/' element={<Index />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/filters/:type' element={<FilterDisplay />}/>
        <Route path='/new' element={user? <CreateNew /> : <Navigate to={"/login"}/>} />
        <Route path="/search" element={<SearchResult />} />
        <Route path='/show/:id' element={<Show/>}/>
        <Route path='/listings/:id/edit' element={<Edit/>}/>
        <Route path='/profile' element={user && <UserPage/>}/>
      </Routes>
      <Toaster/>
      </div>

      <Footer />
    </div>
  )
}

export default App