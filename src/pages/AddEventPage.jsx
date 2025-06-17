import { useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Component for adding a new event.
 * Handles form state, validation, submission, and navigation.
 */
const AddEventPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    description: "",
    category: "",
    image: null,
  });

  // Mapping of category names to their corresponding IDs
  const categories = {
    koncert: 1,
    sport: 2,
    edukacja: 3,
    warsztaty: 4,
    inne: 5,
  };

  const [errors, setErrors] = useState({});

  /**
   * Handles changes in form inputs, including file uploads.
   * @param {Event} e - Input change event
   */
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  /**
   * Validates form data fields.
   * Sets error messages for invalid fields.
   * @returns {boolean} True if form is valid, else false
   */
  const validate = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = "Title is required";
    if (!formData.date) newErrors.date = "Date is required";
    if (!formData.time) newErrors.time = "Time is required";
    if (!formData.location) newErrors.location = "Location is required";
    if (!formData.description) newErrors.description = "Description is required";
    if (!formData.category) newErrors.category = "Category is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handles form submission.
   * Validates data and sends POST request with form data.
   * Navigates to homepage on success.
   * @param {Event} e - Form submit event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("date", formData.date);
    formDataToSend.append("time", formData.time);
    formDataToSend.append("location", formData.location);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("category_id", categories[formData.category]);
    if (formData.image) formDataToSend.append("image", formData.image);

    try {
      const response = await fetch("/routes/api/events.php", {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) {
        const data = await response.json();
        setErrors({ general: data.error || "Error adding event" });
        return;
      }

      navigate("/");
    } catch (error) {
      setErrors({ general: "Network or server error." });
    }
  };

  return (
    <div className="addEvent-container max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-md bg-white">
      <h2 className="text-2xl font-semibold text-center mb-6">ADD EVENT</h2>

      {errors.general && (
        <p className="text-red-600 mb-4 text-center">{errors.general}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Event Title"
          value={formData.title}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-md ${
            errors.title ? "border-red-600" : "border-gray-300"
          }`}
        />
        {errors.title && <p className="text-red-600 text-sm">{errors.title}</p>}

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-md ${
            errors.date ? "border-red-600" : "border-gray-300"
          }`}
        />
        {errors.date && <p className="text-red-600 text-sm">{errors.date}</p>}

        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-md ${
            errors.time ? "border-red-600" : "border-gray-300"
          }`}
        />
        {errors.time && <p className="text-red-600 text-sm">{errors.time}</p>}

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-md ${
            errors.location ? "border-red-600" : "border-gray-300"
          }`}
        />
        {errors.location && <p className="text-red-600 text-sm">{errors.location}</p>}

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-md ${
            errors.category ? "border-red-600" : "border-gray-300"
          }`}
        >
          <option value="">Select category</option>
          <option value="koncert">Concert</option>
          <option value="sport">Sport</option>
          <option value="edukacja">Education</option>
          <option value="warsztaty">Workshops</option>
          <option value="inne">Other</option>
        </select>
        {errors.category && <p className="text-red-600 text-sm">{errors.category}</p>}

        <textarea
          name="description"
          placeholder="Description"
          rows="4"
          value={formData.description}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-md ${
            errors.description ? "border-red-600" : "border-gray-300"
          }`}
        />
        {errors.description && (
          <p className="text-red-600 text-sm">{errors.description}</p>
        )}

        <input
          type="file"
          name="image"
          onChange={handleChange}
          className="w-full text-gray-700"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Add Event
        </button>

        <button
          type="button"
          onClick={() => navigate("/")}
          className="w-full bg-gray-500 text-white py-2 rounded hover:bg-gray-600"
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AddEventPage;
