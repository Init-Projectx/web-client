"use client";

import React, { useState, useEffect } from "react";
import InputSearch from "@/components/layout/navbar/inputSearch";
import Link from "next/link";
import logo from "@/assets/images/logo_minimiracle.png";
import { UserCircle, ShoppingBag } from "@phosphor-icons/react";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { getUser } from "@/modules/fetch/fetchUser";
import { useRouter, usePathname } from "next/navigation";
import useStore from "@/libs/zustand";
import { findOneCart } from "@/modules/fetch/fetchCart";

export default function Navbar() {
  const isLoggedIn = useStore((state) => state.isLoggedIn);
  const setIsLoggedIn = useStore((state) => state.setIsLoggedIn);
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState(0);
  const router = useRouter();
  const pathname = usePathname();
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const user = await getUser();
          setUser(user);
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Error checking login status:", error);
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();
  }, [setIsLoggedIn]);

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const cartData = await findOneCart();
        const totalItems = cartData.reduce(
          (acc, item) => acc + item.quantity,
          0
        );
        setCartItems(totalItems);
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };

    if (isLoggedIn) {
      fetchCartData();
    }
  }, [isLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUser(null);
    setTimeout(() => {
      router.push("/");
      setTimeout(() => {
        window.location.reload();
      }, 100);
    }, 2000);
  };

  const handleStorageChange = (event) => {
    if (event.key === "token") {
      const token = event.newValue;
      if (token) {
        getUser()
          .then((user) => {
            setUser(user);
            setIsLoggedIn(true);
          })
          .catch((error) => {
            console.error("Error fetching user after token change:", error);
            setIsLoggedIn(false);
          });
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const isAuthRoute = pathname.startsWith("/auth");

  const getDisplayName = (name) => {
    if (!name) return ["", ""];
    const nameParts = name.split(" ");
    return nameParts.slice(0, 2);
  };

  let timeoutId;

  const handleMouseEnter = () => {
    clearTimeout(timeoutId);
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    timeoutId = setTimeout(() => {
      setShowDropdown(false);
    }, 200);
  };

  return (
    <header className="md:px-20 px-2 bg-color-primary z-10 navbar-border w-full border border-color-gray-200 shadow-sm">
import {
    UserCircle,
    ShoppingBag,
    GearSix
} from "@phosphor-icons/react";
import Image from "next/image";
import Button from "@/components/ui/Button";

export default function Navbar() {
  const [cartItems, setCartItems] = useState(0);

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
        <div
          className={`flex md:flex-row ${
            isLoggedIn ? "flex-row" : "flex-col"
          } justify-between md:items-center md:gap-4`}
        >
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
            {isLoggedIn ? (
              <div
                className="relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <button className="flex flex-row md:gap-3 gap-0 items-center text-sm font-medium p-1 rounded-lg py-1 px-3 text-color-gray-700 hover:bg-color-gray-200 hover:text-color-dark">
                  <span className="sr-only">Open user menu</span>
                  {user && user.profilePicture ? (
                    <img
                      className="w-8 h-8 me-2 rounded-full"
                      src={user.profilePicture}
                      alt="User photo"
                    />
                  ) : (
                    <UserCircle size={24} />
                  )}
                  {user && user.name ? (
                    <div className="md:flex flex-row gap-1 hidden">
                      {getDisplayName(user.name).map((part, index) => (
                        <span key={index}>{part}</span>
                      ))}
                    </div>
                  ) : (
                    <span>User</span>
                  )}
                </button>
                {showDropdown && (
                  <div className="absolute md:left-0 -right-4 w-64 bg-color-primary rounded-md shadow-lg z-50">
                    {user && (
                      <>
                        <div className="px-4 py-3 text-sm text-color-gray-900">
                          <div className="font-medium">{user.name}</div>
                          <div className="truncate">{user.email}</div>
                        </div>
                        <hr className="text-color-gray-200 mx-4" />
                        <ul
                          className="py-2 text-sm text-color-gray-700"
                          aria-labelledby="dropdownUserMenuButton"
                        >
                          <li>
                            <Link href="/profiles">
                              <button className="flex flex-row gap-2 w-full px-4 py-2 hover:bg-color-gray-100 text-left">
                                Profile
                              </button>
                            </Link>
                          </li>
                          <li>
                            <Link href="/payment">
                              <button className="flex flex-row gap-2 w-full px-4 py-2 hover:bg-color-gray-100 text-left">
                                Waiting Payment
                              </button>
                            </Link>
                          </li>
                          <li>
                            <Link href="/order">
                              <button className="flex flex-row gap-2 w-full px-4 py-2 hover:bg-color-gray-100 text-left">
                                Order
                              </button>
                            </Link>
                          </li>
                        </ul>
                        <hr className="text-color-gray-200 mx-4" />
                        <div className="py-2">
                          <button
                            onClick={handleLogout}
                            className="flex flex-row gap-2 w-full px-4 py-2 text-sm text-color-gray-700 hover:bg-color-gray-100 text-left"
                          >
                            Logout
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            ) : !isAuthRoute ? (
              <>
                <Link href="/auth/register">
                  <Button className="focus:outline-none text-primaryColor bg-secondaryColor hover:bg-primaryColor hover:text-white rounded-lg h-10 md:w-32 w-40">
                    Register
                  </Button>
                </Link>
                <Link href="/auth/login">
                <Button className="focus:outline-none text-white bg-primaryColor hover:bg-secondaryColor hover:text-primaryColor rounded-lg h-10 md:w-32 w-40">
                  Login
                </Button>
                </Link>
              </>
            ) : null}
          </div>
        </div>
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
          <Button className="focus:outline-none text-white bg-primaryColor hover:bg-secondaryColor hover:text-primaryColor rounded-lg h-10 md:w-32 w-40">
            Login
          </Button>
        </div>
      </div>
    </header>
  );
}
