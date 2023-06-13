// react
import React, { useCallback, useState } from 'react';

// third-party
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// application
import { useIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';
import Pagination from '../shared/Pagination';
import ProductCard from '../shared/ProductCard';

import { sidebarOpen } from '../../store/sidebar';

function ProductsView(props) {
    const {
        isLoading,
        productsList,
        layout: propsLayout,
        grid,
        selectedPage,
        setSelectedPage,
        pages,
        reset,
    } = props;
    // eslint-disable-next-line
    const [layout, setLayout] = useState(propsLayout);
    const intl = useIntl();
    const history = useHistory();

    // useSetOption('page', parseFloat, dispatch);
    const handlePageChange = (pageNumber) => { setSelectedPage(pageNumber); };

    const handleResetFilters = useCallback(() => {
        reset();
        history.push('/shop/catalog');
    }, []);

    const productsListItems = productsList?.items?.map((product) => (
        <div key={product.id} className="products-list__item">
            <ProductCard product={product} />
        </div>
    ));

    const rootClasses = classNames('products-view', {
        'products-view--loading': isLoading,
    });

    let content;

    if (productsListItems?.length > 0) {
        content = (
            <div className="products-view__content">
                <div
                    className="products-view__list products-list"
                    data-layout={grid}
                    data-with-features="false"
                >
                    <div className="products-list__body">
                        {productsListItems}
                    </div>
                </div>

                <div className="products-view__pagination">
                    <Pagination
                        current={selectedPage}
                        total={pages}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        );
    } else {
        content = (
            <div className="products-view__empty">
                <div className="products-view__empty-title">{intl.formatMessage({ id: 'filter.noMatchingItems' })}</div>
                <div className="products-view__empty-subtitle">
                    {intl.formatMessage({ id: 'filter.tryRestting' })}
                </div>
                <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={handleResetFilters}
                >
                    {intl.formatMessage({ id: 'filter.reset' })}
                </button>
            </div>
        );
    }

    return (
        <div className={rootClasses}>
            <div className="products-view__loader" />
            {content}
        </div>
    );
}

ProductsView.propTypes = {
    /**
     * Indicates that products is loading.
     */
    isLoading: PropTypes.bool,
    /**
     * ProductsList object.
     */
    productsList: PropTypes.object,
    /**
     * Products list options.
     */
    /**
     * Category page dispatcher.
     */
    // dispatch: PropTypes.func,
    /**
     * products list layout (default: 'grid')
     * one of ['grid', 'grid-with-features', 'list']
     */
    layout: PropTypes.oneOf(['grid', 'grid-with-features', 'list']),
    /**
     * products list layout (default: 'grid')
     * one of ['grid-3-sidebar', 'grid-4-full', 'grid-5-full']
     */
    grid: PropTypes.oneOf(['grid-3-sidebar', 'grid-4-full', 'grid-5-full']),
    /**
     * indicates when sidebar should be off canvas
     */
    reset: PropTypes.any,
};

ProductsView.defaultProps = {
    layout: 'grid',
    grid: 'grid-3-sidebar',
};

const mapDispatchToProps = {
    sidebarOpen,
};

export default connect(
    () => ({}),
    mapDispatchToProps,
)(ProductsView);
