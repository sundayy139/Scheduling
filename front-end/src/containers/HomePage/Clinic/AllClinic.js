import React, { useEffect, useState } from 'react';
import './AllClinic.scss';
import HomeHeader from '../HomeHeader';
import Footer from '../Footer';
import { getAllClinicService } from '../../../services/userService';
import { useHistory } from 'react-router';

const AllClinic = () => {

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
        <>
            <HomeHeader />
            <div className='clinic-container'>
                <div className='back-menu'>
                    <div className='back-ground'>
                        <div
                            className='icon-back'
                            onClick={history.goBack}
                        >
                            <i className="fas fa-arrow-left"></i>
                        </div>
                        <div className='menu-title'>
                            Cơ sở y tế
                        </div>
                    </div>
                </div>
                <div className='clinic-contents'>
                    {
                        dataClinic && dataClinic.length > 0
                        && dataClinic.map((item) => (
                            <div
                                className='item'
                                key={item.id}
                                onClick={() => handleViewDetailClinic(item)}
                            >
                                <div className='inner'>
                                    <div
                                        className='image'
                                        style={{
                                            backgroundImage: `url(${item.avatar})`,
                                            backgroundSize: 'cover',
                                            backgroundRepeat: 'no-repeat',
                                            backgroundPosition: 'center center'
                                        }}
                                    >

                                    </div>
                                    <div className='text'>
                                        {item.name}
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <Footer />
        </>
    )
}

export default AllClinic