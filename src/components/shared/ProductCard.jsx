// react
import React from 'react';
import { useIntl } from 'react-intl';

// third-party
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// application
import AsyncAction from './AsyncAction';
import Currency from './Currency'; import Rating from './Rating';
import { cartAddItem } from '../../store/cart';
import { Wishlist16Svg } from '../../svg';
import { compareAddItem } from '../../store/compare';
import { quickviewOpen } from '../../store/quickview';
import { url } from '../../services/utils';
import { wishlistAddItem } from '../../store/wishlist';

function ProductCard(props) {
    const { formatMessage } = useIntl();
    const {
        product, cartAddItem, wishlistAddItem,
    } = props;

    let badges = [];
    let image;
    let price;
    // let features;

    if (product.badges.includes('sale')) {
        badges.push(
            <div key="sale" className="product-card__badge product-card__badge--sale">
                {formatMessage({ id: 'sale' })}
            </div>,
        );
    }
    if (product.badges.includes('hot')) {
        badges.push(
            <div key="hot" className="product-card__badge product-card__badge--hot">
                {formatMessage({ id: 'hot' })}
            </div>,
        );
    }
    if (product.badges.includes('new')) {
        badges.push(
            <div key="new" className="product-card__badge product-card__badge--new">
                {formatMessage({ id: 'new' })}
            </div>,
        );
    }

    badges = badges.length ? <div className="product-card__badges-list">{badges}</div> : null;

    if (product.images && product.images.length > 0) {
        image = (
            // .product-card__image.product-image
            <figure className="k-product__figure">
                <Link to={url.product(product)} className="product-image__body">
                    <img className="product-image__img first" src={product.images[0]} alt={product.name} />
                    {product?.images[1] ? (
                        <img className="product-image__img" src={product.images[1]} alt={product.name} />
                    ) : (
                        <img className="product-image__img" src={product.images[0]} alt={product.name} />
                    )}
                </Link>
                <div className="k-product__actions">

                    <div>
                        <AsyncAction
                            action={() => wishlistAddItem(product, formatMessage({ id: 'productHasBeenAddedToWishlistSuccessfully' }))}
                            render={({ run, loading }) => (
                                <button
                                    type="button"
                                    onClick={run}
                                    className={classNames(
                                        'btn btn-light btn-svg-icon btn-svg-icon--fake-svg product-card__wishlist',
                                        {
                                            'btn-loading': loading,
                                        },
                                    )}
                                >
                                    <Wishlist16Svg />
                                </button>
                            )}
                        />
                    </div>
                    {/* <div>
                        <AsyncAction
                            action={() => compareAddItem(product)}
                            render={({ run, loading }) => (
                                <button
                                    type="button"
                                    onClick={run}
                                    className={classNames(
                                        'btn btn-light btn-svg-icon btn-svg-icon--fake-svg product-card__compare',
                                        {
                                            'btn-loading': loading,
                                        },
                                    )}
                                >
                                    <Compare16Svg />
                                </button>
                            )}
                        />
                    </div> */}
                </div>
                <div className="button-container">
                    <AsyncAction
                        action={() => cartAddItem(product, [], 1, formatMessage({ id: 'productHasBeenAddedToCartSuccessfully' }))}
                        render={({ run, loading }) => (
                            <React.Fragment>
                                <button
                                    type="button"
                                    onClick={run}
                                    className={classNames('k-product__btn btn btn-primary product-card__addtocart', {
                                        'btn-loading': loading,
                                    })}
                                >
                                    {formatMessage({ id: 'addToCart' })}
                                </button>
                                <button
                                    type="button"
                                    onClick={run}
                                    className={classNames('k-product__btn btn btn-secondary product-card__addtocart product-card__addtocart--list', {
                                        'btn-loading': loading,
                                    })}
                                >
                                    {formatMessage({ id: 'addToCart' })}
                                </button>
                            </React.Fragment>
                        )}
                    />
                </div>
            </figure>
        );
    }

    if (product.compareAtPrice) {
        price = (
            <div className="product-card__prices">
                <span className="product-card__new-price">
                    <Currency value={product.price} />
                </span>
                {' '}
                <span className="product-card__old-price">
                    <Currency value={product.compareAtPrice} />
                </span>
            </div>
        );
    } else {
        price = (
            <div className="k-product__price">
                <Currency value={product.price} />
            </div>
        );
    }

    return (
        <div className="k-product">
            <div className="k-product__img-container">
                {badges}
                {image}
            </div>
            <div className="k-product__info">
                <div className="k-product__title">
                    <Link to={url.product(product)} state={{ product }}>
                        {product.name}
                    </Link>
                </div>
                <div className="k-product__rating">
                    <Rating value={product.rating} />
                    <div className="ms-2 review ">
                        { product.reviews }
                        {' '}
                        {formatMessage({ id: 'reviews' })}
                    </div>
                </div>

                {price}
            </div>
        </div>
    );
}

ProductCard.propTypes = {
    /**
     * product object
     */
    product: PropTypes.object.isRequired,
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {
    cartAddItem,
    wishlistAddItem,
    compareAddItem,
    quickviewOpen,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard);
