// react
import React, { useState } from 'react';

// application
// import SocialLinks from '../shared/SocialLinks';
import { useIntl } from 'react-intl';
import { subscribe } from '../../api/footer';
import { toastError, toastSuccess } from '../toast/toastComponent';

export default function FooterNewsletter({ data }) {
    const [email, setEmail] = useState('');
    const intl = useIntl();

    function addEmail(e) {
        e.preventDefault();
        subscribe(email, (success) => {
            if (success.success) {
                toastSuccess(success);
            } else {
                toastError(success);
            }
        }, (fail) => { toastError(fail); });
    }

    return (
        <div className="site-footer__widget footer-newsletter">
            <h5 className="footer-newsletter__title">{intl.formatMessage({ id: 'footer.contactus' })}</h5>
            <form className="footer-newsletter__form">
                <label className="sr-only" htmlFor="footer-newsletter-address">
                    {intl.formatMessage({ id: 'login.email' })}
                </label>
                <input
                    type="text"
                    className="footer-newsletter__form-input form-control"
                    id="footer-newsletter-address"
                    placeholder={intl.formatMessage({ id: 'login.email' })}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit" onClick={addEmail} className="footer-newsletter__form-button btn btn-primary">{intl.formatMessage({ id: 'footer.subscribe' })}</button>
            </form>

            <div className="footer-newsletter__text footer-newsletter__text--social">
                {intl.formatMessage({ id: 'footer.followUs' })}

            </div>
            <div className="social-links  social-links--shape--circle">
                <ul className="social-links__list">
                    {
                        data?.social_link['facebook-f']
                        && (
                            <li className="social-links__item">
                                <a
                                    className="social-links__link social-links_link--type--facebook"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href={data.social_link['facebook-f']}
                                >
                                    <i className="fab fa-facebook" />
                                </a>
                            </li>
                        )
                    }
                    {
                        data?.social_link?.instagram
                        && (
                            <li className="social-links__item">
                                <a
                                    className="social-links__link social-links_link--type--facebook"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href={data.social_link.instagram}
                                >
                                    <i className="fab fa-instagram" />
                                </a>
                            </li>
                        )
                    }
                    {
                        data?.social_link?.twitter
                        && (
                            <li className="social-links__item">
                                <a
                                    className="social-links__link social-links_link--type--twitter"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href={data.social_link.twitter}
                                >
                                    <i className="fab fa-twitter" />
                                </a>
                            </li>
                        )
                    }
                </ul>
            </div>
        </div>
    );
}
