import { userInstance } from "@/libs/axios/axiosInstance";


const getStock = async (warehouseId, ProductId) => {
    try {
        const response = await getStockProduct(`/stock`)
    } catch (error) {
        console.error("Error fetching stock data:", error.response ? error.response.data : error.message);
        throw error;
    }
}

export {
    getStock
}