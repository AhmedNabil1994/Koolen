// react
import React, { useState, useEffect } from 'react';

// third-party
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

// data stubs
// import dataAddresses from '../../data/accountAddresses';
import theme from '../../data/theme';
import { getAddresses, deleteAddress } from '../../api/addresses';
import { toastError, toastSuccess } from '../toast/toastComponent';
import BlockLoader from '../blocks/BlockLoader';

export default function AccountPageAddresses() {
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
                {i === 0 && <div className="address-card__badge">Default</div>}

                <div className="address-card__body">
                    <div className="address-card__name">{`${address.address}`}</div>

                    <div className="address-card__row">
                        <div className="address-card__row-title">Postal Code</div>
                        <div className="address-card__row-content">{address.postal_code}</div>
                    </div>
                    <div className="address-card__row">
                        <div className="address-card__row-title">Country</div>
                        <div className="address-card__row-content">{address.country}</div>
                    </div>

                    <div className="address-card__row">
                        <div className="address-card__row-title">City</div>
                        <div className="address-card__row-content">{address.city}</div>
                    </div>
                    <div className="address-card__row">
                        <div className="address-card__row-title">State</div>
                        <div className="address-card__row-content">{address.state}</div>
                    </div>
                    <div className="address-card__row">
                        <div className="address-card__row-title">Phone Number</div>
                        <div className="address-card__row-content">{address.phone}</div>
                    </div>
                    <div className="address-card__footer">
                        <Link to={`/account/addresses/${address.id}`}>Edit</Link>
                        &nbsp;&nbsp;
                        <Link to="/" onClick={(e) => removeAddress(e, address.id)}>Remove</Link>
                    </div>
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

            <Link to="/account/addresses/add" className="addresses-list__item addresses-list__item--new">
                <div className="addresses-list__plus" />
                <div className="btn btn-secondary btn-sm">
                    Add New
                </div>
            </Link>
            <div className="addresses-list__divider" />
            {addressesShow}
        </div>
    );
}
