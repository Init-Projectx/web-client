const { cmsInstance } = require("@/libs/axios/axiosInstance")


const findAll = async () => {
    try {
        const response = await cmsInstance.get('/orders');
        return response.data;
    } catch (error) {
        console.log('Error fetching orders data', error.message);
    }
}

const findOne = async (id) => {
    try {
        const response = await cmsInstance.get(`/orders/${id}`);
        return response.data;
    } catch (error) {
        console.log('Error get order cms by id', error.message);
    }
}

const updateStatus = async (id, data) => {
    try {
        const response = await cmsInstance.put(`/orders/${id}`, data);
        return response.data;
    } catch (error) {
        console.log('Error update status order cms', error.message);
    }
}

export {
    findAll,
    findOne,
    updateStatus
}