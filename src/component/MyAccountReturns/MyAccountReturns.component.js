/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import returnImage from '../../style/icons/LoginAndSignup/returns.png';

import './MyAccountReturns.style.scss';

/** @namespace SonbolPwa/Component/MyAccountReturns/Component/mapStateToProps */
export const mapStateToProps = (state) => ({
    device: state.ConfigReducer.device,
    contacts: state.InitConfigReducer.initConfig.Configurations.contact_us
});

/** @namespace SonbolPwa/Component/MyAccountReturns/Component/mapDispatchToProps */
export const mapDispatchToProps = () => {};

/** @namespace SonbolPwa/Component/MyAccountReturns/Component */
export class MyAccountReturnsComponent extends PureComponent {
    render() {
        const {
            contacts, device
        } = this.props;

        const whatsAapLink = device.isMobile ? 'whatsapp://send?phone=' : 'https://web.whatsapp.com/send?phone=';
        const whatsappNumber = contacts.length
            ? (
                contacts.find((item) => item.key === 'whatsapp')
            )
            : null;
        // const mobileNumer = contacts.length
        //     ? (
        //         contacts.find((item) => item.key === 'mobile')
        //     )
        //     : null;

        return (
        <section className="return-orderlist-container">
            <div className="return-order-list-container">
                <img src={ returnImage } alt="empty-order" />
            </div>
            <div className="return-content">
                <div className="no-request">لا يوجد أي طلبات</div>
                <div className="returntext">لاتضيع الفرصة وتسوق من تشكيلات ازيائنا الفريدة</div>
                <div className="returnlist-button"><a target="_blank" className=" " href={ `${whatsAapLink}${whatsappNumber.value.replace(/ +/g, '')}` } rel="noreferrer">تسوق اآن</a></div>
            </div>
        </section>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAccountReturnsComponent);
