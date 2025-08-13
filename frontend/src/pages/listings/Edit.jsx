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
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axiosInstance.get(`/listings/${id}`);
        setListing(result.data);
      } catch (error) {
        console.error("Error loading listing", error);
        navigate("/");
      }
    };
    fetchData();
  }, [id]);

  const handleUpdate = async (formData) => {
    const contactTest = /^[0-9]{10}$/;
    if (!formData.title || formData.title.trim().length === 0) {
      toast.error("Title cannot be empty");
      return;
    }
    if (!formData.description || formData.description.trim().length === 0) {
      toast.error("Description cannot be empty");
      return;
    }
    if (!formData.contact || formData.contact.trim().length === 0) {
      toast.error("Contact number cannot be empty");
      return;
    }
    if (!formData.price) {
      toast.error("Price cannot be empty");
      return;
    }
    if (!contactTest.test(formData.contact)) {
      toast.error("Contact number must be valid.");
      return;
    } 

    try {
      setIsUpdating(true);
      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("price", formData.price);
      data.append("location", formData.location);
      data.append("country", formData.country);
      data.append("contact", formData.contact);

      if (formData.image) {
        data.append("image", formData.image);
      }

      await axiosInstance.put(`/listings/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Listing updated successfully");
      navigate(`/show/${id}`);
    } catch (error) {
      if (error.response.status === 401) {
        toast.error("User not authenticated, please login");
        navigate(`/login`);
      } else if (error.response.status === 403) {
        toast.error("You are not authorized to update");
        navigate(`/show/${id}`);
      } else {
        console.error("Failed to update listing", error);
        toast.error("Failed to update listing");
      }
    } finally {
      setIsUpdating(false);
    }
  };

  // Loader while listing is being fetched initially
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
        {isUpdating ? (
          <div className="flex items-center justify-center py-6">
            <Loader className="w-8 h-8 animate-spin text-gray-700" />
            <span className="ml-2 text-gray-700 font-medium">Updating...</span>
          </div>
        ) : (
          <EditForm
            listing={listing}
            originalImageUrl={listing.image.url}
            onSubmit={handleUpdate}
          />
        )}
      </div>
    </div>
  );
}

export default Edit;