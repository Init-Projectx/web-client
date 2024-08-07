"use client";

import React, { useState, useEffect, useRef } from "react";
import InputSearch from "@/components/layout/navbar/inputSearch";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Modal from "react-modal";
import axios from "axios";
import useAuthStore from "@/libs/globalState";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthCms from "@/components/view/cms/auth";

export default function Navbar() {
  const [cartItems, setCartItems] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCmsModalOpen, setIsCmsModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isLoggedIn, token, setLoginStatus, setToken } = useAuthStore();

  const modalRef = useRef(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      setLoginStatus(true);
    }
  }, [setLoginStatus, setToken]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openCmsModal = () => setIsCmsModalOpen(true);
  const closeCmsModal = () => setIsCmsModalOpen(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/v1/api/auth/login",
        {
          email,
          password,
        }
      );

      if (response.status === 200) {
        localStorage.setItem("token", response.data.accessToken);
        setToken(response.data.accessToken);
        setLoginStatus(true);
        toast.success("Login Success!");
        closeModal();
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      }
    } catch (error) {
      console.error(
        "Login Failed:",
        error.response ? error.response.data : error.message
      );
      toast.error(
        "Login Failed: " +
          (error.response ? error.response.data.message : error.message)
      );
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setLoginStatus(false);
    toast.info("Logged out successfully.");
    closeModal();
    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  };

  return (
    <header className="sticky top-0 z-50 md:px-20 px-2 bg-color-primary bg-white navbar-border w-full border">
      <div className="flex md:flex-row flex-col justify-between md:items-center p-4 gap-2">
        <Link
          href="/"
          className="flex items-center flex-row font-bold text-color-black hover:text-primary text-3x1"
        >
          MiniMiracle
        </Link>
        <div className="flex flex-row justify-center md:gap-16 gap-2 items-center w-full">
          <InputSearch className="border-[2px] border-color-gray-400 focus:border-color-greenhover sm:text-md text-sm focus:outline-none sm:w-[450px] md:w-[300px] lg:w-[500px] w-full" />
        </div>
        <div className="flex sm:flex-row justify-between items-center md:items-center gap-3">
          {!isLoggedIn ? (
            <>
              <Link href={"/auth/register"}>
                <Button className="focus:outline-none text-primaryColor bg-secondaryColor hover:bg-primaryColor hover:text-white rounded-lg h-10 md:w-32 w-40">
                  Register
                </Button>
              </Link>
              <Button
                onClick={openModal}
                className="focus:outline-none text-white bg-primaryColor hover:bg-secondaryColor hover:text-primaryColor rounded-lg h-10 md:w-32 w-40"
              >
                Login
              </Button>
            </>
          ) : (
            <div className="grid grid-cols-2 gap-8 items-center">
              <div className="items-center md:gap-2 gap-10">
                <Link href="/carts" className="">
                  <Button className="relative hover:bg-color-gray-200 hover:text-color-dark text-color-gray-700 p-1 rounded-lg">
                    <img
                      src="https://www.svgrepo.com/show/453700/cart1.svg"
                      alt=""
                      width="45px"
                      height="45px"
                    />
                    {cartItems > 0 && (
                      <span className="absolute -top-2 right-1 inline-flex items-center justify-center px-2 py-[0.3rem] text-[0.6rem] font-bold leading-none text-color-primary border-2 border-color-primary bg-color-red rounded-full">
                        {cartItems}
                      </span>
                    )}
                  </Button>
                </Link>
              </div>
              <div>
                <img
                  src="https://www.svgrepo.com/show/525577/user-circle.svg"
                  alt="User"
                  width={30}
                  height={30}
                  className="rounded-full cursor-pointer"
                  onClick={() => setIsModalOpen(!isModalOpen)}
                />
                {isModalOpen && (
                  <div
                    ref={modalRef}
                    className="absolute mt-2 w-40 bg-white border rounded-lg shadow-lg right-32"
                  >
                    <Link href="/user-profile">
                      <Button className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex">
                        Edit Profile
                      </Button>
                    </Link>
                    <Link href="/orders">
                      <Button className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex">
                        Order List
                      </Button>
                    </Link>
                    <Button
                      onClick={openCmsModal}
                      className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex"
                    >
                      CMS dashboard
                    </Button>
                    <Button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex"
                    >
                      Logout
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <Modal
        isOpen={isModalOpen && !isLoggedIn}
        onRequestClose={closeModal}
        contentLabel="Login Modal"
        className="modal"
        overlayClassName="overlay"
      >
        <button
          onClick={closeModal}
          className="absolute top-1 right-4 text-gray-500 hover:text-gray-700 text-2xl"
        >
          ×
        </button>
        <div className="relative mt-6">
          <h2 className="logintitle flex poppins-bold text-center">Login</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="space">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 poppins-bold"
            >
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
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 poppins-bold"
            >
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
            <Button
              type="submit"
              className="focus:outline-none text-white bg-primaryColor hover:bg-secondaryColor hover:text-primaryColor rounded-lg h-10 submit space"
            >
              Login
            </Button>
          </div>
          <div className="regisLink">
            <p>
              Don't have account?
              <Link href={"/auth/register"} className="regisLinkColor">
                {" "}
                Register
              </Link>
            </p>
          </div>
        </form>
      </Modal>
      <AuthCms isOpen={isCmsModalOpen} onClose={closeCmsModal} />
      <ToastContainer />
    </header>
  );
}
