import CardProductCms from "@/components/ui/cardProductCms";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { getAllProductCms } from "@/modules/fetch/cms/fetchProductCms";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [productCms, setProductCms] = useState();

  useEffect(() => {
    const fetchProductCms = async () => {
      try {
        const response = await getAllProductCms();
        setProductCms(response.data);
      } catch (error) {
        console.log("Error fetching product cms", error.message);
      }
    };
    fetchProductCms();
  }, []);

  return (
    <div className="">
      {productCms !== undefined ? (
        <div className="w-full product-list grid lg:grid-cols-4 md:grid-cols-5 sm:grid-cols-5 gap-6">
          {productCms.map((items) => (
            <CardProductCms key={items.slug} product={items} />
          ))}
        </div>
      ) : (
        <div>
          <LoadingSpinner />
        </div>
      )}
      <div></div>
    </div>
  );
}
