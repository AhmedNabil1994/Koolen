// react
import React, { Component } from 'react';

// third-party
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

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

class Product extends Component {
    constructor(props) {
        super(props);

        this.state = {
            quantity: 1,
        };
    }

    handleChangeQuantity = (quantity) => {
        this.setState({ quantity });
    };

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
                <div className="product__content">
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
                                {`${product.reviews} Reviews`}
                            </div>
                        </div>
                        {/* <div className="product__description">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
                            ornare, mi in ornare elementum, libero nibh lacinia urna, quis
                            convallis lorem erat at purus. Maecenas eu varius nisi.
                        </div>
                        <ul className="product__features">
                            <li>Speed: 750 RPM</li>
                            <li>Power Source: Cordless-Electric</li>
                            <li>Battery Cell Type: Lithium</li>
                            <li>Voltage: 20 Volts</li>
                            <li>Battery Capacity: 2 Ah</li>
                        </ul> */}
                        <ul className="product__meta">
                            <li className="product__meta-availability">
                                Availability:
                                {' '}

                                <span className={product.stock > 0 ? 'text-success' : 'text-danger'}>{product.availability}</span>
                            </li>
                            <li>
                                Brand:
                                {' '}
                                {product.brand.name}
                            </li>
                            {/* <li>SKU: 83690/32</li> */}
                        </ul>
                    </div>

                    <div className="product__sidebar">
                        <div className="product__availability">
                            Availability:
                            {' '}
                            <span className="text-success">{product.availability}</span>
                        </div>

                        <div className="product__prices">
                            {prices}
                        </div>

                        <form className="product__options">
                            <div className="form-group product__option">
                                <div className="product__option-label">Color</div>
                                <div className="input-radio-color">
                                    <div className="input-radio-color__list">
                                        {
                                            product?.colors?.length
                                                ? product.colors.map((color) => (
                                                    <React.Fragment>
                                                        <div className="color__item">
                                                            {color.name}
                                                        </div>
                                                    </React.Fragment>
                                                )) : null
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="form-group product__option">
                                <label htmlFor="product-quantity" className="product__option-label">Quantity</label>
                                <div className="product__actions">
                                    <div className="product__actions-item">
                                        <InputNumber
                                            id="product-quantity"
                                            aria-label="Quantity"
                                            className="product__quantity"
                                            size="lg"
                                            max={product.stock}
                                            min={1}
                                            value={quantity}
                                            onChange={this.handleChangeQuantity}
                                        />
                                    </div>
                                    <div className="product__actions-item product__actions-item--addtocart">
                                        <AsyncAction
                                            action={() => cartAddItem(product, [], quantity)}
                                            render={({ run, loading }) => (
                                                <button
                                                    type="button"
                                                    onClick={run}
                                                    disabled={!quantity}
                                                    className={classNames('btn btn-primary btn-lg', {
                                                        'btn-loading': loading,
                                                    })}
                                                >
                                                    Add to cart
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
                        <div className="product__tags tags">
                            <div className="tags__list">
                                {
                                   product?.tags?.length
                                       ? product.tags.map((tag) => <Link to="/" onClick={(e) => e.preventDefault()}>{tag}</Link>) : null
                                }
                            </div>
                        </div>

                        <div className="product__share-links share-links">
                            <ul className="share-links__list">
                                <li className="share-links__item share-links__item--type--like"><Link to="/">Like</Link></li>
                                <li className="share-links__item share-links__item--type--tweet"><Link to="/">Tweet</Link></li>
                                <li className="share-links__item share-links__item--type--tel"><Link to="/">Pin It</Link></li>
                            </ul>
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
