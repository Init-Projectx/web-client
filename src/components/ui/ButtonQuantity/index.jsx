"use client";

import { useState } from "react";

const ButtonQuantity = () => {
  const [quantity, setQuantity] = useState(1);

  const handleDecrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleIncrement = () => {
    setQuantity((prev) => (prev < 100 ? prev + 1 : 100));
  };

  return (
    <>
      <form className="max-w-xs flex items-center justify-center">
        <label
          htmlFor="quantity-input"
          className="block mb-2 text-sm font-medium text-black"
        ></label>
        <div className="relative flex items-center max-w-[8rem]">
          <button
            type="button"
            id="decrement-button"
            onClick={handleDecrement}
            className="bg-white  hover:bg-gray-200 border rounded-s-lg p-3 h-11 focus:outline-none"
          >
            <svg
              className="w-3 h-3 text-black"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 2"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h16"
              />
            </svg>
          </button>
          <input
            type="text"
            id="quantity-input"
            aria-describedby="helper-text-explanation"
            className="bg-white-50 border h-11 text-center text-sm block w-full py-2.5 focus:outline-none"
            placeholder="999"
            value={quantity}
            readOnly
          />
          <button
            type="button"
            id="increment-button"
            onClick={handleIncrement}
            className="bg-white  hover:bg-gray-200 border rounded-e-lg p-3 h-11 focus:outline-none"
          >
            <svg
              className="w-3 h-3 text-black"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 18"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 1v16M1 9h16"
              />
            </svg>
          </button>
        </div>
      </form>
    </>
  );
};

export default ButtonQuantity;
