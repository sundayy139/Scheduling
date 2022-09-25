import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import { FormattedMessage } from 'react-intl';
import {languages} from '../../utils/constant';
import { changeLanguageApp } from '../../store/actions/appActions';

class HomeHeader extends Component {

    changeLanguage = (language) => {
        //fire redux event
        this.props.changeLanguage(language);
    }


    render() {

        const data = [
            {
                "url": "https://cdn.bookingcare.vn/fo/2021/12/08/133537-khamchuyenkhoa.png",
                "title": "Khám",
                "subtitle": "Chuyên khoa"
            },
            {
                "url": "https://cdn.bookingcare.vn/fo/2021/12/08/133657-khamtuxa.png",
                "title": "Khám",
                "subtitle": "từ xa"
            },
            {
                "url": "https://cdn.bookingcare.vn/fo/2021/12/08/133744-khamtongquat.png",
                "title": "Khám",
                "subtitle": "tổng quát"
            },
            {
                "url": "https://cdn.bookingcare.vn/fo/2021/12/08/133744-dichvuxetnghiem.png",
                "title": "Xét nghiệm",
                "subtitle": "y học"
            },
            {
                "url": "https://cdn.bookingcare.vn/fo/2021/12/08/133744-suckhoetinhthan.png",
                "title": "Súc khỏe",
                "subtitle": "tinh thần"
            },
            {
                "url": "https://cdn.bookingcare.vn/fo/2022/05/19/104635-khamnhakhoa.png",
                "title": "Khám",
                "subtitle": "nha khoa"
            },
            {
                "url": "https://cdn.bookingcare.vn/fo/2022/05/16/151930-phau-thuat.jpg",
                "title": "Gói",
                "subtitle": "Phẫu thuật"
            },
            {
                "url": "https://cdn.bookingcare.vn/fo/2021/12/08/133744-khamtainha.png",
                "title": "Sản phẩm",
                "subtitle": "y tế"
            },
            {
                "url": "https://cdn.bookingcare.vn/fo/2022/07/29/101157-icon-lich-su.jpg",
                "title": "Sức khỏe",
                "subtitle": "Doanh nghiệp"
            },
        ]

        let language = this.props.language;

        return (

            <div className='home-header'>
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div className='left-content'>
                            <a>
                                <i className='fas fa-bars'></i>
                            </a>
                            <div className='logo'>
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
                                    Cơ sở y tế
                                </div>
                                <div className='text-desc'>
                                    Chọn bệnh viện phòng khám
                                </div>
                            </div>
                            <div className='child-content'>
                                <div className='text-title'>
                                    Bác sĩ
                                </div>
                                <div className='text-desc'>
                                    Chọn bác sĩ giỏi
                                </div>
                            </div>
                            <div className='child-content'>
                                <div className='text-title'>
                                    Gói khám
                                </div>
                                <div className='text-desc'>
                                    Khám sức khỏe tổng quát
                                </div>
                            </div>
                        </div>
                        <div className='right-content'>
                            {/* <ul>
                                <li>
                                    <a>
                                        <img></img>
                                        <span>VN</span>
                                    </a>
                                </li>
                                <li>
                                    <a>
                                        <img></img>
                                        <span>EN</span>
                                    </a>
                                </li>
                            </ul> */}
                            <div className='supports'>
                                <i className='fas fa-question-circle'></i>
                                <span>Hỗ trợ</span>
                            </div>
                            <div className={language === languages.VI ? "language-vi active" : "language-vi"}>
                                <span onClick={() => {this.changeLanguage(languages.VI)}}>VI</span>
                            </div>
                            <div className={language === languages.EN ? "language-en active" : "language-en"}>
                                <span onClick={() => {this.changeLanguage(languages.EN)}}>EN</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='home-header-banner'>
                    <div className='banner-top'>
                        <div className='banner-heading'>
                            <div className='banner-title'>NỀN TẢNG Y TẾ</div>
                            <div className='banner-sub-title'>CHĂM SÓC SỨC KHỎE TOÀN DIỆN</div>
                        </div>
                        <div className='banner-search'>
                            <i className='fas fa-search'></i>
                            <input type='text' placeholder='Tìm lý do khám' />
                        </div>
                    </div>
                    <div className='banner-options'>
                        {
                            data && data.map((item, index) => (
                                <div className='banner-item' key={index}>
                                    <a className='item-link'>
                                        <div className='item-img'>
                                            <div className='item-icon' style={{ backgroundImage: `url(${item.url})` }} >
                                            </div>
                                        </div>
                                        <div className='item-title'>
                                            {item.title}
                                            <br />
                                            {item.subtitle}
                                        </div>
                                    </a>
                                </div>
                            ))
                        }
                    </div>
                </div >
            </div >
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguage: (language) => dispatch(changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
