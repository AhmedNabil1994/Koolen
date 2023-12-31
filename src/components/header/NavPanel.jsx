// react
import React from 'react';

// third-party
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// application
import CartIndicator from './IndicatorCart';
// import Departments from './Departments';
import Indicator from './Indicator';
import IndicatorAccount from './IndicatorAccount';
import IndicatorSearch from './IndicatorSearch';
import NavLinks from './NavLinks';
// , LogoSmallSvg
import { Heart20Svg, LogoSmallSvg } from '../../svg';
// import LogoImg from '../../imgs/logo.png';

function NavPanel(props) {
    const { layout, wishlist } = props;

    let logo = null;
    // const departments = null;
    let searchIndicator;

    if (layout === 'compact') {
        logo = (
            <div className="nav-panel__logo">
                <Link to="/">
                    <LogoSmallSvg />
                </Link>
            </div>
        );

        searchIndicator = <IndicatorSearch />;
    }

    return (
        <div className="nav-panel">
            <div className="nav-panel__container container">
                <div className="nav-panel__row">
                    {logo}

                    <div className="nav-panel__nav-links nav-links">
                        <NavLinks />
                    </div>
                    <div className="nav-panel__indicators">
                        {searchIndicator}
                        <Indicator url="/shop/wishlist" value={wishlist.length} icon={<Heart20Svg />} />
                        <CartIndicator />
                        <IndicatorAccount />
                    </div>
                </div>
            </div>
        </div>
    );
}

NavPanel.propTypes = {
    /** one of ['default', 'compact'] (default: 'default') */
    layout: PropTypes.oneOf(['default', 'compact']),
};

NavPanel.defaultProps = {
    layout: 'default',
};

const mapStateToProps = (state) => ({
    wishlist: state.wishlist,
});

const mapDispatchToProps = {};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(NavPanel);
