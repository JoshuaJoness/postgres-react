import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

export default function Nav() {
    return (
        <nav>
        <div className="contents">
            <ul>
                <li>
                    <Link to="/" className="title">Shirts</Link>
                </li>
            </ul>
            </div>
        </nav>
    )
}
