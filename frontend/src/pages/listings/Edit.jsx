import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../lib/axios";
import { Loader } from "lucide-react";
import EditForm from "../../components/EditForm.jsx";
import { toast } from "react-hot-toast";

function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = axiosInstance.get(`/listings/${id}`);
        setListing((await result).data)
      } catch (error) {
        console.error("Error loading listing", error);
        navigate("/");
      }
    }
    fetchData();
  }, [id]);

  const handleUpdate = async (formData) => {
    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      await axiosInstance.put(`/listings/${id}`, data);
      navigate(`/listings/${id}`);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error("User not authenticated, please login");
        navigate(`/login`);
      } else if(error.response && error.response.status === 403) {
        toast.error("You are not authorized to update");
        navigate(`/show/${id}`);
      } else {
        console.error("Failed to update listing", error);
      }
    }
  };

  if (!listing) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4">
        <Loader className="w-10 h-10 animate-spin text-gray-600" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-6 text-center sm:text-left">
        Edit Listing
      </h2>
      <div className="bg-lime-100 shadow-md rounded-lg p-4 sm:p-6">
        <EditForm
          listing={listing}
          originalImageUrl={listing.image.url}
          onSubmit={handleUpdate}
        />
      </div>
    </div>
  );
}

export default Edit;