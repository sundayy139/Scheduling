import React, { useEffect, useState } from 'react';
import './ProfileDoctor.scss';
import { getProfileDoctorService } from '../../../services/userService'
import { FormattedMessage } from 'react-intl';
import _ from 'lodash';
import moment from 'moment';
import { Link } from 'react-router-dom';

const ProfileDoctor = (props) => {

    const [dataProfile, setDataProfile] = useState({});
    const [fullName, setFullName] = useState('');
    const [image, setImage] = useState('');
    const [propsFrFather, setPropsFrFather] = useState({
        isShowLocation: props.isShowLocation,
        isShowLinkToDetail: props.isShowLinkToDetail,
        isShowDescDoctor: props.isShowDescDoctor,
        dataScheduleModal: props.dataScheduleModal,
        doctorId: props.doctorId,
    })

    useEffect(() => {
        const getInfoDoctor = async () => {
            if (propsFrFather.doctorId) {
                let res = await getProfileDoctorService(propsFrFather.doctorId);
                if (res && res.errCode === 0) {
                    let data = res.data;
                    if (data && data.positionData) {
                        let nameVi = `${data.positionData.value} ${data.lastName} ${data.firstName}`;
                        let image = new Buffer(data.image, 'base64').toString('binary');
                        setFullName(nameVi);
                        setImage(image)
                    }
                    setDataProfile(data)
                }
            }
        }

        getInfoDoctor();
        renderTimeBooking();
    }, [])

    const renderTimeBooking = (dataScheduleModal) => {
        if (dataScheduleModal && !_.isEmpty(dataScheduleModal)) {
            let date = moment(dataScheduleModal.date).format('dddd - DD/MM/YYYY')
            let time = dataScheduleModal.timeTypeData.value;
            return (
                <>
                    <div className='time'>
                        {time} - {date}
                    </div>
                    <div className='booking-fee'>
                        Miễn phí đặt lịch
                    </div>
                </>
            )
        }
    }

    return (
        <div className='profile-doctor'>
            <div className='profile-doctor-container'>
                <div className='container-up'>
                    <div className='general-info'>
                        {
                            dataProfile && (
                                <>
                                    <div className='content-left'>
                                        <div
                                            className='image'
                                            style={{
                                                backgroundImage: `url(${image})`,
                                                backgroundSize: 'contain',
                                                backgroundRepeat: 'no-repeat',
                                                backgroundPosition: 'center center'
                                            }}
                                        >
                                        </div>
                                    </div>
                                    <div className='content-right'>
                                        <div className='up'>
                                            {fullName}
                                        </div>
                                        <div className='down'>
                                            <>
                                                {
                                                    propsFrFather.isShowDescDoctor === true ?
                                                        <>
                                                            {dataProfile && dataProfile.Doctor_Info &&
                                                                <p p >
                                                                    {dataProfile.Doctor_Info.description}
                                                                </p>
                                                            }
                                                        </>
                                                        :
                                                        <>
                                                            {renderTimeBooking(propsFrFather.dataScheduleModal)}
                                                        </>
                                                }

                                                {
                                                    propsFrFather.isShowLocation === true &&
                                                    dataProfile && dataProfile.Doctor_Info
                                                    && dataProfile.Doctor_Info.provinceData &&
                                                    (
                                                        <div className='location' >
                                                            <i className='fas fa-map-marker-alt'>
                                                            </i>
                                                            <span>
                                                                {dataProfile.Doctor_Info.provinceData.value}
                                                            </span>
                                                        </div>
                                                    )
                                                }
                                            </>
                                        </div>
                                    </div>
                                </>
                            )
                        }
                    </div>
                </div>
                {
                    propsFrFather.isShowLinkToDetail === true &&
                    (
                        <div className='container-down'>
                            <span className='more-info'>
                                <Link className='link' to={`/detail-doctor/${propsFrFather.doctorId}`}>
                                    <FormattedMessage id='detail-doctor.more-info' />
                                </Link>
                            </span>
                        </div>
                    )
                }
            </div>
        </div >
    )
}

export default ProfileDoctor