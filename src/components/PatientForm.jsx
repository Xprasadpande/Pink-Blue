import { useState } from "react";
import { useModal } from "../context/ModalContext";
import { registerPatient } from "../api/auth";

const PatientForm = () => {
  const { closeModal } = useModal();
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    gender: "",
    contactNumber: "",
    email: "",
    password: "",
    profilePic: null,
  });

  const handleChange = (e) => {
    const { name, type } = e.target;
    if (type === "file") {
      setFormData((prev) => ({
        ...prev,
        [name]: e.target.files[0] || null,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: e.target.value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const formDataToSend = new FormData();

      // Append all non-file fields
      Object.keys(formData).forEach((key) => {
        if (key !== "profilePic") {
          formDataToSend.append(key, formData[key]);
        }
      });

      // Append file if it exists
      if (formData.profilePic) {
        formDataToSend.append("profilePic", formData.profilePic);
      }

      await registerPatient(formDataToSend);
      closeModal();
    } catch (err) {
      setError(err.message || "An error occurred while registering");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-semibold mb-6">Patient Registration</h2>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full p-2 border rounded-md bg-[#F8FAFC]"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Age
          </label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="w-full p-2 border rounded-md bg-[#F8FAFC]"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Gender
          </label>
          <input
            type="text"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full p-2 border rounded-md bg-[#F8FAFC]"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Contact Number
          </label>
          <input
            type="tel"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            className="w-full p-2 border rounded-md bg-[#F8FAFC]"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded-md bg-[#F8FAFC]"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border rounded-md bg-[#F8FAFC]"
            required
          />
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Profile Picture
          </label>
          <input
            type="file"
            name="profilePic"
            onChange={handleChange}
            className="w-full p-2 border rounded-md bg-[#F8FAFC]"
            accept="image/*"
          />
        </div>
      </div>

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

      <div className="flex justify-end mt-6">
        <button
          type="submit"
          className="bg-[#3d7a6c] text-white px-6 py-2 rounded-md hover:bg-[#346b5f] transition-colors"
        >
          Register
        </button>
      </div>
    </form>
  );
};

export default PatientForm;
