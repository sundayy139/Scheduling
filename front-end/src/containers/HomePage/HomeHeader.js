import React, { useState } from 'react'
import './HomeHeader.scss';
import { Link, NavLink, useHistory } from 'react-router-dom'
import { dataMenu, dataMenuMore } from './dataMenu';

const HomeHeader = () => {

    const [clickedMenu, setClickMenu] = useState(false);
    const history = useHistory();

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
                                            {item.name}
                                        </NavLink>
                                    </li>

                                ))
                            }
                        </ul>

                        <div className='about-web'>
                            <p>
                                Về chúng tôi
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
                                            {item.name}
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
                                        Chuyên khoa
                                    </Link>
                                </div>
                                <div className='text-desc'>
                                    Tìm bác sĩ theo chuyên khoa
                                </div>
                            </div>
                            <div className='child-content'>
                                <div className='text-title'>
                                    <Link to={'/clinic'} className="link">
                                        Cơ sở y tế
                                    </Link>
                                </div>
                                <div className='text-desc'>
                                    Chọn bệnh viện, phòng khám
                                </div>
                            </div>
                            <div className='child-content'>
                                <div className='text-title'>
                                    <Link to={'/all-doctor'} className="link">
                                        Bác sĩ
                                    </Link>
                                </div>
                                <div className='text-desc'>
                                    Chọn bác sĩ giỏi
                                </div>
                            </div>
                            <div className='child-content'>
                                <div className='text-title'>
                                    <Link to={'/handbook'} className="link">
                                        Cẩm nang
                                    </Link>
                                </div>
                                <div className='text-desc'>
                                    Cẩm nang chăm sóc sức khỏe
                                </div>
                            </div>
                        </div>
                        <div className='right-content'>
                            <div className='supports'>
                                <i className='fas fa-question-circle'></i>
                                <span>Hỗ trợ</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div>
    )
}

export default HomeHeader