import React, { useEffect, useState } from "react";
import { fetchUser } from "@/modules/fetch/fetchUser";

const ProfileView = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userData = await fetchUser(); // Asumsikan fetchUser mengembalikan data user
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    getUserData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <p>No user data found.</p>;
  }

  return (
    <div className="profile-view p-4 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-4">User Profile</h2>
      <div className="profile-info space-y-4">
        <div className="profile-item">
          <h3 className="text-xl font-semibold">Name:</h3>
          <p>{user.name}</p>
        </div>
        <div className="profile-item">
          <h3 className="text-xl font-semibold">Email:</h3>
          <p>{user.email}</p>
        </div>
        <div className="profile-item">
          <h3 className="text-xl font-semibold">Bio:</h3>
          <p>{user.bio}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;

