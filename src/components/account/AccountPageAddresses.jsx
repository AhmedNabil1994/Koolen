// react
import React, { useState, useEffect } from 'react';

// third-party
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

// data stubs
// import dataAddresses from '../../data/accountAddresses';
import { FormattedMessage } from 'react-intl';
import theme from '../../data/theme';
import { getAddresses, deleteAddress } from '../../api/addresses';
import { toastError, toastSuccess } from '../toast/toastComponent';
import BlockLoader from '../blocks/BlockLoader';

export default function AccountPageAddresses({ showOnly }) {
    const [addresses, setAddresses] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    function loadAddresses() {
        setIsLoading(true);
        getAddresses((success) => {
            setIsLoading(false);
            if (success.success) {
                setAddresses(success.data);
            } else {
                toastError(success);
            }
        }, (fail) => {
            setIsLoading(false);
            toastError(fail);
        });
    }

    useEffect(() => {
        loadAddresses();
    }, []);

    function removeAddress(e, id) {
        e.preventDefault();
        setIsLoading(true);
        deleteAddress(id, (success) => {
            if (success.success) {
                loadAddresses();
            } else {
                toastSuccess(success);
            }
        }, (fail) => {
            setIsLoading(false);
            toastError(fail);
        });
    }

    const addressesShow = addresses.map((address, i) => (
        <React.Fragment key={address.id}>
            <div className="addresses-list__item card address-card">
                {i === 0 && (
                    <div className="address-card__badge">
                        <FormattedMessage id="default" />
                    </div>
                )}

                <div className="address-card__body">
                    <div className="address-card__name">{`${address.address}`}</div>

                    <div className="address-card__row">
                        <div className="address-card__row-title">
                            <FormattedMessage id="postalCode" />
                        </div>
                        <div className="address-card__row-content">{address.postal_code}</div>
                    </div>
                    <div className="address-card__row">
                        <div className="address-card__row-title">
                            <FormattedMessage id="country" />
                        </div>
                        <div className="address-card__row-content">{address.country}</div>
                    </div>

                    <div className="address-card__row">
                        <div className="address-card__row-title">
                            <FormattedMessage id="city" />
                        </div>
                        <div className="address-card__row-content">{address.city}</div>
                    </div>
                    <div className="address-card__row">
                        <div className="address-card__row-title">
                            <FormattedMessage id="state" />
                        </div>
                        <div className="address-card__row-content">{address.state}</div>
                    </div>
                    <div className="address-card__row">
                        <div className="address-card__row-title">
                            <FormattedMessage id="phoneNumber" />
                        </div>
                        <div className="address-card__row-content">{address.phone}</div>
                    </div>
                    {
                        !showOnly
                        && (
                            <div className="address-card__footer">
                                <Link to={`/account/addresses/${address.id}`}><FormattedMessage id="edit" /></Link>
                                        &nbsp;&nbsp;
                                <Link to="/" onClick={(e) => removeAddress(e, address.id)}><FormattedMessage id="remove" /></Link>
                            </div>
                        )
                    }

                </div>
            </div>
            <div className="addresses-list__divider" />
        </React.Fragment>
    ));

    if (isLoading) return <BlockLoader />;
    return (

        <div className="addresses-list">
            <Helmet>
                <title>{`Address List — ${theme.name}`}</title>
            </Helmet>

            {
                !showOnly
                && (
                    <React.Fragment>
                        <Link to="/account/addresses/add" className="addresses-list__item addresses-list__item--new">
                            <div className="addresses-list__plus" />
                            {/* <div className="btn btn-secondary btn-sm">
                                <FormattedMessage id="addNew" />
                            </div> */}
                        </Link>
                        <div className="addresses-list__divider" />
                    </React.Fragment>

                )

            }
            {addressesShow}
        </div>
    );
}
