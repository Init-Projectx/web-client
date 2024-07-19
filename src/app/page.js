"use client";

import Hero from "@/components/layout/hero";
import CardCategory from "@/components/ui/CardCategory";
import CardProduct from "@/components/ui/CardProduct";
import Modal from "@/components/ui/Modal";
import Pagination from "@/components/ui/Pagination";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Dropdown from "@/components/ui/Dropdown";
import Form from "@/components/ui/Form";
import Input from "@/components/ui/Input";
import FileUpload from "@/components/ui/FileUpload";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import Head from "next/head";
import { useState, useEffect } from "react";
import Image from "next/image";
import { getUser } from "@/modules/fetch/fetchUser"
import { findOneCart } from "@/modules/fetch/fetchCart";
import fashion from "@/assets/images/fashion.png";
import food from "@/assets/images/food.png";
import healthy from "@/assets/images/healthy.png";
import feeding from "@/assets/images/feeding.png";
import equipment from "@/assets/images/equipment.png";
import toys from "@/assets/images/toys.png";

export default function Home() {
  const [userId, setUserId] = useState(null);
  const [products, setProducts] = useState([]);
  const [pageCount, setPageCount] = useState(10);
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const decodedToken = jwtDecode(token);
        const getUserId = decodedToken.id;
        try {
          const userData = await getUser(getUserId);
          setUserId(userData.id);
        } catch (err) {
          console.error(err.message);
        }
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (userId) {
      const fetchCartData = async () => {
        try {
          const cartData = await findOneCart(userId);
          setCart(cartData?.data);
        } catch (error) {
          setError(error.message);
        }
      };

      fetchCartData();
    }
  }, [userId]);

  useEffect(() => {
    // Simulasikan pemuatan data
    setTimeout(() => {
      setProducts([
        {
          id: 1,
          name: "Product 1",
          description: "Description 1",
          image: "/assets/images/baju-anak.jpg",
          price: 100,
        },
        {
          id: 2,
          name: "Product 2",
          description: "Description 2",
          image: "/assets/images/baju-anak.jpg",
          price: 200,
        },
        {
          id: 3,
          name: "Product 3",
          description: "Description 3",
          image: "/assets/images/baju-anak.jpg",
          price: 200,
        },
        {
          id: 2,
          name: "Product 2",
          description: "Description 2",
          image: "/assets/images/baju-anak.jpg",
          price: 200,
        },
        {
          id: 2,
          name: "Product 2",
          description: "Description 2",
          image: "/assets/images/baju-anak.jpg",
          price: 200,
        },
        {
          id: 2,
          name: "Product 2",
          description: "Description 2",
          image: "/assets/images/baju-anak.jpg",
          price: 200,
        },
      ]);
      setCategories([
        { name: "fashion", image: fashion },
        { name: "food", image: food },
        { name: "healthy", image: healthy },
        { name: "toys", image: toys },
        { name: "feeding", image: feeding },
        { name: "image", image: equipment },
      ]);
      setLoading(false);
    }, 2000); // Simulasikan waktu pemuatan
  }, []);

  const handlePageChange = (selectedItem) => {
    // Logika untuk perubahan halaman
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    // Logika untuk perubahan kategori
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted with data:", formData);
  };

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulasikan pemuatan data
    setTimeout(() => {
      setProducts([
        {
          id: 1,
          name: "Product 1",
          description: "Description 1",
          image: "/path/to/image1.jpg",
          price: 100,
        },
        {
          id: 2,
          name: "Product 2",
          description: "Description 2",
          image: "/path/to/image2.jpg",
          price: 200,
        },
      ]);
      setCategories([
        { name: "fashion", image: fashion },
        { name: "food", image: food },
        { name: "healthy", image: healthy },
        { name: "toys", image: toys },
        { name: "feeding", image: feeding },
        { name: "image", image: equipment },
      ]);
      setLoading(false);
    }, 2000); // Simulasikan waktu pemuatan
  }, []);

  const handlePageChange = (selectedItem) => {
    // Logika untuk perubahan halaman
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    // Logika untuk perubahan kategori
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted with data:", formData);
  };

  const handleFileDrop = (acceptedFiles) => {
    console.log("Files uploaded:", acceptedFiles);
  };

  return (
    <div className="flex flex-col md:px-24 px-10 py-[5.5rem]">
      <Head>
        <title>MiniMiracle</title>
      </Head>
      {loading ? (
        <LoadingSpinner size="large" color="blue" className="mt-8" />
      ) : (
        <>
          <Hero />
          <div>
            <div className="bg-primaryColor flex gap-5 border rounded-md border-color-gray-300 shadow-md mb-8 mt-14 px-5 pt-8 pb-10">
              <h3 className="text-xl font-bold text-color-dark">
                Browse By Category
              </h3>
            </div>
            {/* <Dropdown
            options={categories.map((cat) => cat.name)}
            onChange={handleCategoryChange}
            className="mb-4"
          /> */}
            <div className="product-list grid lg:grid-cols-6 gap-6 mt-8">
              {categories.map((category) => (
                <CardCategory key={category.name} category={category} />
              ))}
            </div>
          </div>
          <div className="product-list grid lg:grid-cols-4 gap-6 mt-8">
            {products.map((product) => (
              <CardProduct key={product.id} product={product} />
            ))}
          </div>
          <Pagination pageCount={pageCount} onPageChange={handlePageChange} />
          {/* <Button
          <Button
            className="mt-4 bg-blue-500 text-white rounded"
            onClick={() => setIsModalOpen(true)}
          >
            Open Modal
          </Button> */}
          {/* <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          </Button>
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <Form onSubmit={handleFormSubmit} className="space-y-4">
              <Input
                label="Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
              <Input
                label="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
              <FileUpload onDrop={handleFileDrop} className="mt-4" />
              <Button
                type="submit"
                className="mt-4 bg-green-500 text-white rounded"
              >
                Submit
              </Button>
            </Form>
          </Modal> */}
          </Modal>
        </>
      )}
    </div>
  );
}
