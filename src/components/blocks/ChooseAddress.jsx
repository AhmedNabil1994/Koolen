import React from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import BlockLoader from './BlockLoader';

const ChooseAddress = ({ address, isLoading }) => {
    const { formatMessage } = useIntl();
    if (isLoading && !address) return <BlockLoader />;

    if (address) {
        return (
            <div className="custom-address">
                <div className="card custom-address__card">
                    <div className="address-card">
                        <div className="address-card__body">
                            <div className="address-card__name">{`${address.address}`}</div>

                            <div className="address-card__row">
                                <div className="address-card__row-title">{formatMessage({ id: 'postalCode' })}</div>
                                <div className="address-card__row-content">{address.postal_code}</div>
                            </div>
                            <div className="address-card__row">
                                <div className="address-card__row-title">{formatMessage({ id: 'country' })}</div>
                                <div className="address-card__row-content">{address.country}</div>
                            </div>

                            <div className="address-card__row">
                                <div className="address-card__row-title">{formatMessage({ id: 'city' })}</div>
                                <div className="address-card__row-content">{address.city}</div>
                            </div>
                            <div className="address-card__row">
                                <div className="address-card__row-title">{formatMessage({ id: 'state' })}</div>
                                <div className="address-card__row-content">{address.state}</div>
                            </div>
                            <div className="address-card__row">
                                <div className="address-card__row-title">{formatMessage({ id: 'phoneNumber' })}</div>
                                <div className="address-card__row-content">{address.phone}</div>
                            </div>
                            <div className="address-card__footer " style={{ textAlign: 'end' }}>
                                <Link to={`/account/addresses/${address.id}`}>Edit</Link>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
    return null;
};

export default ChooseAddress;
