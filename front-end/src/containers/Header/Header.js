import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu, doctorMenu } from './menuApp';
import { languages, USER_ROLE } from '../../utils/constant';
import { FormattedMessage } from 'react-intl';
import './Header.scss';
import _ from 'lodash';
import ModalChangePassword from './ModalChangePassword';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuApp: [],
            isOpenModal: false,
        }
    }

    handleChangeLanguage = (language) => {
        this.props.changeLanguage(language);
    }

    componentDidMount() {
        let { userInfo } = this.props;
        let menu = [];
        if (userInfo && !_.isEmpty(userInfo)) {
            let role = userInfo.roleId;
            if (role === USER_ROLE.ADMIN) {
                menu = adminMenu;
            } else if (role === USER_ROLE.DOCTOR) {
                menu = doctorMenu;
            }
        }

        this.setState({
            menuApp: menu
        })
    }

    componentDidUpdate(prevProps) {
        if (prevProps.userInfo !== this.props.userInfo) {
            let { userInfo } = this.props;
            let menu = [];
            if (userInfo && !_.isEmpty(userInfo)) {
                let role = userInfo.roleId;
                if (role === USER_ROLE.ADMIN) {
                    menu = adminMenu;
                } else if (role === USER_ROLE.DOCTOR) {
                    menu = doctorMenu;
                }
            }

            this.setState({
                menuApp: menu
            })
        }
    }


    toggleisOpenModal = () => {
        this.setState({
            isOpenModal: !(this.state.isOpenModal)
        })
    }

    handleChangePassword = () => {
        this.setState({
            isOpenModal: true
        })
    }

    render() {
        const { processLogout, lang, userInfo } = this.props;

        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={this.state.menuApp} />
                </div>

                {/* language */}
                <div className='language'>
                    <span className='welcome'>
                        <FormattedMessage id="home-header.welcome" />
                        {userInfo && userInfo.firstName && userInfo.lastName ? userInfo.lastName + " " + userInfo.firstName : ""} !
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
                    <div className="btn setting">
                        <i className="fas fa-cog"></i>
                        <div className='menu'>
                            <span
                                className='change-password'
                                onClick={this.handleChangePassword}
                            >
                                <FormattedMessage id="home-header.change-password" />
                            </span>
                            <span
                                className='log-out'
                                onClick={processLogout}
                            >
                                <FormattedMessage id="home-header.log-out" />
                            </span>
                        </div>
                    </div>

                    <ModalChangePassword
                        isOpen={this.state.isOpenModal}
                        toggleisOpenModal={this.toggleisOpenModal}
                        userInfo={this.props.userInfo}
                    />
                </div>
            </div >
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
