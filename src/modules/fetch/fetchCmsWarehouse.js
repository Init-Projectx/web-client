import { cmsInstance } from "@/libs/axios/axiosInstance";

const getWarehouse = async (id) => {
    try {
        const response = await cmsInstance.get(`/cms/warehouses/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching warehouse data:", error.response ? error.response.data : error.message);
        throw error;
    }
}

const getAllWarehouse = async () => {
    try {
        const response = await cmsInstance.get(`/cms/warehouses`);
        return response.data;
    } catch (error) {
        console.error("Error fetching warehouse data:", error.response ? error.response.data : error.message);
        throw error;
    }
}


const createWarehouse = async (data) => {
    try {
        const response = await cmsInstance.post('/cms/warehouses');
        return response.data;
    } catch (error) {
        console.error("Error fetching city data:", error.response ? error.response.data : error.message);
        throw error;
    }
}

const updateWarehouse = async (id, data) => {
    try {
        const response = await cmsInstance.put(`/cms/warehouses/${id}`, data);
        return response.data;
    } catch (error) {
        console.error("Error fetching city data:", error.response ? error.response.data : error.message);
        throw error;
    }
}

const deleteWarehouse = async (id) => {
    try {
        const response = await cmsInstance.put(`/cms/warehouses/delete/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching city data:", error.response ? error.response.data : error.message);
        throw error;
    }
}

const restoreWarehouse = async (id) => {
    try {
        const response = await cmsInstance.put(`/cms/warehouses/activated/${id}`)
    } catch (error) {
        console.error("Error fetching city data:", error.response ? error.response.data : error.message);
        throw error;
    }
}

export {
    getWarehouse,
    getAllWarehouse,
    createWarehouse,
    updateWarehouse,
    deleteWarehouse,
    restoreWarehouse
}