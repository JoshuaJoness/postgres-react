import React from 'react';
import './styles.css';

export default function Footer() {
    return (
        <div style={{ width: '100%', marginTop: '10vh' }}>
            <ul style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                <li>Made with love❤️</li>
                <li className="site"><a href="http://joshuajones.io">http://joshuajones.io</a></li>
            </ul>
        </div>
    )
}
