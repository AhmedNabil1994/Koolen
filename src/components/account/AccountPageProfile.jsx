// react
import React from 'react';
import { useIntl } from 'react-intl';
import { connect } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';

// third-party
import { Helmet } from 'react-helmet-async';

// data stubs
import theme from '../../data/theme';

// apis
import { editUserInfo } from '../../api/auth';
import { toastSuccess, toastError } from '../toast/toastComponent';
// store
import { EDIT_PROFILE } from '../../store/auth/auth.types';

// auth,
function AccountPageProfile({ auth, dispatch }) {
    const intl = useIntl();
    const formik = useFormik({
        initialValues: {
            fullName: auth?.user?.name || '',
            email: auth?.user?.email || '',
            phone: auth?.user?.phone || '',
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            fullName: Yup.string().required(intl.formatMessage({ id: 'validation.fullName.required' })),
            email: Yup.string().email(intl.formatMessage({ id: 'validation.email.format' })).required(intl.formatMessage({ id: 'validation.email.required' })),
            phone: Yup.number().typeError(intl.formatMessage({ id: 'validation.phone.format' })).required(intl.formatMessage({ id: 'validation.phone.required' })).positive(intl.formatMessage({ id: 'validation.phone.format' }))
                .integer(intl.formatMessage({ id: 'validation.phone.format' })),
        }),
        onSubmit: (values) => {
            const {
                fullName, email, phone,
            } = values;
            editUserInfo({
                name: fullName, email, phone,
            }, (success) => {
                if (success.success) {
                    toastSuccess(success);
                    const { user } = success;

                    dispatch({ type: EDIT_PROFILE, payload: { user } });
                } else { toastError(success); }
            }, (fail) => { toastError(fail); });
        },
    });

    return (
        <div className="card">
            <Helmet>
                <title>{`Profile — ${theme.name}`}</title>
            </Helmet>

            <div className="card-header">
                <h5>{intl.formatMessage({ id: 'editProfile' })}</h5>
            </div>
            <div className="card-divider" />
            <div className="card-body">
                <div className="row no-gutters">
                    <form
                        className="col-12 col-lg-7 col-xl-6 needs-validation"
                        onSubmit={formik.handleSubmit}
                        noValidate
                    >
                        <div className="form-group">
                            <label htmlFor="fullName">{intl.formatMessage({ id: 'login.fullName' })}</label>
                            <input
                                id="fullName"
                                type="text"
                                placeholder={intl.formatMessage({ id: 'login.fullName' })}
                                name="fullName"
                                className={`form-control ${
                                    formik.errors.fullName && formik.touched.fullName && 'is-invalid'
                                }`}
                                onChange={formik.handleChange}
                                value={formik.values.fullName}
                                {...formik.getFieldProps('fullName')}
                            />
                            {formik.touched.fullName && formik.errors.fullName ? (
                                <div className="invalid-feedback">{formik.errors.fullName}</div>
                            ) : null}
                        </div>
                        <div className="form-group">
                            <label htmlFor="profile-email">{intl.formatMessage({ id: 'login.email' })}</label>
                            <input
                                id="profile-email"
                                type="email"
                                placeholder={intl.formatMessage({ id: 'login.email' })}
                                name="email"
                                className={`form-control ${
                                    formik.errors.email && formik.touched.email && 'is-invalid'
                                }`}
                                onChange={formik.handleChange}
                                value={formik.values.email}
                                {...formik.getFieldProps('email')}
                            />
                            {formik.touched.email && formik.errors.email ? (
                                <div className="invalid-feedback">{formik.errors.email}</div>
                            ) : null}
                        </div>
                        <div className="form-group">
                            <label htmlFor="profile-phone">{intl.formatMessage({ id: 'login.phone' })}</label>
                            <input
                                id="profile-phone"
                                type="text"
                                placeholder={intl.formatMessage({ id: 'login.phone' })}
                                name="phone"
                                className={`form-control ${
                                    formik.errors.phone && formik.touched.phone && 'is-invalid'
                                }`}
                                onChange={formik.handleChange}
                                value={formik.values.phone}
                                {...formik.getFieldProps('phone')}
                            />
                            {formik.touched.phone && formik.errors.phone ? (
                                <div className="invalid-feedback">{formik.errors.phone}</div>
                            ) : null}
                        </div>

                        <div className="form-group mt-5 mb-0">
                            <button type="submit" className="btn btn-primary">
                                {intl.formatMessage({ id: 'save' })}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
const mapStateToProps = (state) => ({
    auth: state.auth,
});
export default connect(mapStateToProps)(AccountPageProfile);
