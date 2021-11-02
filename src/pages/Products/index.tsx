import React, { useState, useEffect } from 'react';
import Card from '../../components/Card'
import './styles.css';


const Products = () => {
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        try {
            setLoading(true);
            const response = await fetch('http://localhost:3001'); // TODO update once Node deployed
            const products = await response.json();
            setProducts(products);
        } catch (err) {
            setError('Unable to retrieve products at this time, please try again later.');
        } finally {
          setLoading(false);
        }
    }

    const createOrder = async (data = {}) => {
        try {
            const response = await fetch('http://localhost:3001/order', { // TODO update once Node deployed
                  method: 'POST',
                  mode: 'cors',
                  cache: 'no-cache',
                  credentials: 'same-origin',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  redirect: 'follow',
                  referrerPolicy: 'no-referrer',
                  body: JSON.stringify(data)
            });

            return response.json();
        } catch (err) {
            setError('Failed to process order. Please try again later.');
        }
    }

    return (
        <div style={{ fontFamily: 'Zen Antique, serif', fontSize: 28, paddingBottom: '50vh' }}>
            <span className="slogan" style={{ width: '40vw', display: 'block', lineHeight: 2, margin: '100px auto 10px auto', fontSize: 32 }}>Made with quality and care.<br /> From the shirt wearer, for the shirt wearer.<br /> We keep comfort and class in mind.</span>
            <span className="slogan" style={{ fontFamily: 'FabulousScript', display: 'block', margin: 'auto', width: '10vw', marginBottom: 100 }}>- Shirt Wearer</span>
            {loading ? <span>loading...</span> : null}
            {error ? <span>{error}</span> : null}
            <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
                {products.map(({ id, name, description, price, stock, image_url: imgUrl }) => (
                    <Card 
                        key={id}
                        productId={id}
                        name={name} 
                        description={description} 
                        price={price} 
                        stock={stock} 
                        imgUrl={imgUrl} 
                        onClickHandler={() => createOrder({ id, price, quantity: 1 })}
                    />
                ))}
            </div>
        </div>
    );
}
export default Products;