import React from 'react';
import { Link } from 'react-router-dom';

const Share = () => (
    <ul className="share-links__list">
        <li className="share-links__icon-wrapper">
            <Link to="/">
                <i className="fab fa-facebook" />
            </Link>
        </li>
        <li className="share-links__icon-wrapper">
            <Link to="/">
                <i className="fab fa-instagram" />
            </Link>
        </li>
        <li className="share-links__icon-wrapper">
            <Link to="/">
                <i className="fab fa-twitter" />
            </Link>
        </li>
        <li className="share-links__icon-wrapper">
            <Link to="/">
                <i className="fab fa-snapchat-ghost" />
            </Link>
        </li>
        <li className="share-links__icon-wrapper">
            <Link to="/">
                <i className="fab fa-tiktok" />
            </Link>
        </li>
    </ul>
);

export default Share;
