import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { applyCoupon } from '../../api/products';
import { toastError } from '../toast/toastComponent';

const CouponCode = ({ setCodeCoupon }) => {
    const { formatMessage } = useIntl();
    const [code, setCode] = useState('');
    const [accepptedMsg, setAccepptedMsg] = useState('');
    const [refuse, setRefuse] = useState(false);

    function submitCode(e) {
        e.preventDefault();
        if (code.length) {
            applyCoupon(code, (success) => {
                setAccepptedMsg(success.message);
                setCodeCoupon(code);
                if (success.success) setRefuse(false);
                else setRefuse(true);
            }, (fail) => {
                toastError(fail);
            });
        }
    }

    return (
        <div className="mb-3">
            <form className="cart__coupon-form" onSubmit={submitCode}>
                <input
                    type="text"
                    id="input-coupon-code"
                    placeholder={formatMessage({ id: 'couponCode' })}
                    className="form-control input-border"
                    onChange={(e) => setCode(e.target.value)}
                    value={code}
                />

                <button type="submit" className="btn btn-primary">
                    {formatMessage({ id: 'applyCoupon' })}
                </button>

            </form>
            {
                accepptedMsg.length ? (
                    <div className={`${refuse ? 'text-danger' : 'text-success'}`}>
                        {accepptedMsg}
                    </div>
                ) : null
            }
        </div>
    );
};

export default CouponCode;
