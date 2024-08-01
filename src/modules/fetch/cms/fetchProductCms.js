const { cmsInstance } = require("@/libs/axios/axiosInstance");

const getAllProductCms = async () => {
    try {
        const response = await cmsInstance.get('/products');
        return response.data;
    } catch (error) {
        console.log('Error get all product cms', error.message)
    }
}

const getOneProductCms = async (slug) => {
    try {
        const response = await cmsInstance.get(`${slug}`);
        return response.data;
    } catch (error) {
        console.log('Error get product by slug', error.message)
    }
}


const addProductCms = async (data) => {
    console.log(data)
    try {
        const response = await cmsInstance.post('/products', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        } );
        return response.data;
    } catch (error) {
        console.log('Error add new product', error.message)
    }
}

const editProductCms = async (slug, formData) => {
    try {
        const response = await cmsInstance.put(`/products/${slug}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
        return response.data;
    } catch (error) {
        console.log('Failed to update product', error.message)
    }
}

const deleteProductCms = async (slug) => {
    try {
        const response = await cmsInstance.put(`/products/delete/${slug}`)
        return response.data;
    } catch (error) {
        console.log('Failed to delete product', error.message);
    }
}

const activatedProduct = async (slug) => {
    try {
        const response = await cmsInstance.put(`/products/activated/${slug}`);
        return response.data;
    } catch (error) {
        console.log('Activated product failed', error.message)
    }
}

export {
    getAllProductCms,
    getOneProductCms,
    addProductCms,
    editProductCms,
    deleteProductCms,
    activatedProduct
}