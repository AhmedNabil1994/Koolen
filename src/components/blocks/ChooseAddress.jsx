import React from 'react';
// import { useIntl } from 'react-intl';
// import { FormattedMessage } from 'react-intl';
// import { Link } from 'react-router-dom';
import BlockLoader from './BlockLoader';
import './ChooseAddress.css';

const ChooseAddress = ({
    // address, isLoading, handleAddressClick, selectedAddressId,
    address,
    isLoading,
    handleAddressClick,
    handleClick,
    // style,
    // handleDivClick,
    // isSelected,
    // onAddressClick,
}) => {
    // const style = isSelected ? { border: '2px solid #fc671a' } : {};
    // const { formatMessage } = useIntl();
    if (isLoading && !address) return <BlockLoader />;

    if (address) {
        return (
            <div
                className="custom-address mb-2"
                // style={style}
                // onClick={handleDivClick(address.id)}
                // onClick={onAddressClick}
                role="button"
                onKeyDown={handleClick}
                tabIndex={0}
                onClick={handleClick}
            >
                <input
                    type="radio"
                    name="radio-group"
                    id={`radio-input-label-${address.id}`}
                    onChange={() => handleAddressClick(address.id)}
                    // checked
                />
                {/* <div className="input-radio__circle"/> */}
                <label htmlFor={`radio-input-label-${address.id}`} className="card custom-address__card">
                    <div className="address-card">
                        <div className="address-card__body d-flex justify-content-between align-items-center">
                            <div className="info">
                                <div className="one d-flex">
                                    <div className="address-card__name address">{`${address.address},`}</div>
                                    <div className="address-card__row-content">{address.postal_code}</div>
                                </div>
                                <div className="two d-flex">
                                    <div className="address-card__row-content city">{`${address.city},`}</div>
                                    <div className="address-card__row-content">{address.country}</div>
                                </div>
                                <div className="address-card__row-content">{address.phone}</div>
                            </div>
                            {/* <div className="edit-button " style={{ textAlign: 'end' }}> */}
                            {/* <div className="edit-button ">
                                <Link to={`/account/addresses/${address.id}`}>Edit</Link>
                            </div> */}
                        </div>
                    </div>
                </label>
                {/* <Link to="/account/addresses/add" className="addresses-list__item addresses-list__item--new">
                    <div className="addresses-list__plus" />
                    <div className="btn btn-secondary btn-sm">
                        <FormattedMessage id="addNew" />
                    </div>
                </Link> */}
            </div>
        );
    }
    return null;
};

export default ChooseAddress;
