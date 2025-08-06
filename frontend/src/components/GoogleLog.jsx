import { toast } from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

function GoogleLog({ type }) {
    const handleGoogleLogin = () => {
        try {
            window.location.href = `${import.meta.env.VITE_BACKEND_URl}/auth/google`;
        } catch (error) {
            if (error.response.status === 401) {
                toast.error("Login failed, Try again");
                navigate("/login");
            } else {
                toast.error("Login failed");
                console.error(error);
            }
        }
    };

    return (
        <div className="mt-4 flex items-center justify-center">
        <button
          onClick={handleGoogleLogin}
          className="flex items-center justify-center gap-3 px-5 py-2.5 border border-gray-300 rounded-md shadow-sm bg-white hover:bg-gray-100 transition-all"
        >
          <FontAwesomeIcon icon={faGoogle} className="text-green-600 text-xl" />
          <span className="text-gray-800 font-semibold text-base">
            {type} with Google
          </span>
        </button>
      </div>      
    );
}

export default GoogleLog