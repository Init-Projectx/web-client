// src/components/ui/ProductDetail/index.jsx
const ProductDetail = () => {
  return (
    <div className="w-full sm:w-1/2 md:w-2/3 lg:w-3/4 p-4 mt-20">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Product name</h2>
        <p>Stock: stock</p>
        <p>Harga: harga</p>
        <div className="flex items-center my-4">
          <span>Quantity: </span>
          <div className="flex ml-2">
            <button className="px-2 py-1 border">-</button>
            <input type="text" value="1" readOnly className="px-2 py-1 border text-center w-12"/>
            <button className="px-2 py-1 border">+</button>
          </div>
        </div>
        <p className="text-lg font-bold">Total harga: Rp. xxxx</p>
        <div className="flex mt-4">
          <button className="bg-yellow-400 text-white px-4 py-2 rounded mr-2">Add to cart</button>
          <button className="bg-yellow-500 text-white px-4 py-2 rounded">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
