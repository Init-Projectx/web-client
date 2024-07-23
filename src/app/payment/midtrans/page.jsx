"use client";

import { useEffect, useState } from "react";
import { midtrans } from "@/modules/fetch/fetchOrder";
import { jwtDecode } from "jwt-decode";
import { resetCart } from "@/modules/fetch/fetchUserCart";

const PaymentPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMidtransData = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const order_id = urlParams.get("order_id");
        const transaction_status = urlParams.get("transaction_status");
        const status_code = urlParams.get("status_code");

        if (!order_id || !transaction_status) {
          throw new Error("Missing required parameters");
        }

        const response = await midtrans({
          order_id,
          transaction_status,
          status_code,
        });

        const userId = response.data.user_id;

        const resetCartProduct = await resetCart(userId);

        setLoading(false);
      } catch (error) {
        console.error("Failed to update order:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchMidtransData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return <div>Order updated successfully!</div>;
};

export default PaymentPage;
