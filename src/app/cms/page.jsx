"use client";

import CmsCardProduct from "@/components/ui/CmsCardProduct";
import { getAllWarehouse } from "@/modules/fetch/fetchCmsWarehouse";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const CmsPage = () => {
    const [cms, setCms] = useState(null)
    const router = useRouter();

      useEffect(() => {
        const fetchCms = async () => {
          try {
            const WarehouseData = await getAllWarehouse();
            setCms(WarehouseData.data);
          } catch (error) {
            console.error("Error fetching Warehouse data:", error.message);
          }
        };

        fetchCms();
      }, []);


  return (
    <div>
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fill-rule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>
      <aside
        id="default-sidebar"
        className="fixed top-28 left-0 z-40 w-72 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul className="space-y-2 font-bold">
            <li>
              <a
                href="/"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <span className="ms-3">User Dashboard</span>
              </a>
            </li>
            <li>
              <a
                href=""
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <span className="flex-1 ms-3 whitespace-nowrap">
                  Add Product
                </span>
              </a>
            </li>
            <li>
              <a
                href=""
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <span className="flex-1 ms-3 whitespace-nowrap">
                  Payment Confirmation
                </span>
              </a>
            </li>
            <li>
              <a
                href=""
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <span className="flex-1 ms-3 whitespace-nowrap">Orders</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>

      <div className="pt-10 container mx-auto p-40 m-4">
        <div className="flex flex-wrap gap-20 mt-20">
          {Array.from({ length: 12 }).map((_, index) => (
            <CmsCardProduct key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CmsPage;
