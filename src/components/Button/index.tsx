import React, { useState, useEffect } from 'react';
import './styles.css';

interface IProps {
    text: string;
    onClickHandler: () => void;
}

const Button = ({ text, onClickHandler }: IProps) => {
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (success)
            setTimeout(() => {
                setSuccess(false);
            }, 1000);
    }, [success])

    return (
        <>
        <button 
            role="button" 
            onClick={() => {
                try {
                    onClickHandler();
                } catch (err) {
                    /* so empty... */
                } finally {
                    setSuccess(true);
                }
            }}
        >
            <span className="text">{text}</span>
        </button>
        {success ? <span style={{ fontFamily: 'Noto Sans, sans-serif', color: '#fff' }}>success</span> : null}
        </>
    )
}

export default Button;