import { useState } from "react";

function EditForm({ listing, originalImageUrl, onSubmit }) {
  const [formData, setFormData] = useState({
    title: listing.title,
    description: listing.description,
    location: listing.location,
    country: listing.country,
    price: listing.price,
    image: null,
  });

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-1">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
      </div>
      <div>
        <label className="block mb-1">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
      </div>
      <div>
        <p className="mb-1">Current Image:</p>
        <img src={originalImageUrl} className="h-40 object-cover mb-2" />
        <input type="file" name="image" onChange={handleChange} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          placeholder="Price"
          required
        />
        <input
          type="text"
          name="country"
          value={formData.country}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          placeholder="Country"
          required
        />
      </div>
      <div>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          placeholder="Location"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
      >
        Update Listing
      </button>
    </form>
  );
}

export default EditForm;