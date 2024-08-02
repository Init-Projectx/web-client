import { userInstance } from "@/libs/axios/axiosInstance";

const findOneCity = async (id) => {
    try {
        const response = await userInstance.get(`/cities/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching city data:", error.response ? error.response.data : error.message);
        throw error;
    }
};

const findCities = async (page, pageSize = 5) => {
    try {
        const response = await userInstance.get(`/cities?page=${page}&pageSize=${pageSize}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching city data:", error.response ? error.response.data : error.message);
        throw error;
    }
};

const searchCities = async (query) => {
    console.log(query, ">>>>>>>>>>>>>>>>>>>>>>");
    try {
        const response = await userInstance.get(`/cities/search?query=${query}`);
        return response.data;
    } catch (error) {
        console.log('Error search cities', error.message);
    }
}

export {
    findCities,
    findOneCity,
    searchCities
};