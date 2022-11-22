import React, { useEffect, useState } from 'react';
import Footer from '../Footer';
import HomeHeader from '../HomeHeader';
import './DetailDoctor.scss';
import { getDetailDoctorService } from '../../../../src/services/userService';
import DoctorSchedule from './DoctorSchedule';
import DoctorExtraInfo from './DoctorExtraInfo';
import ProfileDoctor from './ProfileDoctor';
import { useHistory, useParams } from 'react-router';
import { useSelector } from 'react-redux';

const DetailDoctor = () => {

    const [detailDoctor, setDetailDoctor] = useState({});
    const [fullName, setFullName] = useState();
    const [currentDoctorId, setCurrentDoctorId] = useState('-1');
    const params = useParams();
    const history = useHistory();
    useEffect(() => {

        const getDetailDoctor = async () => {
            if (params && params.id) {
                let id = params.id;
                setCurrentDoctorId(id);
                let res = await getDetailDoctorService(id);
                if (res && res.errCode === 0) {
                    let data = res.data;
                    if (data && data.positionData) {
                        let fullName = `${data.positionData.value} ${data.lastName} ${data.firstName}`;
                        setFullName(fullName)
                    }
                    setDetailDoctor(data)
                }
            }
        }

        getDetailDoctor();


    }, [])

    return (
        <>
            <HomeHeader />
            <div className='detail-doctor'>
                <div className='detail-doctor-container'>
                    <div className='back-menu'>
                        <div className='back-ground'>
                            <div
                                className='icon-back'
                                onClick={history.goBack}
                            >
                                <i className="fas fa-arrow-left"></i>
                            </div>
                            <div className='menu-title'>
                                {fullName}
                            </div>
                        </div>
                    </div>
                    <div className='container-up'>
                        <div className='general-info'>
                            {
                                detailDoctor && detailDoctor.id && (
                                    <ProfileDoctor
                                        doctorId={detailDoctor.id}
                                        isShowDescDoctor={true}
                                        isShowLinkToDetail={false}
                                    />
                                )
                            }

                        </div>
                        <div className='schedule'>
                            <div className='schedule-left'>
                                <DoctorSchedule
                                    doctorIdFrDetail={currentDoctorId}
                                />
                            </div>
                            <div className='schedule-right'>
                                <DoctorExtraInfo
                                    doctorIdFrDetail={currentDoctorId}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='container-down'>
                        <div className='container-down-content'>
                            <div className='detail-info'>
                                {
                                    detailDoctor.Doctor_Info && detailDoctor.Doctor_Info.contentHTML &&
                                    <div
                                        className='inner'
                                        dangerouslySetInnerHTML={{ __html: detailDoctor.Doctor_Info.contentHTML }}>
                                    </div>
                                }
                            </div>
                            <div className='comment'>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default DetailDoctor