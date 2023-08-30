// react
import React from 'react';
import { connect } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';

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
    const { dispatch } = props;
    const intl = useIntl();
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email(intl.formatMessage({ id: 'validation.email.format' })).required(intl.formatMessage({ id: 'validation.email.required' })),
            password: Yup.string().min(6, intl.formatMessage({ id: 'validation.password.format' })).required(intl.formatMessage({ id: 'validation.password.required' })),
        }),
        onSubmit: (values) => {
            const { email, password } = values;
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
        },
    });
    const registrationFormik = useFormik({
        initialValues: {
            fullName: '',
            email: '',
            phone: '',
            password: '',
            repeatPassword: '',
        },
        validationSchema: Yup.object({
            fullName: Yup.string().required(intl.formatMessage({ id: 'validation.fullName.required' })),
            email: Yup.string().email(intl.formatMessage({ id: 'validation.email.format' })).required(intl.formatMessage({ id: 'validation.email.required' })),
            phone: Yup.number().typeError(intl.formatMessage({ id: 'validation.phone.format' })).required(intl.formatMessage({ id: 'validation.phone.required' })).positive(intl.formatMessage({ id: 'validation.phone.format' }))
                .integer(intl.formatMessage({ id: 'validation.phone.format' })),
            password: Yup.string().min(6, intl.formatMessage({ id: 'validation.password.format' })).required(intl.formatMessage({ id: 'validation.repeatPassword.required' })),
            repeatPassword: Yup.string().required(intl.formatMessage({ id: 'validation.repeatPassword.format' })).oneOf([Yup.ref('password'), null], intl.formatMessage({ id: 'validation.repeatPassword.format' })),
        }),
        onSubmit(values) {
            const {
                fullName, phone, email, password,
            } = values;
            signUpUser({
                name: fullName, email, password, phone,
            }, (success) => {
                if (success.success) {
                    toastSuccess(success);
                    registrationFormik.resetForm();
                } else {
                    toastError(success);
                    registrationFormik.resetForm();
                }
            },
            (fail) => {
                toastError(fail);
            });
        },
    });

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
                                    <form className="needs-validation" onSubmit={formik.handleSubmit} noValidate>
                                        <div className="form-group needs-validation">
                                            <label htmlFor="login-email">{intl.formatMessage({ id: 'login.email' })}</label>
                                            <input
                                                id="login-email"
                                                type="email"
                                                name="email"
                                                dir="ltr"
                                                placeholder={intl.formatMessage({ id: 'login.email' })}
                                                className={`form-control ${formik.errors.email && formik.touched.email && 'is-invalid'}`}
                                                onChange={formik.handleChange}
                                                value={formik.values.email}
                                                {...formik.getFieldProps('email')}
                                            />
                                            {
                                                formik.touched.email && formik.errors.email
                                                    ? (
                                                        <div className="invalid-feedback">
                                                            {formik.errors.email}
                                                        </div>
                                                    )
                                                    : null
                                            }
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="login-password">{intl.formatMessage({ id: 'login.password' })}</label>
                                            <input
                                                id="login-password"
                                                type="password"
                                                name="password"
                                                className={`form-control ${formik.touched.password && formik.errors.password && ' is-invalid'}`}
                                                placeholder={intl.formatMessage({ id: 'login.password' })}
                                                onChange={formik.handleChange}
                                                value={formik.values.password}
                                                {...formik.getFieldProps('password')}
                                            />
                                            {
                                                formik.touched.password && formik.errors.password
                                                    ? (
                                                        <div className="invalid-feedback">
                                                            {formik.errors.password}
                                                        </div>
                                                    )
                                                    : null
                                            }
                                        </div>
                                        <small className="form-text text-muted">
                                            <Link to="/account/forget-password">{intl.formatMessage({ id: 'login.forgetPass' })}</Link>
                                        </small>
                                        <button type="submit" className="btn btn-primary mt-2 mt-md-3 mt-lg-4">
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
                                    <form onSubmit={registrationFormik.handleSubmit}>
                                        <div className="form-group">
                                            <label htmlFor="name">{intl.formatMessage({ id: 'login.fullName' })}</label>
                                            <input
                                                id="name"
                                                type="text"
                                                name="fullName"
                                                className={`form-control ${registrationFormik.touched.fullName && registrationFormik.errors.fullName && 'is-invalid'}`}
                                                placeholder={intl.formatMessage({ id: 'login.fullName' })}
                                                value={registrationFormik.values.fullName}
                                                onChange={registrationFormik.handleChange}
                                                {...registrationFormik.getFieldProps('fullName')}
                                            />
                                            {
                                                registrationFormik.touched.fullName && registrationFormik.errors.fullName
                                                    ? (
                                                        <div className="invalid-feedback">
                                                            {registrationFormik.errors.fullName}
                                                        </div>
                                                    )
                                                    : null
                                            }
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="phone">{intl.formatMessage({ id: 'login.phone' })}</label>
                                            <input
                                                id="phone"
                                                type="text"
                                                name="phone"
                                                dir="ltr"
                                                className={`form-control ${registrationFormik.touched.phone && registrationFormik.errors.phone && 'is-invalid'}`}
                                                placeholder={intl.formatMessage({ id: 'login.phone' })}
                                                value={registrationFormik.values.phone}
                                                onChange={registrationFormik.handleChange}
                                                {...registrationFormik.getFieldProps('phone')}
                                            />
                                            {registrationFormik.touched.phone && registrationFormik.errors.phone
                                                ? (
                                                    <div className="invalid-feedback">
                                                        {registrationFormik.errors.phone}
                                                    </div>
                                                )
                                                : null }
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="register-email">{intl.formatMessage({ id: 'login.email' })}</label>
                                            <input
                                                id="register-email"
                                                type="email"
                                                name="email"
                                                dir="ltr"
                                                className={`form-control ${registrationFormik.touched.email && registrationFormik.errors.email && 'is-invalid'}`}
                                                placeholder={intl.formatMessage({ id: 'login.email' })}
                                                value={registrationFormik.values.email}
                                                onChange={registrationFormik.handleChange}
                                                {...registrationFormik.getFieldProps('email')}
                                            />
                                            {registrationFormik.touched.email && registrationFormik.errors.email
                                                ? (
                                                    <div className="invalid-feedback">
                                                        {registrationFormik.errors.email}
                                                    </div>
                                                )
                                                : null }
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="register-password">{intl.formatMessage({ id: 'login.password' })}</label>
                                            <input
                                                id="register-password"
                                                type="password"
                                                name="password"
                                                className={`form-control ${registrationFormik.touched.password && registrationFormik.errors.password && 'is-invalid'}`}
                                                placeholder={intl.formatMessage({ id: 'login.password' })}
                                                value={registrationFormik.values.password}
                                                onChange={registrationFormik.handleChange}
                                                {...registrationFormik.getFieldProps('password')}
                                            />
                                            {registrationFormik.touched.password && registrationFormik.errors.password
                                                ? (
                                                    <div className="invalid-feedback">
                                                        {registrationFormik.errors.password}
                                                    </div>
                                                )
                                                : null }
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="register-confirm">
                                                {intl.formatMessage({ id: 'login.repeatPass' })}
                                            </label>
                                            <input
                                                id="register-confirm"
                                                type="password"
                                                name="repeatPassword"
                                                className={`form-control ${registrationFormik.touched.repeatPassword && registrationFormik.errors.repeatPassword && 'is-invalid'}`}
                                                placeholder={intl.formatMessage({ id: 'login.repeatPass' })}
                                                value={registrationFormik.values.repeatPassword}
                                                onChange={registrationFormik.handleChange}
                                                {...registrationFormik.getFieldProps('repeatPassword')}
                                            />
                                            {registrationFormik.touched.repeatPassword && registrationFormik.errors.repeatPassword
                                                ? (
                                                    <div className="invalid-feedback">
                                                        {registrationFormik.errors.repeatPassword}
                                                    </div>
                                                )
                                                : null }
                                        </div>
                                        <button type="submit" className="btn btn-primary mt-2 mt-md-3 mt-lg-4">
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
