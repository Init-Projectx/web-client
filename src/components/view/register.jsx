"use client";

import React, { useState } from "react";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Image from "next/image";
import registerImage from "../../assets/images/register-image.png";

const RegisterView = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8080/v1/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const error = await res.json();
        console.error('Error:', error);
      } else {
        const data = await res.json();
        console.log('Success:', data);
      }
    } catch (err) {
      console.error('Network error:', err);
    }
  };

  return (
    <div className="flex flex-col md:px-24 px-10 py-[5.5rem]">
      <h1 className="text-3xl font-bold text-center py-6">MiniMiracle</h1>
      <div className="flex flex-row justify-center items-center w-full">
        <div className="hidden md:flex md:w-1/2 justify-center items-center">
          <Image
            src={registerImage}
            alt="Register Illustration"            
            className="rounded-md"
          />
        </div>
        <div className="w-full md:w-1/2 p-8 overflow-y-auto">
          <h2 className="text-2xl text-center font-bold mb-6">Register</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col items-center">
              <label className="text-black mb-2 font-semibold w-1/2 text-left">
                Username
              </label>
              <Input
                type="text"
                name="username"
                placeholder="Username"
                value={form.username}
                onChange={handleChange}
                className="mb-4 w-1/2"
              />
            </div>
            <div className="flex flex-col items-center">
              <label className="text-black mb-2 font-semibold w-1/2 text-left">
                Email
              </label>
              <Input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="mb-4 w-1/2"
              />
            </div>
            <div className="flex flex-col items-center">
              <label className="text-black mb-2 font-semibold w-1/2 text-left">
                Password
              </label>
              <Input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className="mb-4 w-1/2"
              />
            </div>
            <div className="flex justify-center">
              <Button
                type="submit"
                className="bg-[#E5B91B] text-white rounded w-1/2"
              >
                Register
              </Button>
            </div>
          </form>
          <p className="mt-6 text-center">
            Already have an account?{" "}
            <a href="/login" className="text-blue-500">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterView;
