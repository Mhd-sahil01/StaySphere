import { Routes, Route, Navigate } from 'react-router-dom';
// import Index from "./pages/listings/Index.jsx";
import Signup from "./pages/auth/Signup.jsx";
import Login from "./pages/auth/Login.jsx";
import CreateNew from "./pages/listings/CreateNew.jsx";
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import { useAuthStore } from './store/useAuthStore.js';
import { useEffect } from 'react';
import { Loader } from 'lucide-react';

function App() {
  const { user, checkAuth, isCheckingAuth, isAuthenticated } = useAuthStore();

  useEffect(()=> {
    checkAuth()
  }, [checkAuth])

  console.log({user});

  if(isCheckingAuth && !isAuthenticated) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <Loader className='size-10 animate-spin'/>
      </div>
    )
  }

  return (
    <div data-theme="light">
      <Navbar />
      <Routes>
        {/* <Route path='/' element={<Index />} /> */}
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/new' element={user? <CreateNew /> : <Navigate to={"/login"}/>} />
      </Routes>

      <Footer />
    </div>
  )
}

export default App
