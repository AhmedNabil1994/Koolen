// react
import React from 'react';

// third-party
import PropTypes from 'prop-types';

// application
import NavPanel from './NavPanel';
import Topbar from './Topbar';

function Header(props) {
    const { layout } = props;
    let bannerSection;

    return (
        <div className="site-header">
            <Topbar />
            {bannerSection}
            <div className="site-header__nav-panel">
                <NavPanel layout={layout} />
            </div>
        </div>
    );
}

Header.propTypes = {
    /** one of ['default', 'compact'] (default: 'default') */
    layout: PropTypes.oneOf(['default', 'compact']),
};

Header.defaultProps = {
    layout: 'default',
};

export default Header;
