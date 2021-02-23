import React from 'react';
import DEMO  from './../../../../../store/constant';
import Aux from "../../../../../hoc/_Aux";
import logo from '../../../../../assets/images/logo-hitcount.png'
// import logo from '../../../../../assets/images/logo-light.png'

const navLogo = (props) => {
    let toggleClass = ['mobile-menu'];
    if (props.collapseMenu) {
        toggleClass = [...toggleClass, 'on'];
    }

    return (
        <Aux>
            <div className="navbar-brand header-logo vh-center">
                 <a href={DEMO.BLANK_LINK} className="b-brand">
                    <img src={logo} className="nav-logo" />
                 </a>
            </div>
            <h6 className="logo-title">Hit Count Monitoring App</h6>
        </Aux>
    );
};

export default navLogo;
