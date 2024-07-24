import Dashboard from "@/components/view/cms/dashboard";

const LayoutDashboard = () => {
    return (
        <>
            <div className="h-full flex flex-row">
            <div className="w-1/5 h-6/6 flex flex-col shadow-lg px-3">
                <button className="w-full mt-10 flex items-center rounded-md hover:bg-gray-200">
                    <img src="https://www.svgrepo.com/show/449701/dashboard.svg" className="mx-5 my-1 poppins-bold" alt="" width="25px" height="25px" />
                    User Dashboard
                </button>
                <button className="w-full mt-7 flex items-center rounded-md hover:bg-gray-200">
                    <img src="https://www.svgrepo.com/show/449762/gift.svg" className="mx-5 my-1 poppins-bold" alt="" width="25px" height="25px" />
                    Add Product
                </button>
                <button className="w-full mt-7 flex items-center rounded-md hover:bg-gray-200">
                    <img src="https://www.svgrepo.com/show/449846/money-bill.svg" className="ms-5 my-1 poppins-bold" alt="" width="25px" height="25px" />
                    <p className="ms-1">Payment Confirmation</p>
                </button>
                <button className="w-full mt-7 flex items-center rounded-md hover:bg-gray-200">
                    <img src="https://www.svgrepo.com/show/449902/shopping-cart.svg" className="mx-5 my-1 poppins-bold" alt="" width="25px" height="25px" />
                    Orders
                </button>
            </div>
            <div className="w-full product-list grid lg:grid-cols-5 md:grid-cols-5 sm:grid-cols-5 gap-6 mx-10 my-8 text-xs md:text-sm sm:text-sm">
                <Dashboard />
                <Dashboard />
                <Dashboard />
                <Dashboard />
                <Dashboard />
                <Dashboard />
                <Dashboard />
                <Dashboard />
                <Dashboard />
                <Dashboard />
                <Dashboard />
                <Dashboard />
                <Dashboard />
                <Dashboard />
                <Dashboard />
                <Dashboard />
                <Dashboard />
                <Dashboard />
                <Dashboard />
                <Dashboard />
                <Dashboard />
                <Dashboard />
                <Dashboard />
                <Dashboard />
                <Dashboard />
                <Dashboard />
                <Dashboard />
                <Dashboard />
                <Dashboard />
                <Dashboard />
                <Dashboard />
                <Dashboard />
                <Dashboard />
                <Dashboard />
                <Dashboard />
                <Dashboard />
                <Dashboard />
                <Dashboard />
                <Dashboard />
                <Dashboard />
                <Dashboard />
                <Dashboard />
                <Dashboard />
                <Dashboard />
                <Dashboard />
                <Dashboard />
                <Dashboard />
                <Dashboard />
                <Dashboard />
                <Dashboard />
                <Dashboard />
                <Dashboard />
                <Dashboard />
                <Dashboard />
                <Dashboard />
            </div>
        </div>
        </>
    );
}

export default LayoutDashboard;
