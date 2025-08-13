import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../lib/axios";
import { Loader } from "lucide-react";

function CreateNew() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
    price: "",
    country: "",
    location: "",
    category: "",
    contact: "",
  });

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const contactTest = /^[0-9]{10}$/;
    if (!formData.title?.trim()) return toast.error("Title cannot be empty");
    if (!formData.description?.trim()) return toast.error("Description cannot be empty");
    if (!formData.price?.toString().trim()) return toast.error("Price cannot be empty");
    if (!formData.country?.trim()) return toast.error("Country cannot be empty");
    if (!formData.location?.trim()) return toast.error("Location cannot be empty");
    if (!formData.contact?.trim()) return toast.error("Contact cannot be empty");
    if (!formData.image) return toast.error("Image is required");
    if (!contactTest.test(formData.contact)) return toast.error("Contact number must be valid.");
  

    const payload = new FormData();
    payload.append("title", formData.title);
    payload.append("description", formData.description);
    payload.append("price", formData.price);
    payload.append("country", formData.country);
    payload.append("location", formData.location);
    payload.append("category", formData.category);
    payload.append("contact", formData.contact);
    payload.append("image", formData.image);

    try {
      setIsLoading(true);
      await axiosInstance.post("/listings", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Created successfully");
      navigate("/");
    } catch (error) {
      if (error.response.status === 401) {
        toast.error("User not authenticated, please login");
        navigate("/login");
      } else {
        toast.error("Failed to create listing");
        console.error(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center px-4 py-8">
      <div className="w-full max-w-3xl bg-white shadow-lg p-6 rounded-md">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Create New Listing</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Enter title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />

          <textarea
            name="description"
            placeholder="Enter description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 h-24"
          />

          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />

          <input
            type="number"
            name="price"
            placeholder="Enter price"
            value={formData.price}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />

          <input
            type="text"
            name="country"
            placeholder="Enter country"
            value={formData.country}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />

          <input
            type="text"
            name="location"
            placeholder="Enter location"
            value={formData.location}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />

          <input
            type="tel"
            name="contact"
            placeholder="Enter Contact number:"
            value={formData.contact}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            <option value="Rooms">Rooms</option>
            <option value="Hostels">Hostels</option>
            <option value="PGs">PGs</option>
            <option value="Shared Flats">Shared Flats</option>
            <option value="Studio Apartments">Studio Apartments</option>
            <option value="Cheap Rent">Cheap Rent</option>
            <option value="Iconic Cities">Iconic Cities</option>
            <option value="Luxury Villas">Luxury Villas</option>
            <option value="House">House</option>
            <option value="Penthouses">Penthouses</option>
          </select>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 flex items-center justify-center gap-2"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader className="animate-spin w-5 h-5" />
                Creating...
              </>
            ) : (
              "Add"
            )}
          </button>

        </form>
      </div>
    </div>
  );
}

export default CreateNew;