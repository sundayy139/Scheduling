import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Specialty.scss';
import Slider from "react-slick";
import { FormattedMessage } from 'react-intl';
import { getAllSpecialtyService } from '../../../../services/userService';
import { withRouter } from 'react-router'


class Specialty extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSpecialty: []
        }
    }

    async componentDidMount() {
        let res = await getAllSpecialtyService("ALL");
        if (res && res.errCode === 0) {
            this.setState({
                dataSpecialty: res.specialties ? res.specialties : ''
            });
        }
    }

    handleViewDetailSpecialty = (specialty) => {
        this.props.history.push(`/detail-specialty/${specialty.id}`);
    }

    render() {

        const settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
        };

        let { dataSpecialty } = this.state;
        if (dataSpecialty && dataSpecialty.length > 0) {
            dataSpecialty.map((item, i) => {
                if (item && item.image) {
                    item.avatar = new Buffer(item.image, 'base64').toString('binary');
                }
            })
        }

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
                                    {
                                        dataSpecialty && dataSpecialty.length > 0 &&
                                        dataSpecialty.map((item, index) => {
                                            return (
                                                <div
                                                    className='specialty-item'
                                                    key={index}
                                                    onClick={() => this.handleViewDetailSpecialty(item)}
                                                >
                                                    <div className='item-link'>
                                                        <div className='item-img'>
                                                            <img src={item.avatar} />
                                                        </div>
                                                        <div className='item-text'>
                                                            {item.name}
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));
