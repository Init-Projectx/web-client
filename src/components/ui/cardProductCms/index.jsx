"use client";

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import Button from '../Button';

const CardProductCms = ({ product }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const modalRef = useRef(null);

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const handleDeleteClick = () => {
    setIsModalVisible(true);
  };

  const handleDelete = () => {
    // Logic for deleting the product goes here
    console.log('Product deleted:', product.id);
    handleModalClose();
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer border text-sm">
      <div className="relative">
        <Image
          src={product.photo}
          alt={product.name}
          layout="responsive"
          width={450}
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
        <div className="grid grid-cols-2 text-sm gap-3 mt-4 text-white">
          <Button children={'Edit'} onClick={() => {}} className={'bg-yellow-500 hover:bg-yellow-300'} />
          <Button children={'Delete'} onClick={handleDeleteClick} className={'bg-red-600 hover:bg-red-500'} />
        </div>
      </div>

      {isModalVisible && (
        <div
          ref={modalRef}
          className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50"
          aria-modal="true"
          role="dialog"
        >
          <div className="bg-white p-4 rounded-lg z-50">
            <h2 className="text-lg font-bold mb-4">Confirmation</h2>
            <p className="mb-4">Are you sure you want to delete this product?</p>
            <div className="flex justify-end mt-6">
              <button
                onClick={handleModalClose}
                className="px-4 py-2 mr-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-500 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardProductCms;
