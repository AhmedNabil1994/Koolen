import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useIntl } from 'react-intl';

// third-party
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

// data stubs
import theme from '../../data/theme';
// api
import { getAddresses } from '../../api/addresses';

// components
import { toastError } from '../toast/toastComponent';
import BlockLoader from '../blocks/BlockLoader';
import { getRecentOrders } from '../../api/orders';

function AccountPageDashboard({ auth }) {
    const { name, email } = auth?.user;
    const [isLoading, setIsLoading] = useState(false);
    const [address, setAddress] = useState([]);
    const [isrecentOrdersLoading, setRecentOrdersLoading] = useState(true);
    const [recentOrders, setRecentOrders] = useState([]);
    const { formatMessage } = useIntl();

    function getAddress() {
        setIsLoading(true);
        getAddresses((success) => {
            setIsLoading(false);
            if (success.success) {
                const addresses = success.data;
                setAddress(addresses.splice(0, 1));
            } else {
                toastError(success);
            }
        }, (fail) => {
            setIsLoading(false);
            toastError(fail);
        });
    }

    function fetchRecentOrders() {
        getRecentOrders((success) => {
            setRecentOrdersLoading(false);
            setRecentOrders(success.data);
        }, (fail) => { toastError(fail); });
    }

    useEffect(() => {
        getAddress();
        fetchRecentOrders();
    }, []);

    const orders = recentOrders.map((order) => (
        <tr key={order?.id}>
            <td>
                <Link to={`/account/orders/${order?.code}`}>
                    #
                    {order?.code}
                </Link>
            </td>
            <td>{order?.date}</td>
            <td>{order?.orders[0]?.delivery_status}</td>
            <td>{order?.grand_total}</td>
        </tr>
    ));

    if (isLoading || isrecentOrdersLoading) return <BlockLoader />;

    return (
        <div className="dashboard">
            <Helmet>
                <title>{`My Account — ${theme.name}`}</title>
            </Helmet>

            <React.Fragment>
                <div className="dashboard__profile card profile-card">
                    <div className="card-body profile-card__body">
                        <div className="profile-card__avatar">
                            <img src="images/avatars/profile-avatar.png" alt="avatar" />
                        </div>
                        <div className="profile-card__name">{name}</div>
                        <div className="profile-card__email">{email}</div>
                        <div className="profile-card__edit">
                            <Link to="/account/profile" className="btn btn-secondary btn-sm">Edit Profile</Link>
                        </div>
                    </div>
                </div>
                {
                    address?.length
                        ? (
                            <div className="dashboard__address card address-card address-card--featured">
                                <div className="address-card__badge">{formatMessage({ id: 'defaultAddress' })}</div>
                                <div className="address-card__body">
                                    <div className="address-card__name">{`${address[0].address}`}</div>

                                    <div className="address-card__row">
                                        <div className="address-card__row-title">{formatMessage({ id: 'postalCode' })}</div>
                                        <div className="address-card__row-content">{address[0].postal_code}</div>
                                    </div>
                                    <div className="address-card__row">
                                        <div className="address-card__row-title">{formatMessage({ id: 'country' })}</div>
                                        <div className="address-card__row-content">{address[0].country}</div>
                                    </div>

                                    <div className="address-card__row">
                                        <div className="address-card__row-title">{formatMessage({ id: 'city' })}</div>
                                        <div className="address-card__row-content">{address[0].city}</div>
                                    </div>
                                    <div className="address-card__row">
                                        <div className="address-card__row-title">{formatMessage({ id: 'state' })}</div>
                                        <div className="address-card__row-content">{address[0].state}</div>
                                    </div>
                                    <div className="address-card__row">
                                        <div className="address-card__row-title">{formatMessage({ id: 'phoneNumber' })}</div>
                                        <div className="address-card__row-content">{address[0].phone}</div>
                                    </div>
                                    <div className="address-card__footer">
                                        <Link to={`/account/addresses/${address[0].id}`}>{formatMessage({ id: 'edit' })}</Link>
                                        &nbsp;&nbsp;
                                    </div>
                                </div>

                            </div>
                        ) : null
                }

                {orders.length > 0 ? (
                    <div className="dashboard__orders card">
                        <div className="card-header">
                            <h5>{formatMessage({ id: 'recentOrder' })}</h5>
                        </div>
                        <div className="card-divider" />
                        <div className="card-table">
                            {
                                orders.length > 0
                                    ? (
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
                                                <tbody>{orders}</tbody>
                                            </table>
                                        </div>
                                    )
                                    : null
                            }

                        </div>
                    </div>
                ) : null}

            </React.Fragment>

        </div>
    );
}

const mapStateToProps = (state) => ({ auth: state.auth });

export default connect(mapStateToProps)(AccountPageDashboard);
