// react
import React, { Component } from 'react';

// third-party
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

// application
import AsyncAction from './AsyncAction';
import Currency from './Currency';
import InputNumber from './InputNumber';
import ProductGallery from './ProductGallery';
import Rating from './Rating';
import { cartAddItem } from '../../store/cart';
import { compareAddItem } from '../../store/compare';
import { Wishlist16Svg, Compare16Svg } from '../../svg';
import { wishlistAddItem } from '../../store/wishlist';
import Share from '../blocks/Share';

class Product extends Component {
    constructor(props) {
        super(props);

        this.state = {
            quantity: 1,
            selectedColor: null,
        };
    }

    handleChangeQuantity = (quantity) => {
        this.setState({ quantity });
    };

selectColor=(index, name) => {
    this.setState({ selectedColor: { id: this.props?.product.variations[index].id, name, img: this.props?.product.variations[index].img } });
    console.log(this.state);
}

render() {
    const {
        product,
        layout,
        wishlistAddItem,
        compareAddItem,
        cartAddItem,
    } = this.props;
    const { quantity } = this.state;
    let prices;

    if (product.compareAtPrice) {
        prices = (
            <React.Fragment>
                <span className="product__new-price"><Currency value={product.price} /></span>
                {' '}
                <span className="product__old-price"><Currency value={product.compareAtPrice} /></span>
            </React.Fragment>
        );
    } else {
        prices = <Currency value={product.price} />;
    }

    return (
        <div className={`product product--layout--${layout} mt-3`}>
            <div className="product__content single-product">
                <ProductGallery layout={layout} images={product.images} />

                <div className="product__info">
                    <div className="product__wishlist-compare">
                        <AsyncAction
                            action={() => wishlistAddItem(product)}
                            render={({ run, loading }) => (
                                <button
                                    type="button"
                                    data-toggle="tooltip"
                                    data-placement="right"
                                    title="Wishlist"
                                    onClick={run}
                                    className={classNames('btn btn-sm btn-light btn-svg-icon', {
                                        'btn-loading': loading,
                                    })}
                                >
                                    <Wishlist16Svg />
                                </button>
                            )}
                        />
                        <AsyncAction
                            action={() => compareAddItem(product)}
                            render={({ run, loading }) => (
                                <button
                                    type="button"
                                    data-toggle="tooltip"
                                    data-placement="right"
                                    title="Compare"
                                    onClick={run}
                                    className={classNames('btn btn-sm btn-light btn-svg-icon', {
                                        'btn-loading': loading,
                                    })}
                                >
                                    <Compare16Svg />
                                </button>
                            )}
                        />
                    </div>
                    <h1 className="product__name">{product.name}</h1>
                    <div className="product__rating">
                        <div className="product__rating-stars">
                            <Rating value={product.rating} />
                        </div>
                        <div className="product__rating-legend">
                            {`${product.reviews} `}
                            <FormattedMessage id="reviews" />
                        </div>
                    </div>
                    <ul className="product__meta">
                        <li className="product__meta-availability">

                            <FormattedMessage id="avilability" />
                            :

                            {' '}

                            <span className={product.stock > 0 ? 'text-success' : 'text-danger'}>
                                <FormattedMessage id={product.availability} />
                            </span>
                        </li>
                    </ul>
                </div>

                <div className="product__sidebar">
                    <div className="product__availability">
                        <FormattedMessage id="avilability" />
                        :
                        {' '}
                        <span className="text-success">{product.availability}</span>
                    </div>

                    <div className="product__prices">
                        {prices}
                    </div>

                    <form className="product__options">
                        <div className="form-group product__option">
                            {
                                product?.colors?.length
                                    ? (
                                        <div className="product__option-label">
                                            <React.Fragment>
                                                <FormattedMessage id="color" />
                                            </React.Fragment>
                                        </div>
                                    )
                                    : null
                            }
                            <div className="input-radio-color">
                                <div className="input-radio-color__list">
                                    {
                                            product?.colors?.length
                                                ? product.colors.map((color, index) => (
                                                    <React.Fragment key={index}>
                                                        <div
                                                            className={`color__item ${this.state?.selectedColor?.id === product.variations[index].id ? 'active-cart-item' : 'not-active'}`}
                                                            role="button"
                                                            tabIndex={-1}
                                                            onKeyDown={() => this.selectColor(index, color.name)}
                                                            onClick={() => this.selectColor(index, color.name)}
                                                        >
                                                            {color.name}
                                                        </div>
                                                    </React.Fragment>
                                                )) : null
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="form-group product__option">
                            <label htmlFor="product-quantity" className="product__option-label">
                                <React.Fragment>
                                    <FormattedMessage id="quantity" />
                                </React.Fragment>
                            </label>
                            <div className="product__actions">
                                <div className="product__actions-item">
                                    {product.quantity}
                                    <InputNumber
                                        id="product-quantity"
                                        aria-label="Quantity"
                                        className="product__quantity"
                                        size="lg"
                                        max={product.quantity}
                                        min={1}
                                        value={quantity}
                                        onChange={this.handleChangeQuantity}
                                    />
                                </div>
                                <div className="product__actions-item product__actions-item--addtocart">
                                    <AsyncAction
                                        action={() => cartAddItem({
                                            ...product,
                                            id: this.state?.selectedColor?.id || product?.variations[0]?.id,
                                            color: this.state?.selectedColor?.name || product?.colors[0]?.name,
                                            img: this.state?.selectedColor?.img || null,
                                        }, [], quantity, <FormattedMessage id="productHasBeenAddedToCartSuccessfully" />)}
                                        render={({ run, loading }) => (
                                            <button
                                                type="button"
                                                onClick={run}
                                                disabled={!quantity}
                                                className={classNames('btn btn-primary btn-lg', {
                                                    'btn-loading': loading,
                                                })}
                                            >
                                                <FormattedMessage id="addToCart" />
                                            </button>
                                        )}
                                    />
                                </div>
                                <div className="product__actions-item product__actions-item--wishlist">
                                    <AsyncAction
                                        action={() => wishlistAddItem(product)}
                                        render={({ run, loading }) => (
                                            <button
                                                type="button"
                                                data-toggle="tooltip"
                                                title="Wishlist"
                                                onClick={run}
                                                className={classNames('btn btn-secondary btn-svg-icon btn-lg', {
                                                    'btn-loading': loading,
                                                })}
                                            >
                                                <Wishlist16Svg />
                                            </button>
                                        )}
                                    />
                                </div>
                                <div className="product__actions-item product__actions-item--compare">
                                    <AsyncAction
                                        action={() => compareAddItem(product)}
                                        render={({ run, loading }) => (
                                            <button
                                                type="button"
                                                data-toggle="tooltip"
                                                title="Compare"
                                                onClick={run}
                                                className={classNames('btn btn-secondary btn-svg-icon btn-lg', {
                                                    'btn-loading': loading,
                                                })}
                                            >
                                                <Compare16Svg />
                                            </button>
                                        )}
                                    />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

                <div className="product__footer">
                    {
                    product?.tags?.length
                        ? (
                            <div className="product__tags tags">
                                <div className="tags__list">
                                    {
                                        product.tags.map((tag) => <Link to="/" onClick={(e) => e.preventDefault()}>{tag}</Link>)
                                    }
                                </div>
                            </div>
                        )
                        : null
                    }
                    <div className="product__share-links share-links">
                        <Share media={product.images} title={product.name} description={product.descrition} url={window.location.href} hash={product.tags} />
                    </div>
                </div>
            </div>
        </div>
    );
}
}

Product.propTypes = {
    /** product object */
    product: PropTypes.object.isRequired,
    /** one of ['standard', 'sidebar', 'columnar', 'quickview'] (default: 'standard') */
    layout: PropTypes.oneOf(['standard', 'sidebar', 'columnar', 'quickview']),
};

Product.defaultProps = {
    layout: 'standard',
};

const mapDispatchToProps = {
    cartAddItem,
    wishlistAddItem,
    compareAddItem,
};

export default connect(
    () => ({}),
    mapDispatchToProps,
)(Product);
