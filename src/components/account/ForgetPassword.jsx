import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';
import { createNewPassword } from '../../api/auth';
import { toastError, toastSuccess } from '../toast/toastComponent';

const ForgetPassword = () => {
    const intl = useIntl();
    const history = useHistory();
    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email(intl.formatMessage({ id: 'validation.email.format' })).required(intl.formatMessage({ id: 'validation.email.required' })),
        }),
        onSubmit: (values) => {
            const { email } = values;
            createNewPassword(email, (success) => {
                if (success.success) {
                    toastSuccess(success);
                    history.push('/account/change-password');
                } else {
                    toastSuccess(success);
                }
            }, (fail) => {
                toastError(fail);
            });
        },
    });

    return (

        <div className="container mt-2">
            <div className="row">
                <div className="col-md-6 d-flex">
                    <div className="card flex-grow-1 mb-md-0">
                        <div className="card-body">
                            <h3 className="card-title">{intl.formatMessage({ id: 'login.forgetPass' })}</h3>
                            <form className="needs-validation" onSubmit={formik.handleSubmit} noValidate>
                                <div className="form-group needs-validation">
                                    <label htmlFor="login-email">{intl.formatMessage({ id: 'login.email' })}</label>
                                    <input
                                        id="login-email"
                                        type="email"
                                        name="email"
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
                                <button type="submit" className="btn btn-primary mt-2 mt-md-3 mt-lg-4">
                                    {intl.formatMessage({ id: 'send' })}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgetPassword;
