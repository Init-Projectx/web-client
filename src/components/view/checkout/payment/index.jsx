"use client";

import Button from "@/components/ui/Button";
import { createOrder, payment } from "@/modules/fetch/fetchOrder";
import { getUser } from "@/modules/fetch/fetchUser";
import { getCart } from "@/modules/fetch/fetchUserCart";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

const Payment = ({ className }) => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [order, setOrder] = useState(null);
  const [orderStatus, setOrderStatus] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const userData = jwtDecode(token);
          const data = await getUser(userData.id);
          setUser(data.data);
        }
      } catch (error) {
        console.log(error.message);
        setError("Failed to load user data.");
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const fetchCart = async () => {
      if (user?.id) {
        try {
          const data = await getCart(user.id);
          setCart(data.data);
        } catch (error) {
          console.log(error.message);
          setError("Failed to load cart data.");
        }
      }
    };

    fetchCart();
  }, [user]);

  useEffect(() => {
    if (user && cart) {
      setIsLoading(false);
    }
  }, [user, cart]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!user || !cart.cart_items) {
    return <div>Data is missing. Please try again later.</div>;
  }

  const orderData = {
    address: {
      address: user.address,
      city_id: user.city_id,
    },
    paymentMethod: "virtual account",
    proofOfPayment: "Waiting Payment",
    bankName: "BCA",
    warehouse_id: cart.warehouse_id,
    shipping_cost: cart.shipping_cost,
    shipping_method: cart.shipping_method,
    courier: cart.courier,
    order_items_attributes: cart.cart_items.map((items) => ({
      product_id: items.product_id,
      quantity: items.quantity,
    })),
  };

  const handlePayment = async () => {
    try {
      const response = await createOrder(orderData);
      setOrder(response.data);
      setOrderStatus(true);

      const userPayload = {
        id: user.id,
        email: user.email,
        role: user.role,
      };

      const paymentResponse = await payment(response.data.id, userPayload);

      if (paymentResponse.data) {
        const snapScript = "https://app.sandbox.midtrans.com/snap/snap.js";
        const clientKey = process.env.MIDTRANS_CLIENT_KEY;

        const script = document.createElement("script");
        script.src = snapScript;
        script.setAttribute("data-client-key", clientKey);
        script.async = true;
        document.body.appendChild(script);

        script.onload = () => {
          window.snap.pay(paymentResponse.data.token);
        };

        return () => {
          document.body.removeChild(script);
        };
      }
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
  };

  return (
    <div>
      <Button
        onClick={handlePayment}
        className={`${className} w-20 h-7 flex justify-center items-center focus:outline-none text-white bg-yellow-500 hover:bg-yellow-600 rounded-lg text-sm px-5 py-2 ${
          orderStatus ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={orderStatus}
      >
        {orderStatus ? "Pay" : "Pay"}
      </Button>
    </div>
  );
};

export default Payment;
