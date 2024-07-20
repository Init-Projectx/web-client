"use client";

import React from "react";
import Logo from "@/assets/images/logo_minimiracle.png";
import Image from "next/image";
import { EnvelopeSimple, InstagramLogo, XLogo } from "@phosphor-icons/react";

export default function footer() {
  return (
    <footer className="border border-color-black bg-white dark:bg-gray-900">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <a href="/" class="flex items-center">
              <Image
                src={Logo}
                width={80}
                className="me-4"
                alt="MiniMircale Logo"
              />
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                MiniMiracle
              </span>
            </a>
          </div>
          <div className="flex flex-cols-2 gap-6 sm:gap-8 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Section
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li>
                  <a href="/" className="hover:underline">
                    Home
                  </a>
                </li>
                <li>
                  <a href="" className="hover:underline">
                    Features
                  </a>
                </li>
                <li>
                  <a href="" className="hover:underline">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="" className="hover:underline">
                    FAQs
                  </a>
                </li>
                <li>
                  <a href="" className="hover:underline">
                    About
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                About us
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li>
                  <a href="" className="hover:underline ">
                    E-commerce Ibu dan Anak Terlengkap Di indonesia
                  </a>
                </li>
                <li>
                  <a href="" className="hover:underline">
                    Jl. Buah Batu, Bandung, Indonesia
                  </a>
                </li>
                <li>
                  <a href="" className="hover:underline">
                    +6281905017120
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Sosial Media
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <div className="flex">
                <EnvelopeSimple size={32} className="mb-4 mr-3"/>
                  <li>
                    <a href="https://mail.google.com/" className="hover:underline">
                      minimiracle@gmail.com
                    </a>
                  </li>
                </div>
                <div className="flex">
                  <XLogo size={32} className="mb-4 mr-3"/>
                  <li>
                    <a href="https://x.com/" className="hover:underline">
                      @minimiracles07
                    </a>
                  </li>
                </div>
                <div className="flex">
                  <InstagramLogo size={32} className="mb-4 mr-3"/>
                  <li>
                    <a href="https://intagram.com/" className="hover:underline">
                      minimiracles07
                    </a>
                  </li>
                </div>
              </ul>
            </div>
          </div>
        </div>
        <div class="sm:flex sm:items-center sm:justify-between">
          <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2024{" "}
            <a href="https://flowbite.com/" class="hover:underline">
              MiniMiracle™
            </a>
            . All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
