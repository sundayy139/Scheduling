import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Specialty.scss';
import Slider from "react-slick";
import { FormattedMessage } from 'react-intl';

class Specialty extends Component {

    render() {

        const settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
        };


        return (
            <div className='specialty-section'>
                <div className='specialty-container'>
                    <div className='specialty-content'>
                        <div className='content-top'>
                            <h2 className='content-title'>
                                <FormattedMessage id="section.popular-specialties" />
                            </h2>
                            <a className='content-btn'>
                                <FormattedMessage id="section.more-info" />
                            </a>
                        </div>
                        <div className='content-container'>
                            <div className='specialty-slider'>
                                <Slider {...settings} className="slider">
                                    <div className='specialty-item'>
                                        <div className='item-link'>
                                            <div className='item-img'>
                                                <img src='https://cdn.bookingcare.vn/fr/w300/2019/12/16/195611-ung-buou.jpg' />
                                            </div>
                                            <div className='item-text'>
                                                Ung bướu
                                            </div>
                                        </div>
                                    </div> <div className='specialty-item'>
                                        <div className='item-link'>
                                            <div className='item-img'>
                                                <img src='https://cdn.bookingcare.vn/fr/w300/2019/12/16/195611-ung-buou.jpg' />
                                            </div>
                                            <div className='item-text'>
                                                Ung bướu
                                            </div>
                                        </div>
                                    </div> <div className='specialty-item'>
                                        <div className='item-link'>
                                            <div className='item-img'>
                                                <img src='https://cdn.bookingcare.vn/fr/w300/2019/12/16/195611-ung-buou.jpg' />
                                            </div>
                                            <div className='item-text'>
                                                Ung bướu
                                            </div>
                                        </div>
                                    </div> <div className='specialty-item'>
                                        <div className='item-link'>
                                            <div className='item-img'>
                                                <img src='https://cdn.bookingcare.vn/fr/w300/2019/12/16/195611-ung-buou.jpg' />
                                            </div>
                                            <div className='item-text'>
                                                Ung bướu
                                            </div>
                                        </div>
                                    </div> <div className='specialty-item'>
                                        <div className='item-link'>
                                            <div className='item-img'>
                                                <img src='https://cdn.bookingcare.vn/fr/w300/2019/12/16/195611-ung-buou.jpg' />
                                            </div>
                                            <div className='item-text'>
                                                Ung bướu
                                            </div>
                                        </div>
                                    </div> <div className='specialty-item'>
                                        <div className='item-link'>
                                            <div className='item-img'>
                                                <img src='https://cdn.bookingcare.vn/fr/w300/2019/12/16/195611-ung-buou.jpg' />
                                            </div>
                                            <div className='item-text'>
                                                Ung bướu
                                            </div>
                                        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
