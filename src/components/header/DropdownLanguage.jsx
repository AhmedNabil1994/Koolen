// react
import React from 'react';

// third-party
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

// application
import Dropdown from './Dropdown';
import { localeChange } from '../../store/locale';
import { getCurrentLanguage } from '../../api/network';

function DropdownLanguage(props) {
    const { locale, localeChange: changeLocale } = props;

    const languages = [
        {
            title: <FormattedMessage id="arabic" />,
            locale: 'ar',
            code: 'Arabic',
            icon: 'images/languages/ar.png',
            icon_srcset: 'images/languages/ar.png',
        },
        {
            title: <FormattedMessage id="english" />,
            locale: 'en',
            code: 'EN',
            icon: 'images/languages/en.png',
            icon_srcset: 'images/languages/en.png',
        },
    ];

    const language = languages.find((x) => x.locale === locale);

    const title = (
        <React.Fragment>
            <FormattedMessage id="topbar.language" defaultMessage="Language" />
            {': '}
            <span className="topbar__item-value">{language.title}</span>
        </React.Fragment>
    );

    return (
        <Dropdown
            title={title}
            withIcons
            items={languages}
            onClick={(item) => {
                getCurrentLanguage(item.code);
                changeLocale(item.locale);
            }}
        />
    );
}

const mapStateToProps = (state) => ({
    locale: state.locale,
});

const mapDispatchToProps = {
    localeChange,
};

export default connect(mapStateToProps, mapDispatchToProps)(DropdownLanguage);
