// react
import React, { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { connect } from 'react-redux';

// third-party
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

// application
import { Check100Svg } from '../../svg';
import { emptyCartFromItems } from '../../store/cart/cartActions';

// data stubs
import theme from '../../data/theme';

function ShopPageOrderSuccess(props) {
    const { formatMessage } = useIntl();

    useEffect(() => {
        props.emptyCartFromItems();
    }, []);

    return (
        <div className="block order-success">
            <Helmet>
                <title>{`Order Success — ${theme.name}`}</title>
            </Helmet>

            <div className="container">
                <div className="order-success__body">
                    <div className="order-success__header">
                        <Check100Svg className="order-success__icon" />
                        <h1 className="order-success__title">{formatMessage({ id: 'thankYou' })}</h1>
                        <div className="order-success__subtitle">{formatMessage({ id: 'yourOrderHasBeenReceived' })}</div>
                        <div className="order-success__actions">
                            <Link to="/" className="btn btn-xs btn-secondary">{formatMessage({ id: 'goToHome' })}</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapDispatchToProps = {
    emptyCartFromItems,
};

export default connect(null, mapDispatchToProps)(ShopPageOrderSuccess);
