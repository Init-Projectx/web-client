"use client";

import { useEffect, useState } from "react";
import Input from "@/components/ui/Input";
import FileUpload from "@/components/ui/FileUpload";
import Button from "@/components/ui/Button";
import { addProductCms } from "@/modules/fetch/cms/fetchProductCms";
import Link from "next/link";
import { searchCities } from "@/modules/fetch/fetchCity";
import { getAllCategories } from "@/modules/fetch/fetchCategories";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";

const AddProductPage = () => {
  const [productData, setProductData] = useState({
    name: "",
    weight: "",
    price: "",
    sku: "",
    city: "",
    description: "",
    category: "",
    category_id: "",
    stock: "",
  });
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [city, setCity] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cityResponse = await searchCities(searchQuery);
        if (Array.isArray(cityResponse)) {
          const cityOptions = cityResponse.map((city) => ({
            value: city.name,
            label: city.name,
          }));
          setCity(cityOptions);
        } else {
          setCity([]);
        }

        const categoryResponse = await getAllCategories();
        if (Array.isArray(categoryResponse.data)) {
          const categoryOptions = categoryResponse.data.map((category) => ({
            value: category.id,
            label: category.name,
          }));
          setCategories(categoryOptions);
        } else {
          setCategories([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
        setCity([]);
        setCategories([]);
      }
    };

    fetchData();
  }, [searchQuery]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCityChange = (selectedOption) => {
    setProductData((prevData) => ({
      ...prevData,
      city: selectedOption ? selectedOption.value : "",
    }));
  };

  const handleCityInputChange = (inputValue) => {
    setSearchQuery(inputValue);
  };

  const handleCategoryChange = (selectedOption) => {
    setProductData((prevData) => ({
      ...prevData,
      category_id: selectedOption ? selectedOption.value : "",
      category: selectedOption ? selectedOption.label : "",
    }));
  };

  const handleFileChange = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  };

  const handleCancel = () => {
    setProductData({
      name: "",
      weight: "",
      price: "",
      sku: "",
      city: "",
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
      toast.success("Product added successfully!");
      setError(null);
      handleCancel();
    } catch (error) {
      setError("Error adding product. Please try again.");
      toast.error("Error adding product. Please try again.");
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
        <h2 className="text-2xl font-bold mb-10 text-center">
          Add New Product
        </h2>
        <ToastContainer />
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
            <div>
              <label>Category</label>
              <Select
                options={categories}
                value={categories.find(
                  (option) => option.value === productData.category_id
                )}
                onChange={handleCategoryChange}
                className="w-full mt-1"
                placeholder="Select a category"
                isSearchable
              />
            </div>
            <div>
              <label>City</label>
              <Select
                options={city}
                value={city.find((option) => option.value === productData.city)}
                onChange={handleCityChange}
                onInputChange={handleCityInputChange}
                className="w-full mt-1"
                placeholder="Select a city"
                isSearchable
              />
            </div>
          </div>
          <div className="w-full">
            <Input
              label="Description"
              name="description"
              value={productData.description}
              onChange={handleInputChange}
              className="w-full"
            />
          </div>
          <div className="flex flex-col items-center mb-6">
            <FileUpload onDrop={handleFileChange} className={"w-full"} />
          </div>
          <div className="flex justify-evenly px-40">
            <Button
              type="button"
              onClick={handleCancel}
              className="bg-yellow-100 text-yellow-600 rounded px-4 py-2 hover:bg-yellow-200"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-yellow-500 text-white rounded px-4 py-2 hover:bg-yellow-600"
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
