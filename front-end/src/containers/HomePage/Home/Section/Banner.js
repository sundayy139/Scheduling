import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Banner.scss';
import { FormattedMessage } from 'react-intl';
import { changeLanguageApp } from '../../../../store/actions/appActions';


class Banner extends Component {

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

        let language = this.props.lang;

        return (

            <div className='home-banner'>
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguage: (language) => dispatch(changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Banner);
