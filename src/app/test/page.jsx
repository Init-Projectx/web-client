'use client'

import { updateCart } from "@/modules/fetch/fetchUserCart";

const { getProductCategory } = require("@/modules/fetch/fetchUserProduct");
const { useState, useEffect } = require("react")

const Test = () => {

    const [product, setProduct] = useState([]);

    

    useEffect(() => {
        const fetch = async () => {
            const product = {
                cart_items_attr: {
                    "product_id": 2,
                    "quantity": 1
                }
            }

            const data = await updateCart(1, data);
            setProduct(data);
        }

        fetch();
    })

  
    
    return(
        <div>Test</div>
    )
}

export default Test;