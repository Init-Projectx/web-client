import React from "react";
import Image from "next/image";
import fashion from "@/assets/images/fashion.png";
import food from "@/assets/images/food.png";
import healthy from "@/assets/images/healthy.png";
import feeding from "@/assets/images/feeding.png";
import equipment from "@/assets/images/equipment.png";
import toys from "@/assets/images/toys.png";

// Objek gambar kategori
const categoryImages = {
  fashion,
  food,
  healthy,
  feeding,
  equipment,
  toys
};

const CardCategory = ({ category }) => {
  // Mendapatkan gambar sesuai kategori
  const imageSrc = categoryImages[category.name.toLowerCase()] || categoryImages.default;

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 m-4 hover:bg-primaryColor">
      <Image
        src={imageSrc}
        alt={category.name}
        width={100}
        height={100}
        className="object-cover rounded-t-lg"
      />
      <h2 className="text-xl text-center font-bold mb-2">{category.name}</h2>
    </div>
  );
};

export default CardCategory;
