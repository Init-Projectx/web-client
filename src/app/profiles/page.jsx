"use client";

import React, { useState, useEffect } from "react";
import Input from "@/components/ui/Input";
import FileUpload from "@/components/ui/FileUpload";
import Button from "@/components/ui/Button";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { getUser, updateuser } from "@/modules/fetch/fetchUser"; // Import fungsi

const ProfilesPage = () => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({
    username: "",
    phone: "",
    city: "",
    province: "",
    zipCode: "",
    address: "",
    photo: null,
  });
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUser(); // Menggunakan fungsi getUser
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleFileChange = (acceptedFiles) => {
    setFile(acceptedFiles[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("username", userData.username);
      formData.append("phone", userData.phone);
      formData.append("city", userData.city);
      formData.append("province", userData.province);
      formData.append("zipCode", userData.zipCode);
      formData.append("address", userData.address);
      if (file) {
        formData.append("photo", file);
      }

      await updateuser(formData); // Menggunakan fungsi updateuser
      alert("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    // Reset userData state or navigate away
    setUserData({
      username: "",
      phone: "",
      city: "",
      province: "",
      zipCode: "",
      address: "",
      photo: null,
    });
    setFile(null);
  };

  return (
    <div className="flex flex-col items-center md:px-24 px-10 py-[5.5rem] bg-gray-100">
      {loading ? (
        <LoadingSpinner size="large" color="blue" className="mt-8" />
      ) : (
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">User Profile</h2>
          <div className="flex flex-col items-center mb-6">
            <img
              src={userData.photo || "https://via.placeholder.com/150"}
              alt="User Profile"
              className="w-32 h-32 rounded-full mb-4"
            />
            <FileUpload onDrop={handleFileChange} />
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Username"
              name="username"
              value={userData.username}
              onChange={handleInputChange}
              className="w-full"
            />
            <Input
              label="Phone Number"
              name="phone"
              value={userData.phone}
              onChange={handleInputChange}
              className="w-full"
            />
            <Input
              label="City"
              name="city"
              value={userData.city}
              onChange={handleInputChange}
              className="w-full"
            />
            <Input
              label="Province"
              name="province"
              value={userData.province}
              onChange={handleInputChange}
              className="w-full"
            />
            <Input
              label="Zip Code"
              name="zipCode"
              value={userData.zipCode}
              onChange={handleInputChange}
              className="w-full"
            />
            <Input
              label="Address"
              name="address"
              value={userData.address}
              onChange={handleInputChange}
              className="w-full"
            />
            <div className="flex justify-between space-x-4">
              <Button
                type="button"
                onClick={handleCancel}
                className="bg-red-500 text-white rounded px-4 py-2"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-green-500 text-white rounded px-4 py-2"
              >
                Save
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ProfilesPage;
