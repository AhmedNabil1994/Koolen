// react
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

// application
import Rating from '../shared/Rating';

// data stubs
import { getAllRatingAndReviews, addReviews } from '../../api/products';
import BlockLoader from '../blocks/BlockLoader';
import { toastError } from '../toast/toastComponent';

function ProductTabReviews(props) {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const { formatMessage } = useIntl();
    const history = useHistory();
    let productId;
    if (props?.product) { productId = props?.product.id; }

    function getRatingAndReviews() {
        getAllRatingAndReviews(productId, (success) => {
            const { data } = success;
            setReviews(data);
            setLoading(false);
        }, (fail) => {
            toastError(fail);
            setLoading(false);
        });
    }

    useEffect(() => {
        if (productId) {
            getRatingAndReviews();
        }
    }, [productId]);

    const formik = useFormik({
        initialValues: {
            rating: 5,
            comment: '',
        },
        validationSchema: Yup.object({
            comment: Yup.string().required(formatMessage({ id: 'validation.comment' })),
        }),
        onSubmit: (values) => {
            const { comment, rating } = values;
            if (!props?.auth?.token) {
                history.push('/account/login');
                toastError({ data: { message: 'Please, Login first.' } });
            }

            addReviews({ comment, rating, product_id: productId }, () => {
                getRatingAndReviews();
            }, (fail) => {
                toastError(fail);
            });
        },
    });

    const reviewsList = reviews.length === 0 && !loading
        ? <div className="text-center">{formatMessage({ id: 'thisProductHasNoReviewsYet' })}</div>
        : reviews.map((review, index) => (
            <li key={index} className="reviews-list__item">
                <div className="review">
                    <div className="review__avatar"><img src="/images/avatars/profile-avatar.png" alt="" /></div>
                    <div className=" review__content">
                        <div className=" review__author">{review.user.name}</div>
                        <div className=" review__rating">
                            <Rating value={review.rating} />
                        </div>
                        <div className=" review__text">{review.comment}</div>
                        <div className=" review__date">{review.time}</div>
                    </div>
                </div>
            </li>
        ));

    if (loading) return <BlockLoader />;

    return (
        <div className="reviews-view">
            <div className="reviews-view__list">
                <h3 className="reviews-view__header">
                    {formatMessage({ id: 'ratingAndReviews' })}
                </h3>

                <div className="reviews-list">
                    <ol className="reviews-list__content">
                        {reviewsList}
                    </ol>
                </div>
            </div>

            <form className="reviews-view__form needs-validation" onSubmit={formik.handleSubmit} noValidate>
                <h3 className="reviews-view__header">
                    {formatMessage({ id: 'writeAReview' })}
                </h3>
                <div className="row">
                    <div className="col-12 col-lg-9 col-xl-8">
                        <div className="form-row">
                            <div className="form-group col-md-4">
                                <label htmlFor="review-stars">
                                    {formatMessage({ id: 'reviewStars' })}
                                </label>
                                <select
                                    id="review-stars"
                                    className="form-control"
                                    value={formik.values.rating}
                                    onChange={formik.handleChange}
                                    {...formik.getFieldProps('rating')}
                                >
                                    <option value={5}>
                                        {formatMessage({ id: '5starRating' })}
                                    </option>
                                    <option value={4}>
                                        {formatMessage({ id: '4starRating' })}
                                    </option>
                                    <option value={3}>
                                        {formatMessage({ id: '3starRating' })}
                                    </option>
                                    <option value={2}>
                                        {formatMessage({ id: '2starRating' })}
                                    </option>
                                    <option value={1}>
                                        {formatMessage({ id: '1starRating' })}
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="review-text">{formatMessage({ id: 'yourReviews' })}</label>
                            <textarea
                                id="review-text"
                                type="email"
                                name="email"
                                placeholder={formatMessage({ id: 'writeYourComment' })}
                                className={`form-control ${formik.errors.comment && formik.touched.comment && 'is-invalid'}`}
                                value={formik.values.comment}
                                onChange={formik.handleChange}
                                {...formik.getFieldProps('comment')}
                                rows="6"
                            />
                            {
                                formik.touched.comment && formik.errors.comment
                                    ? (
                                        <div className="invalid-feedback">
                                            {formik.errors.comment}
                                        </div>
                                    )
                                    : null
                            }
                        </div>
                        <div className="form-group mb-0">
                            <button type="submit" className="btn btn-primary btn-lg">{formatMessage({ id: 'postYourReview' })}</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

const MapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(MapStateToProps)(ProductTabReviews);
