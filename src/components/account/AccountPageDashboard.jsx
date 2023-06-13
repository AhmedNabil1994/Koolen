import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

// third-party
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

// data stubs
import allOrders from '../../data/accountOrders';
import theme from '../../data/theme';
// api
import { getAddresses } from '../../api/addresses';

// components
import { toastError } from '../toast/toastComponent';
import BlockLoader from '../blocks/BlockLoader';

function AccountPageDashboard({ auth }) {
    const { name, email } = auth?.user;
    const [isLoading, setIsLoading] = useState(false);
    const [address, setAddress] = useState([]);

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

    useEffect(() => {
        getAddress();
    }, []);

    const orders = allOrders.slice(0, 3).map((order) => (
        <tr key={order.id}>
            <td>
                <Link to="/account/orders/5">
                    #
                    {order.id}
                </Link>
            </td>
            <td>{order.date}</td>
            <td>{order.status}</td>
            <td>{order.total}</td>
        </tr>
    ));

    if (isLoading) return <BlockLoader />;

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
                                <div className="address-card__badge">Default Address</div>
                                <div className="address-card__body">
                                    <div className="address-card__name">{`${address[0].address}`}</div>

                                    <div className="address-card__row">
                                        <div className="address-card__row-title">Postal Code</div>
                                        <div className="address-card__row-content">{address[0].postal_code}</div>
                                    </div>
                                    <div className="address-card__row">
                                        <div className="address-card__row-title">Country</div>
                                        <div className="address-card__row-content">{address[0].country}</div>
                                    </div>

                                    <div className="address-card__row">
                                        <div className="address-card__row-title">City</div>
                                        <div className="address-card__row-content">{address[0].city}</div>
                                    </div>
                                    <div className="address-card__row">
                                        <div className="address-card__row-title">State</div>
                                        <div className="address-card__row-content">{address[0].state}</div>
                                    </div>
                                    <div className="address-card__row">
                                        <div className="address-card__row-title">Phone Number</div>
                                        <div className="address-card__row-content">{address[0].phone}</div>
                                    </div>
                                    <div className="address-card__footer">
                                        <Link to={`/account/addresses/${address[0].id}`}>Edit</Link>
                                        &nbsp;&nbsp;
                                    </div>
                                </div>
                                {/* <div className="address-card__body">
                                    <div className="address-card__name">{`${address.address}`}</div>
                                    <div className="address-card__row">
                                        {address.country}
                                        <br />
                                        {address.postal_code}
                                        ,
                                        {address.city}
                                        <br />
                                        {address.address}
                                    </div>
                                    <div className="address-card__row">
                                        <div className="address-card__row-title">Phone Number</div>
                                        <div className="address-card__row-content">{address.phone}</div>
                                    </div>
                                    <div className="address-card__row">
                                        <div className="address-card__row-title">Email Address</div>
                                        <div className="address-card__row-content">{address.email}</div>
                                    </div>
                                    <div className="address-card__footer">
                                        <Link to="/account/addresses/5">Edit Address</Link>
                                    </div>
                                </div> */}
                            </div>
                        ) : null
                }

                <div className="dashboard__orders card">
                    <div className="card-header">
                        <h5>Recent Orders</h5>
                    </div>
                    <div className="card-divider" />
                    <div className="card-table">
                        <div className="table-responsive-sm">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Order</th>
                                        <th>Date</th>
                                        <th>Status</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </React.Fragment>

        </div>
    );
}

const mapStateToProps = (state) => ({ auth: state.auth });

export default connect(mapStateToProps)(AccountPageDashboard);
