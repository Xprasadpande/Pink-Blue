import axios from "axios";

const API_URL = "http://localhost:8081/api"; // Update this to match your backend port

export const registerPatient = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/register-patient`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Registration error:", error);
    throw (
      error.response?.data || new Error("An error occurred while registering")
    );
  }
};

export const registerDoctor = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/register-doctor`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Registration error:", error);
    throw (
      error.response?.data || new Error("An error occurred while registering")
    );
  }
};

export const loginPatient = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login-patient`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || new Error("An error occurred while logging in")
    );
  }
};

export const loginDoctor = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login-doctor`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || new Error("An error occurred while logging in")
    );
  }
};

export const getAllDoctors = async () => {
  try {
    const response = await axios.get(`${API_URL}/doctors`);
    return response.data;
  } catch (error) {
    throw (
      error.response?.data ||
      new Error("An error occurred while fetching doctors")
    );
  }
};
