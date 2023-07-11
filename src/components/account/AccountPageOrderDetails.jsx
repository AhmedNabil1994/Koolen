// react
import React from 'react';

// third-party
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

// data stubs
import theme from '../../data/theme';

export default function AccountPageOrderDetails() {
    return (
        <React.Fragment>
            <Helmet>
                <title>{`Order Details — ${theme.name}`}</title>
            </Helmet>

            <div className="card">
                <div className="order-header">
                    <div className="order-header__actions">
                        <Link to="/account/orders" className="btn btn-xs btn-secondary">Back to list</Link>
                    </div>
                    <h5 className="order-header__title">Order #3857</h5>
                    <div className="order-header__subtitle">
                        Was placed on
                        {' '}
                        <mark className="order-header__date">19 October, 2020</mark>
                        {' '}
                        and is currently
                        {' '}
                        <mark className="order-header__status">On hold</mark>
                        .
                    </div>
                </div>
                <div className="card-divider" />
                <div className="card-table">
                    <div className="table-responsive-sm">
                        <table>
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody className="card-table__body card-table__body--merge-rows">
                                <tr>
                                    <td>Electric Planer Brandix KL370090G 300 Watts × 2</td>
                                    <td>$1,398.00</td>
                                </tr>
                                <tr>
                                    <td>Undefined Tool IRadix DPS3000SY 2700 watts × 1</td>
                                    <td>$849.00</td>
                                </tr>
                                <tr>
                                    <td>Brandix Router Power Tool 2017ERXPK × 3</td>
                                    <td>$3,630.00</td>
                                </tr>
                            </tbody>
                            <tbody className="card-table__body card-table__body--merge-rows">
                                <tr>
                                    <th>Subtotal</th>
                                    <td>$5,877.00</td>
                                </tr>
                                <tr>
                                    <th>Store Credit</th>
                                    <td>$-20.00</td>
                                </tr>
                                <tr>
                                    <th>Shipping</th>
                                    <td>$25.00</td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <th>Total</th>
                                    <td>$5,882.00</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}
