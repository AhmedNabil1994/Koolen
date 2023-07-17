// react
import React, { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';

// third-party
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { getRecentOrders } from '../../api/orders';

// data stubs
import theme from '../../data/theme';
import BlockLoader from '../blocks/BlockLoader';
import { toastError } from '../toast/toastComponent';

function AccountPageOrders() {
    const [isLoading, setIsLoading] = useState(true);
    const [orders, setOrders] = useState([]);
    const { formatMessage } = useIntl();

    function fetchAllOrders() {
        getRecentOrders((success) => {
            setOrders(success.data);
            setIsLoading(false);
        }, (fail) => {
            toastError(fail);
            setIsLoading(false);
        });
    }

    useEffect(() => {
        fetchAllOrders();
    }, []);

    const ordersList = orders.map((order) => (
        <tr key={order?.id}>
            <td><Link to={`/account/orders/${order.code}`}>{`#${order.code}`}</Link></td>
            <td>{order?.date}</td>
            <td>{order?.orders[0]?.delivery_status }</td>
            <td>{order?.grand_total}</td>
        </tr>
    ));
    if (isLoading) return <BlockLoader />;

    return (
        <div className="card">
            <Helmet>
                <title>{`Order History — ${theme.name}`}</title>
            </Helmet>

            <div className="card-header">
                <h5>{formatMessage({ id: 'ordersHistory' })}</h5>
            </div>
            <div className="card-divider" />
            <div className="card-table">
                <div className="table-responsive-sm">
                    <table>
                        <thead>
                            <tr>
                                <th>{formatMessage({ id: 'order' })}</th>
                                <th>{formatMessage({ id: 'date' })}</th>
                                <th>{formatMessage({ id: 'status' })}</th>
                                <th>{formatMessage({ id: 'total' })}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ordersList}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default AccountPageOrders;
