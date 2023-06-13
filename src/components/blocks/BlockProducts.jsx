// react
import React from 'react';

// application
import BlockHeader from '../shared/BlockHeader';
import ProductCard from '../shared/ProductCard';
// api
// components
import BlockLoader from './BlockLoader';

export default function BlockProducts(props) {
    const {
        products,
        loading,
        title,
        layout,
    } = props;

    let smalls;

    if (products.length > 0) {
        const productsList = products.slice(0, 6).map((product, index) => (
            <div key={index} className="block-products__list-item">
                <ProductCard product={product} />
            </div>
        ));

        smalls = (
            <div className="block-products__list">
                {productsList}
            </div>
        );
    }

    return (
        <div className={`block block-products block-products--layout--${layout}`}>
            <div className="container">
                <BlockHeader title={title} />
                {
                    loading
                        ? <BlockLoader />
                        : (
                            <div className="block-products__body">
                                {smalls}
                            </div>
                        )
                }

            </div>
        </div>
    );
}
