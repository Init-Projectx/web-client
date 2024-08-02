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


const updateUser = async (data, file) => {
    try {
        const formData = new FormData();
        
        formData.append("id", data.id);
        formData.append("username", data.username);
        formData.append("phoneNumber", data.phoneNumber);
        formData.append("city_id", data.city_id);
        formData.append("province_id", data.province_id);
        formData.append("zipCode", data.zipCode);
        formData.append("address", data.address);
        
        if (file) {
            formData.append("photo", file);
        }

        const response = await userInstance.put('/users', formData, {
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
