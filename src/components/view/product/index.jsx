"use client";

import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { getUser } from "@/modules/fetch/fetchUser";
import { getCart, updateCart } from "@/modules/fetch/fetchUserCart";
import { getProduct } from "@/modules/fetch/fetchUserProduct";
import DetailsProduct from "@/components/ui/DetailsProduct";
import { toast, ToastContainer } from "react-toastify"; 

const DetailsProductPage = ({ slug }) => {
  const [cart, setCart] = useState(null);
  const [userId, setUserId] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        const decodedToken = jwtDecode(token);
        const getUserId = decodedToken.id;
        setUserId(getUserId);

        try {
          const [userData, productData] = await Promise.all([
            getUser(getUserId),
            getProduct(slug),
          ]);
          const cartData = await getCart(getUserId);

          setProduct(productData.data);
          setCart(cartData?.data);
        } catch (err) {
          setError("Failed to fetch data");
        } finally {
          setLoading(false);
        }
      } else {
        setError("No token found");
        setLoading(false);
      }
    };

    if (slug) {
      fetchData();
    }
  }, [slug]);

  const handleAddToCart = async (quantity) => {
    if (!product || !cart) return;

    try {
      let updatedItems = [...(cart.cart_items || [])];
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

      const warehouseId = product.Product_Warehouses[0].warehouse.id;

      const newCart = await updateCart(cart.id, {
        ...cart,
        warehouse_id: warehouseId,
        cart_items_attr: cartItemToUpdate,
      });

      setCart(newCart);
      toast.success(`Product ${product.name} added to cart`); 
    } catch (error) {
      console.error("Failed to add to cart:", error);
      toast.error("Failed to add to cart"); 
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (loading || !product) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <DetailsProduct
        product={product}
        cartData={cart}
        quantity={quantity}
        onAddToCart={handleAddToCart}
      />
      <ToastContainer /> 
    </>
  );
};

export default DetailsProductPage;
