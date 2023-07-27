// react
import React, { Component } from 'react';

// third-party
import classNames from 'classnames';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

// application
import { FormattedMessage } from 'react-intl';
import AsyncAction from '../shared/AsyncAction';
import Currency from '../shared/Currency';
import InputNumber from '../shared/InputNumber';
import PageHeader from '../shared/PageHeader';
import { cartRemoveItem, cartUpdateQuantities } from '../../store/cart';
import { Cross12Svg } from '../../svg';
import { url } from '../../services/utils';

// data stubs
import theme from '../../data/theme';

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
                                <Cross12Svg />
                            </button>
                        );
                    }}
                />
            );

            return (
                <tr key={item.id} className="cart-table__row">
                    <td className="cart-table__column cart-table__column--image">{image}</td>
                    <td className="cart-table__column cart-table__column--product">
                        <Link to={url.product(item.product)} className="cart-table__product-name">
                            {item.product.name}
                            {item.product.color && ` - ${item.product.color}`}
                        </Link>
                        {options}
                    </td>
                    <td className="cart-table__column cart-table__column--price" data-title="Price">
                        <Currency value={item.price} />
                    </td>
                    <td className="cart-table__column cart-table__column--quantity" data-title="Quantity">
                        <InputNumber
                            onChange={(quantity) => this.handleChangeQuantity(item, quantity)}
                            value={this.getItemQuantity(item)}
                            min={1}
                        />
                    </td>
                    <td className="cart-table__column cart-table__column--total" data-title="Total">
                        <Currency value={item.total} />
                    </td>
                    <td className="cart-table__column cart-table__column--remove">{removeButton}</td>
                </tr>
            );
        });
    }

    renderTotals() {
        const { cart } = this.props;

        if (cart.extraLines.length <= 0) {
            return null;
        }

        return (
            <React.Fragment>
                <thead className="cart__totals-header">
                    <tr>
                        <th>
                            <FormattedMessage id="subtotal" />
                        </th>
                        <td>
                            <Currency value={cart.subtotal} />
                        </td>
                    </tr>
                </thead>
                {/* <tbody className="cart__totals-body">{extraLines}</tbody> */}
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
            <div className="cart block">
                <div className="container">
                    <table className="cart__table cart-table">
                        <thead className="cart-table__head">
                            <tr className="cart-table__row">
                                <th className="cart-table__column cart-table__column--image">
                                    <React.Fragment>
                                        <FormattedMessage id="image" />
                                    </React.Fragment>
                                </th>
                                <th className="cart-table__column cart-table__column--product">
                                    <React.Fragment>
                                        <FormattedMessage id="product" />
                                    </React.Fragment>
                                </th>
                                <th className="cart-table__column cart-table__column--price">
                                    <React.Fragment>
                                        <FormattedMessage id="price" />
                                    </React.Fragment>
                                </th>
                                <th className="cart-table__column cart-table__column--quantity">
                                    <React.Fragment>
                                        <FormattedMessage id="quantity" />
                                    </React.Fragment>
                                </th>
                                <th className="cart-table__column cart-table__column--total">
                                    <React.Fragment>
                                        <FormattedMessage id="total" />
                                    </React.Fragment>
                                </th>
                                <th className="cart-table__column cart-table__column--remove" aria-label="Remove" />
                            </tr>
                        </thead>
                        <tbody className="cart-table__body">{this.renderItems()}</tbody>
                    </table>
                    <div className="cart__actions">
                        <div />
                        <div className="cart__buttons">
                            <Link to="/" className="btn btn-light">
                                <FormattedMessage id="continueShopping" />
                            </Link>
                            {updateCartButton}
                        </div>
                    </div>

                    <div className="row justify-content-end pt-md-5 pt-4">
                        <div className="col-12 col-md-7 col-lg-6 col-xl-5">
                            <div className="card">
                                <div className="card-body">
                                    <h3 className="card-title"><FormattedMessage id="cartTotals" /></h3>
                                    <table className="cart__totals">
                                        {this.renderTotals()}
                                    </table>
                                    <Link
                                        to="/shop/checkout"
                                        className="btn btn-primary btn-xl btn-block cart__checkout-button"
                                    >
                                        <FormattedMessage id="proceedToCheckout" />
                                    </Link>
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

                <PageHeader header={<FormattedMessage id="shoppingCart" />} />

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
