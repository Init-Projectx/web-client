"use client";

import { useState, useEffect } from "react";
import Input from "@/components/ui/Input";
import FileUpload from "@/components/ui/FileUpload";
import Button from "@/components/ui/Button";
import { 
  addProductCms, 
  getAllProductCms, 
  deleteProductCms, 
  editProductCms, 
  getOneProductCms,
  activatedProduct
} from "@/modules/fetch/cms/fetchProductCms";

const AddProductPage = () => {
  const [productData, setProductData] = useState({
    name: "",
    weight: "",
    price: "",
    sku: "",
    description: "",
    category: "",
    stock: ""
  });
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const fetchedProducts = await getAllProductCms();
        setProducts(fetchedProducts || []);
      } catch (err) {
        console.error('Failed to fetch products:', err);
        setError('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleFileChange = (file) => {
    setFile(file);
  };

  const handleCancel = () => {
    setProductData({
      name: "",
      weight: "",
      price: "",
      sku: "",
      description: "",
      category: "",
      stock: ""
    });
    setFile(null);
    setError(null);
    setSuccessMessage(null);
    setEditingProduct(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in productData) {
      formData.append(key, productData[key]);
    }
    if (file) {
      formData.append("photo", file);
    }

    try {
      if (editingProduct) {
        await editProductCms(editingProduct.id, formData);
        setSuccessMessage("Product updated successfully!");
      } else {
        await addProductCms(formData);
        setSuccessMessage("Product added successfully!");
      }
      setError(null);
      handleCancel(); // Reset form after successful submission
      const fetchedProducts = await getAllProductCms();
      setProducts(fetchedProducts || []);
    } catch (error) {
      setError("Error saving product. Please try again.");
      setSuccessMessage(null);
    }
  };

  const handleEdit = async (slug) => {
    try {
      const product = await getOneProductCms(slug);
      setProductData(product);
      setEditingProduct(product);
    } catch (error) {
      setError("Error fetching product details.");
    }
  };

  const handleDelete = async (slug) => {
    try {
      await deleteProductCms(slug);
      setSuccessMessage("Product deleted successfully!");
      const fetchedProducts = await getAllProductCms();
      setProducts(fetchedProducts || []);
    } catch (error) {
      setError("Error deleting product. Please try again.");
    }
  };

  const handleActivate = async (slug) => {
    try {
      await activatedProduct(slug);
      setSuccessMessage("Product status updated successfully!");
      const fetchedProducts = await getAllProductCms();
      setProducts(fetchedProducts || []);
    } catch (error) {
      setError("Error updating product status.");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md mt-8">
        <h2 className="text-2xl font-bold mb-6">
          {editingProduct ? "Edit Product" : "Add New Product"}
        </h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {successMessage && <div className="text-green-500 mb-4">{successMessage}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Product Name"
              name="name"
              value={productData.name}
              onChange={handleInputChange}
              className="w-full"
            />
            <Input
              label="Weight"
              name="weight"
              value={productData.weight}
              onChange={handleInputChange}
              className="w-full"
            />
            <Input
              label="Price"
              name="price"
              value={productData.price}
              onChange={handleInputChange}
              className="w-full"
            />
            <Input
              label="SKU"
              name="sku"
              value={productData.sku}
              onChange={handleInputChange}
              className="w-full"
            />
          </div>
          <Input
            label="Description"
            name="description"
            value={productData.description}
            onChange={handleInputChange}
            className="w-full"
          />
          <div className="flex flex-col items-center mb-6">
            <FileUpload onDrop={handleFileChange} />
          </div>
          <div className="flex justify-between space-x-4">
            <Button
              type="button"
              onClick={handleCancel}
              className="bg-red-500 text-white rounded px-4 py-2"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-green-500 text-white rounded px-4 py-2"
            >
              {editingProduct ? "Update" : "Save"}
            </Button>
          </div>
        </form>
      </div>
      <div className="w-full max-w-4xl grid grid-cols-3 gap-4 mt-8">
        {loading ? (
          <div>Loading...</div>
        ) : products.length === 0 ? (
          <div>No products available</div>
        ) : (
          products.map((product) => (
            <div key={product.id} className="bg-white p-4 rounded-lg shadow-md">
              <div className="font-bold">{product.name}</div>
              <div className="text-gray-600">{product.description}</div>
              <div className="flex justify-between mt-4">
                <Button
                  onClick={() => handleEdit(product.slug)}
                  className="bg-blue-500 text-white rounded px-4 py-2"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => handleDelete(product.slug)}
                  className="bg-yellow-500 text-white rounded px-4 py-2"
                >
                  Delete
                </Button>
                <Button
                  onClick={() => handleActivate(product.slug)}
                  className="bg-gray-500 text-white rounded px-4 py-2"
                >
                  Activate/Deactivate
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="flex justify-center mt-4">
        {/* Pagination controls */}
        <Button className="bg-gray-300 text-black rounded px-4 py-2">
          &lt;
        </Button>
        <span className="mx-2">1</span>
        <Button className="bg-gray-300 text-black rounded px-4 py-2">
          &gt;
        </Button>
      </div>
    </div>
  );
};

export default AddProductPage;
