import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const sliderData = [{
    id: 1,
    title: 'Best Coffee, Best Day.',
    images: ['/images/slider/product1.jpg', '/images/slider/product2.jpg', '/images/slider/product3.jpg'],
    mobileImg: '/images/slider/product10.jpg',
}, {
    id: 2,
    title: 'Enjoy Your Fat Free Meals.',
    images: ['/images/slider/product4.jpg', '/images/slider/product5.jpg', '/images/slider/product6.jpg'],
    mobileImg: '/images/slider/product11.jpg',
}, {
    id: 3,
    title: 'Pure Water For A Pure Life.',
    images: ['/images/slider/product7.jpg', '/images/slider/product8.jpg', '/images/slider/product9.jpg'],
    mobileImg: '/images/slider/product12.jpg',
}];
const BlockSimpleSlider = () => {
    const [activeItem, setActiveItem] = useState(1);

    function prevFun() {
        if (activeItem === 1) {
            setActiveItem(3);
            return;
        }
        setActiveItem((prev) => prev - 1);
    }
    function nextFun() {
        if (activeItem === sliderData.length) {
            setActiveItem(1);
            return;
        }
        setActiveItem((prev) => prev + 1);
    }
    useEffect(() => {
        const timer = setInterval(() => {
            nextFun();
        }, 3500);
        return () => clearInterval(timer);
    }, [activeItem]);

    return (
        <div className="cm-slider">
            <div className="cm-slider__wrapper">
                <div className="cm-slider__txt">
                    <motion.div
                        initial={{ opacity: 0, x: -24 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.25, ease: 'easeIn' }}
                        className="txt"
                        key={activeItem}
                    >
                        <div>
                            {sliderData[activeItem - 1].title}
                        </div>
                    </motion.div>
                </div>
                <div className="cm-slider__imgs cm-slider-desktop">
                    {sliderData[activeItem - 1].images.map((item, index) => (
                        <motion.figure
                            // simple from up -> down
                            // initial={{ opacity: 0.5, y: 50 }}
                            // animate={{ opacity: 1, y: 0 }}
                            // transition={{ duration: 0.25 + 0.25 * index, ease: 'easeOut' }}
                            // simple from up and down
                            // initial={{ opacity: 0.5, y: (activeItem) % 2 === 0 ? -50 : 50 }}
                            // transition={{ duration: 0.25 + 0.25 * index, ease: 'easeOut' }}
                            // up and down
                            animate={{ opacity: 1, y: 0 }}
                            initial={{ opacity: 0.5, y: index % 2 === 0 ? -50 : 50 }}
                            transition={{ duration: 0.25, ease: 'easeIn' }} // up and down
                            key={item}
                        >
                            <img src={item} alt="slider 1" />
                        </motion.figure>
                    ))}
                </div>
                <div className="cm-slider__imgs cm-slider-mobile">
                    <motion.figure
                        // simple from up -> down
                        // initial={{ opacity: 0.5, y: 50 }}
                        // animate={{ opacity: 1, y: 0 }}
                        // transition={{ duration: 0.25 + 0.25 * index, ease: 'easeOut' }}
                        // simple from up and down
                        // initial={{ opacity: 0.5, y: (activeItem) % 2 === 0 ? -50 : 50 }}
                        // transition={{ duration: 0.25 + 0.25 * index, ease: 'easeOut' }}
                        // up and down
                        initial={{ opacity: 0.5, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25, ease: 'easeIn' }} // up and down
                        key={activeItem}
                    >
                        <img src={sliderData[activeItem - 1].mobileImg} alt="slider 1" />
                    </motion.figure>
                </div>
            </div>
            <div className="cm-slider__controllers-container">
                <div className="d-flex">
                    <button type="button" className="controller" onClick={() => prevFun()}>
                        <i className="fas fa-chevron-left" />
                    </button>
                    <button className="controller" type="button" onClick={() => nextFun()}>
                        <i className="fas fa-chevron-right" />
                    </button>
                </div>
            </div>

        </div>

    );
};

export default BlockSimpleSlider;
