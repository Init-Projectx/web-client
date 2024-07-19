import { userInstance } from "@/libs/axios/axiosInstance";

const findAll = async () => {
    try {
        const response = await userInstance.get('/orders');
        return response.data;
    } catch (error) {
        console.error("Error fetching order data:", error.response ? error.response.data : error.message);
        throw error;
    }
}

const findOne = async (id) => {
    try {
        const response = await userInstance.get(`/orders/${id}`);
        return response.data
    } catch (error) {
        console.error("Error fetching order data:", error.response ? error.response.data : error.message);
        throw error;
    }
}

const createOrder = async (data) => {
    try {
        const response = await userInstance.post('/orders', data);
        return response.data;
    } catch (error) {
        console.error("Error fetching order data:", error.response ? error.response.data : error.message);
        throw error;
    }
}

const updateStatus = async (id) => {
    try {
        const response = await userInstance.put(`/orders/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching order data:", error.response ? error.response.data : error.message);
        throw error;
    }
}

export {
    findAll,
    findOne,
    createOrder,
    updateStatus
}