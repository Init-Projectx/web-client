"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import registerImage from "../../../../assets/images/register-image.png";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import useAuthStore from "@/libs/globalState";

const RegisterView = () => {
  const { setLoginStatus, setToken } = useAuthStore();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [alert, setAlert] = useState({
    type: "",
    message: "",
  });
  const router = useRouter();

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
        setAlert({
          type: "error",
          message: error.message || "Registration failed. Please try again.",
        });
      } else {
        const data = await res.json();
        const { token } = data;

        localStorage.setItem("token", token);
        setToken(token);
        setLoginStatus(true);

        setAlert({
          type: "success",
          message:
            "Registration successful! You will be redirected to the login page.",
        });

        setTimeout(() => {
          router.push("/");
        }, 1000);
      }
    } catch (err) {
      setAlert({
        type: "error",
        message: "Network error. Please try again later.",
      });
    }
  };

  return (
    <div className="flex flex-col md:px-24 px-10">
      <div className="flex flex-row justify-center items-center w-full">
        <div className="hidden md:flex md:w-1/2 justify-center items-center">
          <Image src={registerImage} alt="Register Illustration" className="" />
        </div>
        <div className="w-full md:w-1/2">
          <h2 className="text-xl text-center font-bold mb-6">Register</h2>

          {alert.message && (
            <div
              className={`p-4 mb-4 text-sm rounded-lg ${
                alert.type === "error"
                  ? "text-red-800 bg-red-50 dark:text-red-400"
                  : "text-green-800 bg-green-50 dark:text-green-400"
              }`}
              role="alert"
            >
              <span className="font-medium">
                {alert.type === "error" ? "Error!" : "Success!"}
              </span>{" "}
              {alert.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="text-sm">
            <div className="flex flex-col w-full">
              <label className="text-black mb-2 font-semibold text-left">
                Username
              </label>
              <Input
                type="text"
                name="username"
                placeholder="Username"
                value={form.username}
                onChange={handleChange}
                className="mb-2 border border-black rounded-md"
              />
            </div>
            <div className="flex flex-col w-full">
              <label className="text-black mb-2 font-semibold text-left">
                Email
              </label>
              <Input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="mb-2 border border-black rounded-md"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-black mb-2 font-semibold text-left">
                Password
              </label>
              <Input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className="mb-5 border border-black rounded-md w-full"
              />
            </div>
            <div className="flex justify-center">
              <Button
                type="submit"
                className="bg-[#E5B91B] text-white text-sm rounded w-full"
              >
                Register
              </Button>
            </div>
          </form>
          <p className="mt-6 text-center">
            Already have an account?{" "}
            <a href="/" className="text-blue-500">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterView;
