// react
import React from 'react';

export default function BlockLoader() {
    return (
        <div className="block-loader">
            {/* <div className="block-loader__spinner" /> */}
            {/* <div
                className="block-loader__spinner"
            /> */}

            <div className="block-loader__spinner">
                <svg xmlns="http://www.w3.org/2000/svg" height="128px" width="256px" viewBox="0 0 256 128" className="ip">
                    <defs>
                        <linearGradient y2="0" x2="1" y1="0" x1="0" id="grad1">
                            <stop stopColor="#fc671a" offset="0%" />
                            <stop stopColor="#fc671a" offset="33%" />
                            <stop stopColor="#fc671a" offset="67%" />
                            <stop stopColor="#fc671a" offset="100%" />
                        </linearGradient>
                        <linearGradient y2="0" x2="0" y1="0" x1="1" id="grad2">
                            <stop stopColor="#fc671a" offset="0%" />
                            <stop stopColor="#fc671a" offset="33%" />
                            <stop stopColor="#fc671a" offset="67%" />
                            <stop stopColor="#fc671a" offset="100%" />
                        </linearGradient>
                    </defs>
                    <g strokeWidth="16" strokeLinecap="round" fill="none">
                        <g stroke="#ddd" className="ip__track">
                            <path d="M8,64s0-56,60-56,60,112,120,112,60-56,60-56" />
                            <path d="M248,64s0-56-60-56-60,112-120,112S8,64,8,64" />
                        </g>
                        <g strokeDasharray="180 656">
                            <path d="M8,64s0-56,60-56,60,112,120,112,60-56,60-56" strokeDashoffset="0" stroke="url(#grad1)" className="ip__worm1" />
                            <path d="M248,64s0-56-60-56-60,112-120,112S8,64,8,64" strokeDashoffset="358" stroke="url(#grad2)" className="ip__worm2" />
                        </g>
                    </g>
                </svg>
            </div>

        </div>
    );
}
