// react
import React, { useState } from 'react';
import { connect } from 'react-redux';

// third-party
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

// application
import { useIntl } from 'react-intl';
import PageHeader from '../shared/PageHeader';

// data stubs
import theme from '../../data/theme';

// apis
import { loginUser, signUpUser } from '../../api/auth';
// store
import { LOGIN } from '../../store/auth/auth.types';
import { toastError, toastSuccess } from '../toast/toastComponent';
import { getToken } from '../../api/network';

function AccountPageLogin(props) {
    // props
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [regEmail, setRegEmail] = useState('');
    const [regName, setRegName] = useState('');
    const [regphone, setRegPhone] = useState('');
    const [regPass, setRegPass] = useState('');
    const [regMatchingPass, setRegMatchingPass] = useState('');
    const { dispatch } = props;
    const intl = useIntl();

    // const breadcrumb = [
    //     { title: 'Home', url: '/' },
    //     { title: 'My Account', url: '' },
    // ];

    function resetData() {
        setRegEmail('');
        setRegName('');
        setRegPhone('');
        setRegPass('');
        setRegMatchingPass('');
    }

    function submitLogin(e) {
        e.preventDefault();
        loginUser({ email, password }, (success) => {
            if (success.success) {
                const { access_token: token, user } = success;
                getToken(token);
                dispatch({ type: LOGIN, payload: { token, user } });
            } else {
                toastError(success);
            }
        }, (fail) => {
            toastError(fail);
        });
    }

    function register(e) {
        e.preventDefault();
        signUpUser({
            name: regName, email: regEmail, password: regPass, phone: regphone,
        }, (success) => {
            if (success.success) toastSuccess(success);
            resetData();
        },
        (fail) => {
            toastError(fail);
        });
    }

    return (
        <React.Fragment>
            <Helmet>
                <title>{`Login — ${theme.name}`}</title>
            </Helmet>

            <div className="mt-2">
                <PageHeader header="My Account" />
            </div>

            <div className="block">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 d-flex">
                            <div className="card flex-grow-1 mb-md-0">
                                <div className="card-body">
                                    <h3 className="card-title">{intl.formatMessage({ id: 'login.login' })}</h3>
                                    <form>
                                        <div className="form-group">
                                            <label htmlFor="login-email">{intl.formatMessage({ id: 'login.email' })}</label>
                                            <input
                                                id="login-email"
                                                type="email"
                                                className="form-control"
                                                placeholder={intl.formatMessage({ id: 'login.email' })}
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="login-password">{intl.formatMessage({ id: 'login.password' })}</label>
                                            <input
                                                id="login-password"
                                                type="password"
                                                className="form-control"
                                                placeholder={intl.formatMessage({ id: 'login.password' })}
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                            <small className="form-text text-muted">
                                                <Link to="/">{intl.formatMessage({ id: 'login.forgetPass' })}</Link>
                                            </small>
                                        </div>
                                        <button type="submit" onClick={submitLogin} className="btn btn-primary mt-2 mt-md-3 mt-lg-4">
                                            {intl.formatMessage({ id: 'login.login' })}
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 d-flex mt-4 mt-md-0">
                            <div className="card flex-grow-1 mb-0">
                                <div className="card-body">
                                    <h3 className="card-title">{intl.formatMessage({ id: 'login.register' })}</h3>
                                    <form>
                                        <div className="form-group">
                                            <label htmlFor="name">{intl.formatMessage({ id: 'login.fullName' })}</label>
                                            <input
                                                id="name"
                                                type="text"
                                                name="name"
                                                className="form-control"
                                                placeholder={intl.formatMessage({ id: 'login.fullName' })}
                                                value={regName}
                                                onChange={(e) => setRegName(e.target.value)}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="phone">{intl.formatMessage({ id: 'login.phone' })}</label>
                                            <input
                                                id="phone"
                                                type="text"
                                                name="phone"
                                                className="form-control"
                                                placeholder={intl.formatMessage({ id: 'login.phone' })}
                                                value={regphone}
                                                onChange={(e) => setRegPhone(e.target.value)}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="register-email">{intl.formatMessage({ id: 'login.email' })}</label>
                                            <input
                                                id="register-email"
                                                type="email"
                                                className="form-control"
                                                placeholder={intl.formatMessage({ id: 'login.email' })}
                                                value={regEmail}
                                                onChange={(e) => setRegEmail(e.target.value)}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="register-password">{intl.formatMessage({ id: 'login.password' })}</label>
                                            <input
                                                id="register-password"
                                                type="password"
                                                className="form-control"
                                                placeholder={intl.formatMessage({ id: 'login.password' })}
                                                value={regPass}
                                                onChange={(e) => setRegPass(e.target.value)}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="register-confirm">
                                                {intl.formatMessage({ id: 'login.repeatPass' })}
                                            </label>
                                            <input
                                                id="register-confirm"
                                                type="password"
                                                className="form-control"
                                                placeholder={intl.formatMessage({ id: 'login.repeatPass' })}
                                                value={regMatchingPass}
                                                onChange={(e) => setRegMatchingPass(e.target.value)}
                                            />
                                        </div>
                                        <button onClick={register} type="submit" className="btn btn-primary mt-2 mt-md-3 mt-lg-4">
                                            {intl.formatMessage({ id: 'login.register' })}
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

function mapStateToProps(state) {
    return {
        auth: state,
    };
}
export default connect(mapStateToProps)(AccountPageLogin);
