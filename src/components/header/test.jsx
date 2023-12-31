// Indicator cart old----------------------
// react
import React from 'react';
import { useIntl } from 'react-intl';

// third-party
import classNames from 'classnames';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// application
import AsyncAction from '../shared/AsyncAction';
import Currency from '../shared/Currency';
import Indicator from './Indicator';
import { Cart20Svg, Cross10Svg } from '../../svg';
import { cartRemoveItem } from '../../store/cart';
import { url } from '../../services/utils';

function IndicatorCart(props) {
    const { cart, cartRemoveItem } = props;
    let dropdown;
    let totals;
    const intl = useIntl();

    if (cart.extraLines?.length > 0) {
        const extraLines = cart.extraLines.map((extraLine, index) => (
            <tr key={index}>
                <th>{extraLine.title}</th>
                <td><Currency value={extraLine.price} /></td>
            </tr>
        ));

        totals = (
            <React.Fragment>
                <tr>
                    <th>{intl.formatMessage({ id: 'subtotal' })}</th>
                    <td><Currency value={cart.subtotal} /></td>
                </tr>
                {extraLines}
            </React.Fragment>
        );
    }

    const items = cart.items.map((item) => {
        let options;
        let image;

        if (item.options) {
            options = (
                <ul className="dropcart__product-options">
                    {item.options.map((option, index) => (
                        <li key={index}>{`${option.optionTitle}: ${option.valueTitle}`}</li>
                    ))}
                </ul>
            );
        }

        if (item.product.images.length) {
            const imgSrc = item.product.img || item.product.images[0];
            image = (
                <div className="product-image dropcart__product-image">
                    <Link to={url.product(item.product)} className="product-image__body">
                        <img className="product-image__img" src={imgSrc} alt="" />
                    </Link>
                </div>
            );
        }

        const removeButton = (
            <AsyncAction
                action={() => cartRemoveItem(item.id)}
                render={({ run, loading }) => {
                    const classes = classNames('dropcart__product-remove btn btn-light btn-sm btn-svg-icon', {
                        'btn-loading': loading,
                    });

                    return (
                        <button type="button" onClick={run} className={classes}>
                            <Cross10Svg />
                        </button>
                    );
                }}
            />
        );

        return (
            <div key={item.id} className="dropcart__product">
                {image}
                <div className="dropcart__product-info">
                    <div className="dropcart__product-name">
                        <Link to={url.product(item.product)}>
                            {item.product.name}
                            {' '}
                            {item.product.color && ` - ${item.product.color}`}
                        </Link>
                    </div>
                    {options}
                    <div className="dropcart__product-meta">
                        <span className="dropcart__product-quantity">{item.quantity}</span>
                        {' × '}
                        <span className="dropcart__product-price"><Currency value={item.price} /></span>
                    </div>
                </div>
                {removeButton}
            </div>
        );
    });

    if (cart.quantity) {
        dropdown = (
            <div className="dropcart">
                <div className="dropcart__products-list">
                    {items}
                </div>

                <div className="dropcart__totals">
                    <table>
                        <tbody>
                            {totals}
                            <tr>
                                <th>{intl.formatMessage({ id: 'total' })}</th>
                                <td><Currency value={cart.total} /></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="dropcart__buttons">
                    <Link className="btn btn-secondary" to="/shop/cart">{intl.formatMessage({ id: 'viewCart' })}</Link>
                    <Link className="btn btn-primary" to="/shop/checkout">{intl.formatMessage({ id: 'checkout' })}</Link>
                </div>
            </div>
        );
    } else {
        dropdown = (
            <div className="dropcart">
                <div className="dropcart__empty">
                    {intl.formatMessage({ id: 'emptyCart' })}
                </div>
            </div>
        );
    }

    return (
        <Indicator url="/shop/cart" dropdown={dropdown} value={cart.quantity} icon={<Cart20Svg />} />
    );
}

const mapStateToProps = (state) => ({
    cart: state.cart,
});

const mapDispatchToProps = {
    cartRemoveItem,
};

export default connect(mapStateToProps, mapDispatchToProps)(IndicatorCart);












// Shop page checkout old----------------------
// react
import React, { Component } from 'react';

// third-party
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { Redirect, Link } from 'react-router-dom'; //  Link,

// application
import { FormattedMessage } from 'react-intl';
import Collapse from '../shared/Collapse';
import Currency from '../shared/Currency';
import PageHeader from '../shared/PageHeader';
// import { Check9x7Svg } from '../../svg';

// data stubs
import payments from '../../data/shopPayments';
import theme from '../../data/theme';
import ChooseAddress from '../blocks/ChooseAddress';
import { getAddresses } from '../../api/addresses';
import { toastError, toastSuccess } from '../toast/toastComponent';
import CouponCode from './CouponCode';
import { getShippingCost } from '../../api/shippingAndPayment';
import { createOrder } from '../../api/orders';
import { emptyCartFromItems } from '../../store/cart';

class ShopPageCheckout extends Component {
    payments = payments;

    constructor(props) {
        super(props);

        this.state = {
            payment: 'standard',
            selectedAddress: null,
            isLoading: true,
            shippingCost: 0,
            isShippingCostDone: false,
            couponCode: null,
            isOrderSuccess: false,
            isDisabled: false,
        };
    }

    componentDidMount() {
        getAddresses((success) => {
            this.setState({
                selectedAddress: success.data[0],
                isLoading: false,
            });
        }, (fail) => {
            toastError(fail);
            this.setState({
                selectedAddress: null,
                isLoading: false,
            });
        });
    }

    componentDidUpdate() {
        if (this.state?.selectedAddress && !this.state?.isShippingCostDone) {
            getShippingCost(this.state?.selectedAddress?.id,
                (success) => {
                    if (success?.success) {
                        this.setState({ shippingCost: success.standard_delivery_cost, isShippingCostDone: true });
                    }
                }, (fail) => {
                    toastError(fail);
                });
        }
    }

    makeANewOrder = (cart) => {
        const {
            selectedAddress, couponCode, payment,
        } = this.state;
        this.setState({ isDisabled: true });
        createOrder({
            cart, shipping_address_id: selectedAddress.id, coupon_codes: couponCode, delivery_type: payment,
        }, (success) => {
            this.setState({ isDisabled: false });
            if (success.success) {
                toastSuccess(success);
                // this.props?.emptyCartFromItems();
                this.setState({ isOrderSuccess: true });
            } else {
                toastError(success);
            }
        }, (fail) => {
            this.setState({ isDisabled: false });
            toastError(fail);
        });
    }

    handlePaymentChange = (event) => {
        if (event.target.checked) {
            this.setState({ payment: event.target.value });
        }
    };

    renderTotals() {
        const { cart } = this.props;

        if (cart.extraLines?.length <= 0) {
            return null;
        }

        return (
            <React.Fragment>
                <tbody className="checkout__totals-subtotals">
                    {/* eslint-disable */}
                    <tr>
                        <th>
                            <FormattedMessage id="subtotal" />
                        </th>
                        <td><Currency value={cart.subtotal} /></td>
                    </tr>
            <tr >
                <th>{<FormattedMessage id="shipping" />}</th>

                {this.state.isShippingCostDone? 
                <td><Currency value={this.state.shippingCost} /></td>
                :<td></td> 
                }
            </tr>
                </tbody>
            </React.Fragment>
        );
    }

    renderCart() {
        const { cart } = this.props;

        const items = cart.items.map((item) => (
            <tr key={item.id}>
                <td>{`${item.product.name} × ${item.quantity}`}</td>
                <td><Currency value={item.total} /></td>
            </tr>
        ));

        return (
            <table className="checkout__totals">
                {/* eslint-disable */}
                <thead className="checkout__totals-header">
                    <tr>
                        <th><FormattedMessage id="total" /></th>
                        <th><FormattedMessage id="product" /></th>
                    </tr>
                </thead>
                <tbody className="checkout__totals-products">
                    {items}
                </tbody>
                {this.renderTotals()}
                <tfoot className="checkout__totals-footer">
                    <tr>
                        <th><FormattedMessage id="total" /></th>
                        {
                            this.state.isShippingCostDone ? 
                            <td><Currency value={0 ? (cart.total + this.state.shippingCost) :0+ cart.total} /></td>
                            : <td></td>
                        }
                    </tr>
                </tfoot>
            </table>
        );
    }

    renderPaymentsList() {
        const { payment: currentPayment } = this.state;

        const payments = this.payments.map((payment) => {
            const renderPayment = ({ setItemRef, setContentRef }) => (
                <li className="payment-methods__item" ref={setItemRef}>
                    {/* eslint-disable-next-line */}
                    <label className="payment-methods__item-header">
                        <span className="payment-methods__item-radio input-radio">
                            <span className="input-radio__body">
                                <input
                                    type="radio"
                                    className="input-radio__input"
                                    name="checkout_payment_method"
                                    value={payment.key}
                                    checked={currentPayment === payment.key}
                                    onChange={this.handlePaymentChange}
                                />
                                <span className="input-radio__circle" />
                            </span>
                        </span>
                        <span className="payment-methods__item-title">
                            <React.Fragment>
                                <FormattedMessage id={payment.title} />
                            </React.Fragment>
                        </span>
                    </label>
                    <div className="payment-methods__item-container" ref={setContentRef}>
                        <div className="payment-methods__item-description text-muted"><FormattedMessage id={payment.description} /></div>
                    </div>
                </li>
            );

            return (
                <Collapse
                    key={payment.key}
                    open={currentPayment === payment.key}
                    toggleClass="payment-methods__item--active"
                    render={renderPayment}
                />
            );
        });

        return (
            <div className="payment-methods">
                <ul className="payment-methods__list">
                    {payments}
                </ul>
            </div>
        );
    }

    render() {
        const { cart } = this.props;
        const cartItems = cart.items.map(item=>{
                return {
                    id: item.product.id,
                    qty: item.quantity
                } 
            })


        if (cart.items.length < 1) {
            return <Redirect to="cart" />;
        }

        if (this.state.isOrderSuccess){
            return <Redirect to="/shop/checkout/success"/>
        }

        
        return (
            <React.Fragment>
                <Helmet>
                    <title>{`Checkout — ${theme.name}`}</title>
                </Helmet>

                <PageHeader header={<FormattedMessage id={"checkout"} /> }  />

                <div className="checkout block">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-lg-6 col-xl-7">
                                {
                                    !this.state?.isLoading && !this.state?.selectedAddress ?  
                                    <div className="alert alert-danger" style={{lineHeight: 1.75}}>
                                        {/* You Don't have address information available        */}
                                        <FormattedMessage id="youDon'tHaveAddress" />
                                        <br />
                                        <FormattedMessage id="pleaseMakeYourAddressAvailable" />
                                        
                                        <Link style={{marginInlineStart: "0.5rem"}} to="/account/addresses/add">
                                            <FormattedMessage id="AddYourAddress"/>
                                        </Link>
                                    </div>: 
                                <ChooseAddress isLoading={this.state?.isLoading} address={this.state?.selectedAddress} />
                                }
                            </div>

                            <div className="col-12 col-lg-6 col-xl-5 mt-4 mt-lg-0">
                                <div className="card mb-0">
                                    <div className="card-body">
                                        <h3 className="card-title"><FormattedMessage id="yourOrder"/></h3>

                                        {this.renderCart()}

                                        <CouponCode setCodeCoupon={(couponNumber)=>{this.setState({couponCode: couponNumber})}} />

                                        {this.renderPaymentsList()}

                                        {/* ${this.state.isDisabled && "btn-loading"} */}
                                        <button  disabled={this.state.isDisabled} type="submit" onClick={()=>this.makeANewOrder(cartItems)} className={`btn btn-primary btn-xl btn-block `}>
                                            <FormattedMessage id="placeOrder" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    cart: state.cart,
});

const mapDispatchToProps = {
    emptyCartFromItems
};

export default connect(mapStateToProps, mapDispatchToProps)(ShopPageCheckout);