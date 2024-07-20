import ButtonQuantity from "@/components/ui/ButtonQuantity";
import { FaRegTrashAlt } from "react-icons/fa";

const Cart = () => {
    return (
        <div className="flex flex-row justify-around mt-5">
            <div className="w-2/3">
                <table className="min-w-full border">
                    <thead className="bg-yellow-500">
                        <tr>
                            <th className="p-2 poppins-bold text-lg">Cart</th>
                            <th className="p-2 poppins-bold text-lg">Product</th>
                            <th className="p-2 poppins-bold text-lg">Quantity</th>
                            <th className="p-2 poppins-bold text-lg">Price</th>
                            <th className="p-2 poppins-bold text-lg">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="shadow-lg">
                            <td className="p-2 flex justify-center">
                                <img src="https://cdn-icons-png.flaticon.com/128/679/679922.png" alt="Product Image" width="80px" height="80px" />
                            </td>
                            <td className="p-2">
                                <div className="flex flex-col">
                                    <h4 className="flex justify-center">Title Product</h4>
                                    <h4 className="flex justify-center">short description</h4>
                                </div>
                            </td>
                            <td className="p-2">
                                <ButtonQuantity/>
                            </td>
                            <td className="p-2">
                                <p className="poppins-bold flex justify-center">Rp.75.000</p>
                            </td>
                            <td className="p-2">
                                <button type="reset">
                                    <FaRegTrashAlt className="w-[30px] h-[30px] ms-7"/>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="w-1/3 ml-5">
                <div className="shadow-lg p-5 bg-white">
                    <h3 className="font-bold mb-5 flex justify-center">Checkout Summary</h3>
                    <div className="flex justify-between mb-2">
                        <span className="poppins-bold">Product name</span>
                        <span className="poppins-bold">Quantity</span>
                    </div>
                    <table className="w-full">
                        <tbody>
                            <tr>
                                <td className="p-2">Shampoo Pantene</td>
                                <td className="p-2 flex justify-center">x1</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="mb-2">
                        <span>Warehouse</span>
                        <select className="w-full mt-1 border rounded p-1 focus:outline-none">
                            <option>Select</option>
                            <option>Select1</option>
                            <option>Select2</option>
                        </select>
                    </div>
                    <div className="mb-2">
                        <span>Courier</span>
                        <select className="w-full mt-1 border rounded p-1 focus:outline-none">
                            <option>Select</option>
                        </select>
                    </div>
                    <div className="mb-2">
                        <span>Shipping method</span>
                        <select className="w-full mt-1 border rounded p-1 focus:outline-none">
                            <option>Select</option>
                        </select>
                    </div>
                    <div className="flex justify-between mt-5 font-bold">
                        <span>Total product price</span>
                        <span>Rp. xxx</span>
                    </div>
                    <button className="bg-yellow-500 mt-5 w-full py-2 rounded text-white hover:bg-yellow-600 hover:shadow-lg transition duration-300 ease-in-out">
                        Checkout
                        </button>

                </div>
            </div>
        </div>
    );
};

export default Cart;
