import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { getAllCategories } from '../../api/categories';
import { toastError } from '../toast/toastComponent';
import BlockLoader from '../blocks/BlockLoader';

function Categories() {
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        getAllCategories((success) => {
            setIsLoading(false);
            if (success) {
                setCategories(success.data);
            }
        }, (fail) => {
            setIsLoading(false);
            toastError(fail);
        });
    }, []);
    let items;
    let counter = 0;
    let isOdd = true;
    if (categories?.length) {
        items = categories.map((item, index) => {
            // if (index % 3 === 0 && index !== 0) col_num += 1;
            if ((isOdd && counter === 5) || (!isOdd && counter === 10)) {
                isOdd = !isOdd;
                counter = 0;
                return (
                    <div key={index} className="category col-sm-12 col-md-8 ">
                        <div className="cm-category" key={index}>
                            <Link to={`/shop/catalog/${item.slug}`}>
                                <figure className="cm-category__figure">
                                    <img style={{ objectFit: 'cover' }} src={item.image[1]} alt={item.name} />
                                </figure>
                                <div className="cm-category__title">
                                    {item.name}
                                </div>
                            </Link>
                        </div>
                    </div>
                );
            }
            counter += 1;

            return (
                <div key={index} className="col-xs-12 col-md-4">
                    <div className="cm-category">
                        <Link to={`/shop/catalog/${item.slug}`}>
                            <figure className="cm-category__figure ">
                                <img style={{ width: '100%' }} src={item.image[0]} alt={item.name} />
                            </figure>
                            <div className="cm-category__title">
                                {item.name}
                            </div>
                        </Link>
                    </div>
                </div>
            );
        });
    }

    if (isLoading) return <BlockLoader />;

    return (
        <React.Fragment>
            <div className="container mt-4">
                <div className="cm-categories row">
                    <div className="col-xs-12 col-md-4">
                        <div className="cm-category ">
                            <Link to="/split-air-conditions">
                                <figure className="cm-category__figure ">
                                    {/* <img style={{ width: '100%' }} src="../../../public/images/Split_AC.jpg" alt="AC" /> */}
                                    <img
                                        style={{ width: '100%' }}
                                        src="../images/Split_AC.jpg"
                                        alt="AC"
                                    />
                                </figure>
                                <div className="cm-category__title">Split AC</div>
                            </Link>
                        </div>
                    </div>
                    {items}
                </div>
            </div>
            <Helmet>
                <title>All Categories</title>
            </Helmet>
        </React.Fragment>
    );
}
export default Categories;
