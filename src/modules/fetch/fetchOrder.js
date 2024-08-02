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

const payment = async (id, data) => {
    try {
        const response = await userInstance.post(`/orders/payment/${id}`, data);
        return response;
    } catch (error) {
        console.error("Error Payment:", error.response ? error.response.data : error.message);
    }
}

const midtrans = async (data) => {
    try {
        const response = await userInstance.put('/payment/midtrans', data);
        return response.data;
    } catch (error) {
        console.error("Error Fetch Midtrans Payment:", error.response ? error.response.data : error.message);
    }
}

const updateStatus = async (id, data) => {
    try {
        const response = await userInstance.put(`/orders/${id}`, data);
        return response.data;
    } catch (error) {
        console.error("Error fetching order data:", error.response ? error.response.data : error.message);
        throw error;
    }
}

const notification = async (to) => {
    try {
        const response = await userInstance.post('/orders/notification', to);
        return response.data;
    } catch (error) {
        console.log('Failed to send notification', error.response ? error.response.data : error.message);
    }
}

export {
    findAll,
    findOne,
    createOrder,
    updateStatus,
    payment,
    midtrans,
    notification
}