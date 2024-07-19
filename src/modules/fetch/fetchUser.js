import { userInstance } from "@/libs/axios/axiosInstance";

const getUser = async () => {
    try {
        const response = await userInstance.get('users');
        response.data;
    } catch (error) {
        console.error("Error fetching user data:", error.response ? error.response.data : error.message);
        throw error;
    }
}

const updateuser = async (data) => {
    try {
        const response = await userInstance.put('users', data)
    } catch (error) {
        console.error("Error fetching user data:", error.response ? error.response.data : error.message);
        throw error;
    }
}

export {
    getUser,
    updateuser
}