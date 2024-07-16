import React from "react";
import Image from "next/image";

const CardProduct = ({ product }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 m-4">
      <Image
        src={product.image}
        alt={product.name}
        width={200}
        height={200}
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <h2 className="text-xl font-bold mt-4">{product.name}</h2>
      <p className="text-gray-700 mt-2">{product.description}</p>
      <p className="text-gray-900 font-bold mt-4">${product.price}</p>
    </div>
  );
};

export default CardProduct;
