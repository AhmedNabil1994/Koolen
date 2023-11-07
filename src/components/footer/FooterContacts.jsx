// react
import React from 'react';

// data stubs
import { useIntl } from 'react-intl';

export default function FooterContacts({ data }) {
    const intl = useIntl();
    return (
        <div className="site-footer__widget footer-contacts">
            <h5 className="footer-contacts__title">{intl.formatMessage({ id: 'topbar.contacts' })}</h5>
            <ul className="footer-contacts__contacts">
                <li>
                    <i className="footer-contacts__icon fas fa-globe-americas" />
                    {data?.contact_info.contact_address}
                </li>
                <li>
                    <i className="footer-contacts__icon far fa-envelope" />
                    <a href={`mailto:${data?.contact_info.contact_email}`}>
                        {data?.contact_info.contact_email}
                    </a>
                </li>
                <li>
                    <i className="footer-contacts__icon fas fa-mobile-alt" />

                    <a href={`tel:${data?.contact_numbers.contact_phone}`}>
                        {data?.contact_numbers.contact_phone}
                    </a>
                    {/* <span className="mx-1">
                        {' / '}
                    </span>
                    <a href={`tel:${data?.contact_numbers.customers_service_number}`}>
                        {data?.contact_numbers.customers_service_number}
                    </a> */}
                </li>
            </ul>
        </div>
    );
}
