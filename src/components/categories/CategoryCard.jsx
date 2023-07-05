import React from 'react';
import { Link } from 'react-router-dom';

const CategoryCard = ({ category }) => {
    const { slug, image, name } = category;

    return (
        <div key={slug} className="category-item">
            <div className="category-item__container" key={slug}>
                <Link to={`/shop/catalog/${slug}`}>
                    <figure>
                        <img src={image[0]} alt={name} />
                    </figure>
                    <div className="category-item__title">
                        {name}
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default CategoryCard;
