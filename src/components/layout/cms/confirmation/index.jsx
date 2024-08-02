"use client";

import Link from "next/link";
import CmsOrder from "@/components/view/cms/confirmation";

const LayoutOrder = () => {
  return (
    <>
      <div className="h-full flex flex-row">
        <div className="w-1/5 h-screen flex flex-col border px-3 py-5 bg-white fixed">
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

        <div className="w-4/5 ml-auto px-5 py-5">
          <div className="w-full h-10 rounded-lg bg-yellow-400 items-center grid grid-cols-4 shadow mt-3 px-5">
            <p className="ms-3">Username</p>
            <p className="ms-3">Product name</p>
            <p className="ml-12">Status</p>
            <p className="ms-32">Action</p>
          </div>
          <CmsOrder />
        </div>
      </div>
    </>
  );
};

export default LayoutOrder;
