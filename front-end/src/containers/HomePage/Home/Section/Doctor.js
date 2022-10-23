import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Doctor.scss';
import Slider from "react-slick";
import * as actions from "../../../../store/actions";
import { languages } from "../../../../utils";
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router'

class Doctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctors: [],
        }
    }


    componentDidMount() {
        this.props.loadTopDoctor();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.topDoctors !== this.props.topDoctors) {
            this.setState({
                arrDoctors: this.props.topDoctors
            })
        }
    }

    handleViewDetailDoctor = (doctor) => {
        this.props.history.push(`/detail-doctor/${doctor.id}`);
    }

    render() {

        let arrDoctors = this.state.arrDoctors;
        let language = this.props.lang;

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
                            <h2 className='content-title'>
                                <FormattedMessage id="section.out-standing-doctor" />
                            </h2>
                            <a className='content-btn'>
                                <FormattedMessage id="section.more-info" />
                            </a>
                        </div>
                        <div className='content-container'>
                            <div className='doctor-slider'>
                                <Slider {...settings} className="slider">
                                    {
                                        arrDoctors && arrDoctors.length > 0 && arrDoctors.map((item, i) => {
                                            let nameVi = `${item.positionData.value_VI} ${item.firstName} ${item.lastName}`;
                                            let nameEn = `${item.positionData.value_EN} ${item.firstName} ${item.lastName}`;

                                            let imageBase64 = '';
                                            if (item.image) {
                                                imageBase64 = new Buffer(item.image, 'base64').toString('binary');
                                            }
                                            return (
                                                <div
                                                    className='doctor-item'
                                                    key={i}
                                                    onClick={() => this.handleViewDetailDoctor(item)}
                                                >
                                                    <a className='item-link'>
                                                        <div className='item-img'>
                                                            <img src={imageBase64} />
                                                        </div>
                                                        <div className='item-text'>
                                                            {language === languages.VI ? nameVi : nameEn}
                                                        </div>
                                                        <span>
                                                            {item.Doctor_Info.Specialty.name}
                                                        </span>
                                                    </a>
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
        lang: state.app.language,
        isLoggedIn: state.user.isLoggedIn,
        topDoctors: state.admin.topDoctors,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopDoctor: () => dispatch(actions.fetchTopDoctorStart())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Doctor));
