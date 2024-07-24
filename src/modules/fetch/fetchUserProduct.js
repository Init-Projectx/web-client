import { userInstance } from "@/libs/axios/axiosInstance";

const getAllProducts = async () => {
    try {
        const response = await userInstance.get(`/products`);
        console.log('<<<<<<<<<<<,, PRODUCT', response.data)
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

const getProductCategory = async (id) => {
    try {
        const response = await userInstance.get(`/products/category/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching product data:", error.response ? error.response.data : error.message);
        throw error;
    }
}

export {
    getAllProducts,
    getProduct,
    getProductCategory
}