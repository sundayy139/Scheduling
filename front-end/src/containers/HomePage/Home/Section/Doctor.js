import React, { useEffect, useState } from 'react';
import './Doctor.scss';
import Slider from "react-slick";
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTopDoctorStart } from '../../../../store/actions';

const Doctor = () => {

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
    };

    const topDoctors = useSelector(state => state.admin.topDoctors);
    const dispatch = useDispatch();
    const history = useHistory()


    useEffect(() => {
        dispatch(fetchTopDoctorStart());
    }, [])

    const handleViewDetailDoctor = (doctor) => {
        history.push(`/detail-doctor/${doctor.id}`);
    }

    return (
        <div>
            <div className='doctor-section'>
                <div className='doctor-container'>
                    <div className='doctor-content'>
                        <div className='content-top'>
                            <h2 className='content-title'>
                                Bác sĩ nổi bật tuần
                            </h2>
                            <Link to={'/all-doctor'} className='content-btn'>
                                Xem thêm
                            </Link>
                        </div>
                        <div className='content-container'>
                            <div className='doctor-slider'>
                                <Slider {...settings} className="slider">
                                    {
                                        topDoctors && topDoctors.length > 0 && topDoctors.map((item, i) => {
                                            let imageBase64 = '';
                                            if (item.image) {
                                                imageBase64 = new Buffer(item.image, 'base64').toString('binary');
                                            }
                                            return (
                                                <div
                                                    className='doctor-item'
                                                    key={i}
                                                    onClick={() => handleViewDetailDoctor(item)}
                                                >
                                                    <a className='item-link'>
                                                        <div className='item-img'>
                                                            <img src={imageBase64} />
                                                        </div>
                                                        <div className='item-text'>
                                                            {item.positionData.value} {item.lastName} {item.firstName}
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
        </div>
    )
}

export default Doctor