// react
import React from 'react';

// third-party
import { Link } from 'react-router-dom';

export default function BlockBanner() {
    return (
        <div className="block block-banner">
            <div className="container">
                <Link to="/split-air-conditions" className="block-banner__body">
                    <div
                        className="block-banner__image block-banner__image--desktop"
                        style={{ backgroundImage: 'url("images/banners/banner-1.jpg")', backgroundSize: 'contain' }}
                    />
                    <div
                        className="block-banner__image block-banner__image--mobile"
                        style={{
                            backgroundImage: 'url("images/banners/banner-1-mobile.jpg")',
                            backgroundSize: 'contain',
                        }}
                    />
                </Link>
            </div>
        </div>
    );
}
