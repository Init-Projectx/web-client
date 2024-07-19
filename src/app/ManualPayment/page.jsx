"use client";

import Input from "@/components/ui/Input";
import styles from "./userProfile.module.css"
import FileUpload from "@/components/ui/FileUpload";


const ManualPayment = () => {
    return (
        <>
            <h1 className="text-2xl my-20 ms-10 flex justify-center poppins-semibold">Bank Transfer</h1>
            <div className="flex justify-center">
                <form>
                    <div className="w-[85rem] h-[40rem] shadow-lg bg-white mb-10">
                        <div className="content flex flex-row justify-around">
                            <div className="bankname">
                                <p className="poppins-semibold mb-10">Bank</p>
                                <p className="mb-8">BRI</p>
                                <p className="mb-8">BNI</p>
                                <p className="mb-8">BCA</p>
                                <p className="mb-4">MANDIRI</p>
                            </div>
                            <div className="accountnumber ms-[10rem] me-[rem]">
                                <p className="poppins-semibold mb-7
                                ">Account Number</p>
                                <Input className={styles.input}/>
                                <Input className={styles.input}/>
                                <Input className={styles.input}/>
                                <Input/>
                            </div>
                            <div>
                                <p className="poppins-semibold">Tutorial</p>
                                <p>Step 1: choose your bank</p>
                                <p>Step 2: input your account number</p>
                                <p>Step 3: upload your transaction proof</p>
                                <p>Step 4: Click Submit</p>
                                <p>Step 5: Wait for admin verify</p>
                            </div>
                        </div>
                        <div className="w-[85rem] h-[5rem] mt-10">
                            <div className="flex justify-center">
                                <FileUpload className="w-[45rem] ms-40 h-[10rem] flex justify-center"/>
                            </div>
                            <div className="flex justify-center mt-6">
                                <button type="submit" className="w-[15rem] text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center ms-20 me-2 mb-2 dark:focus:ring-yellow-900">Submit</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    
    );
}

export default ManualPayment;
