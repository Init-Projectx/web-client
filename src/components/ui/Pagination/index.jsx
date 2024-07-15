import React from "react";

const Pagination = ({ pageCount, onPageChange }) => {
  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);

  return (
    <div className="flex justify-center mt-8">
      {pages.map((page) => (
        <button
          key={page}
          className="mx-1 px-3 py-1 bg-white border border-gray-300 rounded-md hover:bg-gray-200"
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
