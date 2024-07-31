"use client";

import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { findAll } from "@/modules/fetch/fetchOrder";
import { useEffect, useState } from "react";

const CmsOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await findAll();
        if (data.length > 0) {
          setOrders(data);
        }
      } catch (error) {
        console.log("Error fetching order", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, []);

  console.log('>>>>>>>>>>>>', orders);

  return (
    <div className="flex justify-center">
      {loading ? (
        <div>
          <LoadingSpinner />
        </div>
      ) : (
        <div className="w-full flex flex-col my-1">
          {orders.length > 0 ? (
            orders.map((order) => (
              <div
                key={order.id}
                className="w-5/6 border-2 border-slate-950 rounded-lg h-[4rem] flex items-center justify-evenly mx-auto my-3"
              >
                <p>{order.username}</p>
                <p>
                  {order.productName} x {order.quantity}
                </p>
                <button
                  type="button"
                  className="w-[5rem] h-[1.5rem] bg-yellow-300 rounded-md hover:bg-yellow-600"
                >
                  <p className="hover:text-stone-50 h-[1.5rem] rounded-md">
                    Reject
                  </p>
                </button>
                <button
                  type="button"
                  className="w-[5rem] h-[1.5rem] bg-yellow-500 rounded-md hover:bg-yellow-300"
                >
                  Approve
                </button>
              </div>
            ))
          ) : (
            <p>No orders found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CmsOrder;
