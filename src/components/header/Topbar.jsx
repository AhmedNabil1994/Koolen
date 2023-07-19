// react
import React from 'react';

// third-party
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

// application
import Dropdown from './Dropdown';
import DropdownLanguage from './DropdownLanguage';

function Topbar() {
    const links = [
        { title: <FormattedMessage id="topbar.aboutUs" defaultMessage="About Us" />, url: '/site/about-us' },
        { title: <FormattedMessage id="topbar.contacts" defaultMessage="Contacts" />, url: '/site/contact-us' },
    ];

    const accountLinks = [
        { title: <FormattedMessage id="account.dashboard" defaultMessage="Dashboard" />, url: '/account/dashboard' },
        { title: <FormattedMessage id="account.editProfile" />, url: '/account/profile' },
        { title: <FormattedMessage id="account.orderHistory" />, url: '/account/orders' },
        { title: <FormattedMessage id="account.addresses" />, url: '/account/addresses' },
        { title: <FormattedMessage id="login.password" />, url: '/account/password' },
    ];

    const linksList = links.map((item, index) => (
        <div key={index} className="topbar__item topbar__item--link">
            <Link className="topbar-link" to={item.url}>
                {item.title}
            </Link>
        </div>
    ));

    return (
        <div className="site-header__topbar topbar">
            <div className="topbar__container container">
                <div className="topbar__row">
                    {linksList}
                    <div className="topbar__spring" />
                    {
                        false
                        && (
                            <div className="topbar__item">
                                <Dropdown
                                    title={<FormattedMessage id="topbar.myAccount" defaultMessage="My Account" />}
                                    items={accountLinks}
                                />
                            </div>
                        )
                    }

                    <div className="topbar__item">
                        <DropdownLanguage />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Topbar;
