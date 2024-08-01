"use client";

import { useState } from "react";
import Input from "@/components/ui/Input";
import FileUpload from "@/components/ui/FileUpload";
import Button from "@/components/ui/Button";
import { addProductCms } from "@/modules/fetch/cms/fetchProductCms";

const AddProductPage = () => {
  const [productData, setProductData] = useState({
    name: "",
    weight: "",
    price: "",
    sku: "",
    description: "",
    category: "",
    category_id: "",  // Tambahkan category_id di sini
    stock: ""
  });
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleFileChange = (acceptedFiles) => {
    setFile(acceptedFiles[0]);
  };

  const handleCancel = () => {
    setProductData({
      name: "",
      weight: "",
      price: "",
      sku: "",
      description: "",
      category: "",
      category_id: "",  // Reset category_id juga
      stock: ""
    });
    setFile(null);
    setError(null);
    setSuccessMessage(null);
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
      const response = await addProductCms(formData);
      setSuccessMessage("Product added successfully!");
      setError(null);
      handleCancel(); // Reset form after successful submission
    } catch (error) {
      setError("Error adding product. Please try again.");
      setSuccessMessage(null);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md mt-8">
        <h2 className="text-2xl font-bold mb-6">Add New Product</h2>
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
            <Input
              label="Category ID"  // Tambahkan input untuk category_id
              name="category_id"
              value={productData.category_id}
              onChange={handleInputChange}
              className="w-full"
            />
            <Input
              label="Description"
              name="description"
              value={productData.description}
              onChange={handleInputChange}
              className="w-full"
            />
          </div>
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
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductPage;
