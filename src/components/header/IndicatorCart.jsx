// react
import React from 'react';
import { useIntl } from 'react-intl';

// third-party
import classNames from 'classnames';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// application
import AsyncAction from '../shared/AsyncAction';
import Currency from '../shared/Currency';
import Indicator from './Indicator';
import { Cart20Svg, Cross10Svg } from '../../svg';
import { cartRemoveItem } from '../../store/cart';
import { url } from '../../services/utils';
import './IndicatorCart.css';

function IndicatorCart(props) {
    const { cart, cartRemoveItem } = props;
    let dropdown;
    let totals;
    const intl = useIntl();

    if (cart.extraLines?.length > 0) {
        const extraLines = cart.extraLines.map((extraLine, index) => (
            <tr key={index}>
                <th>{extraLine.title}</th>
                <td><Currency value={extraLine.price} /></td>
            </tr>
        ));

        totals = (
            <React.Fragment>
                <tr>
                    <th>{intl.formatMessage({ id: 'subtotal' })}</th>
                    <td><Currency value={cart.subtotal} /></td>
                </tr>
                {extraLines}
            </React.Fragment>
        );
    }

    const items = cart.items.map((item) => {
        let options;
        let image;

        if (item.options) {
            options = (
                <ul className="dropcart__product-options">
                    {item.options.map((option, index) => (
                        <li key={index}>{`${option.optionTitle}: ${option.valueTitle}`}</li>
                    ))}
                </ul>
            );
        }

        if (item.product.images.length) {
            const imgSrc = item.product.img || item.product.images[0];
            image = (
                <div className="product-image dropcart__product-image">
                    <Link to={url.product(item.product)} className="product-image__body">
                        <img className="product-image__img" src={imgSrc} alt="" />
                    </Link>
                </div>
            );
        }

        const removeButton = (
            <AsyncAction
                action={() => cartRemoveItem(item.id)}
                render={({ run, loading }) => {
                    const classes = classNames('dropcart__product-remove btn btn-light btn-sm btn-svg-icon', {
                        'btn-loading': loading,
                    });

                    return (
                        <button type="button" onClick={run} className={classes}>
                            <Cross10Svg />
                        </button>
                    );
                }}
            />
        );

        return (
            <div key={item.id} className="dropcart__product">
                {image}
                <div className="dropcart__product-info">
                    <div className="dropcart__product-name">
                        <Link to={url.product(item.product)}>
                            {item.product.name}
                            {' '}
                            {item.product.color && ` - ${item.product.color}`}
                        </Link>
                    </div>
                    {options}
                    <div className="dropcart__product-meta">
                        <span className="dropcart__product-quantity">{item.quantity}</span>
                        {' × '}
                        <span className="dropcart__product-price"><Currency value={item.price} /></span>
                    </div>
                </div>
                {removeButton}
            </div>
        );
    });

    if (cart.quantity) {
        dropdown = (
            <div className="dropcart">
                <div className="dropcart__products-list">{items}</div>

                <div className="dropcart__totals">
                    {totals}
                    <div className="details">
                        <div className="flex-center-between detail">
                            <div>{intl.formatMessage({ id: 'subtotal' })}</div>
                            <div>
                                <Currency value={cart.subtotal} />
                            </div>
                        </div>
                        <div className="flex-center-between detail">
                            <div>Discount</div>
                            <div>000</div>
                        </div>
                        <div className="flex-center-between detail">
                            <div>{intl.formatMessage({ id: 'total' })}</div>
                            <div>
                                <Currency value={cart.total} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="dropcart__buttons">
                    <Link className="btn btn-secondary" to="/shop/cart">
                        {intl.formatMessage({ id: 'viewCart' })}
                    </Link>
                    <Link className="btn btn-primary" to="/shop/checkout">
                        {intl.formatMessage({ id: 'checkout' })}
                    </Link>
                </div>
            </div>
        );
    } else {
        dropdown = (
            <div className="dropcart">
                <div className="dropcart__empty">
                    {intl.formatMessage({ id: 'emptyCart' })}
                </div>
            </div>
        );
    }

    return (
        <Indicator url="/shop/cart" dropdown={dropdown} value={cart.quantity} icon={<Cart20Svg />} />
    );
}

const mapStateToProps = (state) => ({
    cart: state.cart,
});

const mapDispatchToProps = {
    cartRemoveItem,
};

export default connect(mapStateToProps, mapDispatchToProps)(IndicatorCart);
