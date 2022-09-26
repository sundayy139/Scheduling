import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import { FormattedMessage } from 'react-intl';
import { languages } from '../../utils/constant';
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
                "keyword": "specialist-examination",
            },
            {
                "url": "https://cdn.bookingcare.vn/fo/2021/12/08/133657-khamtuxa.png",
                "keyword": "remote-examination",
            },
            {
                "url": "https://cdn.bookingcare.vn/fo/2021/12/08/133744-khamtongquat.png",
                "keyword": "general-examination",
            },
            {
                "url": "https://cdn.bookingcare.vn/fo/2021/12/08/133744-dichvuxetnghiem.png",
                "keyword": "medicine-test",
            },
            {
                "url": "https://cdn.bookingcare.vn/fo/2021/12/08/133744-suckhoetinhthan.png",
                "keyword": "spiritual-health",
            },
            {
                "url": "https://cdn.bookingcare.vn/fo/2022/05/19/104635-khamnhakhoa.png",
                "keyword": "dentistry-examination",
            },
            // {
            //     "url": "https://cdn.bookingcare.vn/fo/2022/05/16/151930-phau-thuat.jpg",
            //     "keyword": "surgical-package",
            // },
            // {
            //     "url": "https://cdn.bookingcare.vn/fo/2021/12/08/133744-khamtainha.png",
            //     "keyword": "medical-product",
            // },
            // {
            //     "url": "https://cdn.bookingcare.vn/fo/2022/07/29/101157-icon-lich-su.jpg",
            //     "keyword": "business-health",
            // },
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

                <div className='home-header-banner'>
                    <div className='banner-top'>
                        <div className='banner-heading'>
                            <div className='banner-title'>
                                <FormattedMessage id="home-header-banner.banner-title" />
                            </div>
                            <div className='banner-sub-title'>
                                <FormattedMessage id="home-header-banner.banner-sub-title" />
                            </div>
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
                                            <FormattedMessage id={`home-header-banner.${item.keyword}`} />
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
