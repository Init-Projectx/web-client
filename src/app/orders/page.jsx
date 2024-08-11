"use client";

import { useState, useEffect } from "react";
import { midtrans, notification } from "@/modules/fetch/fetchOrder";
import { resetCart } from "@/modules/fetch/fetchUserCart";
import { findAll, updateStatus } from "@/modules/fetch/fetchOrder";
import LoadingSpinner from "@/components/ui/LoadingSpinner/index.jsx";
import Link from "next/link.js";
import Payment from "@/components/view/checkout/payment";
import { jwtDecode } from "jwt-decode";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [updatedOrders, setUpdatedOrders] = useState(new Set());

  useEffect(() => {
    const fetchMidtransData = async () => {
      setLoading(true);
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const order_id = urlParams.get("order_id");
        const transaction_status = urlParams.get("transaction_status");
        const status_code = urlParams.get("status_code");

        const token = localStorage.getItem("token");
        const decodedToken = jwtDecode(token);

        if (order_id && transaction_status) {
          try {
            const response = await midtrans({
              order_id,
              transaction_status,
              status_code,
            });

            if (response.data.proof_of_payment === "payment success") {
              try {
                const email = {
                  to: decodedToken.email,
                };
                const sendNotification = await notification(email);
                if (sendNotification) {
                  console.log("Send Notification Success");
                }
                await resetCart(decodedToken.id);
              } catch (error) {
                console.log("Ada yang error disini", error.message);
              }
            } else {
              setError("Invalid Midtrans response data.");
              return;
            }
          } catch (error) {
            console.error("Failed to update order with Midtrans data:", error);
            setError("Failed to update order with Midtrans data.");
          }
        } else {
          setError("Missing required Midtrans parameters.");
        }
      } catch (error) {
        console.error("Failed to process Midtrans data:", error);
        setError("Failed to process Midtrans data.");
      }
      fetchOrders();
      setLoading(false);
    };

    fetchMidtransData();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await findAll();
      if (response.data) {
        setOrders(response.data);
      } else {
        setOrders([]);
        setError("No orders found.");
      }
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      setError("Failed to fetch orders. Please try again later.");
      setOrders([]);
    }
    setLoading(false);
  };

  const handleUpdateOrderStatus = async (orderId) => {
    try {
      await updateStatus(orderId, { status: "delivered" });
      setUpdatedOrders((prev) => new Set(prev).add(orderId));
      fetchOrders();
    } catch (error) {
      console.error("Failed to update order status:", error);
      setError("Failed to update order status. Please try again later.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="container mx-auto my-8 flex-grow">
        <div className="px-10">
          {loading ? (
            <LoadingSpinner />
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : orders.length > 0 ? (
            <div className="grid gap-4">
              <div className="grid grid-cols-6 gap-4 border-b p-4 font-bold">
                <div>Products</div>
                <div>Address</div>
                <div>Order Details</div>
                <div>Payment Status</div>
                <div>Order Status</div>
                <div className="ml-4">Actions</div>
              </div>
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="grid grid-cols-6 gap-4 border-b p-4"
                >
                  <div>
                    <ul>
                      {order.order_products.map((product) => (
                        <li key={product.id}>
                          {product.quantity}x {product.product.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p>{order.address.address}</p>
                  </div>
                  <div>
                    <p>Order ID: {order.id}</p>
                    <p>Shipping Method: {order.shipping_method}</p>
                    <p>Courier: {order.courier}</p>
                    <p>Total Price: {order.net_price}</p>
                  </div>
                  <div>
                    <p
                      className={`font-bold ${
                        order.proof_of_payment === "payment success"
                          ? "text-green-500"
                          : "text-yellow-500"
                      }`}
                    >
                      {order.proof_of_payment}
                    </p>
                  </div>
                  <div>
                    <p
                      className={`font-bold ${
                        order.status === "delivered"
                          ? "text-green-500"
                          : "text-yellow-500"
                      }`}
                    >
                      {order.status}
                    </p>
                  </div>
                  <div className="flex items-start space-x-2">
                    {order.proof_of_payment === "payment success" ? (
                      <button
                        className="flex items-center justify-center px-4 py-2 bg-yellow-500 h-8 w-36 hover:bg-yellow-600 text-white rounded-lg"
                        onClick={() => handleUpdateOrderStatus(order.id)}
                        disabled={loading}
                      >
                        Delivered
                      </button>
                    ) : !updatedOrders.has(order.id) ? (
                      <Payment
                        className={
                          "flex items-center justify-center px-4 py-2 bg-yellow-500 h-8 w-36 hover:bg-yellow-600 text-white rounded"
                        }
                      />
                    ) : (
                      <span className="text-green-500">Done</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div>
              <p className="text-center font-bold text-lg">
                You don't have any orders yet.
              </p>
              <p className="text-center font-bold text-lg">
                Start shopping and create your first order!
              </p>
              <Link
                href={"/"}
                className="flex justify-center items-center mt-4"
              >
                <button className="bg-yellow-500 hover:bg-yellow-600 text-black rounded h-8 w-32">
                  Start Shopping
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
