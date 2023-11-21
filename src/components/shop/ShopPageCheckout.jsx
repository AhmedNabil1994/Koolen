// react
import React, { Component } from 'react';

// third-party
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet-async';
// import { Link } from 'react-router-dom'; //  Link,
import { Redirect, Link } from 'react-router-dom'; //  Link,

// application
import { FormattedMessage } from 'react-intl';
import Collapse from '../shared/Collapse';
import Currency from '../shared/Currency';
import PageHeader from '../shared/PageHeader';
import './ShopPageCheckout.css';
// import { Check9x7Svg } from '../../svg';

// data stubs
import payments from '../../data/shopPayments';
import theme from '../../data/theme';
import ChooseAddress from '../blocks/ChooseAddress';
import { getAddresses } from '../../api/addresses';
import { toastError, toastSuccess } from '../toast/toastComponent';
// import CouponCode from './CouponCode';
import { getShippingCost } from '../../api/shippingAndPayment';
import { createOrder } from '../../api/orders';
import { emptyCartFromItems } from '../../store/cart';

class ShopPageCheckout extends Component {
    payments = payments;

    constructor(props) {
        super(props);

        this.state = {
            payment: 'cash_on_delivery',
            // selectedAddress: [],
            selectedAddresses: [],
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
                // selectedAddress: success.data[0],
                selectedAddresses: success.data,
                isLoading: false,
            });
        }, (fail) => {
            toastError(fail);
            this.setState({
                // selectedAddress: null,
                selectedAddresses: [],
                isLoading: false,
            });
        });
    }

    componentDidUpdate() {
        if (this.state?.selectedAddresses && !this.state?.isShippingCostDone) {
            getShippingCost(this.state?.selectedAddresses[0]?.id,
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
            // selectedAddress, couponCode, payment,
            selectedAddresses,
            couponCode,
            payment,
        } = this.state;
        this.setState({ isDisabled: true });
        createOrder(
            {
                // cart, shipping_address_id: selectedAddress.id, coupon_codes: couponCode, payment_type: payment,
                cart,
                shipping_address_id: selectedAddresses[0].id,
                coupon_codes: couponCode,
                payment_type: payment,
            },
            (success) => {
                this.setState({ isDisabled: false });
                if (success.success) {
                    toastSuccess(success);
                    this.setState({ isOrderSuccess: true });
                } else {
                    toastError(success);
                }
            },
            (fail) => {
                this.setState({ isDisabled: false });
                toastError(fail);
            },
        );
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
                <div className="checkout__totals-subtotals">
                    {/* eslint-disable */}
                    <div className="flex-center-between detail">
                        <div>
                            <FormattedMessage id="subtotal" />
                        </div>
                        <div>
                            <Currency value={cart.subtotal} />
                        </div>
                    </div>
                    <div className="flex-center-between detail">
                        <div>{<FormattedMessage id="Shipping" />}</div>

                        {this.state.isShippingCostDone ? (
                            <div>
                                <Currency value={this.state.shippingCost} />
                            </div>
                        ) : (
                            <div></div>
                        )}
                    </div>
                </div>
            </React.Fragment>
        );
    }

    renderCart() {
        const { cart } = this.props;

        const items = cart.items.map((item) => (
            <div key={item.id} className="flex-center-between detail product-item">
                <div>{`${item.product.name} × ${item.quantity}`}</div>
                <div>
                    <Currency value={item.total} />
                </div>
            </div>
        ));

        return (
            // <table className="checkout__totals">
            //     {/* eslint-disable */}
            //     <thead className="checkout__totals-header">
            //         <tr>
            //             <th><FormattedMessage id="total" /></th>
            //             <th><FormattedMessage id="product" /></th>
            //         </tr>
            //     </thead>
            //     <tbody className="checkout__totals-products">
            //         {items}
            //     </tbody>
            //     {this.renderTotals()}
            //     <tfoot className="checkout__totals-footer">
            //         <tr>
            //             <th><FormattedMessage id="total" /></th>
            //             {
            //                 this.state.isShippingCostDone ?
            //                 <td><Currency value={0 ? (cart.total + this.state.shippingCost) :0+ cart.total} /></td>
            //                 : <td></td>
            //             }
            //         </tr>
            //     </tfoot>
            // </table>
            <div className="details-checkout">
                {items}
                {this.renderTotals()}
                <div className="flex-center-between detail">
                    <div>
                        <FormattedMessage id="total" />
                    </div>
                    {this.state.isShippingCostDone ? (
                        <div>
                            {/* <Currency value={0 ? cart.subtotal + this.state.shippingCost : 0 + cart.total} /> */}
                            <Currency value={cart.subtotal + this.state.shippingCost} />
                        </div>
                    ) : (
                        <div></div>
                    )}
                </div>
            </div>
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
                                    name="payment_type"
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
                        <div className="payment-methods__item-description text-muted">
                            <FormattedMessage id={payment.description} />
                        </div>
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

console.log('selected addresses',this.state.selectedAddresses);        
        return (
            <React.Fragment>
                <Helmet>
                    <title>{`Checkout — ${theme.name}`}</title>
                </Helmet>

                <PageHeader header={<FormattedMessage id={'checkout'} />} />

                <div className="checkout block">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-lg-6 col-xl-7">
                                {this.state.selectedAddresses.map((selectedAddress) => {
                                    // console.log('selected address',selectedAddress);
                                    // console.log('selected address id',selectedAddress.id);
                                    return (
                                        <ChooseAddress isLoading={this.state?.isLoading} address={selectedAddress} />
                                    );
                                })}
                            <Link
                                to="/account/addresses/add"
                                className="addresses-list__item addresses-list__item--new"
                            >
                                <div className="addresses-list__plus" />
                                <div className="btn btn-secondary btn-sm">
                                    <FormattedMessage id="addNew" />
                                </div>
                            </Link>
                            </div>
                            <div className="col-12 col-lg-6 col-xl-5 mt-4 mt-lg-0">
                                <div className="card mb-0">
                                    <div className="card-body">
                                        <h3 className="card-title">
                                            <FormattedMessage id="yourOrder" />
                                        </h3>

                                        {this.renderCart()}

                                        {/* <CouponCode setCodeCoupon={(couponNumber)=>{this.setState({couponCode: couponNumber})}} /> */}

                                        {this.renderPaymentsList()}

                                        {/* ${this.state.isDisabled && "btn-loading"} */}
                                        <button
                                            disabled={this.state.isDisabled}
                                            type="submit"
                                            onClick={() => this.makeANewOrder(cartItems)}
                                            className={`btn btn-primary btn-xl btn-block `}
                                        >
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
