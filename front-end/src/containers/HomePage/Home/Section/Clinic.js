import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Clinic.scss';
import Slider from "react-slick";
import { FormattedMessage } from 'react-intl';
import { getAllClinicService } from '../../../../services/userService';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom'

class Clinic extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataClinic: []
        }
    }

    async componentDidMount() {
        let res = await getAllClinicService("ALL");
        if (res && res.errCode === 0) {
            this.setState({
                dataClinic: res.clinics ? res.clinics : ''
            });
        }
    }

    handleViewDetailClinic = (clinic) => {
        this.props.history.push(`/detail-clinic/${clinic.id}`);
    }

    render() {

        const settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
        };

        let { dataClinic } = this.state;
        if (dataClinic && dataClinic.length > 0) {
            dataClinic.map((item, i) => {
                if (item && item.image) {
                    item.avatar = new Buffer(item.image, 'base64').toString('binary');
                }
            })
        }

        return (
            <div className='clinic-section'>
                <div className='clinic-container'>
                    <div className='clinic-content'>
                        <div className='content-top'>
                            <h2 className='content-title'>
                                <FormattedMessage id="section.out-standing-medical" />
                            </h2>
                            <Link to={'/clinic'} className='content-btn'>
                                <FormattedMessage id="section.more-info" />
                            </Link>
                        </div>
                        <div className='content-container'>
                            <div className='clinic-slider'>
                                <Slider {...settings} className="slider">
                                    {
                                        dataClinic && dataClinic.length > 0 &&
                                        dataClinic.map((item, index) => {
                                            return (
                                                <div
                                                    className='clinic-item'
                                                    key={index}
                                                    onClick={() => this.handleViewDetailClinic(item)}
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Clinic));
