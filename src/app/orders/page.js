"use client";

import { useState, useEffect } from 'react';
import { userInstance } from '../../libs/axios/axiosInstance.js';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [updatedOrders, setUpdatedOrders] = useState(new Set());

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await userInstance.get(`/orders`);
      console.log('API Response:', res.data);
      setOrders(res.data.data || []);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
      setError('Failed to fetch orders. Please try again later.');
      setOrders([]);
    }
    setLoading(false);
  };

  const updateOrderStatus = async (orderId) => {
    try {
      await userInstance.put(`/orders/${orderId}`, { status: 'delivered' });
      setUpdatedOrders((prev) => new Set(prev).add(orderId));
      fetchOrders();
    } catch (error) {
      console.error('Failed to update order status:', error);
      setError('Failed to update order status. Please try again later.');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="container mx-auto my-8 flex-grow">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : orders.length > 0 ? (
          <div className="grid gap-4">
            <div className="grid grid-cols-5 gap-4 border-b p-4 font-bold">
              <div>Products</div>
              <div>Address</div>
              <div>Order Details</div>
              <div>Status</div>
              <div>Actions</div>
            </div>
            {orders.map((order) => (
              <div key={order.id} className="grid grid-cols-5 gap-4 border-b p-4">
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
                  <p>{order.address.street}, {order.address.district}, {order.address.city}, {order.address.province}, {order.address.zip_code}, {order.address.country}</p>
                </div>
                <div>
                  <p>Order ID: {order.id}</p>
                  <p>Shipping Method: {order.shipping_method}</p>
                  <p>Courier: {order.courier}</p>
                  <p>Total Price: {order.total_price}</p>
                </div>
                <div>
                  <p className={`font-bold ${order.status === 'delivered' ? 'text-green-500' : 'text-yellow-500'}`}>
                    {order.status}
                  </p>
                </div>
                <div className="flex items-start space-x-2">
                  {order.status === 'pending' ? (
                    <button className="px-4 py-2 bg-yellow-500 text-black rounded">
                      Select Payment
                    </button>
                  ) : !updatedOrders.has(order.id) ? (
                    <button
                      className="px-4 py-2 bg-yellow-500 text-black rounded"
                      onClick={() => updateOrderStatus(order.id)}
                      disabled={loading}
                    >
                      Done
                    </button>
                  ) : (
                    <span className="text-green-500">Done</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default Orders;
