// react
import React from 'react';
import { connect } from 'react-redux';

// third-party
import classNames from 'classnames';
import {
    Link,
    matchPath,
    Redirect,
    Switch,
    Route,
} from 'react-router-dom';

// application
import PageHeader from '../shared/PageHeader';

// pages
import AccountPageAddresses from './AccountPageAddresses';
import AccountPageDashboard from './AccountPageDashboard';
import AccountPageEditAddress from './AccountPageEditAddress';
import AccountPageOrderDetails from './AccountPageOrderDetails';
import AccountPageOrders from './AccountPageOrders';
import AccountPagePassword from './AccountPagePassword';
import AccountPageProfile from './AccountPageProfile';

// component
import { toastError } from '../toast/toastComponent';

// store
import { LOGOUT } from '../../store/auth/auth.types';
// api
import { logout } from '../../api/auth';

function AccountLayout(props) {
    const { match, location, dispatch } = props;

    const breadcrumb = [
        { title: 'Home', url: '' },
        { title: 'My Account', url: '' },
    ];

    const links = [
        { title: 'Dashboard', url: 'dashboard' },
        { title: 'Edit Profile', url: 'profile' },
        { title: 'Order History', url: 'orders' },
        { title: 'Order Details', url: 'orders/5' },
        { title: 'Addresses', url: 'addresses' },
        { title: 'Add Address', url: 'addresses/add' },
        { title: 'Password', url: 'password' },
        { title: 'Logout', url: 'login', isLogout: true },
    ].map((link) => {
        const url = `${match.url}/${link.url}`;
        const isActive = matchPath(location.pathname, { path: url, exact: true });
        const classes = classNames('account-nav__item', {
            'account-nav__item--active': isActive,
        });

        function logoutUser(e) {
            e.preventDefault();
            logout((success) => {
                if (success.success) {
                    dispatch({ type: LOGOUT });
                } else {
                    toastError(success);
                }
            }, (fail) => {
                toastError(fail);
                dispatch({ type: LOGOUT });
            });
        }

        return (

            <React.Fragment>
                {link.isLogout ? (
                    <li key={link.url} className={classes}>
                        <a
                            href="/"
                            onClick={logoutUser}
                        >
                            {link.title}

                        </a>
                    </li>
                ) : (
                    <li key={link.url} className={classes}>
                        <Link to={url}>{link.title}</Link>
                    </li>
                ) }

            </React.Fragment>

        );
    });

    return (
        <React.Fragment>
            <PageHeader header="My Account" breadcrumb={breadcrumb} />

            <div className="block">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-lg-3 d-flex">
                            <div className="account-nav flex-grow-1">
                                <h4 className="account-nav__title">Navigation</h4>
                                <ul>{links}</ul>
                            </div>
                        </div>
                        <div className="col-12 col-lg-9 mt-4 mt-lg-0">
                            <Switch>
                                <Redirect exact from={match.path} to={`${match.path}/dashboard`} />
                                <Route exact path={`${match.path}/dashboard`} component={AccountPageDashboard} />
                                <Route exact path={`${match.path}/profile`} component={AccountPageProfile} />
                                <Route exact path={`${match.path}/orders`} component={AccountPageOrders} />
                                <Route exact path={`${match.path}/orders/:orderId`} component={AccountPageOrderDetails} />
                                <Route exact path={`${match.path}/addresses`} component={AccountPageAddresses} />
                                <Route exact path={`${match.path}/addresses/:addressId`} component={AccountPageEditAddress} />
                                <Route exact path={`${match.path}/password`} component={AccountPagePassword} />
                            </Switch>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default connect(() => ({}))(AccountLayout);
