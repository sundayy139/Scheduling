import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import { FormattedMessage } from 'react-intl';
import { languages } from '../../utils/constant';
import { changeLanguageApp } from '../../store/actions/appActions';
import { withRouter } from 'react-router';
import { Link, NavLink } from 'react-router-dom'
import { dataMenu, dataMenuMore } from './dataMenu';
import logoVn from '../../assets/icon-language/vietnam.png';
import logoEn from '../../assets/icon-language/united-kingdom.png';

class HomeHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clickedMenu: false,
        }
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps) {

    }

    changeLanguage = (language) => {
        //fire redux event
        this.props.changeLanguage(language);
    }

    returnHome = () => {
        if (this.props.history) {
            this.props.history.push('/home')
        }
    }

    handleClickedMenu = () => {
        this.setState({
            clickedMenu: !this.state.clickedMenu
        })
    }

    render() {

        let lang = this.props.lang;
        let { clickedMenu } = this.state

        return (

            <div className='home-header'>
                <div className='home-header-container'>
                    <div className={clickedMenu === false ? 'header-menu' : 'header-menu active'} >
                        <span
                            onClick={this.handleClickedMenu}
                        >
                            <i className="fas fa-times"></i>
                        </span>
                        <ul className='menu-list1'>
                            {
                                dataMenu && dataMenu.map((item) => (
                                    <li key={item.id}>
                                        <NavLink
                                            to={item.path}
                                            className="link"
                                            activeClassName='active'
                                        >
                                            <FormattedMessage id={`header-menu.${item.name}`} />
                                        </NavLink>
                                    </li>

                                ))
                            }
                        </ul>

                        <div className='about-web'>
                            <p>
                                <FormattedMessage id="header-menu.about" />
                            </p>
                        </div>

                        <ul className='menu-list2'>
                            {
                                dataMenuMore && dataMenuMore.map((item) => (
                                    <li key={item.id}>
                                        <NavLink
                                            to={item.path}
                                            className="link"
                                            activeClassName='active'
                                        >
                                            <FormattedMessage id={`header-menu.${item.name}`} />
                                        </NavLink>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                    <div className='home-header-content'>
                        <div className='left-content'>
                            <span>
                                <i
                                    className="fas fa-bars"
                                    onClick={this.handleClickedMenu}
                                ></i>
                            </span>
                            <div className='logo' onClick={() => this.returnHome()}>
                            </div>
                        </div>
                        <div className='center-content'>
                            <div className='child-content'>
                                <div className='text-title'>
                                    <Link to={'/specialty'} className="link">
                                        <FormattedMessage id='home-header.speciality' />
                                    </Link>
                                </div>
                                <div className='text-desc'>
                                    <FormattedMessage id='home-header.search-doctor' />
                                </div>
                            </div>
                            <div className='child-content'>
                                <div className='text-title'>
                                    <Link to={'/clinic'} className="link">
                                        <FormattedMessage id='home-header.medical-facilities' />
                                    </Link>
                                </div>
                                <div className='text-desc'>
                                    <FormattedMessage id='home-header.choose-clinic' />
                                </div>
                            </div>
                            <div className='child-content'>
                                <div className='text-title'>
                                    <Link to={'/all-doctor'} className="link">
                                        <FormattedMessage id='home-header.doctor' />
                                    </Link>
                                </div>
                                <div className='text-desc'>
                                    <FormattedMessage id='home-header.choose-doctor' />
                                </div>
                            </div>
                            <div className='child-content'>
                                <div className='text-title'>
                                    <Link to={'/handbook'} className="link">
                                        <FormattedMessage id='home-header.handbook' />
                                    </Link>
                                </div>
                                <div className='text-desc'>
                                    <FormattedMessage id='home-header.handbook-health' />
                                </div>
                            </div>
                        </div>
                        <div className='right-content'>
                            <div className='supports'>
                                <i className='fas fa-question-circle'></i>
                                <span><FormattedMessage id='home-header.support' /></span>
                            </div>
                            <div className='language-group'>
                                {lang === languages.VI ? (
                                    <img src={logoVn} />
                                )
                                    : (
                                        <img src={logoEn} />
                                    )

                                }
                                <div className='language-box'>
                                    <span
                                        className="language-vi"
                                        onClick={() => this.changeLanguage(languages.VI)}>
                                        <img src={logoVn} />
                                        VN
                                    </span>
                                    <span
                                        className="language-en"
                                        onClick={() => this.changeLanguage(languages.EN)}>
                                        <img src={logoEn} />
                                        EN
                                    </span>
                                </div>
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
