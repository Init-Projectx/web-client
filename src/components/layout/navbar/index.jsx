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
