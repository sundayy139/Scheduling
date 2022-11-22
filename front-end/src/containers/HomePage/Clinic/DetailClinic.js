import React, { useEffect, useState } from 'react';
import Footer from '../Footer';
import HomeHeader from '../HomeHeader';
import './DetailClinic.scss';
import _ from 'lodash';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfo from '../Doctor/DoctorExtraInfo';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import { getDetailClinicService } from '../../../services/userService';
import { useHistory, useParams } from 'react-router';

const DetailClinic = () => {

    const [arrDoctorId, setArrDoctorId] = useState([]);
    const [dataClinic, setDataClinic] = useState([]);
    const [backgroundImage, setBackgroundImage] = useState('');
    const [backgroundLogo, setBackgroundLogo] = useState('');
    const params = useParams();
    const history = useHistory();

    useEffect(() => {
        const getDetailClinic = async () => {
            if (params && params.id) {
                let id = params.id;
                let res = await getDetailClinicService(id);

                if (res && res.errCode === 0) {
                    let data = res.data;
                    let arrDoctorId = [];
                    if (data && !_.isEmpty(data)) {
                        let arr = data.doctorClinic;
                        if (arr && arr.length > 0) {
                            arr.map(item => {
                                arrDoctorId.push(item.doctorId);
                            })
                        }


                    }

                    if (data && data.image) {
                        let avatar = new Buffer(data.image, 'base64').toString('binary');
                        setBackgroundImage(avatar)
                    }

                    if (data && data.logo) {
                        let lg = new Buffer(data.logo, 'base64').toString('binary');
                        setBackgroundLogo(lg)
                    }

                    setDataClinic(data)
                    setArrDoctorId(arrDoctorId)
                }
            }
        }
        getDetailClinic();
    }, [])

    return (
        <>
            <HomeHeader />
            <div className='detail-clinic'>
                <div className='back-menu'>
                    <div className='back-ground'>
                        <div
                            className='icon-back'
                            onClick={history.goBack}
                        >
                            <i className="fas fa-arrow-left"></i>
                        </div>
                        <div className='menu-title'>
                            {dataClinic.name}
                        </div>
                    </div>
                </div>
                <div className='container-clinic-up'>
                    <div className='image-clinic'
                        style={{
                            backgroundImage: `url(${backgroundImage})`,
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center",

                        }}
                    >
                    </div>
                    <div className='info-clinic'>
                        <div className='info-up'>
                            <div className='logo-clinic'
                                style={{
                                    backgroundImage: `url(${backgroundLogo})`,
                                    backgroundSize: "contain",
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "center",
                                    height: "70px",
                                }}>
                            </div>
                            <div className='name-clinic'>
                                <h1>{dataClinic.name}</h1>
                            </div>
                        </div>
                        <div className='info-down'>
                            <i className='fas fa-map-marker-alt'></i>
                            <span>
                                {dataClinic.address}
                            </span>
                        </div>
                    </div>
                </div>
                <div className='container-clinic-center'>
                    <div className='content-desc'>
                        {
                            dataClinic && !_.isEmpty(dataClinic) &&
                            (
                                <div
                                    className='inner'
                                    dangerouslySetInnerHTML={{ __html: dataClinic.descHTML }}>
                                </div>
                            )
                        }
                    </div>
                </div>
                <div className='container-clinic-down'>
                    <span>
                        Bác sĩ nổi bật
                    </span>
                    <div className='content-box'>
                        {
                            arrDoctorId && arrDoctorId.length > 0
                            && arrDoctorId.map((item, i) => (
                                <div className='box' key={i}>
                                    <div className='box-left'>
                                        <ProfileDoctor
                                            doctorId={item}
                                            isShowDescDoctor={true}
                                            isShowLinkToDetail={true}
                                            isShowLocation={true}
                                        />
                                    </div>
                                    <div className='box-right'>
                                        <div className='schedule'>
                                            <DoctorSchedule
                                                doctorIdFrDetail={item}
                                            />
                                        </div>
                                        <div className='extra-info'>
                                            <DoctorExtraInfo
                                                doctorIdFrDetail={item}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default DetailClinic