import { useState } from "react";
import { useAuthStore } from "../../features/auth/useAuthStore";
import { User, Lock, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import CommunitySection from "../../components/CommunitySection";
import GoogleLog from "../../components/GoogleLog";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  const { login, isLogin } = useAuthStore();

  const validateForm = () => {
    if (!formData.username.trim()) return toast.error("Username is required");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");

    return true;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const success = validateForm()

    if (success === true) {
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

        <CommunitySection />

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
                  onChange={(event) => setFormData({ ...formData, username: event.target.value })}
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
                  onChange={(event) => setFormData({ ...formData, password: event.target.value })}
                />
              </div>

              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all hover:scale-[1.02]"
                disabled={isLogin}
              >
                {isLogin ? (
                  <>
                    <Loader2 className="animate-spin size-4" />
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

            <GoogleLog type={"login"}/>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;