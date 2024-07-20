"use client";

import React, { useState, useEffect } from "react";
import ProfileView from "./DetailProfile";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import Head from "next/head";

const ProfilesPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Simulasikan waktu pemuatan

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col md:px-24 px-10 py-[5.5rem]">
      <Head>
        <title>User Profile</title>
      </Head>
      {loading ? (
        <LoadingSpinner size="large" color="blue" className="mt-8" />
      ) : (
        <ProfileView />
      )}
    </div>
  );
};

export default ProfilesPage;
