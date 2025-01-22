import { useState } from "react";
import { useModal } from "../context/ModalContext";
import { registerDoctor } from "../api/auth";

const DoctorForm = () => {
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
    qualification: "",
    specialization: "",
    yearsOfExperience: "",
    medicalLicenseNumber: "",
    certifications: "",
    achievements: "",
    currentAffiliation: "",
    ratePerConsult: "200",
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === "certifications" || key === "achievements") {
          formDataToSend.append(
            key,
            formData[key].split(",").map((item) => item.trim())
          );
        } else {
          formDataToSend.append(key, formData[key]);
        }
      });

      await registerDoctor(formDataToSend);
      closeModal();
    } catch (err) {
      setError(err.message || "An error occurred while registering");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-semibold mb-6">Doctor Registration</h2>

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

        <div>
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

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Qualification
          </label>
          <input
            type="text"
            name="qualification"
            value={formData.qualification}
            onChange={handleChange}
            className="w-full p-2 border rounded-md bg-[#F8FAFC]"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Specialization
          </label>
          <input
            type="text"
            name="specialization"
            value={formData.specialization}
            onChange={handleChange}
            className="w-full p-2 border rounded-md bg-[#F8FAFC]"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Years of Experience
          </label>
          <input
            type="number"
            name="yearsOfExperience"
            value={formData.yearsOfExperience}
            onChange={handleChange}
            className="w-full p-2 border rounded-md bg-[#F8FAFC]"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Medical License Number
          </label>
          <input
            type="text"
            name="medicalLicenseNumber"
            value={formData.medicalLicenseNumber}
            onChange={handleChange}
            className="w-full p-2 border rounded-md bg-[#F8FAFC]"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Certifications (comma-separated)
          </label>
          <input
            type="text"
            name="certifications"
            value={formData.certifications}
            onChange={handleChange}
            className="w-full p-2 border rounded-md bg-[#F8FAFC]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Achievements (comma-separated)
          </label>
          <input
            type="text"
            name="achievements"
            value={formData.achievements}
            onChange={handleChange}
            className="w-full p-2 border rounded-md bg-[#F8FAFC]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Current Affiliation
          </label>
          <input
            type="text"
            name="currentAffiliation"
            value={formData.currentAffiliation}
            onChange={handleChange}
            className="w-full p-2 border rounded-md bg-[#F8FAFC]"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Rate Per Consult
          </label>
          <input
            type="number"
            name="ratePerConsult"
            value={formData.ratePerConsult}
            onChange={handleChange}
            className="w-full p-2 border rounded-md bg-[#F8FAFC]"
            required
          />
        </div>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

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

export default DoctorForm;
