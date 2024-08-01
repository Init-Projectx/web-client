"use client";

import Button from "@/components/ui/Button";
import { findAll, updateStatus } from "@/modules/fetch/cms/fetchOrderCms";
import { getUser } from "@/modules/fetch/fetchUser";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

const CmsOrdersView = () => {
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(null);

  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);

  const fetchUser = async () => {
    try {
      const response = await getUser(decodedToken.id);
      setUser(response.data);
    } catch (error) {
      console.log("Error fetching user cms", error.message);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await findAll();
      const orderData = response.data.filter((data) => data.status === 'processed' || data.status === 'shipped' || data.status === 'delivered')
      setOrders(orderData);
    } catch (error) {
      console.log("Error fetching orders cms", error.message);
    }
  };

  useEffect(() => {
    fetchOrders();
    fetchUser();
  }, []);

  const handleClick = async (orderId, currentStatus) => {
    try {
      const nextStatus =
        currentStatus === "processed" ? "shipped" : "delivered";
      await updateStatus(orderId, { status: nextStatus });
      fetchOrders();
    } catch (error) {
      console.log("Error updating status", error.message);
    }
  };

  return (
    <div>
      <div className="flex rounded-lg border px-5 mb-2 h-10 items-center bg-yellow-500">
        <div className="grid grid-cols-5 gap-24 ml-10 items-center py-4">
          <p>Username</p>
          <p>Product name</p>
          <p>Address</p>
          <p>Status</p>
          <p className="ml-2">Action</p>
        </div>
      </div>
      {orders.map((order) => (
        <div key={order.id} className="rounded-lg shadow border px-5 mb-3">
          <div className="grid grid-cols-5 gap-20 ml-8 items-center py-4">
            <p>{user.username}</p>
            {order.order_products.map((item) => (
              <p key={item.id}>{item.product.name}</p>
            ))}
            <p>{order.address.address}</p>
            <p className={order.status === 'delivered'? "text-green-500" : order.status === 'processed' ? "text-yellow-400" : order.status === 'shipped'? "text-yellow-600" : order.status === 'pending'? "text-red-500" : ''}>{order.status}</p>
            <div className="flex items-center justify-center mr-10">
              <Button
                className={`bg-yellow-500 hover:bg-yellow-600 text-white ${
                  order.status === "delivered"
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                children={"update"}
                onClick={() => handleClick(order.id, order.status)}
                disabled={order.status === "delivered"}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CmsOrdersView;
