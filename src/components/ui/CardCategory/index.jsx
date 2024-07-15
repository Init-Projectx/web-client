import React from "react";
import Image from "next/image";

const CardCategory = ({ category }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 m-4 hover:bg-primaryColor">
      <Image
        src={category.image}
        alt={category.name}
        width={100}
        height={100}
        className="flex w-auto h-auto object-cover rounded-t-lg"
      />
      <h2 className="text-xl text-center font-bold mb-2 ">{category.name}</h2>
    </div>
  );
};

export default CardCategory;
