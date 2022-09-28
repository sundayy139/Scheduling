import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu } from './menuApp';
import { languages } from '../../utils/constant';
import { FormattedMessage } from 'react-intl';
import './Header.scss';

class Header extends Component {

    handleChangeLanguage = (language) => {
        this.props.changeLanguage(language);
    }

    render() {
        const { processLogout, lang, userInfo } = this.props;

        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={adminMenu} />
                </div>

                {/* language */}
                <div className='language'>
                    <span className='welcome'>
                        <FormattedMessage  id="home-header.welcome"/>
                        {userInfo && userInfo.firstName && userInfo.lastName ? userInfo.lastName +" "+ userInfo.firstName : ""} !
                    </span>
                    <div className='language-group'>
                        {lang === languages.VI ? "VI" : "EN"}
                        <div className='language-box'>
                            <span
                                className="language-vi"
                                onClick={() => this.handleChangeLanguage(languages.VI)}>
                                VI
                            </span>
                            <span
                                className="language-en"
                                onClick={() => this.handleChangeLanguage(languages.EN)}>
                                EN
                            </span>
                        </div>
                    </div>

                    {/* nút logout */}
                    <div className="btn btn-logout" onClick={processLogout} title="Log out">
                        <i className="fas fa-sign-out-alt"></i>
                    </div>
                </div>


            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
        lang: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguage: (language) => dispatch(actions.changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
