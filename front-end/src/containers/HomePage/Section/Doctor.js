import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Doctor.scss';
import Slider from "react-slick";

class Doctor extends Component {

    render() {

        const settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
        };


        return (
            <div className='doctor-section'>
                <div className='doctor-container'>
                    <div className='doctor-content'>
                        <div className='content-top'>
                            <h2 className='content-title'>Bác sĩ nổi bật tuần qua</h2>
                            <a className='content-btn'> Xem thêm</a>
                        </div>
                        <div className='content-container'>
                            <div className='doctor-slider'>
                                <Slider {...settings} className="slider">
                                    <div className='doctor-item'>
                                        <a className='item-link'>
                                            <div className='item-img'>
                                                <img src='https://cdn.bookingcare.vn/fr/w300/2019/12/16/195611-ung-buou.jpg' />
                                            </div>
                                            <div className='item-text'>
                                            Phó Giáo sư, Tiến sĩ, Bác sĩ cao cấp Nguyễn Duy Hưng
                                            </div>
                                            <span>Da liễu</span>
                                        </a>
                                    </div>
                                    <div className='doctor-item'>
                                        <a className='item-link'>
                                            <div className='item-img'>
                                                <img src='https://cdn.bookingcare.vn/fr/w300/2019/12/16/195611-ung-buou.jpg' />
                                            </div>
                                            <div className='item-text'>
                                            Phó Giáo sư, Tiến sĩ, Bác sĩ cao cấp Nguyễn Duy Hưng
                                            </div>
                                            <span>Da liễu</span>
                                        </a>
                                    </div>
                                    <div className='doctor-item'>
                                        <a className='item-link'>
                                            <div className='item-img'>
                                                <img src='https://cdn.bookingcare.vn/fr/w300/2019/12/16/195611-ung-buou.jpg' />
                                            </div>
                                            <div className='item-text'>
                                            Phó Giáo sư, Tiến sĩ, Bác sĩ cao cấp Nguyễn Duy Hưng
                                            </div>
                                            <span>Da liễu</span>
                                        </a>
                                    </div>
                                    <div className='doctor-item'>
                                        <a className='item-link'>
                                            <div className='item-img'>
                                                <img src='https://cdn.bookingcare.vn/fr/w300/2019/12/16/195611-ung-buou.jpg' />
                                            </div>
                                            <div className='item-text'>
                                            Phó Giáo sư, Tiến sĩ, Bác sĩ cao cấp Nguyễn Duy Hưng
                                            </div>
                                            <span>Da liễu</span>
                                        </a>
                                    </div>
                                    <div className='doctor-item'>
                                        <a className='item-link'>
                                            <div className='item-img'>
                                                <img src='https://cdn.bookingcare.vn/fr/w300/2019/12/16/195611-ung-buou.jpg' />
                                            </div>
                                            <div className='item-text'>
                                            Phó Giáo sư, Tiến sĩ, Bác sĩ cao cấp Nguyễn Duy Hưng
                                            </div>
                                            <span>Da liễu</span>
                                        </a>
                                    </div>
                                    <div className='doctor-item'>
                                        <a className='item-link'>
                                            <div className='item-img'>
                                                <img src='https://cdn.bookingcare.vn/fr/w300/2019/12/16/195611-ung-buou.jpg' />
                                            </div>
                                            <div className='item-text'>
                                            Phó Giáo sư, Tiến sĩ, Bác sĩ cao cấp Nguyễn Duy Hưng
                                            </div>
                                            <span>Da liễu</span>
                                        </a>
                                    </div>
                                    
                                </Slider>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);
