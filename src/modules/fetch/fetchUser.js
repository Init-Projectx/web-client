import { userInstance } from "@/libs/axios/axiosInstance";

const getUser = async (id) => {
    try {
        const response = await userInstance.get(`/users`, id);
        return response.data;
    } catch (error) {
        console.error("Error fetching user data:", error.response ? error.response.data : error.message);
        throw error;
    }
}

const updateUser = async (data) => {
    try {
        const response = await userInstance.put('users', data);
        return response.data;
    } catch (error) {
        console.error("Error fetching user data:", error.response ? error.response.data : error.message);
        throw error;
    }
}

export {
    getUser,
    updateUser
}