"use client";

import { getProductCategory } from "@/modules/fetch/fetchUserProduct";
import Image from "next/image";
import { useEffect, useState } from "react";
import CardProduct from "../CardProduct";
import Link from "next/link";
import idrConverter from "@/libs/idrConvert";

const DetailsProduct = ({ product, onAddToCart, onBuyNow }) => {
  const [productCategory, setProductCategory] = useState([]);
  const [error, setError] = useState(null);
  const [warehouseId, setWarehouseId] = useState(null);

  useEffect(() => {
    if (product.Product_Warehouses.length > 0) {
      const id = product.Product_Warehouses[0].warehouse_id;
      if (id) {
        setWarehouseId(id);
      }
    }
  }, [product]);

  useEffect(() => {
    if (warehouseId) {
      const fetchProduct = async () => {
        try {
          const data = await getProductCategory(warehouseId);
          setProductCategory(data.data);
        } catch (error) {
          setError("Failed to fetch product");
        }
      };

      fetchProduct();
    }
  }, [warehouseId]);

  const isOutOfStock = product.Product_Warehouses.length === 0;

  return (
    <div className="px-12 mb-12">
      <div className="flex flex-col md:flex-row gap-4 p-4 mb-5">
        <div className="w-full md:w-1/3 flex justify-center items-center">
          <div className="relative w-full h-80 border rounded-lg shadow-lg overflow-hidden">
            <Image
              src={product.photo}
              alt={product.name}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
        </div>
        <div className="w-full md:w-2/3 flex flex-col bg-white border rounded-lg shadow-lg p-4 mt-4">
          <h1 className="text-2xl font-bold mb-6 text-center">
            {product.name}
          </h1>
          <div className="mb-4 grid grid-cols-2 ml-8 text-center">
            <span className="font-semibold ">Stock </span>
            <span className="font-bold">
              {isOutOfStock ? "Habis" : product.Product_Warehouses[0].stock}
            </span>
          </div>
          <div className="mb-4 grid grid-cols-2 ml-8 text-center">
            <span className="font-semibold ">Harga </span>
            <span className="font-bold">{idrConverter(product.price)}</span>
          </div>
          <div className="mb-4 grid grid-cols-2 ml-8 text-center">
            <span className="font-semibold ">Weight </span>
            <span className="font-bold">{product.weight} gram</span>
          </div>
          <div className="mb-12 grid grid-cols-2 ml-8 text-center">
            <span className="font-semibold ">Descirption Product </span>
            <span className="font-bold">{product.description}</span>
          </div>
          <div className="flex gap-4">
            <button
              className={`w-full py-2 rounded-md ${
                isOutOfStock
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-amber-500 hover:bg-amber-300 text-white"
              }`}
              onClick={onAddToCart}
              disabled={isOutOfStock}
            >
              +Add to Cart
            </button>
          </div>
        </div>
      </div>
      <div className="shadow-lg rounded-lg border-t">
        <h1 className="ml-9 mt-5 font-bold text-xl">Same Category Products</h1>
        <hr />
        <div className="product-list grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-6 mt-8 px-10 py-5">
          {error ? (
            <div>
              <h1 className="font-bold text-xl">{error}</h1>
            </div>
          ) : productCategory.length === 0 ? (
            <div className="w-full">
              <h1 className="font-bold">Product Not Found</h1>
            </div>
          ) : (
            productCategory.map((item) => (
              <Link href={`/product/${item.slug}`} key={item.id}>
                <CardProduct product={item} />
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailsProduct;
