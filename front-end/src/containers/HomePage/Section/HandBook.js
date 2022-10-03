import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HandBook.scss';
import Slider from "react-slick";
import { FormattedMessage } from 'react-intl';

class HandBook extends Component {

    render() {

        const settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 2,
            slidesToScroll: 1,
        };


        return (
            <div className='handBook-section'>
                <div className='handBook-container'>
                    <div className='handBook-content'>
                        <div className='content-top'>
                            <h2 className='content-title'>
                                <FormattedMessage id="section.handbook" />
                            </h2>
                            <a className='content-btn'>
                                <FormattedMessage id="section.all-posts" />
                            </a>
                        </div>
                        <div className='content-container'>
                            <div className='handBook-slider'>
                                <Slider {...settings} className="slider">
                                    <div className='handBook-item'>
                                        <a className='item-link'>
                                            <div className='item-img'>
                                                <img src='https://cdn.bookingcare.vn/fr/w300/2019/12/16/195611-ung-buou.jpg' />
                                            </div>
                                            <div className='item-text'>
                                                Top 5 Phòng khám Sản phụ khoa Quận 3 uy tín
                                            </div>
                                        </a>
                                    </div> <div className='handBook-item'>
                                        <a className='item-link'>
                                            <div className='item-img'>
                                                <img src='https://cdn.bookingcare.vn/fr/w300/2019/12/16/195611-ung-buou.jpg' />
                                            </div>
                                            <div className='item-text'>
                                                Ung bướu
                                            </div>
                                        </a>
                                    </div> <div className='handBook-item'>
                                        <a className='item-link'>
                                            <div className='item-img'>
                                                <img src='https://cdn.bookingcare.vn/fr/w300/2019/12/16/195611-ung-buou.jpg' />
                                            </div>
                                            <div className='item-text'>
                                                Ung bướu
                                            </div>
                                        </a>
                                    </div> <div className='handBook-item'>
                                        <a className='item-link'>
                                            <div className='item-img'>
                                                <img src='https://cdn.bookingcare.vn/fr/w300/2019/12/16/195611-ung-buou.jpg' />
                                            </div>
                                            <div className='item-text'>
                                                Ung bướu
                                            </div>
                                        </a>
                                    </div> <div className='handBook-item'>
                                        <a className='item-link'>
                                            <div className='item-img'>
                                                <img src='https://cdn.bookingcare.vn/fr/w300/2019/12/16/195611-ung-buou.jpg' />
                                            </div>
                                            <div className='item-text'>
                                                Ung bướu
                                            </div>
                                        </a>
                                    </div> <div className='handBook-item'>
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

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
