"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Button from "../Button";
import Form from "../Form";
import Input from "../Input";
import {
  editProductCms,
  deleteProductCms,
  activatedProduct,
} from "@/modules/fetch/cms/fetchProductCms";
import { useDropzone } from "react-dropzone";

const CardProductCms = ({ product }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editedProduct, setEditedProduct] = useState(product);
  const [image, setImage] = useState(null);
  const modalRef = useRef(null);

  const handleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleEditModal = () => {
    setIsEditModalVisible(!isEditModalVisible);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setImage(file);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", editedProduct.name);
      formData.append("description", editedProduct.description);
      formData.append("price", editedProduct.price);
      formData.append("weight", editedProduct.weight);
      formData.append("sku", editedProduct.sku);
      formData.append("status", editedProduct.status);
      formData.append("category_id", editedProduct.category_id);
      if (image) {
        formData.append("photo", image);
      }

      await editProductCms(product.slug, formData);
      setIsEditModalVisible(false);
      alert("Edit product success");
      window.location.reload();
    } catch (error) {
      console.log("Failed to edit product", error.message);
    }
  };

  const handleDelete = async () => {
    try {
      const data = await deleteProductCms(product.slug);
      setIsModalVisible(false);
      alert("Delete product success");
      window.location.reload();
    } catch (error) {
      console.log("Failed to delete product", error.message);
    }
  };

  const hanldeActivated = async () => {
    try {
      const activated = await activatedProduct(product.slug);
      alert("Activated product success");
      window.location.reload();
    } catch (error) {
      console.log("Failed to activated product", error.message);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleDrop,
  });

  return (
    <div>
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
          <div>
            {product.status === "inactive" ? (
              <Button
                children={"Activated Product"}
                onClick={hanldeActivated}
                className={
                  "bg-yellow-500 hover:bg-yellow-600 text-white w-full mt-3"
                }
              />
            ) : (
              <div className="grid grid-cols-2 text-sm gap-3 mt-4">
                <Button
                  children={"Edit"}
                  onClick={handleEditModal}
                  className={
                    "bg-yellow-200 hover:bg-yellow-300 text-yellow-500"
                  }
                />
                <Button
                  children={"Delete"}
                  onClick={handleModal}
                  className={"bg-yellow-500 hover:bg-yellow-300 text-white"}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {isEditModalVisible && (
        <div
          ref={modalRef}
          className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50"
          aria-modal="true"
          role="dialog"
        >
          <div className="bg-white p-8 rounded-lg z-50 w-4/5 md:w-3/4 lg:w-1/2">
            <h2 className="text-lg font-bold mb-7 text-center">Edit Product</h2>
            <Form onSubmit={handleEditSubmit}>
              <Input
                name="name"
                value={editedProduct.name}
                onChange={handleInputChange}
                placeholder="Product Name"
              />
              <Input
                name="description"
                value={editedProduct.description}
                onChange={handleInputChange}
                placeholder="Product Description"
              />
              <Input
                name="price"
                value={editedProduct.price}
                onChange={handleInputChange}
                placeholder="Product Price"
              />
              <div
                {...getRootProps()}
                className="mt-4 p-4 border-dashed border-2 border-gray-300 rounded-lg cursor-pointer"
              >
                <input {...getInputProps()} />
                <div className="flex items-center justify-center">
                  {image ? (
                    <Image
                      src={URL.createObjectURL(image)}
                      alt="Product Image"
                      width={100}
                      height={100}
                      className="object-cover rounded-md"
                    />
                  ) : (
                    <p className="text-center text-gray-500">
                      Drag 'n' drop an image here, or click to select one
                    </p>
                  )}
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  onClick={handleEditModal}
                  className="px-4 py-2 mr-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-500 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                >
                  Save Changes
                </button>
              </div>
            </Form>
          </div>
        </div>
      )}

      {isModalVisible && (
        <div
          ref={modalRef}
          className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50"
          aria-modal="true"
          role="dialog"
        >
          <div className="bg-white p-4 rounded-lg z-50">
            <h2 className="text-lg font-bold mb-4">Confirmation</h2>
            <p className="mb-4">
              Are you sure you want to delete this product?
            </p>
            <div className="flex justify-end mt-6">
              <button
                onClick={handleModal}
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
