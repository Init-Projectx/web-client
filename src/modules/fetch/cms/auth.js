const { cmsInstance } = require("@/libs/axios/axiosInstance");

const loginCms = async (data) => {
    try {
        const response = await cmsInstance.post('/auth/login', data);
        return response.data;
    } catch (error) {
        console.log('Failed To Login', error.message)
    }
}

export default loginCms;