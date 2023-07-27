// react
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useIntl } from 'react-intl';

// third-party
import { Helmet } from 'react-helmet-async';

// data stubs
import theme from '../../data/theme';
import { getOrderDetails } from '../../api/orders';
import { toastError } from '../toast/toastComponent';
import BlockLoader from '../blocks/BlockLoader';

export default function AccountPageOrderDetails() {
    const { orderId } = useParams();
    const [orderDetails, setOrderDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { formatMessage } = useIntl();

    function fetchOrder() {
        getOrderDetails(orderId, (success) => {
            setIsLoading(false);
            setOrderDetails(success.data);
        }, (fail) => {
            setIsLoading(false);
            toastError(fail);
        });
        setOrderDetails();
    }

    useEffect(() => {
        fetchOrder();
    }, [orderId]);

    if (isLoading) return <BlockLoader />;
    return (
        <React.Fragment>
            <Helmet>
                <title>{`Order Details — ${theme.name}`}</title>
            </Helmet>

            <div className="card">
                <div className="order-header">
                    <div className="order-header__actions">
                        <Link to="/account/orders" className="btn btn-xs btn-secondary">
                            {formatMessage({ id: 'backTolist' })}
                        </Link>
                    </div>
                    <h5 className="order-header__title">
                        {formatMessage({ id: 'order' })}
                        {' '}
                        #
                        {orderDetails?.code}
                    </h5>
                    <div className="order-header__subtitle">
                        {formatMessage({ id: 'wasPlacedOn' })}
                        {' '}
                        <mark className="order-header__date">{orderDetails?.date}</mark>
                        {' '}
                        {formatMessage({ id: 'andIsCurrently' })}
                        {' '}
                        <mark className="order-header__status">
                            {orderDetails?.orders[0]?.delivery_status}
                        </mark>
                        .
                    </div>
                </div>
                <div className="card-divider" />
                <div className="card-table">
                    <div className="table-responsive-sm">
                        <table>
                            <thead>
                                <tr>
                                    <th>{formatMessage({ id: 'product' })}</th>
                                    <th>{formatMessage({ id: 'total' })}</th>
                                </tr>
                            </thead>
                            <tbody className="card-table__body card-table__body--merge-rows">
                                <React.Fragment>
                                    {
                              orderDetails?.orders[0]?.products?.data.map((product) => (
                                  <tr key={product.id}>
                                      <td>{product.name}</td>
                                      <td>
                                          SAR
                                          {' '}
                                          {product.price}
                                      </td>
                                  </tr>
                              ))
                                    }
                                </React.Fragment>

                            </tbody>
                            <tbody className="card-table__body card-table__body--merge-rows">
                                <tr>
                                    <th>
                                        {formatMessage({ id: 'shipping' })}
                                    </th>
                                    <td>
                                        SAR
                                        {orderDetails?.shipping_address?.cost}
                                    </td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <th>{formatMessage({ id: 'total' })}</th>
                                    <td>
                                        SAR
                                        {' '}
                                        {orderDetails?.grand_total}
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}
