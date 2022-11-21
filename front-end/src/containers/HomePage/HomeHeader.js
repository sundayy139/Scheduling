import React, { useState } from 'react'
import './HomeHeader.scss';
import { FormattedMessage } from 'react-intl';
import { languages } from '../../utils/constant';
import { changeLanguageApp } from '../../store/actions/appActions';
import { Link, NavLink, useHistory } from 'react-router-dom'
import { dataMenu, dataMenuMore } from './dataMenu';
import logoVn from '../../assets/icon-language/vietnam.png';
import logoEn from '../../assets/icon-language/united-kingdom.png';
import { useDispatch, useSelector } from 'react-redux';

const HomeHeader = (props) => {

    const [clickedMenu, setClickMenu] = useState(false);
    const lang = useSelector((state) => state.app.language);
    const dispatch = useDispatch();
    const history = useHistory();

    const changeLanguage = (language) => {
        //fire redux event
        dispatch(changeLanguageApp(language));
    }

    const handleClickedMenu = () => {
        setClickMenu(!clickedMenu)
    }

    const returnHome = () => {
        history.push('/home')
    }

    return (
        <div>

            <div className='home-header'>
                <div className='home-header-container'>
                    <div className={clickedMenu === false ? 'header-menu' : 'header-menu active'} >
                        <span
                            onClick={handleClickedMenu}
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
                                    onClick={handleClickedMenu}
                                ></i>
                            </span>
                            <div className='logo' onClick={returnHome}>
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
                                        onClick={() => changeLanguage(languages.VI)}>
                                        <img src={logoVn} />
                                        VN
                                    </span>
                                    <span
                                        className="language-en"
                                        onClick={() => changeLanguage(languages.EN)}>
                                        <img src={logoEn} />
                                        EN
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div>
    )
}

export default HomeHeader