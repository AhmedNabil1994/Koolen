// react
import React, { useMemo, useState, useEffect } from 'react';

// third-party
import { Helmet } from 'react-helmet-async';

// application

// blocks
import BlockBanner from '../blocks/BlockBanner';
import BlockBrands from '../blocks/BlockBrands';
import BlockFeatures from '../blocks/BlockFeatures';
// import BlockProductColumns from '../blocks/BlockProductColumns';
import BlockProducts from '../blocks/BlockProducts';
import BlockProductsCarousel from '../blocks/BlockProductsCarousel';
import BlockSlideShow from '../blocks/BlockSlideShow';

// data stubs
// import categories from '../../data/shopBlockCategories';
// import posts from '../../data/blogPosts';
import theme from '../../data/theme';
// api and helpers
import productSchema from '../../helpers/productSchema';
import { getNewArrivalProducts, getBestSellingProducts } from '../../api/products';
import { toastError } from '../toast/toastComponent';

function HomePageOne() {
    const [latestProductsLoading, setLatestProductsLoading] = useState(false);
    const [latestProducts, setLatestProducts] = useState([]);
    // const [specialOffersProductsLoading, setSpecialOffersProductsLoading] = useState(false);
    // const [specialOffersProducts, setSpecialOffersProducts] = useState([]);
    const [bestsellingProductsLoading, setBestsellingProductsLoading] = useState(false);
    const [bestsellingProducts, setBestsellingProducts] = useState([]);
    const latestProductsNumber = 10;

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

    return (
        <React.Fragment>
            <Helmet>
                <title>{`Home Page One — ${theme.name}`}</title>
            </Helmet>

            {useMemo(() => <BlockSlideShow withDepartments />, [])}

            {useMemo(() => <BlockFeatures />, [])}

            {/* {useMemo(() => (
                <BlockProductsCarousel
                    title="Featured Products"
                    layout="grid-4"
                    products={featuredProducts.data}
                    loading={featuredProducts.isLoading}
                    groups={featuredProducts.tabs}
                    onGroupClick={featuredProducts.handleTabChange}
                />
            ), [featuredProducts])} */}

            {useMemo(() => <BlockBanner />, [])}

            {useMemo(() => (
                <BlockProducts
                    title="Bestsellers"
                    layout="large-first"
                    products={bestsellingProducts}
                    loading={bestsellingProductsLoading}
                />
            ), [bestsellingProducts])}

            {/* {useMemo(() => (
                <BlockCategories
                    title="Popular Categories"
                    layout="compact"// compact
                    categories={categories}
                />
            ), [])} */}

            {useMemo(() => (
                <BlockProductsCarousel
                    title="New Arrivals"
                    layout="horizontal"
                    rows={2}
                    products={latestProducts}
                    loading={latestProductsLoading}
                />
            ), [latestProducts])}

            {useMemo(() => <BlockBrands />, [])}

            {/* {useMemo(() => <BlockProductColumns columns={columns} />, [columns])} */}
        </React.Fragment>
    );
}

export default HomePageOne;
