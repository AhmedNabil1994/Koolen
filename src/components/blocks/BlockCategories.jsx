// react
import React, { useEffect, useState } from 'react';

// third-party
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// apis
import { getAllCategories } from '../../api/categories';

// application
import BlockHeader from '../shared/BlockHeader';
import { toastError } from '../toast/toastComponent';

export default function BlockCategories(props) {
    const { title, layout } = props;
    const [mycategories, setCategories] = useState([]);
    useEffect(() => {
        getAllCategories((success) => {
            if (success.success) {
                setCategories(success.data);
            } else {
                toastError(success);
            }
        }, (fail) => toastError(fail));
    }, []);

    let counter = 0;
    let isOdd = true;

    const categoriesList = mycategories?.map((category, index) => {
        if ((isOdd && counter === 6) || (!isOdd && counter === 8)) {
            isOdd = !isOdd;
            counter = 0;

            return (
                <div key={index} className="col-md-8 col-xs-12">
                    <div className="cm-category">
                        <figure className="cm-category__figure ">
                            <Link to="/">
                                <img src={category.image} alt={category.name} />
                            </Link>
                        </figure>
                        <div className="cm-category__title">
                            {category.title}
                        </div>
                    </div>
                </div>
            );
        }

        counter += 1;

        return (
            <div key={index} className="col-xs-12 col-md-4">
                <div className="cm-category">
                    <Link to={`/shop/catalog/${category.slug}`}>
                        <figure className="cm-category__figure">
                            <img src={category.image} alt={category.name} />
                        </figure>
                        <div className="cm-category__title">
                            {category.name}
                        </div>
                    </Link>

                </div>
            </div>
        );
    });

    return (
        <div className={`block block--highlighted block-categories block-categories--layout--${layout}`}>
            <div className="container">
                <BlockHeader title={title} />
                <div className="cm-categories row">
                    {categoriesList}
                </div>
            </div>
        </div>
    );
}

BlockCategories.propTypes = {
    title: PropTypes.string.isRequired,
    layout: PropTypes.oneOf(['classic', 'compact']),
};

BlockCategories.defaultProps = {
    layout: 'classic',
};
