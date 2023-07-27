// react
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';

// third-party
import { Helmet } from 'react-helmet-async';

// application
import PageHeader from '../shared/PageHeader';

// blocks
import BlockMap from '../blocks/BlockMap';

// data stubs
import theme from '../../data/theme';
import getFooterData from '../../api/footer';
import { toastError } from '../toast/toastComponent';
import BlockLoader from '../blocks/BlockLoader';

function SitePageContactUs() {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState(null);
    // const [iframe, setIframe] = useState(null);
    const { formatMessage } = useIntl();

    function fetchFooterData() {
        getFooterData((success) => {
            const { contact_info: { contact_address, contact_email }, contact_numbers: { contact_phone, customers_service_number }, social_link } = success;
            setData({
                address: contact_address,
                email: contact_email,
                phone: [contact_phone, customers_service_number],
                social_link,
            });

            setIsLoading(false);
        }, (fail) => {
            setIsLoading(false);
            toastError(fail);
        });
    }
    useEffect(() => {
        fetchFooterData();
    }, []);

    if (isLoading) return <BlockLoader />;
    return (
        <React.Fragment>
            <Helmet>
                <title>{`Contact Us — ${theme.name}`}</title>
            </Helmet>

            <BlockMap />

            <PageHeader header={formatMessage({ id: 'footer.contactus' })} />

            <div className="block">
                <div className="container">
                    <div className="card mb-0">
                        <div className="card-body contact-us">
                            <div className="contact-us__container">
                                <div className="row">
                                    <div className="col-12 col-lg-6 pb-4 pb-lg-0">
                                        <h4 className="contact-us__header card-title">{formatMessage({ id: 'ourAddress' })}</h4>

                                        <div className="contact-us__address">
                                            <p>
                                                {data.email}
                                                <br />
                                                {formatMessage({ id: 'login.email' })}
                                                :
                                                {' '}
                                                {data.email}
                                                <br />
                                                {formatMessage({ id: 'login.phone' })}
                                                :
                                                {' '}
                                                {data.phone[0]}
                                                {' / '}
                                                {' '}
                                                {data.phone[1]}
                                            </p>

                                        </div>
                                    </div>
                                </div>
                                <h4 className="contact-us__header card-title mt-3">
                                    {formatMessage({ id: 'footer.followUs' })}
                                </h4>
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
                                        {
                                        data?.social_link?.snapchat
                                        && (
                                            <li className="social-links__item">
                                                <a
                                                    className="social-links__link social-links_link--type--twitter"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    href={data.social_link.snapchat}
                                                >
                                                    <i className="fab fa-snapchat-ghost" />
                                                </a>
                                            </li>
                                        )
                                        }
                                        {
                                        data?.social_link?.tiktok
                                        && (
                                            <li className="social-links__item">
                                                <a
                                                    className="social-links__link social-links_link--type--twitter"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    href={data.social_link.tiktok}
                                                >
                                                    <i className="fab fa-tiktok" />
                                                </a>
                                            </li>
                                        )
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default SitePageContactUs;
