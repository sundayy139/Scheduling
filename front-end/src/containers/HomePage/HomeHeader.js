import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import { FormattedMessage } from 'react-intl';
import { languages } from '../../utils/constant';
import { changeLanguageApp } from '../../store/actions/appActions';
import { withRouter } from 'react-router';


class HomeHeader extends Component {

    changeLanguage = (language) => {
        //fire redux event
        this.props.changeLanguage(language);
    }

    returnHome = () => {
        if (this.props.history) {
            this.props.history.push('/home')
        }
    }

    render() {

        let language = this.props.lang;

        return (

            <div className='home-header'>
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div className='left-content'>
                            <a>
                                <i className='fas fa-bars'></i>
                            </a>
                            <div className='logo' onClick={() => this.returnHome()}>
                            </div>
                        </div>
                        <div className='center-content'>
                            <div className='child-content'>
                                <div className='text-title'>
                                    <FormattedMessage id='home-header.speciality' />
                                </div>
                                <div className='text-desc'>
                                    <FormattedMessage id='home-header.search-doctor' />
                                </div>
                            </div>
                            <div className='child-content'>
                                <div className='text-title'>
                                    <FormattedMessage id='home-header.medical-facilities' />
                                </div>
                                <div className='text-desc'>
                                    <FormattedMessage id='home-header.choose-clinic' />
                                </div>
                            </div>
                            <div className='child-content'>
                                <div className='text-title'>
                                    <FormattedMessage id='home-header.doctor' />
                                </div>
                                <div className='text-desc'>
                                    <FormattedMessage id='home-header.choose-doctor' />
                                </div>
                            </div>
                            <div className='child-content'>
                                <div className='text-title'>
                                    <FormattedMessage id='home-header.examination-package' />
                                </div>
                                <div className='text-desc'>
                                    <FormattedMessage id='home-header.general-health' />
                                </div>
                            </div>
                        </div>
                        <div className='right-content'>
                            <div className='supports'>
                                <i className='fas fa-question-circle'></i>
                                <span><FormattedMessage id='home-header.support' /></span>
                            </div>
                            <div className={language === languages.VI ? "language-vi active" : "language-vi"}>
                                <span onClick={() => { this.changeLanguage(languages.VI) }}>VI</span>
                            </div>
                            <div className={language === languages.EN ? "language-en active" : "language-en"}>
                                <span onClick={() => { this.changeLanguage(languages.EN) }}>EN</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        lang: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguage: (language) => dispatch(changeLanguageApp(language))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
