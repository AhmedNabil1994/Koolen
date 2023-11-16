// react
import React from 'react';
import { useIntl } from 'react-intl';

// third-party
import classNames from 'classnames';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import './ShopPageWishlist.css';

// application
import { FaTrash } from 'react-icons/fa';
import AsyncAction from '../shared/AsyncAction';
import Currency from '../shared/Currency';
// import PageHeader from '../shared/PageHeader';
import Rating from '../shared/Rating';
import { cartAddItem } from '../../store/cart';
// import { Cross12Svg } from '../../svg';
import { url } from '../../services/utils';
import { wishlistRemoveItem } from '../../store/wishlist';

// data stubs
import theme from '../../data/theme';

function ShopPageWishlist(props) {
    const { wishlist, cartAddItem, wishlistRemoveItem } = props;
    const { formatMessage } = useIntl();
    let content;

    if (wishlist.length) {
        const itemsList = wishlist.map((item) => {
            let image;

            if (item.images.length > 0) {
                image = (
                    <div className="product-image">
                        <Link to={url.product(item)} className="product-image__body">
                            <img className="product-image__img" src={item.images[0]} alt="" />
                        </Link>
                    </div>
                );
            }

            const renderAddToCarButton = ({ run, loading }) => {
                const classes = classNames('btn btn-primary btn-sm', {
                    'btn-loading': loading,
                });

                return <button type="button" onClick={run} className={classes}>{formatMessage({ id: 'addToCart' })}</button>;
            };

            const renderRemoveButton = ({ run, loading }) => {
                const classes = classNames('btn btn-light btn-sm btn-svg-icon', {
                    'btn-loading': loading,
                });

                return (
                    <button type="button" onClick={run} className={classes} aria-label="Remove">
                        <FaTrash />
                    </button>
                );
            };

            return (
                <div key={item.id} className="product-row row mb-3 align-items-center">
                    {/* <div key={item.id} className="product-row d-flex mb-3 justify-content-between align-items-center"> */}
                    <div className=" column col-md-3 col-lg-2 ">{image}</div>
                    {/* <div className="">{image}</div> */}
                    <div className=" column col-md-7 col-lg-3 ">
                        <Link to={url.product(item)} className="wishlist__product-name">
                            {item.name}
                        </Link>
                        <div className="wishlist__product-rating">
                            <Rating value={item.rating} />
                            <div className="wishlist__product-rating-legend">{`${item.reviews} Reviews`}</div>
                        </div>
                    </div>
                    {/* <div className="">
                        <Link to={url.product(item)} className="wishlist__product-name">
                            {item.name}
                        </Link>
                        <div className="wishlist__product-rating">
                            <Rating value={item.rating} />
                            <div className="wishlist__product-rating-legend">{`${item.reviews} Reviews`}</div>
                        </div>
                    </div> */}
                    <div className=" column col-md-2 col-lg-2 ">
                        <div className="badge badge-success">{formatMessage({ id: 'inStock' })}</div>
                    </div>
                    {/* <div className="">
                        <div className="badge badge-success">{formatMessage({ id: 'inStock' })}</div>
                    </div> */}
                    {/* <div className="section-one">
                    </div> */}
                    {/* <div className="">
                        <Currency value={item.price} />
                    </div>
                    <div className="">
                        <AsyncAction
                            action={() => cartAddItem(item, [], 1, formatMessage({ id: 'productHasBeenAddedToCartSuccessfully' }))}
                            render={renderAddToCarButton}
                        />
                    </div>
                    <div className="">
                        <AsyncAction action={() => wishlistRemoveItem(item.id)} render={renderRemoveButton} />
                    </div> */}
                    <div className=" column col-md-3 col-lg-2 ">
                        <Currency value={item.price} />
                    </div>
                    <div className=" column col-md-7 col-lg-2 ">
                        <AsyncAction
                            action={() => cartAddItem(item, [], 1, formatMessage({ id: 'productHasBeenAddedToCartSuccessfully' }))}
                            render={renderAddToCarButton}
                        />
                    </div>
                    <div className=" column col-md-2 col-lg-1 ">
                        <AsyncAction action={() => wishlistRemoveItem(item.id)} render={renderRemoveButton} />
                    </div>
                    {/* <div className="section-two">
                    </div> */}
                </div>
            );
        });

        content = (
            <div className="block">
                <div className="container">
                    <div className="wishlist-items mt-5">
                        <h2>{formatMessage({ id: 'wishlist' })}</h2>
                        {itemsList}
                    </div>
                </div>
            </div>
        );
    } else {
        content = (
            <div className="block block-empty">
                <div className="container">
                    <div className="block-empty__body">
                        <div className="block-empty__message">{formatMessage({ id: 'emptyWishlist' })}</div>
                        <div className="block-empty__actions">
                            <Link to="/" className="btn btn-primary btn-sm">{formatMessage({ id: 'continue' })}</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <React.Fragment>
            <Helmet>
                <title>{`Wish List — ${theme.name}`}</title>
            </Helmet>

            {/* <PageHeader header={formatMessage({ id: 'wishlist' })} /> */}
            {content}
        </React.Fragment>
    );
}

const mapStateToProps = (state) => ({
    wishlist: state.wishlist,
});

const mapDispatchToProps = {
    cartAddItem,
    wishlistRemoveItem,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ShopPageWishlist);
