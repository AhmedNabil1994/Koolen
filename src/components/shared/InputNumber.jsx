// react
import React, { Component } from 'react';
import { connect } from 'react-redux';
// third-party
import classNames from 'classnames';
import PropTypes from 'prop-types';
import AsyncAction from './AsyncAction';
import { cartUpdateQuantities } from '../../store/cart';

class InputNumber extends Component {
    constructor(props) {
        super(props);

        this.state = {
            /** example: [{itemId: 8, value: 1}] */
            quantities: [],
        };
    }

    handleChange = (event) => {
        const { min, onChange } = this.props;
        if (onChange) {
            if (event.target.value.trim() === '') {
                onChange('');
            } else {
                const value = parseFloat(event.target.value);

                onChange(Number.isNaN(value) ? min || 0 : value);
            }
        }
    };

    handleAddMouseDown = () => {
        this.change(1);
        this.changeByTimer(1);
    };

    handleSubMouseDown = () => {
        this.change(-1);
        this.changeByTimer(-1);
    };

    // cartNeedUpdate() {
    //     const { quantities } = this.state;
    //     const { cart } = this.props;

    //     return (
    //         quantities.filter((x) => {
    //             const item = cart.items.find((item) => item.id === x.itemId);

    //             return item && item.quantity !== x.value && x.value !== '';
    //         }).length > 0
    //     );
    // }

    /**
     * @param direction - one of [-1, 1]
     */
    change(direction) {
        const {
            value, step, max, min, onChange,
        } = this.props;
        let newValue = (value === '' || Number.isNaN(value) ? 0 : value) + step * direction;

        if (max !== null) {
            newValue = Math.min(max, newValue);
        }
        if (min !== null) {
            newValue = Math.max(min, newValue);
        }

        if (newValue !== value) {
            if (onChange) {
                onChange(newValue);
            }
        }
    }

    /**
     * @param direction - one of [-1, 1]
     */
    changeByTimer(direction) {
        let interval;
        const timer = setTimeout(() => {
            interval = setInterval(() => this.change(direction), 50);
        }, 300);

        const documentMouseUp = () => {
            clearTimeout(timer);
            clearInterval(interval);

            document.removeEventListener('mouseup', documentMouseUp, false);
        };

        document.addEventListener('mouseup', documentMouseUp, false);
    }

    render() {
        const { cartUpdateQuantities } = this.props;
        const { quantities } = this.state;
        const updateCartButton = (
            <AsyncAction
                action={() => cartUpdateQuantities(quantities)}
                render={({ run }) => (
                    <React.Fragment>
                        <div
                            className="input-number__add"
                            role="button"
                            aria-label="button"
                            onMouseDown={this.handleAddMouseDown}
                            onKeyDown={this.handleAddMouseDown}
                            onClick={run}
                            tabIndex={0}
                        />
                        <div
                            className="input-number__sub"
                            role="button"
                            aria-label="button"
                            onMouseDown={this.handleSubMouseDown}
                            onKeyDown={this.handleAddMouseDown}
                            onClick={run}
                            tabIndex={0}
                        />
                    </React.Fragment>
                )}
            />
        );
        // <button type="button" onClick={run} className={classes} disabled={!this.cartNeedUpdate()}>
        //     <FormattedMessage id="updateCart" />
        // </button>
        const {
            size, className, onChange, ...otherProps
        } = this.props;

        const classes = classNames('input-number', className);
        const formControlClasses = classNames('form-control input-number__input', {
            'form-control-sm': size === 'sm',
            'form-control-lg': size === 'lg',
        });

        return (
            <div className={classes}>
                <input className={formControlClasses} type="number" onChange={this.handleChange} {...otherProps} />

                {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
                {/* <div className="input-number__add" onMouseDown={this.handleAddMouseDown} /> */}
                {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
                {/* <div className="input-number__sub" onMouseDown={this.handleSubMouseDown} /> */}
                {updateCartButton}
            </div>
        );
    }
}

InputNumber.propTypes = {
    onChange: PropTypes.func,
    size: PropTypes.oneOf(['sm', 'lg']),
    step: PropTypes.number,
    min: PropTypes.number,
    max: PropTypes.number,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
    disabled: PropTypes.bool,
    readonly: PropTypes.bool,
};

InputNumber.defaultProps = {
    value: '',
    step: 1,
    max: null,
    min: null,
};

const mapStateToProps = (state) => ({
    cart: state.cart,
});
const mapDispatchToProps = {
    cartUpdateQuantities,
};

// export default InputNumber;
export default connect(mapStateToProps, mapDispatchToProps)(InputNumber);
