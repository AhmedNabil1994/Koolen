// react
import React, { Component } from 'react';

// third-party
import classNames from 'classnames';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

// application
import { FormattedMessage } from 'react-intl';
import { FaTrash } from 'react-icons/fa';
import AsyncAction from '../shared/AsyncAction';
import Currency from '../shared/Currency';
import InputNumber from '../shared/InputNumber';
import { cartRemoveItem, cartUpdateQuantities } from '../../store/cart';
import { url } from '../../services/utils';
import './ShopPageCart.css';
// data stubs
import theme from '../../data/theme';
import CouponCode from './CouponCode';

class ShopPageCart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            /** example: [{itemId: 8, value: 1}] */
            quantities: [],
        };
    }

    getItemQuantity(item) {
        const { quantities } = this.state;
        const quantity = quantities.find((x) => x.itemId === item.id);
        return quantity ? quantity.value : item.quantity;
    }

    handleChangeQuantity = (item, quantity) => {
        this.setState((state) => {
            const stateQuantity = state.quantities.find((x) => x.itemId === item.id);

            if (!stateQuantity) {
                state.quantities.push({ itemId: item.id, value: quantity });
            } else {
                stateQuantity.value = quantity;
            }

            return {
                quantities: state.quantities,
            };
        });
    };

    cartNeedUpdate() {
        const { quantities } = this.state;
        const { cart } = this.props;

        return (
            quantities.filter((x) => {
                const item = cart.items.find((item) => item.id === x.itemId);

                return item && item.quantity !== x.value && x.value !== '';
            }).length > 0
        );
    }

    renderItems() {
        const { cart, cartRemoveItem } = this.props;

        return cart.items.map((item) => {
            let image;
            let options;
            const imgSrc = item.product.img || item.product.images[0];

            if (item.product.images.length > 0) {
                image = (
                    <div className="product-image">
                        <Link to={url.product(item.product)} className="product-image__body">
                            <img className="product-image__img" src={imgSrc} alt={imgSrc} />
                        </Link>
                    </div>
                );
            }

            if (item.options.length > 0) {
                options = (
                    <ul className="cart-table__options">
                        {item.options.map((option, index) => (
                            <li key={index}>
                                {`${option.optionTitle}: ${option.valueTitle}`}
                            </li>
                        ))}
                    </ul>
                );
            }

            const removeButton = (
                <AsyncAction
                    action={() => cartRemoveItem(item.id)}
                    render={({ run, loading }) => {
                        const classes = classNames('btn btn-light btn-sm btn-svg-icon', {
                            'btn-loading': loading,
                        });

                        return (
                            <button type="button" onClick={run} className={classes}>
                                <FaTrash />
                            </button>
                        );
                    }}
                />
            );

            return (
                <div key={item.id} className="flex-center-between cart ">
                    <div className="d-flex">
                        <div className=" cart-table__column--image ">{image}</div>
                        <div className=" cart-table__column--total  info ">
                            <Link to={url.product(item.product)} className="cart-table__product-name">
                                {item.product.name}
                            </Link>
                            <div className="price d-flex" data-title="Price">
                                <span>Unit Price: </span>
                                <Currency value={item.price} />
                            </div>
                            <div className="total" data-title="Total">
                                <Currency value={item.total} />
                            </div>
                        </div>
                    </div>
                    <div className="d-flex">
                        <div className="cart-table__column--product ">
                            <div className="quantity " data-title="Quantity">
                                <InputNumber
                                    onChange={(quantity) => this.handleChangeQuantity(item, quantity)}
                                    value={this.getItemQuantity(item)}
                                    min={1}
                                />
                            </div>
                            {options}
                        </div>
                        <div className="">{removeButton}</div>
                    </div>
                </div>
            );
        });
    }

    renderTotals() {
        const { cart } = this.props;

        if (cart?.extraLines?.length <= 0) {
            return null;
        }

        return (
            <React.Fragment>
                <Currency value={cart.subtotal} />
            </React.Fragment>
        );
    }

    renderCart() {
        const { cartUpdateQuantities } = this.props;
        const { quantities } = this.state;

        const updateCartButton = (
            <AsyncAction
                action={() => cartUpdateQuantities(quantities)}
                render={({ run, loading }) => {
                    const classes = classNames('btn btn-primary cart__update-button', {
                        'btn-loading': loading,
                    });

                    return (
                        <button type="button" onClick={run} className={classes} disabled={!this.cartNeedUpdate()}>
                            <FormattedMessage id="updateCart" />
                        </button>
                    );
                }}
            />
        );

        return (
            <div className="cart block bg-color container">
                <div className="row">
                    <div className="container col-xl-7">
                        <div className="cart-products">
                            <h3>Shopping Cart</h3>
                            {this.renderItems()}
                            <div className="d-flex mt-4 all-buttons justify-content-between">
                                <div className="one">
                                    <Link to="/" className="btn btn-secondary">
                                        <FormattedMessage id="continueShopping" />
                                    </Link>
                                    {updateCartButton}
                                </div>
                                <div className="two">
                                    <Link
                                        to="/shop/checkout"
                                        className="btn btn-primary"
                                    >
                                        <FormattedMessage id="proceedToCheckout" />
                                        {this.renderTotals()}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="order-summary col-xl-5">
                        <div className="card">
                            <h3>Order Summary</h3>
                            <div className="coupon-code">
                                <CouponCode />
                            </div>
                            <div className="details">
                                <div className="flex-center-between">
                                    <div>Subtotal</div>
                                    <div>{this.renderTotals()}</div>
                                </div>
                                <div className="flex-center-between">
                                    <div>Discount</div>
                                    <div>000</div>
                                </div>
                                <div className="flex-center-between">
                                    <div>Total</div>
                                    <div>{this.renderTotals()}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        const { cart } = this.props;

        let content;

        if (cart.quantity) {
            content = this.renderCart();
        } else {
            content = (
                <div className="block block-empty">
                    <div className="container">
                        <div className="block-empty__body">
                            <div className="block-empty__message">
                                <FormattedMessage id="emptyCart" />
                            </div>
                            <div className="block-empty__actions">
                                <Link to="/" className="btn btn-primary btn-sm">
                                    <FormattedMessage id="continue" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <React.Fragment>
                <Helmet>
                    <title>{`Shopping Cart — ${theme.name}`}</title>
                </Helmet>
                {content}
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    cart: state.cart,
});

const mapDispatchToProps = {
    cartRemoveItem,
    cartUpdateQuantities,
};

export default connect(mapStateToProps, mapDispatchToProps)(ShopPageCart);
