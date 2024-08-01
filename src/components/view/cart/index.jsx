"use client";

import idrConverter from "@/libs/idrConvert";
import { getUser } from "@/modules/fetch/fetchUser";
import {
  deleteCartItem,
  getCart,
  shippingCost,
  updateCart,
} from "@/modules/fetch/fetchUserCart";
import { getWarehouse } from "@/modules/fetch/fetchUserWarehouse";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState, useRef } from "react";
import { FaRegTrashAlt } from "react-icons/fa";

const CartView = () => {
  const [productItems, setProductItems] = useState([]);
  const [userId, setUserId] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [cart, setCart] = useState({});
  const [warehouseCityId, setWarehouseCityId] = useState(null); // hanya menyimpan city_id dari warehouse
  const [selectedCourier, setSelectedCourier] = useState(null);
  const [shippingCostData, setShippingCostData] = useState([]);
  const [selectedShippingMethod, setSelectedShippingMethod] = useState(null);
  const [totalCost, setTotalCost] = useState(0);
  const [weight, setWeight] = useState(null);
  const modalRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          const userId = decodedToken.id;
          const userData = await getUser(userId);
          setUserData(userData.data);
          setUserId(userId);

          const cartData = await getCart(userId);
          setCart(cartData.data);
          setProductItems(cartData.data.cart_items);

          const warehouseId = cartData.data.warehouse_id;
          const warehouseData = await getWarehouse(warehouseId);
          const origin = warehouseData.data;
          setWarehouseCityId(origin);
        } catch (err) {
          console.error(err.message);
        }
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchShippingCost = async () => {
      if (selectedCourier && userData?.city_id) {
        const weight = productItems.reduce(
          (acc, item) => acc + item.product.weight * item.quantity,
          0
        );

        setWeight(weight);

        try {
          const data = {
            origin_id: warehouseCityId?.cityId,
            destination_id: userData.city_id,
            weight: weight,
            courier: selectedCourier,
          };

          const shipping = await shippingCost(data);
          setShippingCostData(shipping.data);
        } catch (error) {
          console.error(error.message);
        }
      }
    };

    if (selectedCourier) {
      fetchShippingCost();
    }
  }, [selectedCourier]);

  useEffect(() => {
    if (isModalVisible && modalRef.current) {
      modalRef.current.focus();
    }
  }, [isModalVisible]);

  const handleTrashClick = (productId) => {
    setSelectedProductId(productId);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedProductId(null);
  };

  const handleDelete = async () => {
    try {
      await deleteCartItem(selectedProductId);
      alert("Product deleted successfully");
      handleModalClose();
      const data = await getCart(userId);
      setProductItems(data.data.cart_items);
    } catch (error) {
      console.error("Failed to delete product:", error.message);
    }
  };

  const calculateTotalProductCost = () => {
    return productItems.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );
  };

  const handleCourierChange = (e) => {
    const courier = e.target.value;
    setSelectedCourier(courier);
  };

  const handleShippingMethodChange = (e) => {
    const service = e.target.value;
    setSelectedShippingMethod(service);

    const selectedMethod = shippingCostData.find(
      (item) => item.service === service
    );
    if (selectedMethod) {
      const cost = selectedMethod.cost[0]?.value || 0;
      setTotalCost(calculateTotalProductCost() + cost);
    }
  };

  const handleCheckout = async () => {
    if (cart.id) {
      try {
        const shippingCostValue =
          shippingCostData.find(
            (item) => item.service === selectedShippingMethod
          )?.cost[0]?.value || 0;

        await updateCart(cart.id, {
          shipping_method: selectedShippingMethod,
          shipping_cost: shippingCostValue,
          warehouse_id: cart.warehouse_id,
          courier: selectedCourier,
          total_price: calculateTotalProductCost(),
          net_price: calculateTotalProductCost() + shippingCostValue,
          total_weight: weight,
          cart_items_attr: productItems.map((item) => ({
            product_id: item.product.id,
            quantity: item.quantity,
          })),
        });

        window.location.href = "/checkout";
      } catch (error) {
        console.error("Failed to update cart:", error.message);
      }
    } else {
      alert("Cart ID is not available");
    }
  };

  const courierOption = [
    { courier: "jne" },
    { courier: "tiki" },
    { courier: "pos" },
  ];

  return (
    <div className="flex flex-row justify-around mt-5 px-5 mb-12">
      <div className="w-2/3 rounded-lg">
        <div className="grid grid-cols-5 bg-yellow-500 h-10 rounded-md text-center items-center font-bold">
          <h1>Cart</h1>
          <h1>Product</h1>
          <h1>Quantity</h1>
          <h1>Price</h1>
          <h1>Action</h1>
        </div>
        {productItems.map((items) => (
          <div
            className="grid grid-cols-5 h-32 mt-3 border rounded-md text-center items-center shadow-lg"
            key={items.product.id}
          >
            <div className="px-7">
              <img
                src={items.product.photo}
                alt="Product Image"
                width="80px"
                height="80px"
              />
            </div>
            <div>
              <h4>{items.product.name}</h4>
              <h4>{items.product.description}</h4>
            </div>
            <h4>{items.quantity}</h4>
            <p className="font-bold">{idrConverter(items.product.price)}</p>
            <button
              onClick={() => handleTrashClick(items.product.id)}
              className="block pl-10"
              type="button"
            >
              <FaRegTrashAlt className="w-[30px] h-[30px] ms-7" />
            </button>
          </div>
        ))}
      </div>
      <div className="w-1/3 ml-5">
        <div className="shadow-lg p-5 bg-white border rounded-lg">
          <h3 className="font-bold mb-5 flex justify-center">
            Checkout Summary
          </h3>
          <div>
            <div className="grid grid-cols-2 gap-28 pl-8">
              <span className="poppins-bold">Product name</span>
              <span className="poppins-bold">Quantity</span>
            </div>
            <div>
              {productItems.map((items) => (
                <div
                  className="grid grid-cols-2 gap-28 pl-8"
                  key={items.product.id}
                >
                  <p className="mb-1 mt-2">{items.product.name}</p>
                  <p className="mb-1 mt-2 pl-7">x{items.quantity}</p>
                </div>
              ))}
              <hr className="mt-2" />
              <div className="px-8 mt-3">
                <span className="font-bold">Courier</span>
                <select
                  className="w-full mt-2 border border-gray-300 h-7"
                  onChange={handleCourierChange}
                >
                  <option value="">Select Courier</option>
                  {courierOption.map((c, index) => (
                    <option key={index} value={c.courier}>
                      {c.courier}
                    </option>
                  ))}
                </select>
              </div>
              <div className="px-8 mt-3">
                <span className="font-bold focus:outline-none">
                  Shipping Method
                </span>
                <select
                  className="w-full mt-2 border border-gray-300 h-7 focus:outline-none"
                  onChange={handleShippingMethodChange}
                >
                  <option value="" className="focus:outline-none">
                    Select Shipping Method
                  </option>
                  {shippingCostData?.map((method, index) => (
                    <option
                      className="focus:outline-none"
                      key={index}
                      value={method.service}
                    >
                      {method.description} -{" "}
                      {idrConverter(method.cost[0]?.value || 0)}
                    </option>
                  ))}
                </select>
              </div>
              <hr className="mt-2 mb-2" />
              <div className="px-8 mt-3 grid grid-cols-2">
                <span className="font-bold">Total</span>
                <p className="font-bold pl-14">{idrConverter(totalCost)}</p>
              </div>
              <div className="px-8 mt-5">
                <button
                  onClick={handleCheckout}
                  className="w-full py-2 bg-yellow-500 hover:bg-yellow-300 text-white rounded-lg"
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
        {isModalVisible && (
          <div
            ref={modalRef}
            className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50"
            aria-modal="true"
            role="dialog"
          >
            <div className="bg-white p-4 rounded-lg">
              <h2 className="text-lg font-bold mb-4">Confirmation</h2>
              <p className="mb-4">
                Are you sure you want to delete this product?
              </p>
              <div className="flex justify-end mt-6">
                <button
                  onClick={handleModalClose}
                  className="px-4 py-2 mr-2 bg-gray-300 text-gray-800 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-yellow-500 text-white rounded-lg"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartView;
