import React from 'react';
import './Banner.scss';
import { FormattedMessage } from 'react-intl';

const Banner = () => {
    const data = [
        {
            "url": "https://cdn.bookingcare.vn/fo/2021/12/08/133537-khamchuyenkhoa.png",
            "keyword": "Khám Chuyên khoa",
        },
        {
            "url": "https://cdn.bookingcare.vn/fo/2021/12/08/133657-khamtuxa.png",
            "keyword": "Khám từ xa",
        },
        {
            "url": "https://cdn.bookingcare.vn/fo/2021/12/08/133744-khamtongquat.png",
            "keyword": "Khám tổng quát",
        },
        {
            "url": "https://cdn.bookingcare.vn/fo/2021/12/08/133744-dichvuxetnghiem.png",
            "keyword": "Xét nghiệm y học",
        },
        {
            "url": "https://cdn.bookingcare.vn/fo/2021/12/08/133744-suckhoetinhthan.png",
            "keyword": "Sức khỏe tinh thần",
        },
        {
            "url": "https://cdn.bookingcare.vn/fo/2022/05/19/104635-khamnhakhoa.png",
            "keyword": "Khám nha khoa",
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
    return (
        <div>

            <div className='home-banner'>
                <div className='home-header-banner'>
                    <div className='banner-top'>
                        <div className='banner-heading'>
                            <div className='banner-title'>
                                NỀN TẢNG Y TẾ
                            </div>
                            <div className='banner-sub-title'>
                                CHĂM SÓC SỨC KHỎE TOÀN DIỆN
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
                                            {item.keyword}
                                        </div>
                                    </a>
                                </div>
                            ))
                        }
                    </div>
                </div >

            </div >
        </div>
    )
}

export default Banner