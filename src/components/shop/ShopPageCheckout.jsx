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
import './ShopPageCheckout.css';
// import { Check9x7Svg } from '../../svg';

// data stubs
import payments from '../../data/shopPayments';
import theme from '../../data/theme';
import ChooseAddress from '../blocks/ChooseAddress';
import { getAddresses } from '../../api/addresses';
// import { toastError, toastSuccess } from '../toast/toastComponent';
import { toastError } from '../toast/toastComponent';
import { getShippingCost, paymentGateway } from '../../api/shippingAndPayment';
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
            selectedAddrerssId: null,
        };
    }

    componentDidMount() {
        getAddresses(
            (success) => {
                this.setState({
                    selectedAddresses: success.data,
                    selectedAddrerssId: success.data.length === 1 ? success.data[0].id : null,
                    isLoading: false,
                });
            },
            (fail) => {
                toastError(fail);
                this.setState({
                    selectedAddresses: [],
                    isLoading: false,
                });
            }
        );
    }

    componentDidUpdate() {
        if (this.state?.selectedAddresses && !this.state?.isShippingCostDone) {
            getShippingCost(
                this.state?.selectedAddresses[0]?.id,
                (success) => {
                    if (success?.success) {
                        this.setState({ shippingCost: success.standard_delivery_cost, isShippingCostDone: true });
                    }
                },
                (fail) => {
                    toastError(fail);
                }
            );
        }
    }

    handlePaymentChange = (event) => {
        if (event.target.checked) {
            this.setState({ payment: event.target.value });
        }
    };

    handleAddressClick = (addressId) => {
        this.setState({ selectedAddrerssId: addressId });
    };

    makeACheckout = (cart) => {
        this.createNewOrder(cart);
    };

    createNewOrder = (cart) => {
        createOrder(
            {
                cart,
                shipping_address_id: this.state?.selectedAddrerssId,
                coupon_codes: this.state?.couponCode,
                payment_type: this.state?.payment,
            },
            (success) => {
                // this.setState({ isDisabled: false });
                this.setState({ selectedAddrerssId: null });
                if (success.success) {
                    this.payAnOrder(success.order_code);
                } else {
                    toastError(success);
                }
            },
            (fail) => {
                // this.setState({ isDisabled: false });
                this.setState({ selectedAddrerssId: null });
                toastError(fail);
            }
        );
    };

    payAnOrder = (orderCode) => {
        paymentGateway(
            {
                user_Id: this.props?.auth.user?.id,
                order_Code: orderCode,
            },
            (success) => {
                if (success.success) {
                    window.location.replace(success.payment_url);
                } else {
                    toastError(success);
                }
            },
            (fail) => {
                toastError(fail);
            }
        );
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
            <div className="details-checkout">
                {items}
                {this.renderTotals()}
                <div className="flex-center-between detail">
                    <div>
                        <FormattedMessage id="total" />
                    </div>
                    {this.state.isShippingCostDone ? (
                        <div>
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
                <ul className="payment-methods__list">{payments}</ul>
            </div>
        );
    }

    render() {
        const { cart } = this.props;
        const cartItems = cart.items.map((item) => {
            return {
                id: item.product.id,
                qty: item.quantity,
            };
        });
        if (cart.items.length < 1) {
            return <Redirect to="cart" />;
        }

        if (this.state.isOrderSuccess) {
            return <Redirect to="/shop/checkout/success" />;
        }
        console.log('first address', this.state.selectedAddresses[0]);
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
                                    return (
                                        <div key={selectedAddress.id}>
                                            <ChooseAddress
                                                isLoading={this.state?.isLoading}
                                                address={selectedAddress}
                                                handleAddressClick={this.handleAddressClick}
                                                checked={this.state.selectedAddresses.length === 1}
                                            />
                                        </div>
                                    );
                                })}
                                <Link
                                    to="/account/addresses/add"
                                    className="addresses-list__item addresses-list__item--new"
                                >
                                    <div className="addresses-list__plus" />
                                </Link>
                            </div>
                            <div className="col-12 col-lg-6 col-xl-5 mt-4 mt-lg-0">
                                <div className="card mb-0">
                                    <div className="card-body">
                                        <h3 className="card-title">
                                            <FormattedMessage id="yourOrder" />
                                        </h3>

                                        {this.renderCart()}
                                        {this.renderPaymentsList()}
                                        <button
                                            disabled={!this.state.selectedAddrerssId}
                                            type="submit"
                                            onClick={() => this.makeACheckout(cartItems)}
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
    auth: state.auth,
});

const mapDispatchToProps = {
    emptyCartFromItems,
};

export default connect(mapStateToProps, mapDispatchToProps)(ShopPageCheckout);
