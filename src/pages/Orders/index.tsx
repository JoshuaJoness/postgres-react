import React, { useState, useEffect } from 'react';
import BarChart from '../../components/BarChart';
import LineChart from '../../components/LineChart';
import './styles.css';

const Orders = () => {
    const [loading, setLoading] = useState(false);
    const [orders, setOrders] = useState<any>([]);
    const [error, setError] = useState('');

    useEffect(() => {
        getOrders();
    }, []);

    const getOrders = async () => {
        try {
            setLoading(true);
            const response = await fetch('http://localhost:3001/orders'); // TODO update once Node deployed
            const orders = await response.json();

            const mappedOrdersPromises = await orders.map(async (order: any) => {
                const { product_id: productId } = order;
                const product = await getProduct(productId);
                const { name, cost, image_url: imgUrl } = await product[0];

                return {
                    name,
                    cost,
                    imgUrl,
                    ...order,
                }
            })

            const ords = await Promise.all(mappedOrdersPromises)
            setOrders(ords);
        } catch (err) {
            setError('Unable to retrieve orders at this time, please try again later.');
        } finally {
            setLoading(false);
        }
    }

    const getProduct = async (productId: number) => {
        try {
            const response = await fetch(`http://localhost:3001/product/${productId}`); // TODO update once Node deployed
            const product = await response.json();
            return product;
        } catch (err) {
            console.log(err, 'LOOK')
        }
    }

    // TODO fuzzy search products - filter bar

    // TODO - move to helper functions
    const totalSoldShirt1 = [];
    const totalSoldShirt2 = [];
    const totalSoldShirt3 = [];

    orders.forEach((order) => {
        const { product_id } = order;
        if (product_id === 5) {
            totalSoldShirt1.push(product_id);
        } else if (product_id === 6) {
            totalSoldShirt2.push(product_id);
        } else if (product_id === 7) {
            totalSoldShirt3.push(product_id);
        }
    })

    const shirtNames = [... new Set(orders.map(({ name }) => name))];

    const productSalesData = {
        labels: [...shirtNames],
        datasets: [
            {
            label: '# of Purchases',
            data: [totalSoldShirt1.length, totalSoldShirt2.length, totalSoldShirt3.length],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(255, 206, 86, 1)',
            ],
            borderWidth: 1,
            },
        ],
    };

    const orderDateDate = {
        labels: ['Jan','Feb','Mar','Apr','May','June','July','Aug','Sept','Oct','Nov','Dec'],
        datasets: [
            {
            label: '# of Sale/Monhh',
            data: [12, 19, 3, 5, 2, 3], // TODO actually implement
            fill: false,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgba(255, 99, 132, 0.2)',
            },
        ],
    };

    return (
        <div style={{ marginTop: 50 }}>
            <table>
                <tbody>
                <tr>
                    <th>Order #</th>
                    <th>Product #</th>
                    <th>Price</th>
                    <th>Cost</th>
                    <th>First</th>
                    <th>Last</th>
                    <th>Shipping Line 1</th>
                    <th>Shipping Line 2</th>
                    <th>Order Date</th>
                    <th>Expected D.O.A.</th>
                </tr>
                {orders?.map((order: any) => {
                    const { 
                        id, 
                        product_id: productId, 
                        cost, 
                        price_paid: pricePaid, 
                        first_name: firstName, 
                        last_name: lastName, 
                        imgUrl, 
                        name, 
                        address_line_1: addrLine1, 
                        address_line_2: addrLine2, 
                        order_date: orderDate, 
                        expected_doa: doa, 
                    } = order;

                    return (
                        <tr key={id} className="order-card">
                            <td>{id}</td>
                            <td>{productId}</td>
                            <td>{pricePaid}</td>
                            <td>{cost}</td>
                            <td>{firstName}</td>
                            <td>{lastName}</td>
                            <td>{addrLine1}</td>
                            <td>{addrLine2}</td>
                            <td>{String(orderDate).split('T')[0]}</td>
                            <td>{String(doa).split('T')[0]}</td>
                        </tr>
                    )}
                )}
                </tbody>
            </table>
            <div style={{ width: '50vw', maxwidth: '50vw', backgroundColor: '#eee', margin: '100px 10vw'}}>
                <BarChart data={productSalesData} />
            </div>
            <div style={{ width: '50vw', maxwidth: '50vw', backgroundColor: '#eee', margin: '100px 10vw 0 auto'}}>
                <LineChart data={orderDateDate} />
            </div>
        </div>
    )
};

export default Orders;