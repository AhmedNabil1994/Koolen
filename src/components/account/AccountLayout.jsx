// react
import React from 'react';
import { connect } from 'react-redux';
import { useIntl } from 'react-intl';

// third-party
import classNames from 'classnames';
import {
    Link, matchPath,
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

function AccountLayout(props) {
    const { match, location } = props;
    const intl = useIntl();

    const links = [
        { title: intl.formatMessage({ id: 'account.dashboard' }), url: 'dashboard' },
        { title: intl.formatMessage({ id: 'account.editProfile' }), url: 'profile' },
        { title: intl.formatMessage({ id: 'account.addresses' }), url: 'addresses' },
        { title: intl.formatMessage({ id: 'account.addAddress' }), url: 'addresses/add' },
        { title: intl.formatMessage({ id: 'changePassword' }), url: 'password' },
        { title: intl.formatMessage({ id: 'login.logout' }), url: 'login', isLogout: true },
    ].map((link) => {
        const url = `${match.url}/${link.url}`;
        const isActive = matchPath(location.pathname, { path: url, exact: true });
        const classes = classNames('account-nav__item', {
            'account-nav__item--active': isActive,
        });

        return (

            <React.Fragment>
                {link.isLogout ? (
                    null
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
            <div className="mt-2" />
            <PageHeader header={intl.formatMessage({ id: 'myAccount' })} />

            <div className="block">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-lg-3 d-flex">
                            <div className="account-nav flex-grow-1">
                                <h4 className="account-nav__title">{intl.formatMessage({ id: 'navigation' })}</h4>
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
