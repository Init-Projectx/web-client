"use client";

import { useState } from "react";
import Input from "@/components/ui/Input";
import FileUpload from "@/components/ui/FileUpload";
import Button from "@/components/ui/Button";
import { addProductCms } from "@/modules/fetch/cms/fetchProductCms";
import Link from "next/link";

const AddProductPage = () => {
  const [productData, setProductData] = useState({
    name: "",
    weight: "",
    price: "",
    sku: "",
    description: "",
    category: "",
    category_id: "",
    stock: "",
  });
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
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
      category_id: "",
      stock: "",
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
      handleCancel();
    } catch (error) {
      setError("Error adding product. Please try again.");
      setSuccessMessage(null);
    }
  };

  return (
    <div className="flex">
      <div className="w-1/5 h-screen flex flex-col border px-3 py-5 bg-white fixed">
        <Link href={"/"}>
          <button className="w-full mt-10 flex items-center rounded-md hover:bg-gray-200">
            <img
              src="https://www.svgrepo.com/show/449701/dashboard.svg"
              className="mx-5 my-1 poppins-bold"
              alt=""
              width="25px"
              height="25px"
            />
            User Dashboard
          </button>
        </Link>
        <Link href={"/cms/add-product"}>
          <button className="w-full mt-7 flex items-center rounded-md hover:bg-gray-200">
            <img
              src="https://www.svgrepo.com/show/449762/gift.svg"
              className="mx-5 my-1 poppins-bold"
              alt=""
              width="25px"
              height="25px"
            />
            Add Product
          </button>
        </Link>
        <Link href={"/cms/confirmation"}>
          <button className="w-full mt-7 flex items-center rounded-md hover:bg-gray-200">
            <img
              src="https://www.svgrepo.com/show/449846/money-bill.svg"
              className="mx-5 my-1 poppins-bold"
              alt=""
              width="25px"
              height="25px"
            />
            <p>Payment</p>
          </button>
        </Link>
        <Link href={"/cms/orders"}>
          <button className="w-full mt-7 flex items-center rounded-md hover:bg-gray-200">
            <img
              src="https://www.svgrepo.com/show/449902/shopping-cart.svg"
              className="mx-5 my-1 poppins-bold"
              alt=""
              width="25px"
              height="25px"
            />
            Orders
          </button>
        </Link>
      </div>
      <div className="flex-1 ml-1/5 px-32 pl-[400px] bg-white mt-8">
        <h2 className="text-2xl font-bold mb-10 text-center">Add New Product</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {successMessage && (
          <div className="text-green-500 mb-4">{successMessage}</div>
        )}
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
              label="Category ID"
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
