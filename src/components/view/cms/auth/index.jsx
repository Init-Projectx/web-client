"use client";

import React, { useState } from "react";
import Modal from "react-modal";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/navigation"; // Import dari next/navigation
import loginCms from "@/modules/fetch/cms/auth";

const AuthCms = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        email: email,
        password: password,
      };
      const login = await loginCms(data);
      if (login) {
        onClose();
        setTimeout(() => {
          toast.success('Login CMS Success');
        }, 1);
        router.push('/cms/dashboard');
      }
    } catch (error) {
      console.log("Login CMS Failed", error.message);
    }
  };

  return (
    <>
      <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Login Modal"
      className="modal"
      overlayClassName="overlay"
    >
      <div className="flex justify-center mb-10">
        <h2 className="absolute top-8 text-xl text-center font-bold">
          Login To CMS
        </h2>
      </div>
      <button
        onClick={onClose}
        className="absolute top-2 right-2 me-3 text-gray-500 hover:text-gray-700 text-2xl"
      >
        ×
      </button>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm border border-slate-950 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm border border-slate-950 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="w-full px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 mt-6"
            >
              Login
            </button>
          </div>
        </div>
      </form>
    </Modal>
    <ToastContainer />
    </>
  );
};

export default AuthCms;
