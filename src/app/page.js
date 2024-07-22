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

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getAllCategories();
        setCategories(data.data);
      } catch (error) {
        console.error("Error fetching categories:", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts(currentPage);
        setProducts(data.data);
        setTotalPages(data.data.totalPages);
      } catch (error) {
        console.error("Error fetching products:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setLoading(true);
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
            <div className="product-list grid lg:grid-cols-6 gap-6 mt-8">
              {categories.map((category) => (
                <Link href={`/categories/${category.id}`} key={category.id}>
                  <CardCategory category={category} />
                </Link>
              ))}
            </div>
            <div className="mt-10">
              <h3 className="text-xl font-bold text-color-dark">Product List</h3>
              <div className="product-list grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-6 mt-8">
                {products.map((product) => (
                  <Link href={`/product/${product.slug}`} key={product.id}>
                      <CardProduct product={product} />
                  </Link>
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
    </div>
  );
}
