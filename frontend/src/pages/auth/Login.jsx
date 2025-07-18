import { useState } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { User, Lock, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

function Login () {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });

    const { login, isLogin } = useAuthStore();

    const validateForm = () => {
        if(!formData.username.trim()) return toast.error("Username is required");
        if(!formData.password) return toast.error("Password is required");
        if(formData.password.length < 6) return toast.error("Password must be at least 6 characters");

        return true;
     }
    const handleSubmit = async (event) => {
        event.preventDefault();
        const success = validateForm()

        if(success === true) {
            await login(formData);
            navigate("/");
        }

        setFormData({
            username: "",
            password: ""
        });
        
     }
    return (
        <div className="min-h-[75vh] flex items-center justify-center bg-gradient-to-br from-green-50 to-lime-100 p-4">
             <div className="container flex flex-col lg:flex-row h-full rounded-2xl overflow-hidden shadow-xl max-w-6xl">
          {/* Left Part - Community Section */}
          <div className="w-full lg:w-5/12 bg-gradient-to-br from-lime-400 to-green-500 flex flex-col gap-6 justify-center text-center items-center p-8 md:p-12 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
              <div className="absolute top-20 left-10 w-16 h-16 rounded-full bg-white animate-[float_6s_ease-in-out_infinite]"></div>
              <div className="absolute top-1/2 right-20 w-24 h-24 rounded-full bg-white animate-[float_7s_ease-in-out_infinite_1s]"></div>
              <div className="absolute bottom-10 left-1/3 w-20 h-20 rounded-full bg-white animate-[float_5s_ease-in-out_infinite_2s]"></div>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-white relative z-10">
              Join our <span className="text-green-900">community</span>
            </h2>
            
            <p className="text-lg md:text-xl text-white/90 relative z-10 max-w-md">
              Join our vibrant community to stay updated with the latest features, announcements, and exclusive content.
            </p>
            
            <button className="relative z-10 px-8 py-3 bg-white text-green-700 font-semibold rounded-full hover:bg-green-50 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <a href="https://t.me/+dU8Ee-FfAoBkYzA1" className="flex items-center gap-2">
                <span>Join Now</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </button>
          </div>
      
          {/* Right Part - Signup Form */}
          <div className="w-full lg:w-7/12 bg-white flex flex-col justify-center items-center gap-6 p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-800">Login</h2>
            
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md border border-gray-100">
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  <span className="flex items-center gap-2"><User /> Username</span>
                  </label>
                  <input
                    type="text"
                    id="username"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                    placeholder="username"
                    value={formData.username}
                    onChange={(event) => setFormData({...formData, username: event.target.value})}
                  />
                </div>
      
                <div className="space-y-2">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  <span className="flex items-center gap-2"><Lock /> Password</span>
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(event) => setFormData({...formData, password: event.target.value})}
                  />
                </div>
      
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all hover:scale-[1.02]"
                  disabled={isLogin}
                >
                    {isLogin ? (
                        <>
                            <Loader2 className="animate-spin size-4"/>
                            Loading...
                        </>
                    ) : (
                        "Login"
                    )}
                </button>
              </form>
            </div>
            
            <div className="text-center text-sm text-gray-600">
              <p>Don't have an account? 
                <Link to="/Signup" className="text-green-600 font-medium hover:underline">Signup</Link></p>
              <div className="mt-2 flex items-center justify-center gap-1">
                <span className="text-gray-500">or login with</span>
                <a
                  href="https://google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Google"
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    className="fill-current text-gray-700 hover:text-green-600 transition-colors"
                  >
                    <path d="M12.545 10.239v3.821h5.445c-0.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.032s2.701-6.032 6.033-6.032c1.498 0 2.866 0.549 3.921 1.453l2.814-2.814c-1.784-1.664-4.13-2.675-6.735-2.675-5.523 0-10 4.477-10 10s4.477 10 10 10c8.396 0 10-7.496 10-10 0-0.67-0.068-1.325-0.182-1.955h-9.818z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
        </div>
    )
}

export default Login;