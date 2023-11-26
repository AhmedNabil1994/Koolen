// react
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

// third-party
import { Helmet } from 'react-helmet-async';

// data stubs
import { FormattedMessage, useIntl } from 'react-intl';
import theme from '../../data/theme';

// apis
import {
    getCountry, getStates, getCities, addNewAddress,
    editAddress,
    getAddressById,
} from '../../api/addresses';

// components
import { toastError, toastSuccess } from '../toast/toastComponent';
import BlockLoader from '../blocks/BlockLoader';

export default function AccountPageEditAddress(props) {
    const [address, setAddress] = useState('');
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [states, setStates] = useState([]);
    const [selectedState, setSelectedState] = useState(null);
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState(null);
    const [postalCode, setPostalCode] = useState('');
    const [phone, setPhone] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [addressErrorMessage, setAddressErrorMessage] = useState('');
    const [postalCodeErrorMessage, setPostalCodeErrorMessage] = useState('');
    const [phoneErrorMessage, setPhoneErrorMessage] = useState('');
    const [isDisabled, setIsDisabled] = useState(true);
    const { formatMessage } = useIntl();
    const history = useHistory();

    // routes
    const { match: { params: { addressId } } } = props;
    const isAddAddress = addressId === 'add';

    useEffect(() => {
        if (!isAddAddress) {
            setIsLoading(true);
            getAddressById(addressId, (success) => {
                setIsLoading(false);
                if (success.success) {
                    // console.log('Data from getAddress by id', success.data);
                    console.log('id', addressId);
                    const {
                        address: yourAddress, country_id: countryId, city_id: cityId, state_id: stateId, phone, postal_code: postalCode,
                    } = success.data.filter((address) => addressId === address.id)[0];
                    // console.log({
                    //     address: yourAddress,
                    //     country_id: countryId,
                    //     city_id: cityId,
                    //     state_id: stateId,
                    //     phone,
                    //     postal_code: postalCode,
                    // });
                    console.log('Data from getAddress by id', success.data);
                    setAddress(yourAddress);
                    setSelectedCountry(countryId);
                    setSelectedCity(cityId);
                    setSelectedState(stateId);
                    setPhone(phone);
                    setPostalCode(postalCode);
                } else {
                    toastError(success);
                }
            }, (fail) => {
                setIsLoading(false);
                toastError(fail);
            });
        }
    }, [isAddAddress]);

    useEffect(() => {
        getCountry((success) => {
            if (success.success) {
                setCountries(success.data);
                if (isAddAddress) setSelectedCountry(success.data[0].id);
            } else toastError(success);
        }, (fail) => toastError(fail));
    }, []);

    useEffect(() => {
        if (selectedCountry) {
            getStates(selectedCountry, (success) => {
                if (success.success) {
                    setStates(success.data);
                    if (isAddAddress) setSelectedState(success.data[0].id);
                } else toastError(success);
            }, (fail) => toastError(fail));
        } else {
            setStates([]);
            setSelectedState(null);
        }
    }, [selectedCountry]);

    useEffect(() => {
        if (selectedState) {
            getCities(selectedState, (success) => {
                if (success.success) {
                    setCities(success.data);
                    if (isAddAddress) setSelectedCity(success.data[0].id);
                } else toastError(success);
            }, (fail) => toastError(fail));
        } else {
            setCities([]);
            setSelectedCity(null);
        }
    }, [selectedState]);

    function submitNewAddress() {
        const payload = {
            address,
            country: +selectedCountry,
            state: +selectedState,
            city: +selectedCity,
            postalCode: +postalCode,
            phone,
        };
        // handleButtonClick();
        if (isAddAddress) {
            addNewAddress(payload, (success) => {
                if (success.success) {
                    history.push('/account/addresses');
                    toastSuccess(success);
                } else {
                    toastError(success);
                }
            }, (fail) => {
                toastError(fail);
            });
        } else {
            payload.id = +addressId;
            editAddress(payload, (success) => {
                if (success.success) {
                    console.log('data when edit', success.data);
                    history.push('/account/addresses');
                    toastSuccess(success);
                } else {
                    toastError(success);
                }
            }, (fail) => {
                toastError(fail);
            });
        }
    }

    const handleChangeAddress = (e) => {
        setAddress(e.target.value);
        // if (!/^[a-zA-Z ]+$/.test(e.target.value)) {
        //     setAddressErrorMessage('* Please enter only text characters! *');
        //     return;
        // }
        if (address) {
            setAddressErrorMessage('');
        }
    };

    const handleChangeCountry = (e) => {
        setSelectedCountry(e.target.value);
    };

    const handleChangeState = (e) => {
        setSelectedState(e.target.value);
    };

    const handleChangeCity = (e) => {
        setSelectedCity(e.target.value);
    };

    const handleChangePostalCode = (e) => {
        if (!/^[0-9]+$/.test(e.target.value)) {
            setPostalCodeErrorMessage('* Please enter a valid postal code! *');
            setIsDisabled(true);
            return;
        }
        setPostalCode(e.target.value);
        setPostalCodeErrorMessage('');
        setIsDisabled(false);
        // if (postalCode) {
        //     setPostalCodeErrorMessage('');
        // }
        // if (postalCode && /^[0-9]+$/.test(e.target.value)) {
        // }
    };

    const handleChangePhone = (e) => {
        if (!/^[0-9]+$/.test(e.target.value)) {
            setPhoneErrorMessage('* Please enter only valid phone number digits! *');
            setIsDisabled(true);
            return;
        }
        setPhone(e.target.value);
        setPhoneErrorMessage('');
        setIsDisabled(false);
        // if (phone && /^[0-9]+$/.test(e.target.value)) {
        // }
    };

    const handleButtonClick = () => {
        if (!address) {
            setAddressErrorMessage('* Address can not be null! *');
        }
        if (!postalCode) {
            setPostalCodeErrorMessage('* Postal Code can not be null! *');
        }
        if (!phone) {
            setPhoneErrorMessage('* Phone Number can not be null! *');
        }
        if (address && postalCode && phone) {
            // setIsDisabled(false);
            submitNewAddress();
        }
        // if (address && postalCode && /^[0-9]{5}(?:-[0-9]{4})?$/.test(e.target.value)) {
        //     submitNewAddress();
        // }
    };

    if (isLoading) return <BlockLoader />;

    return (
        <div className="card">
            <Helmet>
                <title>{`Edit Address — ${theme.name}`}</title>
            </Helmet>

            <div className="card-header">
                {addressId === 'add' ? (
                    <h5>
                        <FormattedMessage id="account.addAddress" />
                    </h5>
                ) : (
                    <h5>
                        <FormattedMessage id="account.editAddress" />
                    </h5>
                )}
            </div>
            <div className="card-divider" />
            <div className="card-body">
                <div className="row no-gutters">
                    <div className="col-12 col-lg-10 col-xl-8">
                        <div className="form-group">
                            <label htmlFor="checkout-street-address">
                                <FormattedMessage id="account.address" />
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="checkout-street-address"
                                placeholder={formatMessage({ id: 'streetAddress' })}
                                name="address"
                                value={address}
                                // onChange={(e) => setAddress(e.target.value)}
                                onChange={handleChangeAddress}
                                autoComplete="off"
                            />
                            {addressErrorMessage && <p style={{ color: 'red' }}>{addressErrorMessage}</p>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="checkout-country">
                                <FormattedMessage id="country" />
                            </label>
                            <select
                                autoComplete="off"
                                id="checkout-country"
                                value={null}
                                // onChange={(e) => setSelectedCountry(e.target.value)}
                                onChange={handleChangeCountry}
                                className="form-control form-control-select2"
                            >
                                {[...countries].map(({ id, name }) => (
                                    <option key={id} value={id}>
                                        {name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="checkout-state">
                                <FormattedMessage id="state" />
                            </label>
                            <select
                                autoComplete="off"
                                id="checkout-country"
                                vlaue={selectedState}
                                // onChange={(e) => setSelectedState(e.target.value)}
                                onChange={handleChangeState}
                                className="form-control form-control-select2"
                            >
                                {states.map(({ id, name }) => (
                                    <option key={id} value={id}>
                                        {name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="checkout-city">
                                <FormattedMessage id="townCity" />
                            </label>
                            <select
                                autoComplete="off"
                                id="checkout-country"
                                vlaue={selectedCity}
                                // onChange={(e) => setSelectedCity(e.target.value)}
                                onChange={handleChangeCity}
                                className="form-control form-control-select2"
                            >
                                {cities.map(({ id, name }) => (
                                    <option key={id} value={id}>
                                        {name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="checkout-postcode">
                                <FormattedMessage id="postCodeZip" />
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="checkout-postcode"
                                name="postalCode"
                                placeholder={formatMessage({ id: 'postCodeZip' })}
                                value={postalCode}
                                // onChange={(e) => setPostalCode(e.target.value)}
                                onChange={handleChangePostalCode}
                                autoComplete="off"
                            />
                            {postalCodeErrorMessage && <p style={{ color: 'red' }}>{postalCodeErrorMessage}</p>}
                        </div>

                        <div className="form-group ">
                            <label htmlFor="checkout-phone">
                                <FormattedMessage id="phone" />
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="checkout-phone"
                                placeholder={formatMessage({ id: 'phone' })}
                                name="phone"
                                value={phone}
                                // onChange={(e) => setPhone(e.target.value)}
                                onChange={handleChangePhone}
                                autoComplete="off"
                            />
                            {phoneErrorMessage && <p style={{ color: 'red' }}>{phoneErrorMessage}</p>}
                        </div>

                        <div className="form-group mt-3 mb-0">
                            <button
                                // onClick={(submitNewAddress, handleButtonClick)}
                                onClick={handleButtonClick}
                                className="btn btn-primary"
                                type="button"
                                disabled={isDisabled}
                            >
                                <FormattedMessage id="save" />
                            </button>
                            {/* {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
