import React, { useEffect, useState } from 'react';
import './Specialty.scss';
import Slider from "react-slick";
import { FormattedMessage } from 'react-intl';
import { getAllSpecialtyService } from '../../../../services/userService';
import { Link, useHistory } from 'react-router-dom';

const Specialty = () => {

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
    };

    const [dataSpecialty, setDataSpecialty] = useState([]);
    const history = useHistory();



    useEffect(() => {
        const getAllSpecialtyServices = async () => {
            let res = await getAllSpecialtyService("ALL");
            if (res && res.errCode === 0) {
                setDataSpecialty(res.specialties ? res.specialties : '')
            }
        }
        getAllSpecialtyServices();

    }, [])

    if (dataSpecialty && dataSpecialty.length > 0) {
        dataSpecialty.map((item, i) => {
            if (item && item.image) {
                item.avatar = new Buffer(item.image, 'base64').toString('binary');
            }
        })
    }


    const handleViewDetailSpecialty = (specialty) => {
        history.push(`/detail-specialty/${specialty.id}`);
    }


    return (
        <div>
            <div className='specialty-section'>
                <div className='specialty-container'>
                    <div className='specialty-content'>
                        <div className='content-top'>
                            <h2 className='content-title'>
                                <FormattedMessage id="section.popular-specialties" />
                            </h2>
                            <Link to={'/specialty'} className='content-btn'>
                                <FormattedMessage id="section.more-info" />
                            </Link>
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
                                                    onClick={() => handleViewDetailSpecialty(item)}
                                                >
                                                    <div className='item-link'>
                                                        <div className='item-img'
                                                            style={{
                                                                backgroundImage: `url(${item.avatar})`,
                                                                backgroundSize: 'cover',
                                                                backgroundRepeat: 'no-repeat',
                                                                backgroundPosition: 'center center'
                                                            }}
                                                        >
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
        </div>
    )
}

export default Specialty