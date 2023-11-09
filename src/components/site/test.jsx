// react
// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// // third-party
// import classNames from 'classnames';
// import PropTypes from 'prop-types';
// import AsyncAction from './AsyncAction';
// import { cartUpdateQuantities } from '../../store/cart';

// class InputNumber extends Component {
//     constructor(props) {
//         super(props);

//         this.state = {
//             /** example: [{itemId: 8, value: 1}] */
//             quantities: [],
//         };
//     }

//     handleChange = (event) => {
//         const { min, onChange } = this.props;
//         if (onChange) {
//             if (event.target.value.trim() === '') {
//                 onChange('');
//             } else {
//                 const value = parseFloat(event.target.value);

//                 onChange(Number.isNaN(value) ? min || 0 : value);
//             }
//         }
//     };

//     handleAddMouseDown = () => {
//         this.change(1);
//         this.changeByTimer(1);
//     };

//     handleSubMouseDown = () => {
//         this.change(-1);
//         this.changeByTimer(-1);
//     };

//     // cartNeedUpdate() {
//     //     const { quantities } = this.state;
//     //     const { cart } = this.props;

//     //     return (
//     //         quantities.filter((x) => {
//     //             const item = cart.items.find((item) => item.id === x.itemId);

//     //             return item && item.quantity !== x.value && x.value !== '';
//     //         }).length > 0
//     //     );
//     // }

//     /**
//      * @param direction - one of [-1, 1]
//      */
//     change(direction) {
//         const {
//             value, step, max, min, onChange,
//         } = this.props;
//         let newValue = (value === '' || Number.isNaN(value) ? 0 : value) + step * direction;

//         if (max !== null) {
//             newValue = Math.min(max, newValue);
//         }
//         if (min !== null) {
//             newValue = Math.max(min, newValue);
//         }

//         if (newValue !== value) {
//             if (onChange) {
//                 onChange(newValue);
//             }
//         }
//     }

//     /**
//      * @param direction - one of [-1, 1]
//      */
//     changeByTimer(direction) {
//         let interval;
//         const timer = setTimeout(() => {
//             interval = setInterval(() => this.change(direction), 50);
//         }, 300);

//         const documentMouseUp = () => {
//             clearTimeout(timer);
//             clearInterval(interval);

//             document.removeEventListener('mouseup', documentMouseUp, false);
//         };

//         document.addEventListener('mouseup', documentMouseUp, false);
//     }

//     render() {
//         const { cartUpdateQuantities } = this.props;
//         const { quantities } = this.state;
//         const updateCartButton = (
//             <AsyncAction
//                 action={() => cartUpdateQuantities(quantities)}
//                 render={({ run }) => (
//                     <React.Fragment>
//                         <div
//                             className="input-number__add"
//                             role="button"
//                             aria-label="button"
//                             onMouseDown={this.handleAddMouseDown}
//                             onKeyDown={this.handleAddMouseDown}
//                             onClick={run}
//                             tabIndex={0}
//                         />
//                         <div
//                             className="input-number__sub"
//                             role="button"
//                             aria-label="button"
//                             onMouseDown={this.handleSubMouseDown}
//                             onKeyDown={this.handleAddMouseDown}
//                             onClick={run}
//                             tabIndex={0}
//                         />
//                     </React.Fragment>
//                 )}
//             />
//         );
//         // <button type="button" onClick={run} className={classes} disabled={!this.cartNeedUpdate()}>
//         //     <FormattedMessage id="updateCart" />
//         // </button>
//         const {
//             size, className, onChange, ...otherProps
//         } = this.props;

//         const classes = classNames('input-number', className);
//         const formControlClasses = classNames('form-control input-number__input', {
//             'form-control-sm': size === 'sm',
//             'form-control-lg': size === 'lg',
//         });

//         return (
//             <div className={classes}>
//                 <input className={formControlClasses} type="number" onChange={this.handleChange} {...otherProps} />

//                 {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
//                 {/* <div className="input-number__add" onMouseDown={this.handleAddMouseDown} /> */}
//                 {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
//                 {/* <div className="input-number__sub" onMouseDown={this.handleSubMouseDown} /> */}
//                 {updateCartButton}
//             </div>
//         );
//     }
// }

// InputNumber.propTypes = {
//     onChange: PropTypes.func,
//     size: PropTypes.oneOf(['sm', 'lg']),
//     step: PropTypes.number,
//     min: PropTypes.number,
//     max: PropTypes.number,
//     value: PropTypes.oneOfType([
//         PropTypes.string,
//         PropTypes.number,
//     ]),
//     disabled: PropTypes.bool,
//     readonly: PropTypes.bool,
// };

// InputNumber.defaultProps = {
//     value: '',
//     step: 1,
//     max: null,
//     min: null,
// };

// const mapStateToProps = (state) => ({
//     cart: state.cart,
// });
// const mapDispatchToProps = {
//     cartUpdateQuantities,
// };

// // export default InputNumber;
// export default connect(mapStateToProps, mapDispatchToProps)(InputNumber);











// Old checkout design ==> shop page cart */ ----------------------------------------------------------------

// // react
// import React, { Component } from 'react';

// // third-party
// import classNames from 'classnames';
// import { connect } from 'react-redux';
// import { Helmet } from 'react-helmet-async';
// import { Link } from 'react-router-dom';

// // application
// import { FormattedMessage } from 'react-intl';
// import AsyncAction from '../shared/AsyncAction';
// import Currency from '../shared/Currency';
// import InputNumber from '../shared/InputNumber';
// import PageHeader from '../shared/PageHeader';
// import { cartRemoveItem, cartUpdateQuantities } from '../../store/cart';
// import { Cross12Svg } from '../../svg';
// // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { url } from '../../services/utils';
// import './ShopPageCart.css';
// // data stubs
// import theme from '../../data/theme';

// class ShopPageCart extends Component {
//     constructor(props) {
//         super(props);

//         this.state = {
//             /** example: [{itemId: 8, value: 1}] */
//             quantities: [],
//         };
//     }

//     getItemQuantity(item) {
//         const { quantities } = this.state;
//         const quantity = quantities.find((x) => x.itemId === item.id);

//         return quantity ? quantity.value : item.quantity;
//     }

//     handleChangeQuantity = (item, quantity) => {
//         this.setState((state) => {
//             const stateQuantity = state.quantities.find((x) => x.itemId === item.id);

//             if (!stateQuantity) {
//                 state.quantities.push({ itemId: item.id, value: quantity });
//             } else {
//                 stateQuantity.value = quantity;
//             }

//             return {
//                 quantities: state.quantities,
//             };
//         });
//     };

//     cartNeedUpdate() {
//         const { quantities } = this.state;
//         const { cart } = this.props;

//         return (
//             quantities.filter((x) => {
//                 const item = cart.items.find((item) => item.id === x.itemId);

//                 return item && item.quantity !== x.value && x.value !== '';
//             }).length > 0
//         );
//     }

//     renderItems() {
//         const { cart, cartRemoveItem } = this.props;

//         return cart.items.map((item) => {
//             let image;
//             let options;
//             const imgSrc = item.product.img || item.product.images[0];

//             if (item.product.images.length > 0) {
//                 image = (
//                     <div className="product-image">
//                         <Link to={url.product(item.product)} className="product-image__body">
//                             <img className="product-image__img" src={imgSrc} alt={imgSrc} />
//                         </Link>
//                     </div>
//                 );
//             }

//             if (item.options.length > 0) {
//                 options = (
//                     <ul className="cart-table__options">
//                         {item.options.map((option, index) => (
//                             <li key={index}>
//                                 {`${option.optionTitle}: ${option.valueTitle}`}
//                             </li>
//                         ))}
//                     </ul>
//                 );
//             }

//             const removeButton = (
//                 <AsyncAction
//                     action={() => cartRemoveItem(item.id)}
//                     render={({ run, loading }) => {
//                         const classes = classNames('btn btn-light btn-sm btn-svg-icon', {
//                             'btn-loading': loading,
//                         });

//                         return (
//                             <button type="button" onClick={run} className={classes}>
//                                 <Cross12Svg />
//                                 {/* <FontAwesomeIcon icon="fa-regular fa-trash-can" /> */}
//                             </button>
//                         );
//                     }}
//                 />
//             );

//             return (
//                 <div key={item.id} className="row cart">
//                     <div className="cart-table__column cart-table__column--image col-3">{image}</div>
//                     <div className="cart-table__column cart-table__column--product col-3">
//                         <Link to={url.product(item.product)} className="cart-table__product-name">
//                             {item.product.name}
//                             {/* {item.product.color && ` - ${item.product.color}`} */}
//                         </Link>
//                         <div className="quantity" data-title="Quantity">
//                             <InputNumber
//                                 onChange={(quantity) => this.handleChangeQuantity(item, quantity)}
//                                 value={this.getItemQuantity(item)}
//                                 min={1}
//                             />
//                         </div>
//                         {options}
//                     </div>
//                     <div className="cart-table__column cart-table__column--total col-3 total" data-title="Total">
//                         <Currency value={item.total} />
//                     </div>
//                     {/* <div className="cart-table__column cart-table__column--price" data-title="Price">
//                         <Currency value={item.price} />
//                     </div> */}
//                     <div className="cart-table__column cart-table__column--remove col-3 remove-container">
//                         {removeButton}
//                     </div>
//                 </div>
//             );
//         });
//     }

//     renderTotals() {
//         const { cart } = this.props;

//         if (cart?.extraLines?.length <= 0) {
//             return null;
//         }

//         return (
//             <React.Fragment>
//                 {/* <thead className="cart__totals-header">
//                     <tr>
//                         <th>
//                             <FormattedMessage id="subtotal" />
//                         </th>
//                         <td>
//                             <Currency value={cart.subtotal} />
//                         </td>
//                     </tr>
//                 </thead> */}
//                 <span>
//                     <Currency value={cart.subtotal} />
//                 </span>
//                 {/* <tbody className="cart__totals-body">{extraLines}</tbody> */}
//             </React.Fragment>
//         );
//     }

//     renderCart() {
//         const { cartUpdateQuantities } = this.props;
//         const { quantities } = this.state;

//         const updateCartButton = (
//             <AsyncAction
//                 action={() => cartUpdateQuantities(quantities)}
//                 render={({ run, loading }) => {
//                     const classes = classNames('btn btn-primary cart__update-button col-lg-5 col-sm-6', {
//                         'btn-loading': loading,
//                     });

//                     return (
//                         <button type="button" onClick={run} className={classes} disabled={!this.cartNeedUpdate()}>
//                             <FormattedMessage id="updateCart" />
//                         </button>
//                     );
//                 }}
//             />
//         );

//         return (
//             <div className="cart block">
//                 <div className="container">
//                     <div className="cart-products">{this.renderItems()}</div>
//                     {/* <div className="cart__actions">
//                         <div className="cart__buttons">
//                             <Link to="/" className="btn btn-light">
//                                 <FormattedMessage id="continueShopping" />
//                             </Link>
//                             {updateCartButton}
//                         </div>
//                     </div> */}
//                     <div className="row mt-4 all-buttons">
//                         <div className="col-lg-6 col-sm-12 one">
//                             <Link to="/" className="btn btn-secondary col-lg-5 col-sm-6">
//                                 <FormattedMessage id="continueShopping" />
//                             </Link>
//                             {updateCartButton}
//                         </div>
//                         <Link
//                             to="/shop/checkout"
//                             className="col-lg-6 col-sm-12 btn btn-primary btn-xl btn-block cart__checkout-button mt-lg-0 mt-md-3"
//                         >
//                             <FormattedMessage id="proceedToCheckout" />
//                             {this.renderTotals()}
//                         </Link>
//                     </div>

//                     {/* <div className="row justify-content-end pt-md-5 pt-4">
//                         <div className="col-12 col-md-7 col-lg-6 col-xl-5">
//                             <div className="card">
//                                 <div className="card-body">
//                                     <h3 className="card-title">
//                                         <FormattedMessage id="cartTotals" />
//                                     </h3>
//                                     <table className="cart__totals">{this.renderTotals()}</table>
//                                     <Link
//                                         to="/shop/checkout"
//                                         className="btn btn-primary btn-xl btn-block cart__checkout-button"
//                                     >
//                                         <FormattedMessage id="proceedToCheckout" />
//                                     </Link>
//                                 </div>
//                             </div>
//                         </div>
//                     </div> */}
//                     {/* <Link to="/shop/checkout" className="btn btn-primary btn-xl btn-block cart__checkout-button">
//                         <FormattedMessage id="proceedToCheckout" />
//                         {this.renderTotals()}
//                     </Link> */}
//                 </div>
//             </div>
//         );
//     }

//     render() {
//         const { cart } = this.props;

//         let content;

//         if (cart.quantity) {
//             content = this.renderCart();
//         } else {
//             content = (
//                 <div className="block block-empty">
//                     <div className="container">
//                         <div className="block-empty__body">
//                             <div className="block-empty__message">
//                                 <FormattedMessage id="emptyCart" />
//                             </div>
//                             <div className="block-empty__actions">
//                                 <Link to="/" className="btn btn-primary btn-sm">
//                                     <FormattedMessage id="continue" />
//                                 </Link>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             );
//         }

//         return (
//             <React.Fragment>
//                 <Helmet>
//                     <title>{`Shopping Cart — ${theme.name}`}</title>
//                 </Helmet>

//                 <PageHeader header={<FormattedMessage id="shoppingCart" />} />
//                 {content}
//             </React.Fragment>
//         );
//     }
// }

// const mapStateToProps = (state) => ({
//     cart: state.cart,
// });

// const mapDispatchToProps = {
//     cartRemoveItem,
//     cartUpdateQuantities,
// };

// export default connect(mapStateToProps, mapDispatchToProps)(ShopPageCart);
