import { toast } from "react-hot-toast";

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
        <div className="mt-2 flex items-center justify-center gap-1">
            <span className="text-gray-500">or {type} with</span>
            <a
                onClick={handleGoogleLogin}
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
    );
}

export default GoogleLog