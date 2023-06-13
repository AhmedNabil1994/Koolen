// react
import React from 'react';

function ProductTabDescription({ product }) {
    return (
        <div
            className="typography"
            dangerouslySetInnerHTML={{ __html: product?.description }}
        />
    );
}

export default ProductTabDescription;
