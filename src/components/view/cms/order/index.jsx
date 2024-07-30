"use client";

const CmsOrder = () => {

    

    return(
        <>
            <div className="flex justify-center">
                <div className="w-full flex flex-col my-1">
                <form action="">
                    <div className="w-5/6 border-2 border-slate-950 rounded-lg h-[4rem] flex items-center justify-evenly mx-auto my-3">
                    <p>Username</p>
                    <p>1x Product Name</p>
                    <button
                        type="submit"
                        className="w-[5rem] h-[1.5rem] bg-yellow-300 rounded-md hover:bg-yellow-600"
                    >
                        <p className="hover:text-stone-50 h-[1.5rem] rounded-md">Reject</p>
                    </button>
                    <button
                        type="submit"
                        className="w-[5rem] h-[1.5rem] bg-yellow-500 rounded-md hover:bg-yellow-300"
                    >
                        Approve
                    </button>
                    </div>
                </form>
                </div>
            </div>
        </>
    )
}

export default CmsOrder;