"use client";

import React, { useState, useEffect } from "react";
import InputSearch from "@/components/layout/navbar/inputSearch";
import Link from "next/link";
import logo from "@/assets/images/logo_minimiracle.png";
import {
    UserCircle,
    ShoppingBag,
    GearSix
} from "@phosphor-icons/react";
import Image from "next/image";
import Button from "@/components/ui/Button";
import Modal from "react-modal";
import axios from "axios";

export default function Navbar() {
  const [cartItems, setCartItems] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/v1/api/auth/login', {
        email,
        password
      });

      if (response.status === 200) {
        console.log('Login Success:', response.data);
        localStorage.setItem('token', response.data.accessToken);
        alert('Login Success');
        closeModal();
      }
    } catch (error) {
      console.error('Login Failed:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <header className="fixed md:px-20 px-2 bg-color-primary z-10 navbar-border w-full border border-color-gray-200 shadow-sm">
      <div className="flex md:flex-row flex-col justify-between md:items-center p-4 gap-2">
        <Link
          href="/"
          className="flex items-center flex-row font-bold text-color-black hover:text-primary text-3x1"
        >
          <Image
            src={logo}
            alt="Logo MiniMiracle"
            width={50}
            height={50}
            className="mr-2 rounded-full w-auto h-auto"
          />
          MiniMiracle
        </Link>
        <div className="flex flex-row justify-center md:gap-16 gap-2 items-center w-full">
          <InputSearch className="border-[2px] border-color-gray-400 focus:border-color-greenhover sm:text-md text-sm focus:outline-none sm:w-[450px] md:w-[300px] lg:w-[500px] w-full" />
          <div className="flex flex-row justify-between items-center md:gap-2 gap-10">
            <Link href="/carts">
              <Button className="relative hover:bg-color-gray-200 hover:text-color-dark text-color-gray-700 p-1 rounded-lg">
                <ShoppingBag size={24} />
                {cartItems > 0 && (
                  <span className="absolute -top-2 -right-1 inline-flex items-center justify-center px-2 py-[0.3rem] text-[0.6rem] font-bold leading-none text-color-primary border-2 border-color-primary bg-color-red rounded-full">
                    {cartItems}
                  </span>
                )}
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex sm:flex-row justify-between items-center md:items-center gap-3">
          <Button className="focus:outline-none text-primaryColor bg-secondaryColor hover:bg-primaryColor hover:text-white rounded-lg h-10 md:w-32 w-40">
            Register
          </Button>
        </div>
        <div>
          <Button 
          onClick={openModal}
          className="focus:outline-none text-white bg-primaryColor hover:bg-secondaryColor hover:text-primaryColor rounded-lg h-10 md:w-32 w-40">
            Login
          </Button>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Login Modal"
        className="modal"
        overlayClassName="overlay"
      >
        <div>
          <h2 className="logintitle poppins-bold">Login</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="space">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 poppins-bold">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-custom mt-1 block w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="space">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 poppins-bold">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-custom mt-1 block w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="flex justify-end">
            <Button type="submit" className="focus:outline-none text-white bg-primaryColor hover:bg-secondaryColor hover:text-primaryColor rounded-lg h-10 submit space">
              Login
            </Button>
          </div>
          <div className="regisLink">
            <p>Don't have account?
              <Link href={'#'} className="regisLinkColor"> Register</Link>
            </p>
          </div>
        </form>
      </Modal>
    </header>
  );
}
