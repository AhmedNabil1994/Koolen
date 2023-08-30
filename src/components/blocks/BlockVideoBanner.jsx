import React, { useState } from 'react';
import BlockLoader from './BlockLoader';

const BlockVideoBanner = () => {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <div className="container">
            {isLoading && <BlockLoader />}
            <video
                autoPlay
                loop
                muted
                playsInline
                controls={false}
                style={{ width: '100%', height: 'auto' }}
                onLoadStart={() => {
                    setIsLoading(false);
                }}
                onLoadedData={() => {
                    setIsLoading(false);
                }}
            >
                <source src="/images/main-banner.mp4" type="video/mp4" />
                {/* Add additional <source> elements for other video formats if necessary */}
            </video>
            {' '}

        </div>

    );
};

export default BlockVideoBanner;
