// react
import React, { useMemo, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';

// third-party
import { Helmet } from 'react-helmet-async';

// blocks
import BlockBanner from '../blocks/BlockBanner';
import BlockFeatures from '../blocks/BlockFeatures';
import BlockProducts from '../blocks/BlockProducts';
import BlockProductsCarousel from '../blocks/BlockProductsCarousel';
import BlockSlideShow from '../blocks/BlockSlideShow';

// data stubs
import theme from '../../data/theme';
// api and helpers
import productSchema from '../../helpers/productSchema';
import { getNewArrivalProducts, getBestSellingProducts } from '../../api/products';
import { toastError } from '../toast/toastComponent';
// eslint-disable-next-line
import BlockCategoreisCarousel from '../blocks/BlockCategoriesCarousel';
import { getAllCategories } from '../../api/categories';

function HomePageTwo() {
    const [latestProductsLoading, setLatestProductsLoading] = useState(false);
    const [latestProducts, setLatestProducts] = useState([]);
    // const [specialOffersProductsLoading, setSpecialOffersProductsLoading] = useState(false);
    // const [specialOffersProducts, setSpecialOffersProducts] = useState([]);
    const [bestsellingProductsLoading, setBestsellingProductsLoading] = useState(false);
    const [bestsellingProducts, setBestsellingProducts] = useState([]);
    const latestProductsNumber = 10;
    // eslint-disable-next-line
    const [categories, setCategories] = useState([]);
    // eslint-disable-next-line
    const [isCategoriesLoading, setIsCategoriesLoading] = useState(false);
    const intl = useIntl();

    useEffect(() => {
        getAllCategories((success) => {
            setIsCategoriesLoading(false);
            if (success) {
                setCategories([...success.data, ...success.data, ...success.data, ...success.data, ...success.data, ...success.data, ...success.data, ...success.data, ...success.data, ...success.data]);
            }
        }, (fail) => {
            setIsCategoriesLoading(false);
            toastError(fail);
        });
    }, []);

    // getLatesProducts
    useEffect(() => {
        setLatestProductsLoading(true);
        getNewArrivalProducts(latestProductsNumber, (success) => {
            setLatestProductsLoading(false);
            if (success.success) {
                const products = productSchema(success.data, 'new');
                setLatestProducts(products);
            } else {
                toastError(success);
            }
        }, (fail) => {
            setLatestProductsLoading(false);
            toastError(fail);
        });
    }, []);

    useEffect(() => {
        setBestsellingProductsLoading(true);
        getBestSellingProducts((success) => {
            setBestsellingProductsLoading(false);
            if (success.success) {
                const products = productSchema(success.products.data, 'hot');
                setBestsellingProducts(products);
            } else {
                toastError(success);
            }
        }, (fail) => {
            setBestsellingProductsLoading(false);
            toastError(fail);
        });
    }, []);

    //  *
    //  * Featured products.
    //  */

    // const featuredProducts = useProductTabs(
    //     useMemo(() => [
    //         { id: 1, name: 'All', categorySlug: undefined },
    //         { id: 2, name: 'Power Tools', categorySlug: 'power-tools' },
    //         { id: 3, name: 'Hand Tools', categorySlug: 'hand-tools' },
    //         { id: 4, name: 'Plumbing', categorySlug: 'plumbing' },
    //     ], []),
    //     (tab) => shopApi.getPopularProducts({ limit: 12, category: tab.categorySlug }),
    // );

    /**
     * Bestsellers.
     */
    return (
        <React.Fragment>
            <Helmet>
                <title>{theme.name}</title>
            </Helmet>

            {useMemo(() => <BlockSlideShow />, [])}

            {useMemo(() => <BlockFeatures layout="boxed" />, [])}
            {/*
            {useMemo(() => (
                <BlockProductsCarousel
                    title="Featured Products"
                    layout="grid-5"
                    rows={2}
                    products={featuredProducts.data}
                    loading={featuredProducts.isLoading}
                    groups={featuredProducts.tabs}
                    onGroupClick={featuredProducts.handleTabChange}
                />
            ), [featuredProducts])} */}

            {useMemo(() => (
                <BlockProducts
                    title={intl.formatMessage({ id: 'bestSellers' })}
                    layout="large-last"
                    featuredProduct={bestsellingProducts[0]}
                    products={bestsellingProducts}
                    loading={bestsellingProductsLoading}
                />
            ), [bestsellingProducts])}
            {
                useMemo(() => (
                    <div className="mt-4">
                        <BlockCategoreisCarousel
                            title={intl.formatMessage({ id: 'popularCategories' })}
                            layout="grid-5"
                            products={categories}
                            loading={isCategoriesLoading}
                        />
                    </div>
                ), [categories])
            }

            {useMemo(() => <BlockBanner />, [])}

            {useMemo(() => (
                <BlockProductsCarousel
                    title={intl.formatMessage({ id: 'latestProducts' })}
                    layout="grid-5"
                    products={latestProducts}
                    loading={latestProductsLoading}
                />
            ), [latestProducts])}

        </React.Fragment>
    );
}

export default HomePageTwo;
