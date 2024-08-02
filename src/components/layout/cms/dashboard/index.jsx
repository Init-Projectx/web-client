'use client';

import Dashboard from "@/components/view/cms/dashboard";
import Link from "next/link";

const LayoutDashboard = () => {
  return (
    <>
      <div className="flex h-screen">
        <div className="w-1/5 h-screen bg-white shadow-lg px-3 text-sm font-bold fixed top-0 left-0 flex flex-col mt-12">
          <Link href={"/"}>
            <button className="w-full mt-10 flex items-center rounded-md hover:bg-gray-200">
              <img
                src="https://www.svgrepo.com/show/449701/dashboard.svg"
                className="mx-5 my-1 poppins-bold"
                alt=""
                width="25px"
                height="25px"
              />
              User Dashboard
            </button>
          </Link>
          <Link href={"/cms/add-product"}>
            <button className="w-full mt-7 flex items-center rounded-md hover:bg-gray-200">
              <img
                src="https://www.svgrepo.com/show/449762/gift.svg"
                className="mx-5 my-1 poppins-bold"
                alt=""
                width="25px"
                height="25px"
              />
              Add Product
            </button>
          </Link>
          <Link href={"/cms/confirmation"}>
            <button className="w-full mt-7 flex items-center rounded-md hover:bg-gray-200">
              <img
                src="https://www.svgrepo.com/show/449846/money-bill.svg"
                className="mx-5 my-1 poppins-bold"
                alt=""
                width="25px"
                height="25px"
              />
              <p>Payment</p>
            </button>
          </Link>
          <Link href={"/cms/orders"}>
            <button className="w-full mt-7 flex items-center rounded-md hover:bg-gray-200">
              <img
                src="https://www.svgrepo.com/show/449902/shopping-cart.svg"
                className="mx-5 my-1 poppins-bold"
                alt=""
                width="25px"
                height="25px"
              />
              Orders
            </button>
          </Link>
        </div>
        <div className="w-4/5 ml-auto p-5">
          <Dashboard />
        </div>
      </div>
    </>
  );
};

export default LayoutDashboard;
