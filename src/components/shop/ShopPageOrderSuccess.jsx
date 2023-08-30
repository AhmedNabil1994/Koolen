// react
import React, { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { connect } from 'react-redux';

// third-party
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

// application
import { Check100Svg } from '../../svg';
import { emptyCartFromItems } from '../../store/cart/cartActions';

// data stubs
import theme from '../../data/theme';

function ShopPageOrderSuccess(props) {
    const { formatMessage } = useIntl();

    useEffect(() => {
        props.emptyCartFromItems();
    }, []);

    return (
        <div className="block order-success">
            <Helmet>
                <title>{`Order Success — ${theme.name}`}</title>
            </Helmet>

            <div className="container">
                <div className="order-success__body">
                    <div className="order-success__header">
                        <Check100Svg className="order-success__icon" />
                        <h1 className="order-success__title">{formatMessage({ id: 'thankYou' })}</h1>
                        <div className="order-success__subtitle">{formatMessage({ id: 'yourOrderHasBeenReceived' })}</div>
                        <div className="order-success__actions">
                            <Link to="/" className="btn btn-xs btn-secondary">{formatMessage({ id: 'goToHome' })}</Link>
                        </div>
                    </div>

                    {/* <div className="order-success__meta">
                        <ul className="order-success__meta-list">
                            <li className="order-success__meta-item">
                                <span className="order-success__meta-title">Order number:</span>
                                <span className="order-success__meta-value">{`#${order.id}`}</span>
                            </li>
                            <li className="order-success__meta-item">
                                <span className="order-success__meta-title">Created at:</span>
                                <span className="order-success__meta-value">{order.date}</span>
                            </li>
                            <li className="order-success__meta-item">
                                <span className="order-success__meta-title">Total:</span>
                                <span className="order-success__meta-value"><Currency value={order.total} /></span>
                            </li>
                            <li className="order-success__meta-item">
                                <span className="order-success__meta-title">Payment method:</span>
                                <span className="order-success__meta-value">{order.paymentMethod}</span>
                            </li>
                        </ul>
                    </div> */}

                    {/* <div className="card">
                        <div className="order-list">
                            <table>
                                <thead className="order-list__header">
                                    <tr>
                                        <th className="order-list__column-label" colSpan="2">Product</th>
                                        <th className="order-list__column-quantity">Qty</th>
                                        <th className="order-list__column-total">Total</th>
                                    </tr>
                                </thead>
                                <tbody className="order-list__products">
                                    {items}
                                </tbody>
                                {additionalLines.length > 0 && (
                                    <tbody className="order-list__subtotals">
                                        <tr>
                                            <th className="order-list__column-label" colSpan="3">Subtotal</th>
                                            <td className="order-list__column-total"><Currency value={order.subtotal} /></td>
                                        </tr>
                                        {additionalLines}
                                    </tbody>
                                )}
                                <tfoot className="order-list__footer">
                                    <tr>
                                        <th className="order-list__column-label" colSpan="3">Total</th>
                                        <td className="order-list__column-total"><Currency value={order.total} /></td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div> */}

                    {/* <div className="row mt-3 no-gutters mx-n2">
                        <div className="col-sm-6 col-12 px-2">
                            <div className="card address-card">
                                <div className="address-card__body">
                                    <div className="address-card__badge address-card__badge--muted">
                                        Shipping Address
                                    </div>
                                    <div className="address-card__name">
                                        {`${order.shippingAddress.firstName} ${order.shippingAddress.lastName}`}
                                    </div>
                                    <div className="address-card__row">
                                        {order.shippingAddress.country}
                                        <br />
                                        {`${order.shippingAddress.postcode}, ${order.shippingAddress.city}`}
                                        <br />
                                        {order.shippingAddress.address}
                                    </div>
                                    <div className="address-card__row">
                                        <div className="address-card__row-title">Phone Number</div>
                                        <div className="address-card__row-content">{order.shippingAddress.phone}</div>
                                    </div>
                                    <div className="address-card__row">
                                        <div className="address-card__row-title">Email Address</div>
                                        <div className="address-card__row-content">{order.shippingAddress.email}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 col-12 px-2 mt-sm-0 mt-3">
                            <div className="card address-card">
                                <div className="address-card__body">
                                    <div className="address-card__badge address-card__badge--muted">
                                        Billing Address
                                    </div>
                                    <div className="address-card__name">
                                        {`${order.billingAddress.firstName} ${order.billingAddress.lastName}`}
                                    </div>
                                    <div className="address-card__row">
                                        {order.billingAddress.country}
                                        <br />
                                        {`${order.billingAddress.postcode}, ${order.billingAddress.city}`}
                                        <br />
                                        {order.billingAddress.address}
                                    </div>
                                    <div className="address-card__row">
                                        <div className="address-card__row-title">Phone Number</div>
                                        <div className="address-card__row-content">{order.billingAddress.phone}</div>
                                    </div>
                                    <div className="address-card__row">
                                        <div className="address-card__row-title">Email Address</div>
                                        <div className="address-card__row-content">{order.billingAddress.email}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    );
}

const mapDispatchToProps = {
    emptyCartFromItems,
};

export default connect(null, mapDispatchToProps)(ShopPageOrderSuccess);
