import React from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";


const CmsCardProduct = ({ product }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 m-4">
      <div>
        <Image
          src={product}
          alt=""
          width={400}
          height={400}
          className="w-full h-60 object-cover rounded-t-lg"
        />
      </div>
      <div className="flex sm:flex-row justify-between items-center md:items-center gap-6 mt-4">
        <div>
          <Button className="focus:outline-none text-primaryColor bg-secondaryColor hover:bg-primaryColor hover:text-white rounded-lg h-10 md:w-32 w-40">
            Edit
          </Button>
        </div>
        <div>
          <Button className="focus:outline-none text-white bg-primaryColor hover:bg-secondaryColor hover:text-primaryColor rounded-lg h-10 md:w-32 w-40">
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CmsCardProduct;
