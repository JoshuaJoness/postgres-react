import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button';
import './styles.css';

interface IProps {
    productId: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    imgUrl: string;
    onClickHandler: () => Promise<any>;
}

const Card = ({ productId, name, description, price, stock, imgUrl, onClickHandler }: IProps) => {
    const [hover, setHover] = useState(false);
    const [quantity, setQuantity] = useState('');

    return (
        <div className="container" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
            <img 
                src={imgUrl} 
                className="image"
                style={hover ? { opacity: 1 } : { opacity: 0.9 }}
            />
            <span className="name">{name}</span>
            <span className="price">CAD ${price}</span>
            <Button onClickHandler={onClickHandler} text="Buy" />
        </div>
    )
}

export default Card;