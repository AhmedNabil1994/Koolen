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

function SitePageAboutUs() {
    const { formatMessage } = useIntl();
    const [content, setContent] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getInfoData((success) => {
            setIsLoading(false);

            if (success.data) {
                const htmlContent = success.data.filter((item) => item.slug === 'return-policy')[0].content;
                setContent(htmlContent);
            }
        }, (fail) => {
            setIsLoading(false);
            toastError(fail);
        });
    }, []);
    if (isLoading) return <BlockLoader />;

    return (

        <div className="block about-us">
            <Helmet>
                <title>{`About Us — ${theme.name}`}</title>
            </Helmet>

            {/* background: url("images/about-us1.jpg") no-repeat; */}
            <div className="about-us__image" style={{ backgroundImage: 'url("images/about-us2.jpg")' }} />
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-xl-10">
                        <div className="about-us__body">
                            <div className="about-us__container">
                                <h1 className="about-us__title">{formatMessage({ id: 'footer.refundPolicy' }) }</h1>
                                <div className="about-us__text" dangerouslySetInnerHTML={{ __html: content }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SitePageAboutUs;
