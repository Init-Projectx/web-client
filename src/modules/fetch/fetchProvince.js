const { userInstance } = require("@/libs/axios/axiosInstance");

const searchProvince = async (query) => {
    try {
        const response = await userInstance.get(`/provinces?query=${query}`);
        return response.data;
    } catch (error) {
        console.log('Error search province', error.message);
    }
}

export {
    searchProvince
}