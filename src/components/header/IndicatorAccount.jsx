// react
import React from 'react';

// third-party
import { Link } from 'react-router-dom';

// application
import { connect } from 'react-redux';
import Indicator from './Indicator';
import { Person20Svg } from '../../svg';
// store
import { LOGOUT } from '../../store/auth/auth.types';

function IndicatorAccount(props) {
    const { dispatch, auth: { user, token } } = props;
    function logoutUser() {
        dispatch({ type: LOGOUT });
    }

    const dropdown = (
        token ? (
            <div className="account-menu">

                {
                    token
                    && (

                        <Link to="/account/dashboard" className="account-menu__user">
                            <div className="account-menu__user-avatar">
                                <img src="images/avatars/profile-avatar.png" alt="avatar" />
                            </div>
                            <div className="account-menu__user-info">
                                <div className="account-menu__user-name">{user.name}</div>
                                <div className="account-menu__user-email">{user.email}</div>
                            </div>

                        </Link>
                    )
                }

                <div className="account-menu__divider" />
                <ul className="account-menu__links">
                    <li><Link to="/account/profile">Edit Profile</Link></li>
                    <li><Link to="/account/orders">Order History</Link></li>
                    <li><Link to="/account/addresses">Addresses</Link></li>
                    <li><Link to="/account/password">Password</Link></li>
                </ul>
                <div className="account-menu__divider" />
                <ul className="account-menu__links">
                    <li>
                        <li>
                            <Link to="/account/login" onClick={logoutUser} onKeyDown={logoutUser}>
                                Logout
                            </Link>
                        </li>
                    </li>
                </ul>
            </div>
        ) : <React.Fragment />
    );

    return (
        <React.Fragment>
            <Indicator url={!token ? '/account/login' : null} dropdown={dropdown} isAccount icon={<Person20Svg />} />
        </React.Fragment>
    );
}

const mapStateToProps = (state) => ({
    auth: state.auth,
});
export default connect(mapStateToProps)(IndicatorAccount);
