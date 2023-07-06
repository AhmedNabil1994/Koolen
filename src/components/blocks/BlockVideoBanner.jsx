import React, { useState } from 'react';
import BlockLoader from './BlockLoader';

const BlockVideoBanner = () => {
    const [isLoading, setIsLoading] = useState(true);
    console.log('isLoading', isLoading);

    // if (isLoading) return <BlockLoader />;
    return (
        <div className="custom-video-player">
            {/* <div className="container"> */}
            <div className="custom-video-player__wrapper">
                {isLoading && <BlockLoader />}
                <video
                    className="custom-video-player__video"
                    autoPlay
                    loop
                    muted
                    src="/images/main-banner.mp4"
                    onLoadStart={() => {
                        console.log('Loading video...');
                        setIsLoading(false);
                    }}
                    onLoadedData={() => {
                        console.log('Video loaded ...');
                        setIsLoading(false);
                    }}
                />
            </div>
            {/* </div> */}
        </div>

    );
};

export default BlockVideoBanner;
