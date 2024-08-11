'use client'

import React, { useState, useEffect } from "react";
import Hero from "@/components/layout/hero";
import CardCategory from "@/components/ui/CardCategory";
import Pagination from "@/components/ui/Pagination";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import Head from "next/head";
import { getAllProducts } from "@/modules/fetch/fetchUserProduct";
import { getAllCategories } from "@/modules/fetch/fetchCategories";
import Link from "next/link";
import CardProduct from "@/components/ui/CardProduct";
import { toast, ToastContainer } from "react-toastify";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [categoriesData, productsData] = await Promise.all([
          getAllCategories(),
          getAllProducts(currentPage),
        ]);

        setCategories(categoriesData.data);
        setProducts(productsData.data);
        setTotalPages(productsData.data.totalPages);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleProductClick = (slug) => {
    const token = localStorage.getItem('token');

    if (token) {
      window.location.href = `/product/${slug}`;
    } else {
      toast.error('You Must Login First')
    }
  }

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
            <div className="product-list grid lg:grid-cols-6 gap-6 mt-8">
              {categories.map((category) => (
                <Link href={`product/categories/${category.id}`} key={category.id}>
                  <CardCategory category={category} />
                </Link>
              ))}
            </div>
            <div className="mt-10">
              <h3 className="font-bold text-color-dark">Product List</h3>
              <div className="product-list grid lg:grid-cols-5 md:grid-cols-5 sm:grid-cols-5 gap-6 mt-8 text-xs md:text-sm sm:text-sm">
                {products.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => handleProductClick(product.slug)}
                    className="cursor-pointer"
                  >
                    <CardProduct product={product} />
                  </div>
                ))}
              </div>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </>
      )}
      <ToastContainer />
    </div>
  );
}
