// react
import React, { useEffect, useReducer, useState } from 'react';

// third-party
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet-async';

// application
import { useIntl } from 'react-intl';
import BlockLoader from '../blocks/BlockLoader';
import CategorySidebar from './CategorySidebar';
import CategorySidebarItem from './CategorySidebarItem';
import PageHeader from '../shared/PageHeader';
import ProductsView from './ProductsView';
import shopApi from '../../api/shop';
import WidgetFilters from '../widgets/WidgetFilters';
import WidgetProducts from '../widgets/WidgetProducts';
import { sidebarClose } from '../../store/sidebar';

// data stubs
import theme from '../../data/theme';
import { url, getCategoryParents } from '../../services/utils';

// apis
// import { getNewArrivalProducts } from '../../api/products';
import { getNewArrivalProducts, getAllProducts as getAllProductsApi } from '../../api/products';
import { toastError } from '../toast/toastComponent';
import productsSchema from '../../helpers/productSchema';

function parseQueryOptions(location) {
    const query = queryString.parse(location);
    const optionValues = {};

    if (typeof query.page === 'string') {
        optionValues.page = parseFloat(query.page);
    }
    if (typeof query.limit === 'string') {
        optionValues.limit = parseFloat(query.limit);
    }
    if (typeof query.sort === 'string') {
        optionValues.sort = query.sort;
    }

    return optionValues;
}

function parseQueryFilters(location) {
    const query = queryString.parse(location);
    const filterValues = {};

    Object.keys(query).forEach((param) => {
        const mr = param.match(/^filter_([-_A-Za-z0-9]+)$/);

        if (!mr) {
            return;
        }

        const filterSlug = mr[1];

        filterValues[filterSlug] = query[param];
    });

    return filterValues;
}

function parseQuery(location) {
    return [
        parseQueryOptions(location),
        parseQueryFilters(location),
    ];
}

function buildQuery(options, filters) {
    const params = {};

    if (options.page !== 1) {
        params.page = options.page;
    }

    if (options.limit !== 12) {
        params.limit = options.limit;
    }

    if (options.sort !== 'default') {
        params.sort = options.sort;
    }

    Object.keys(filters).filter((x) => x !== 'category' && !!filters[x]).forEach((filterSlug) => {
        params[`filter_${filterSlug}`] = filters[filterSlug];
    });

    return queryString.stringify(params, { encode: false });
}

const initialState = {
    init: false,
    /**
     * Indicates that the category is loading.
     */
    categoryIsLoading: true,
    /**
     * Category object.
     */
    category: null,
    /**
     * Indicates that the products list is loading.
     */
    productsListIsLoading: true,
    /**
     * Products list.
     */
    productsList: null,
    /**
     * Products list options.
     *
     * options.page:  number - Current page.
     * options.limit: number - Items per page.
     * options.sort:  string - Sort algorithm.
     */
    options: {},
    /**
     * Products list filters.
     *
     * filters[FILTER_SLUG]: string - filter value.
     */
    filters: {},
};

function reducer(state, action) {
    switch (action.type) {
    case 'FETCH_CATEGORY_SUCCESS':
        return {
            ...state,
            init: true,
            categoryIsLoading: false,
            category: action.category,
        };
    case 'FETCH_PRODUCTS_LIST':
        return { ...state, productsListIsLoading: true };
    case 'FETCH_PRODUCTS_LIST_SUCCESS':
        return { ...state, productsListIsLoading: false, productsList: action.productsList };
    case 'SET_OPTION_VALUE':
        return {
            ...state,
            options: { ...state.options, page: 1, [action.option]: action.value },
        };
    case 'SET_FILTER_VALUE':
        return {
            ...state,
            options: { ...state.options, page: 1 },
            filters: { ...state.filters, [action.filter]: action.value },
        };
    case 'RESET_FILTERS':
        return { ...state, options: { ...state.options, page: 1 }, filters: {} };
    case 'RESET':
        return state.init ? initialState : state;
    default:
        throw new Error();
    }
}

function init(state) {
    const [options, filters] = parseQuery(window.location.search);

    return { ...state, options, filters };
}

function ShopPageCategory(props) {
    const {
        categorySlug,
        columns,
        viewMode,
        sidebarPosition,
    } = props;
    const offcanvas = columns === 3 ? 'mobile' : 'always';
    const [state, dispatch] = useReducer(reducer, initialState, init);
    const [latestProducts, setLatestProducts] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [pages, setPages] = useState(1);
    const [selectedPage, setSelectedPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedPrices, setSelectedPrices] = useState([]);
    const latestProductsLimit = 5;
    const intl = useIntl();

    useEffect(() => {
        if (props?.match?.params?.categorySlug) {
            setSelectedCategory(props?.match?.params?.categorySlug);
        } else {
            setSelectedCategory(0);
        }
    }, [props?.match?.params?.categorySlug]);

    function getAllProducts() {
        setIsLoading(true);
        getAllProductsApi(selectedPage, selectedCategory, selectedPrices, (success) => {
            setIsLoading(false);
            if (success.success) {
                const products = productsSchema(success.products.data);
                setAllProducts({ items: products });
                setPages(success.totalPage);
            } else {
                toastError(success);
            }
        }, (fail) => {
            setIsLoading(false);
            toastError(fail);
        });
    }

    useEffect(() => {
        setSelectedPage(1);
    }, [selectedCategory, selectedPrices[0], selectedPrices[1]]);

    function reset() {
        setSelectedCategory(null);
        setSelectedPrices([]);
        setSelectedPage(1);
    }

    useEffect(() => {
        getNewArrivalProducts(latestProductsLimit, (success) => {
            if (success.success) {
                const products = productsSchema(success.data);
                setLatestProducts(products);
            } else {
                toastError(success);
            }
        }, (fail) => { toastError(fail); });
    }, []);

    useEffect(() => {
        getAllProducts();
    }, [selectedPage, selectedCategory, selectedPrices]);

    // Replace current url.
    useEffect(() => {
        const query = buildQuery(state.options, state.filters);
        const location = `${window.location.pathname}${query ? '?' : ''}${query}`;

        window.history.replaceState(null, '', location);
    }, [state.options, state.filters]);

    // Load category.
    useEffect(() => {
        let request;
        let canceled = false;

        dispatch({ type: 'RESET', categorySlug });

        if (categorySlug) {
            request = shopApi.getCategoryBySlug(categorySlug);
        } else {
            request = Promise.resolve(null);
        }

        request.then((category) => {
            if (canceled) {
                return;
            }

            dispatch({ type: 'FETCH_CATEGORY_SUCCESS', category });
        });

        return () => {
            canceled = true;
        };
    }, [dispatch, categorySlug]);

    // Load products.
    useEffect(() => {
        let canceled = false;

        dispatch({ type: 'FETCH_PRODUCTS_LIST' });

        shopApi.getProductsList(
            state.options,
            { ...state.filters, category: categorySlug },
        ).then((productsList) => {
            if (canceled) {
                return;
            }

            dispatch({ type: 'FETCH_PRODUCTS_LIST_SUCCESS', productsList });
        });

        return () => {
            canceled = true;
        };
    }, [dispatch, categorySlug, state.options, state.filters]);

    if (state.categoryIsLoading || (state.productsListIsLoading && !state.productsList)) {
        return <BlockLoader />;
    }

    const breadcrumb = [
        { title: 'Home', url: url.home() },
        { title: 'Shop', url: url.catalog() },
    ];
    let pageTitle = 'Shop';
    let content;

    if (state.category) {
        getCategoryParents(state.category).forEach((parent) => {
            breadcrumb.push({ title: parent.name, url: url.category(parent) });
        });

        breadcrumb.push({ title: state.category.name, url: url.category(state.category) });

        pageTitle = state.category.name;
    }

    const productsView = (
        <ProductsView
            isLoading={isLoading}
            productsList={allProducts}
            options={state.options}
            filters={state.filters}
            dispatch={dispatch}
            layout={viewMode}
            grid={`grid-${columns}-${columns > 3 ? 'full' : 'sidebar'}`}
            offcanvas={offcanvas}
            selectedPage={selectedPage}
            setSelectedPage={setSelectedPage}
            pages={pages}
            reset={() => reset()}
        />
    );

    // console.log('filters list: ', state.productsList.filters);

    const sidebarComponent = (
        <CategorySidebar offcanvas={offcanvas}>
            <CategorySidebarItem>
                <WidgetFilters
                    title={intl.formatMessage({
                        id: 'filter.filter',
                    })}
                    offcanvas={offcanvas}
                    changeSelectedCategory={setSelectedCategory}
                    selectedCategory={selectedCategory}
                    setSelectedPrices={setSelectedPrices}
                    selectedPrices={selectedPrices}
                />
            </CategorySidebarItem>
            {offcanvas !== 'always' && (
                <CategorySidebarItem className="d-none d-lg-block">
                    <WidgetProducts title="Latest Products" products={latestProducts} />
                </CategorySidebarItem>
            )}
        </CategorySidebar>
    );

    if (columns > 3) {
        content = (
            <div className="container">
                <div className="block">{productsView}</div>
                {sidebarComponent}
            </div>
        );
    } else {
        const sidebar = (
            <div className="shop-layout__sidebar">
                {sidebarComponent}
            </div>
        );

        content = (
            <div className="container">
                <div className={`shop-layout shop-layout--sidebar--${sidebarPosition}`}>
                    {sidebarPosition === 'start' && sidebar}
                    <div className="shop-layout__content">
                        <div className="block">{productsView}</div>
                    </div>
                    {sidebarPosition === 'end' && sidebar}
                </div>
            </div>
        );
    }

    return (
        <React.Fragment>
            <Helmet>
                <title>{`Shop Category Page — ${theme.name}`}</title>
            </Helmet>

            <PageHeader header={pageTitle} breadcrumb={breadcrumb} />

            {content}
        </React.Fragment>
    );
}

ShopPageCategory.propTypes = {
    /**
     * Category slug.
     */
    categorySlug: PropTypes.string,
    /**
     * number of product columns (default: 3)
     */
    columns: PropTypes.number,
    /**
     * mode of viewing the list of products (default: 'grid')
     * one of ['grid', 'grid-with-features', 'list']
     */
    viewMode: PropTypes.oneOf(['grid', 'grid-with-features', 'list']),
    /**
     * sidebar position (default: 'start')
     * one of ['start', 'end']
     * for LTR scripts "start" is "left" and "end" is "right"
     */
    sidebarPosition: PropTypes.oneOf(['start', 'end']),
};

ShopPageCategory.defaultProps = {
    columns: 3,
    viewMode: 'grid',
    sidebarPosition: 'start',
};

const mapStateToProps = (state) => ({
    sidebarState: state.sidebar,
    page: state.category,
});

const mapDispatchToProps = () => ({
    sidebarClose,
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopPageCategory);
