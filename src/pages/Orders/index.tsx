import React, { useState, useEffect } from 'react';
import BarChart from '../../components/BarChart';
import Fuse from 'fuse.js'
import { getShirtData } from '../../helperFunctions/getShirtData'
import { addProductToOrder } from '../../helperFunctions/addProductToOrder'
import './styles.css';

const Orders = () => {
    const [loading, setLoading] = useState(false);
    const [orders, setOrders] = useState<any>([]);
    const [initialOrders, setInitialOrders] = useState<any>([]);
    const [error, setError] = useState('');
    const [searchString, setSearchString] = useState('');

    useEffect(() => {
        getOrders();
    }, []);

    const getOrders = async () => {
        try {
            setLoading(true);
            const response = await fetch('http://localhost:3001/orders'); // TODO update once Node deployed
            const orders = await response.json();
            const ordersWithProductInfo = await addProductToOrder(orders);
            setOrders(ordersWithProductInfo);
            setInitialOrders(ordersWithProductInfo);
        } catch (err) {
            setError('Unable to retrieve orders at this time, please try again later.');
        } finally {
            setLoading(false);
        }
    };

    // Bar chart data
    const productSalesData = getShirtData(initialOrders);

    // Fuzzy search
    const options = {
        includeScore: true,
        threshold: 0.1,
        keys: orders.length ? [...Object.keys(orders[0])] : []
    };
    const fuse = new Fuse(orders, options);
    useEffect(() => {
        if (searchString) {
            const searchResult = fuse.search(searchString).map(({ refIndex }: { refIndex: number }) => refIndex);
            const filteredOrders = orders.filter((o:any,i:number) => searchResult.includes(i));
            setOrders(filteredOrders);
        } else {
            setOrders(initialOrders);
        }
    }, [searchString]);

    return (
        <div className="orders-container">
            <input onChange={(e) => setSearchString(e.target.value)} style={{ margin: '50px 10vw', width: 300, height: 30 }} placeholder="Search phrase" />
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
            <div style={{ width: '50vw', maxWidth: '50vw', backgroundColor: '#eee', margin: '100px 10vw'}}>
                <BarChart data={productSalesData} />
            </div>
        </div>
    )
};

export default Orders;