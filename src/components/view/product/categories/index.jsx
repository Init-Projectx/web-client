"use client";

import CardProduct from "@/components/ui/CardProduct";
import { getProductCategory } from "@/modules/fetch/fetchUserProduct";
import Link from "next/link";
import { useEffect, useState } from "react";

const ProductCategories = ({ id }) => {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) {
        console.error("ID is not defined");
        return;
      }

      try {
        const data = await getProductCategory(id);
        setProduct(data.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchProduct();
  }, [id]);

  return (
    <div className="px-10">
      <div className="px-10 py-10 shadow-lg border mt-5 mb-5 rounded-lg">
        <h1 className="font-bold">Product Categories</h1> <hr />
        <div className="product-list grid lg:grid-cols-5 md:grid-cols-5 sm:grid-cols-5 gap-6 mt-8 text-xs md:text-sm sm:text-sm px-5 mb-16">
          {product.map((product) => (
            <Link href={`/product/${product.slug}`} key={product.id}>
              <CardProduct product={product} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCategories;
