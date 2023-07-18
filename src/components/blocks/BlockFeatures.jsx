// react
import React from 'react';
import { useIntl } from 'react-intl';

// third-party
import PropTypes from 'prop-types';

// application
import {
    Fi24Hours48Svg,
    FiFreeDelivery48Svg,
    FiPaymentSecurity48Svg,
    FiTag48Svg,
} from '../../svg';

export default function BlockFeatures(props) {
    const { layout } = props;
    const { formatMessage } = useIntl();

    return (
        <div className={`block block-features block-features--layout--${layout}`}>
            <div className="container">
                <div className="block-features__list">
                    <div className="block-features__item">
                        <div className="block-features__icon">
                            <FiFreeDelivery48Svg />
                        </div>
                        <div className="block-features__content">
                            <div className="block-features__title">{formatMessage({ id: 'freeShipping' })}</div>
                            <div className="block-features__subtitle">{formatMessage({ id: 'forOrdersFrom' })}</div>
                        </div>
                    </div>
                    <div className="block-features__divider" />
                    <div className="block-features__item">
                        <div className="block-features__icon">
                            <Fi24Hours48Svg />
                        </div>
                        <div className="block-features__content">
                            <div className="block-features__title">{formatMessage({ id: 'support24/7' })}</div>
                            <div className="block-features__subtitle">{formatMessage({ id: 'callUsAnyTime' })}</div>
                        </div>
                    </div>
                    <div className="block-features__divider" />
                    <div className="block-features__item">
                        <div className="block-features__icon">
                            <FiPaymentSecurity48Svg />
                        </div>
                        <div className="block-features__content">
                            <div className="block-features__title">
                                {formatMessage({ id: 'safety' })}
                            </div>
                            <div className="block-features__subtitle">{formatMessage({ id: 'securePayment' })}</div>
                        </div>
                    </div>
                    <div className="block-features__divider" />
                    <div className="block-features__item">
                        <div className="block-features__icon">
                            <FiTag48Svg />
                        </div>
                        <div className="block-features__content">
                            <div className="block-features__title">{formatMessage({ id: 'hotOffers' })}</div>
                            <div className="block-features__subtitle">{formatMessage({ id: 'discountsUpTo' })}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

BlockFeatures.propTypes = {
    layout: PropTypes.oneOf(['classic', 'boxed']),
};

BlockFeatures.defaultProps = {
    layout: 'classic',
};
