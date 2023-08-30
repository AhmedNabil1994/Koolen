// react
import React from 'react';

// third-party
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

export default function FooterLinks(props) {
    const { title, items } = props;

    const linksList = items.map((item, index) => (
        <li key={index} className="footer-links__item">
            <Link to={item.url} className="footer-links__link">
                <FormattedMessage id={item.title} />
            </Link>
        </li>
    ));

    return (
        <div className="site-footer__widget footer-links">
            <h5 className="footer-links__title"><FormattedMessage id={title} /></h5>
            <ul className="footer-links__list">
                {linksList}
            </ul>
        </div>
    );
}

FooterLinks.propTypes = {
    /** widget title */
    title: PropTypes.node.isRequired,
    /** array of links */
    items: PropTypes.array,
};

FooterLinks.defaultProps = {
    items: [],
};
