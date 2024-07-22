import React from "react";
import Image from "next/image";

const CardProduct = ({ product}) => {
  return (
    <div
      className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer"
    >
      <div className="relative">
        <Image
          src={product.photo}
          alt={product.name}
          layout="responsive"
          width={400}
          height={250}
          className="object-cover rounded-md border-b-2 border-orange-400"
        />
      </div>
      <div className="p-4">
        <h2 className="font-bold mb-2">{product.name}</h2>
        <p className="text-gray-700 mb-4 text-sm">{product.description}</p>
        <div className="flex items-center justify-between">
          <p className="text-gray-900 font-bold">Rp. {product.price}</p>
        </div>
      </div>
    </div>
  );
};

export default CardProduct;
