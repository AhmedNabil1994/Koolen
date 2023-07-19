// react
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';

// third-party
import { Helmet } from 'react-helmet-async';
import getInfoData from '../../api/info';
// import { Link } from 'react-router-dom';

// data stubs
import theme from '../../data/theme';
import { toastError } from '../toast/toastComponent';
import BlockLoader from '../blocks/BlockLoader';

function SitePageFaq() {
    const { formatMessage } = useIntl();
    const [content, setContent] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getInfoData((success) => {
            setIsLoading(false);
            setContent(success.data.about_us);
        }, (fail) => {
            setIsLoading(false);
            toastError(fail);
        });
    }, []);
    if (isLoading) return <BlockLoader />;

    return (

        <div className="block about-us">
            <Helmet>
                <title>{`FAQs — ${theme.name}`}</title>
            </Helmet>

            <div className="about-us__image" style={{ backgroundImage: 'url("images/aboutus.jpg")' }} />
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-xl-10">
                        <div className="about-us__body">
                            <div className="about-us__container">
                                <h1 className="about-us__title">{formatMessage({ id: 'topbar.FAQs' }) }</h1>
                                <div className="about-us__text" dangerouslySetInnerHTML={{ __html: content }} />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default SitePageFaq;
