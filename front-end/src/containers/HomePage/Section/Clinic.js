import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Clinic.scss';
import Slider from "react-slick";

class Clinic extends Component {

    render() {

        const settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
        };


        return (
            <div className='clinic-section'>
                <div className='clinic-container'>
                    <div className='clinic-content'>
                        <div className='content-top'>
                            <h2 className='content-title'>Cơ sở y tế nổi bật</h2>
                            <a className='content-btn'> Xem thêm</a>
                        </div>
                        <div className='content-container'>
                            <div className='clinic-slider'>
                                <Slider {...settings} className="slider">
                                    <div className='clinic-item'>
                                        <a className='item-link'>
                                            <div className='item-img'>
                                                <img src='https://cdn.bookingcare.vn/fr/w300/2019/12/16/195611-ung-buou.jpg' />
                                            </div>
                                            <div className='item-text'>
                                                Ung bướu
                                            </div>
                                        </a>
                                    </div> <div className='clinic-item'>
                                        <a className='item-link'>
                                            <div className='item-img'>
                                                <img src='https://cdn.bookingcare.vn/fr/w300/2019/12/16/195611-ung-buou.jpg' />
                                            </div>
                                            <div className='item-text'>
                                                Ung bướu
                                            </div>
                                        </a>
                                    </div> <div className='clinic-item'>
                                        <a className='item-link'>
                                            <div className='item-img'>
                                                <img src='https://cdn.bookingcare.vn/fr/w300/2019/12/16/195611-ung-buou.jpg' />
                                            </div>
                                            <div className='item-text'>
                                                Ung bướu
                                            </div>
                                        </a>
                                    </div> <div className='clinic-item'>
                                        <a className='item-link'>
                                            <div className='item-img'>
                                                <img src='https://cdn.bookingcare.vn/fr/w300/2019/12/16/195611-ung-buou.jpg' />
                                            </div>
                                            <div className='item-text'>
                                                Ung bướu
                                            </div>
                                        </a>
                                    </div> <div className='clinic-item'>
                                        <a className='item-link'>
                                            <div className='item-img'>
                                                <img src='https://cdn.bookingcare.vn/fr/w300/2019/12/16/195611-ung-buou.jpg' />
                                            </div>
                                            <div className='item-text'>
                                                Ung bướu
                                            </div>
                                        </a>
                                    </div> <div className='clinic-item'>
                                        <a className='item-link'>
                                            <div className='item-img'>
                                                <img src='https://cdn.bookingcare.vn/fr/w300/2019/12/16/195611-ung-buou.jpg' />
                                            </div>
                                            <div className='item-text'>
                                                Ung bướu
                                            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Clinic);
