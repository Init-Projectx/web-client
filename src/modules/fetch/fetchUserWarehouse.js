import { userInstance } from "@/libs/axios/axiosInstance";

const getWarehouse = async (id) => {
    try {
        const response = await userInstance.get(`/warehouses/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching warehouse data:", error.response ? error.response.data : error.message);
        throw error;
    }
}

const getAllWarehouse = async () => {
    try {
        const response = await userInstance.get(`/warehouses`);
        return response.data;
    } catch (error) {
        console.error("Error fetching warehouse data:", error.response ? error.response.data : error.message);
        throw error;
    }
}

export {
    getWarehouse,
    getAllWarehouse
}