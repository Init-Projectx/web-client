"use client";

import Dashboard from "@/components/view/cms/dashboard";
import Link from "next/link";

const LayoutDashboard = () => {
  return (
    <>
      <div className="h-full flex flex-row">
        <div className="w-1/5 h-6/6 flex flex-col shadow-lg px-3 text-sm font-bold">
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
                className="ms-5 my-1 poppins-bold"
                alt=""
                width="25px"
                height="25px"
              />
              <p className="ml-5">Payment</p>
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
        <div className="w-full px-5 py-5">
          <Dashboard />
        </div>
      </div>
    </>
  );
};

export default LayoutDashboard;
