import { userInstance } from "@/libs/axios/axiosInstance";

const getAllProducts = async (page, pageSize = 12) => {
    try {
        const response = await userInstance.get(`/products?page=${page}&${pageSize}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching product data:", error.response ? error.response.data : error.message);
        throw error;
    }
}

const getProduct = async (slug) => {
    try {
        const response = await userInstance.get(`/products/${slug}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching product data:", error.response ? error.response.data : error.message);
        throw error;
    }
}

export {
    getAllProducts,
    getProduct
}