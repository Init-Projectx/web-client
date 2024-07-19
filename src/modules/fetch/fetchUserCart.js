import { Jwt } from "jsonwebtoken";

import { userInstance } from "@/libs/axios/axiosInstance";
import { jwtDecode } from "jwt-decode";

const verifyToken = jwtDecode

const getCart = async (data) => {
    try {
        const response = await userInstance.get('/carts', data);
        return response.data;
    } catch (error) {
        console.error("Error fetching cart data:", error.response ? error.response.data : error.message);
        throw error;
    }
}

const updateCart = async (id, data) => {
    try {
        const response = await userInstance.put(`/carts/${id}`, data);
        return response.data;
    } catch (error) {
        console.error("Error fetching cart data:", error.response ? error.response.data : error.message);
        throw error;
    }
}

const shippingCost = async (data) => {
    try {
        const response = await userInstance.post(`/carts/shipping-cost`, data);
        return response.data;
    } catch (error) {
        console.error("Error fetching shipping cost data:", error.response ? error.response.data : error.message);
        throw error;
    }
}

const resetCart = async (id) => {
    try {
        const response = await userInstance.delete(`/carts/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching reset cart data:", error.response ? error.response.data : error.message);
        throw error;
    }
}

const deleteCartItem = async (id) => {
    try {
        const response = await userInstance.delete(`/carts/products/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching delete cart item data:", error.response ? error.response.data : error.message);
        throw error;
    }
}


export {
    getCart,
    updateCart,
    shippingCost,
    resetCart,
    deleteCartItem
}