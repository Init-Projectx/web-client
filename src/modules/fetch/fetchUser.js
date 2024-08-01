import { userInstance } from "@/libs/axios/axiosInstance";

// Function to get user data
const getUser = async (id) => {
    try {
        const response = await userInstance.get(`/users`, id);
        return response.data;
    } catch (error) {
        console.error("Error fetching user data:", error.response ? error.response.data : error.message);
        throw error;
    }
}

// Function to update user data with potential file upload
const updateUser = async (data, file) => {
    try {
        // Creating a new FormData instance
        const formData = new FormData();
        
        // Appending data fields to FormData
        formData.append("id", data.id);
        formData.append("username", data.data.username);
        formData.append("phoneNumber", data.data.phoneNumber);
        formData.append("city_id", data.data.city_id);
        formData.append("province_id", data.data.province_id);
        formData.append("zipCode", data.data.zipCode);
        formData.append("address", data.data.address);
        
        // Appending file to FormData if it exists
        if (file) {
            formData.append("photo", file);
        }

        // Sending FormData to the server
        const response = await userInstance.put('users', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        return response.data;
    } catch (error) {
        console.error("Error updating user data:", error.response ? error.response.data : error.message);
        throw error;
    }
}

export {
    getUser,
    updateUser
}
