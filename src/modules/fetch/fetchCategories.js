import { userInstance } from "@/libs/axios/axiosInstance";

const getAllCategories = async () => {
    try {
        const response = await userInstance.get('/categories');
        return response.data;
    } catch (error) {
        console.error("Error fetching category data:", error.response ? error.response.data : error.message);
        throw error;
    }
}

const getCategory = async (id) => {
    try {
        const response = await userInstance.get(`/categries/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching category data:", error.response ? error.response.data : error.message);
        throw error;
    }
}

export {
    getAllCategories,
    getCategory
}