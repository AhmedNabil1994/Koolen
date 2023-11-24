// react
import React from 'react';
import { useIntl } from 'react-intl';

// third-party
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

// application
import closeIcon from '../../svg/cancel.png';

// data stubs
import theme from '../../data/theme';

function ShopPageOrderFailure() {
    const { formatMessage } = useIntl();

    return (
        <div className="block order-success">
            <Helmet>
                <title>{`Order Success — ${theme.name}`}</title>
            </Helmet>

            <div className="container">
                <div className="order-success__body">
                    <div className="order-success__header">
                        <img width="100px" src={closeIcon} alt="cancel" />
                        <h1 className="order-success__title">{formatMessage({ id: 'sorry' })}</h1>
                        <div className="order-success__subtitle mt-2">{formatMessage({ id: 'something_went_wrong' })}</div>
                        <div className="order-success__actions">
                            <Link to="/" className="btn btn-xs btn-secondary">{formatMessage({ id: 'goToHome' })}</Link>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default ShopPageOrderFailure;
