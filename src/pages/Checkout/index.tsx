import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function Product() {
    const [product, setProduct] = useState({ name: ''});

    const params = useParams() as any;
    const { productId, quantity } = params;

    const getProduct = async (productId: number) => {
        try {
            const response = await fetch(`http://localhost:3001/product/${productId}`); // TODO update once Node deployed
            const product = await response.json();
            console.log(product, 'PPP')
            setProduct(product);
        } catch (err) {
            console.log(err, 'LOOK') // TODO handle error
        }
    }

    useEffect(() => {
        getProduct(params?.productId)
    }, []);

    return (
        <div>
            {product ? <span>{product?.name}</span> : null}

            
        </div>
    )
}
