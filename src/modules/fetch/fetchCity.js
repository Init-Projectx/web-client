import instance from "@/libs/axios/axiosInstance";

const findOneCity = async (id) => {
    try {
        const response = await instance.get(`/cities/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching city data:", error.response ? error.response.data : error.message);
        throw error;
    }
};

const findCities = async (page, pageSize = 5) => {
    try {
        const response = await instance.get(`/cities?page=${page}&pageSize=${pageSize}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching city data:", error.response ? error.response.data : error.message);
        throw error;
    }
};

export {
    findCities,
    findOneCity
};