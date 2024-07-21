const Checkout = () => {
    return (
        <>
            <div className="flex flex-col mt-10 ms-10"> {/* Ubah flex-row menjadi flex-col */}
                <div className="flex flex-row mb-2">
                    <div className="w-3/4 h-20 shadow-lg rounded-lg flex justify-around items-center">
                        <div className="flex flex-row items-center poppins-bold">
                            Jokowi
                        </div>
                        <p>085880411321</p>
                        <p>Bekasi</p>
                    </div>
                    <div className="w-1/5 shadow-lg flex flex-col justify-center rounded-lg ms-10 me-10">
                        <h3 className="poppins-bold flex justify-center mb-5">Checkout Summary</h3>
                        <table className="mb-5 ms-5">
                            <tbody>
                                <tr>
                                    <td>product price</td>
                                    <td>Rp.xxx</td>
                                </tr>
                                <tr>
                                    <td>Shipping cost</td>
                                    <td>Rp.xxx</td>
                                </tr>
                                <tr>
                                    <td>tax</td>
                                    <td>Rp.xxx</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="border-t-2 border-t-slate-950 flex flex-col justify-center">
                            <table className="ms-5 me-8">
                                <tbody>
                                    <tr>
                                        <td colSpan={2} className="p-2 flex justify-between">
                                            <p>Total</p>
                                            <p>Rp.xxx</p>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="flex justify-center my-4">
                                <button type="button" className="w-4/6 focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900">Select Payment</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-3/4 shadow-lg rounded-lg flex flex-col p-4 mt-[-180px]"> {/* Tambahkan margin-top kecil di sini */}
                    <div className="flex justify-around flex-row items-center mb-4">
                        <div>
                            <img src="https://via.placeholder.com/50" alt="img" className="me-4" />
                        </div>
                        <div>
                            <p className="poppins-bold">Product Name</p>
                            <p className="flex justify-center">Switzal</p>
                        </div>
                        <div>
                            <p className="poppins-bold">Quantity</p>
                            <p className="flex justify-center">1</p>
                        </div>
                        <div>
                            <p className="poppins-bold">Initial Price</p>
                            <p className="flex justify-center">X Rp. xxxx</p>
                        </div>
                    </div>
                    <div className="flex justify-around flex-row items-center mb-4">
                        <div>
                            <img src="https://via.placeholder.com/50" alt="img" className="me-4" />
                        </div>
                        <div>
                            <p className="poppins-bold">Product Name</p>
                            <p className="flex justify-center">Switzal</p>
                        </div>
                        <div>
                            <p className="poppins-bold">Quantity</p>
                            <p className="flex justify-center">1</p>
                        </div>
                        <div>
                            <p className="poppins-bold">Initial Price</p>
                            <p className="flex justify-center">X Rp. xxxx</p>
                        </div>
                    </div>
                    <div className="flex justify-around flex-row items-center mb-4">
                        <div>
                            <img src="https://via.placeholder.com/50" alt="img" className="me-4" />
                        </div>
                        <div>
                            <p className="poppins-bold">Product Name</p>
                            <p className="flex justify-center">Switzal</p>
                        </div>
                        <div>
                            <p className="poppins-bold">Quantity</p>
                            <p className="flex justify-center">1</p>
                        </div>
                        <div>
                            <p className="poppins-bold">Initial Price</p>
                            <p className="flex justify-center">X Rp. xxxx</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Checkout;
