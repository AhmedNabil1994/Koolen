// react
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';

// application
import Pagination from '../shared/Pagination';
import Rating from '../shared/Rating';

// data stubs
import { getAllRatingAndReviews, addReviews } from '../../api/products';
import BlockLoader from '../blocks/BlockLoader';

function ProductTabReviews({ product }) {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(5);
    const { formatMessage } = useIntl();
    let productId;
    if (product) { productId = product.id; }
    // const formik = useFormik({
    //     initialValues: {
    //         email: '',
    //         password: '',
    //     },
    //     validationSchema: Yup.object({
    //         email: Yup.string().email(formatMessage({ id: 'validation.email.format' })).required(formatMessage({ id: 'validation.email.required' })),
    //         password: Yup.string().min(6, formatMessage({ id: 'validation.password.format' })).required(formatMessage({ id: 'validation.password.required' })),
    //     }),
    //     onSubmit: (values) => {

    //     },
    // });
    // const registrationFormik = useFormik({
    //     initialValues: {
    //         fullName: '',
    //         email: '',
    //         phone: '',
    //         password: '',
    //         repeatPassword: '',
    //     },
    //     validationSchema: Yup.object({
    //         fullName: Yup.string().required(formatMessage({ id: 'validation.fullName.required' })),
    //         email: Yup.string().email().required(formatMessage({ id: 'validation.fullName.required' })),
    //         phone: Yup.number().typeError(formatMessage({ id: 'validation.phone.format' })).required(formatMessage({ id: 'validation.phone.required' })).positive(formatMessage({ id: 'validation.phone.format' }))
    //             .integer(formatMessage({ id: 'validation.phone.format' })),
    //         password: Yup.string().min(6, formatMessage({ id: 'validation.password.format' })).required(formatMessage({ id: 'validation.repeatPassword.required' })),
    //         repeatPassword: Yup.string().oneOf([Yup.ref('password'), null], formatMessage({ id: 'validation.repeatPassword.format' })),
    //     }),
    //     onSubmit(values) {
    //         const {
    //             fullName, phone, email, password,
    //         } = values;
    //         signUpUser({
    //             name: fullName, email, password, phone,
    //         }, (success) => {
    //             if (success.success) toastSuccess(success);
    //         },
    //         (fail) => {
    //             toastError(fail);
    //         });
    //     },
    // });

    function getRatingAndReviews() {
        setLoading(false);
        setReviews(getAllRatingAndReviews(productId));
    }

    useEffect(() => {
        getRatingAndReviews();
    }, []);

    function submitReview(e) {
        e.preventDefault();
        if (productId) {
            const payload = {
                review, rating,
            };

            // after success
            addReviews(payload);
            getRatingAndReviews();
        }
    }

    const reviewsList = reviews.map((review, index) => (
        <li key={index} className="reviews-list__item">
            <div className="review">
                <div className="review__avatar"><img src={review.avatar} alt="" /></div>
                <div className=" review__content">
                    <div className=" review__author">{review.author}</div>
                    <div className=" review__rating">
                        <Rating value={review.rating} />
                    </div>
                    <div className=" review__text">{review.text}</div>
                    <div className=" review__date">{review.date}</div>
                </div>
            </div>
        </li>
    ));

    if (loading) return <BlockLoader />;

    return (
        <div className="reviews-view">
            <div className="reviews-view__list">
                <h3 className="reviews-view__header">
                    {formatMessage({ id: 'writeAReview' })}
                </h3>

                <div className="reviews-list">
                    <ol className="reviews-list__content">
                        {reviewsList}
                    </ol>
                    <div className="reviews-list__pagination">
                        <Pagination current={1} siblings={2} total={10} />
                    </div>
                </div>
            </div>

            <form className="reviews-view__form">
                <h3 className="reviews-view__header">
                    {formatMessage({ id: 'reviewStars' })}
                    writeAReview
                </h3>
                <div className="row">
                    <div className="col-12 col-lg-9 col-xl-8">
                        <div className="form-row">
                            <div className="form-group col-md-4">
                                <label htmlFor="review-stars">
                                    {formatMessage({ id: 'writeAReview' })}
                                </label>
                                <select id="review-stars" value={rating} onChange={(e) => setRating(e.target.value)} className="form-control">
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
                            <textarea className="form-control" value={review} onChange={(e) => setReview(e.target.value)} id="review-text" rows="6" />
                        </div>
                        <div className="form-group mb-0">
                            <button type="submit" className="btn btn-primary btn-lg" onClick={submitReview}>{formatMessage({ id: 'postYourReview' })}</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default ProductTabReviews;
