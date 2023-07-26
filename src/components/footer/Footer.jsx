// react
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

// application
import FooterContacts from './FooterContacts'; import FooterLinks from './FooterLinks'; import FooterNewsletter from './FooterNewsletter'; import ToTop from './ToTop'; // data stubs
// import theme from '../../data/theme';
import getFooterData from '../../api/footer';
import { toastError } from '../toast/toastComponent';
import BlockLoader from '../blocks/BlockLoader';
import { LogoSmallSvg } from '../../svg';

function Footer(props) {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState(null);
    console.log();

    useEffect(() => {
        getFooterData((success) => {
            if (success) {
                setIsLoading(false);
                setData(success);
            } else {
                toastError(success);
            }
        }, (fail) => {
            setIsLoading(false);
            toastError(fail);
        });
    }, []);

    // console.log('footerData: ', data);

    const informationLinks = [
        { title: 'footer.aboutus', url: '/site/about-us' },
        { title: 'footer.contactus', url: '/site/contact-us' },
        { title: 'footer.terms-conditions', url: '/site/terms' },
        { title: 'footer.shipment-policy', url: '/site/shipment-policy' },
        { title: 'footer.refundPolicy', url: '/site/refund-policy' },
        { title: 'footer.privacyPolicy', url: '/site/privacy-policy' },
        { title: 'footer.faqs', url: '/site/faq' },
    ];

    const accountLinks = [
        { title: 'account.dashboard', url: '/account/dashboard' },
        { title: 'account.editProfile', url: '/account/profile' },
        { title: 'account.orderHistory', url: '/account/orders' },
        { title: 'account.addresses', url: '/account/addresses' },
    ];

    if (isLoading) return <BlockLoader />;
    return (
        <div className="site-footer">
            <div className="container">
                <div className="site-footer__widgets">
                    <div className="row">
                        <div className="col-12 col-md-6 col-lg-4">
                            <FooterContacts data={data} />
                        </div>
                        <div className="col-6 col-md-3 col-lg-2">
                            <FooterLinks title="topbar.information" data={data} items={informationLinks} />
                        </div>
                        <div className="col-6 col-md-3 col-lg-2">
                            {
                            props?.auth.token
                                ? <FooterLinks title="topbar.myAccount" data={data} items={accountLinks} />
                                : null
                            }
                        </div>
                        <div className="col-12 col-md-12 col-lg-4">
                            <FooterNewsletter data={data} />
                        </div>
                    </div>
                </div>

                <div className="site-footer__bottom">
                    <div className="site-footer__copyright">
                        {data?.copyright_text}
                    </div>
                    <div className="site-footer__payments">
                        <LogoSmallSvg />
                    </div>

                </div>
            </div>
            <ToTop />
        </div>
    );
}
const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps)(Footer);
