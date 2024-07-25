"use client";

import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { getUser } from "@/modules/fetch/fetchUser";
import { getCart } from "@/modules/fetch/fetchUserCart";
import { jwtDecode } from "jwt-decode";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import Payment from "./payment";
import idrConverter from "@/libs/idrConvert";

const CheckoutView = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState(null);
  const modalRef = useRef(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const decodeToken = jwtDecode(token);

        const data = await getUser(decodeToken.id);
        setUser(data?.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (user && user.id) {
      console.log("Fetching cart data for user ID:", user.id);
      const fetchCart = async () => {
        try {
          const data = await getCart(user.id);
          setCart(data.data);
        } catch (error) {
          console.log(error.message);
        }
      };

      fetchCart();
    }
  }, [user]);

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setModalOpen(false);
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]);

  return (
    <div className="flex w-full pr-8 gap-4 mb-28">
      <div className="w-3/4">
        <div className="shadow-lg border mb-3 rounded-lg w-full items-center">
          {user === null ? (
            <div className="grid grid-cols-3 h-20 gap-8 w-full text-center items-center">
              <div className="flex flex-row items-center poppins-bold pl-10">
                loading...
              </div>
              <p>loading...</p>
              <p>loading...</p>
            </div>
          ) : (
            <div className="grid grid-cols-4 h-20 gap-8 w-full text-center items-center">
              <p className="font-bold">User Details:</p>
              <div className="flex flex-row items-center pl-10">
                {user.username}
              </div>
              <p>{user.phone_number}</p>
              <p>{user.address}</p>
            </div>
          )}
        </div>
        <div className="shadow-lg border mb-3 rounded-lg flex justify-around items-center">
          {cart !== null ? (
            <div>
              {cart.cart_items.map((items, index) => (
                <div
                  key={index}
                  className="grid grid-cols-4 w-full gap-2 text-center items-center px-3 py-3"
                >
                  <div className="pl-5 grid grid-cols-2 text-center items-center">
                    <img
                      src={items.product.photo}
                      alt="img"
                      className="me-4 rounded-lg"
                    />
                  </div>
                  <div className="text-center">
                    <p className="mb-2">Product Name</p>
                    <p className="mb-2">{items.product.name}</p>
                  </div>
                  <div className="grid grid-rows-2 gap-0">
                    <p className="mb-2">Quantity</p>
                    <p>{items.quantity}</p>
                  </div>
                  <div className="grid grid-rows-2">
                    <p className="mb-2">Initial Price</p>
                    <p>{idrConverter(items.product.price)}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div>loading...</div>
          )}
        </div>
      </div>
      <div className="w-1/4">
        {cart !== null ? (
          <div className="shadow-lg border mb-3 rounded-lg">
            <div className="text-center mt-5">
              <h1 className="font-bold">Checkout Summary</h1>
            </div>
            <div className="px-5 py-8">
              <div className="grid grid-cols-2 gap-3 text-center items-center">
                <p>Product Price</p>
                <p className="pl-8 font-bold mt-3">
                  Rp.{" "}
                  {cart !== null
                    ? cart?.cart_items.reduce(
                        (total, item) => total + Number(item.product.price),
                        0
                      )
                    : "-"}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 text-center items-center">
                <p>Shipping cost</p>
                <p className="pl-8 font-bold mt-3">
                  {idrConverter(cart.shipping_cost)}
                </p>
              </div>
              <hr className="mt-3 mb-3 border-black" />
              <div className="grid grid-cols-2 gap-3 text-center items-center">
                <p className="font-bold">Total</p>
                <p className="pl-8 font-bold mt-3">{idrConverter(cart.net_price)}</p>
              </div>
              <div>
                <Button
                  children={"Select Payment"}
                  className={
                    "bg-yellow-500 w-full mt-6 hover:bg-yellow-600 text-white"
                  }
                  onClick={() => setModalOpen(true)}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center">loading...</div>
        )}
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <div
          ref={modalRef}
          className="w-[400px] justify-center h-[300px] grid grid-rows-3"
        >
          <div className="w-full flex justify-center mb-8">
            <h2 className="text-xl font-bold">Payment Method</h2>
          </div>
          <div className="w-[300px] justify-between border h-4/6 rounded-xl flex items-center mt-[-20px]">
            <p className="ms-3">Bank Transfer</p>
            <Link href="/payment/manual-payment" className="pr-3">
              <button
                type="button"
                className="w-20 h-7 flex justify-center items-center focus:outline-none text-white bg-yellow-500 hover:bg-yellow-600 rounded-lg text-sm px-5 py-2"
              >
                Pay
              </button>
            </Link>
          </div>
          <div className="w-full justify-between border h-4/6 px-2 rounded-xl flex items-center mt-[-40px]">
            <p className="ms-3">Midtrans</p>
            <Payment className={"ml-4"} />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CheckoutView;
