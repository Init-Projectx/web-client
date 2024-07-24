"use client";

import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { getUser } from "@/modules/fetch/fetchUser";
import { getCart, updateCart } from "@/modules/fetch/fetchUserCart";
import { getProduct } from "@/modules/fetch/fetchUserProduct";
import DetailsProduct from "@/components/ui/DetailsProduct";

const DetailsProductPage = ({ slug }) => {
  const [cart, setCart] = useState(null);
  const [userId, setUserId] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        const decodedToken = jwtDecode(token);
        const getUserId = decodedToken.id;

        try {
          const userData = await getUser(getUserId);
          setUserId(userData);
        } catch (err) {
          console.error(err.message);
        }
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await getProduct(slug);
        const cartData = await getCart(userId);

        setCart(cartData?.data);
        setProduct(productData.data);
      } catch (error) {
        setError("Failed to fetch product");
      } finally {
        setLoading(false);
      }
    };

    if (slug && userId) {
      fetchProduct();
    }
  }, [slug, userId]);

  const handleAddToCart = async () => {
    try {
      let updatedItems = [...(cart?.cart_items || [])];
      const productIndex = updatedItems.findIndex(
        (item) => item.product_id === product.id
      );

      if (productIndex > -1) {
        updatedItems[productIndex].quantity += quantity;
      } else {
        updatedItems.push({
          product_id: product.id,
          quantity: quantity,
        });
      }

      const cartItemToUpdate = {
        product_id: product.id,
        quantity: updatedItems.find((item) => item.product_id === product.id)
          .quantity,
      };

      const newCart = await updateCart(cart.id, {
        courier: cart.courier,
        shipping_method: cart.shipping_method,
        shipping_cost: cart.shipping_cost,
        warehouse_id: cart.warehouse_id,
        cart_items_attr: cartItemToUpdate,
      });

      setCart(newCart);
      alert(`Product ${product.name} Added to cart`);
    } catch (error) {
      console.error("Failed to add to cart:", error);
    }
  };

  const handleBuyNow = async () => {
    if (product) {
      try {
        const data = await buyNow(product.id, quantity);
        console.log("Proceeding to checkout");
      } catch (error) {
        console.error("Error proceeding to checkout:", error);
      }
    }
  };

  const handleQuantityChange = (e) => {
    const newQuantity = Number(e.target.value);
    setQuantity(newQuantity);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (loading || !product) {
    return <div>Loading...</div>;
  }

  return (
    <DetailsProduct
      product={product}
      cartData={cart}
      quantity={quantity}
      onQuantityChange={handleQuantityChange}
      onDecrease={handleDecrease}
      onIncrease={handleIncrease}
      onAddToCart={handleAddToCart}
      onBuyNow={handleBuyNow}
    />
  );
};

export default DetailsProductPage;
