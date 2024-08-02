"use client";

import React, { useEffect, useState } from "react";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { findAll } from "@/modules/fetch/cms/fetchOrderCms";
import { jwtDecode } from "jwt-decode";
import { getUser } from "@/modules/fetch/fetchUser";
import { updateStatus } from "@/modules/fetch/cms/fetchOrderCms";

const CmsOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const userData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const decodeToken = jwtDecode(token);
      const data = await getUser(decodeToken.id);
      setUser(data.data);
    } catch (error) {
      console.log("Error fetching user", error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await userData();

        setTimeout(async () => {
          try {
            const data = await findAll();
            const newData = data.data.filter(
              (order) =>
                order.proof_of_payment === "Waiting Payment"
            );
            if (newData.length > 0) {
              setOrders(newData);
            }
          } catch (error) {
            console.error("Error fetching orders", error.message);
          } finally {
            setLoading(false);
          }
        }, 500);
      } catch (error) {
        console.error("Error during data fetching", error.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleReject = async (orderId) => {
    try {
      console.log("hello world");
      const response = await updateStatus(orderId, { status: "cancelled" });
      console.log(response);
      setOrders((prevOrders) =>
        prevOrders.filter((order) => order.id !== orderId)
      );
      window.location.reload();
    } catch (error) {
      console.log("Error updating status", error.message);
    }
  };

  const handleApprove = async (orderId) => {
    try {
      const data = {
        status: "processed",
        proof_of_payment: "payment success",
      };
      await updateStatus(orderId, data);
      setOrders((prevOrders) =>
        prevOrders.filter((order) => order.id !== orderId)
      );
    } catch (error) {
      console.log("Error updating status", error.message);
    }
  };

  return (
    <div className="flex justify-center">
      {loading ? (
        <div>
          <LoadingSpinner />
        </div>
      ) : (
        <div className="w-full flex flex-col my-4">
          {orders.length > 0 ? (
            orders.map((items) => (
              <div
                key={items.id}
                className="border shadow rounded-lg h-[4rem] flex items-center justify-evenly mx-auto py-5 px-5"
              >
                <div className="grid grid-cols-4 gap-[100px]">
                  <div>
                    <p>{user ? user.username : "Loading..."}</p>
                  </div>
                  <div>
                    {items.order_products.map((item) => (
                      <p key={item.id}>{item.product.name}</p>
                    ))}
                  </div>
                  <div>
                    <p>{items.status}</p>
                  </div>
                  <div>
                    {items.status === "cancelled" ? (
                      <div className="grid grid-cols-2 gap-5">
                        <div>
                          <button
                            type="button"
                            className="w-[5rem] h-[1.5rem] bg-yellow-200 rounded-md opacity-50"
                            onClick={() => handleReject(items.id)}
                            disabled
                          >
                            <p className="text-amber-600 h-[1.5rem] rounded-md">
                              reject
                            </p>
                          </button>
                        </div>
                        <div>
                          <button
                            type="button"
                            className="w-[5rem] h-[1.5rem] bg-yellow-500 text-white rounded-md opacity-50"
                            onClick={() => handleApprove(items.id)}
                            disabled
                          >
                            <p className="h-[1.5rem] rounded-md">approve</p>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-5">
                        <div>
                          <button
                            type="button"
                            className="w-[5rem] h-[1.5rem] bg-yellow-200 rounded-md hover:bg-yellow-300"
                            onClick={() => handleReject(items.id)}
                          >
                            <p className="text-amber-600 h-[1.5rem] rounded-md">
                              reject
                            </p>
                          </button>
                        </div>
                        <div>
                          <button
                            type="button"
                            className="w-[5rem] h-[1.5rem] bg-yellow-500 text-white rounded-md hover:bg-yellow-300"
                            onClick={() => handleApprove(items.id)}
                          >
                            <p className="h-[1.5rem] rounded-md">approve</p>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">No orders found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CmsOrder;
