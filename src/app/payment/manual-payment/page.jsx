"use client";

import Input from "@/components/ui/Input";
import styles from "./manualPayment.module.css";
import FileUpload from "@/components/ui/FileUpload";
import Button from "@/components/ui/Button";

const ManualPayment = () => {
  return (
    <div>
      <div className="border mx-7 my-7 shadow rounded-lg">
        <h1 className="text-2xl text-center py-5 px-5 mb-5 flex justify-center poppins-semibold">
          Bank Transfer
        </h1>
        <div>
          <div className="content flex flex-row justify-around">
            <div className="grid grid-rows-5 gap-2 items-center justify-center">
              <p className="poppins-semibold mb-10">Bank</p>
              <p className="mb-5">BRI</p>
              <p className="mb-5">BNI</p>
              <p className="mb-5">BCA</p>
              <p className="mb-4">MANDIRI</p>
            </div>
            <div className="grid grid-rows-5 gap-2 items-center justify-center">
              <p
                className="poppins-semibold mb-10
                                "
              >
                Account Number
              </p>
              <div className={styles.input}>99999999999</div>
              <div className={styles.input}>99999999999</div>
              <div className={styles.input}>99999999999</div>
              <div className={styles.input}>99999999999</div>
            </div>
            <div className="ml-4">
              <p className="poppins-semibold mb-3">Manual Payment Guide</p>
              <p className="mb-2">
                <span className="font-semibold">Step 1:</span> Choose a bank
                account number from the list.
              </p>
              <p className="mb-2">
                <span className="font-semibold">Step 2:</span> Transfer funds to
                the selected account.
              </p>
              <p className="mb-2">
                <span className="font-semibold">Step 3:</span> Upload a proof of
                transfer.
              </p>
              <p className="mb-2">
                <span className="font-semibold">Step 4:</span> Click the button
                below to send your proof of payment via WhatsApp.
              </p>
              <p className="mb-8">
                <span className="font-semibold">Step 5:</span> Wait for admin
                verification.
              </p>

              <Button
                onClick={() =>
                  (window.location.href =
                    "https://wa.me/+6285770411320")
                }
                className="bg-yellow-500 hover:bg-yellow-600 text-white w-full"
              >
                Send Proof of Payment
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManualPayment;
