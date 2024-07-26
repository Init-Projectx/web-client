"use client";

import { useState, useEffect } from "react";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import ProductCategories from "@/components/view/product/categories";

const ProductCategoriesPage = ({ params }) => {
  const { id } = params || {}; 

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (!id) {
    return <div>Loading...</div>;
  }

  return (
    <div>{loading ? <LoadingSpinner /> : <ProductCategories id={id} />}</div>
  );
};

export default ProductCategoriesPage;
