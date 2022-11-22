import React, { useEffect, useState } from 'react';
import './Clinic.scss';
import Slider from "react-slick";
import { getAllClinicService } from '../../../../services/userService';
import { Link, useHistory } from 'react-router-dom';

const Clinic = () => {

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
    };

    const [dataClinic, setDataClinic] = useState([]);
    const history = useHistory();

    useEffect(() => {
        const getAllClinicsServices = async () => {
            let res = await getAllClinicService("ALL");
            if (res && res.errCode === 0) {
                setDataClinic(res.clinics ? res.clinics : '')
            }
        }
        getAllClinicsServices();

    }, [])

    if (dataClinic && dataClinic.length > 0) {
        dataClinic.map((item, i) => {
            if (item && item.image) {
                item.avatar = new Buffer(item.image, 'base64').toString('binary');
            }
        })
    }


    const handleViewDetailClinic = (clinic) => {
        history.push(`/detail-clinic/${clinic.id}`);
    }


    return (
        <div>
            <div className='clinic-section'>
                <div className='clinic-container'>
                    <div className='clinic-content'>
                        <div className='content-top'>
                            <h2 className='content-title'>
                                Cơ sở y tế nổi bật
                            </h2>
                            <Link to={'/clinic'} className='content-btn'>
                                Xem thêm
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
                                                    onClick={() => handleViewDetailClinic(item)}
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

export default Clinic