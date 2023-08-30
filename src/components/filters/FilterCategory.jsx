// react
import React, { Fragment, useEffect, useState } from 'react';

// third-party
import classNames from 'classnames';
import { Link } from 'react-router-dom';

// application
// import { ArrowRoundedLeft6x9Svg } from '../../svg';
// import { url } from '../../services/utils';
import { getAllCategories } from '../../api/categories';
import { toastError } from '../toast/toastComponent';

function FilterCategory({ selectedCategory, changeSelectedCategory }) {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getAllCategories((success) => {
            if (success.success) {
                setCategories(success.data);
            } else {
                toastError(success);
            }
        }, (fail) => toastError(fail));
    }, []);

    function changeCategory(category) {
        changeSelectedCategory(category.slug);
    }

    const categoriesList = categories.map((category) => {
        const itemClasses = classNames('filter-categories__item', {
            // 'filter-categories__item--current': data.value === category.slug,
            // if in the same page make it as current
            'filter-categories__item--current': selectedCategory === category.slug,
        });

        return (
            <Fragment key={category.id}>
                {/* {getCategoryParents(category).map((parent) => (
                    <li key={parent.id} className="filter-categories__item filter-categories__item--parent">
                        <ArrowRoundedLeft6x9Svg className="filter-categories__arrow" />
                        <Link to={url.category(parent)} onClick={(e) => e.preventDefault()}>{parent.name}</Link>
                    </li>
                ))} */}
                <li className={itemClasses}>
                    <Link to={`/shop/catalog/${category.slug}`} onClick={() => changeCategory(category)}>{category.name}</Link>
                </li>
                {/* {category.children && category.children.map((child) => (
                    <li key={child.id} className="filter-categories__item filter-categories__item--child">
                        <Link to={url.category(child)} onClick={(e) => e.preventDefault()}>{child.name}</Link>
                    </li>
                ))} */}
            </Fragment>
        );
    });

    // if (data.value) {
    //     categoriesList.unshift(
    //         <li key="[shop]" className="filter-categories__item filter-categories__item--parent">
    //             <ArrowRoundedLeft6x9Svg className="filter-categories__arrow" />
    //             <Link to={url.catalog()}>All Products</Link>
    //         </li>,
    //     );
    // }

    return (
        <div className="filter-categories">
            <ul className="filter-categories__list">
                {categoriesList}
            </ul>
        </div>
    );
}

export default FilterCategory;
