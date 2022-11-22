import React, { useEffect, useState } from 'react';
import './DoctorSchedule.scss';
import moment from 'moment';
import localization from 'moment/locale/vi';
import { getScheduleDoctorService } from '../../../services/userService';
import BookingModal from './Modal/BookingModal';

const DoctorSchedule = (props) => {

    const [allDays, setAllDays] = useState([]);
    const [allAvailabletime, setAllAvailabletime] = useState([]);
    const [isOpenModalBooking, setIsOpenModalBooking] = useState(false);
    const [dataScheduleModal, setDataScheduleModal] = useState({});
    const [doctorId, setDoctorId] = useState('')

    useEffect(() => {
        const getScheduleDoctor = async () => {
            let allDays = getArrDays();
            setDoctorId(props.doctorIdFrDetail)
            if (allDays && allDays.length > 0) {
                let res = await getScheduleDoctorService(doctorId, allDays[0].value)
                setAllDays(allDays);
                setAllAvailabletime(res.data ? res.data : [])
            }
        }
        getScheduleDoctor();
    }, [doctorId])

    const getArrDays = () => {
        let allDays = [];
        for (let i = 0; i < 7; i++) {
            let object = {};

            if (i === 0) {
                let ddMM = moment(new Date()).format('DD/MM');
                let today = `Hôm nay - ${ddMM}`;
                object.label = today;
            } else {
                let label = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
                object.label = capitalizeFirstLetter(label);
            }
            object.value = moment(new Date()).add(i, 'days').startOf('day').format('YYYY-MM-DD');

            allDays.push(object);
        }

        return allDays;
    }

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const handleClickSchedule = (time) => {
        setIsOpenModalBooking(true);
        setDataScheduleModal(time)
    }

    const handleCloseModalBooking = () => {
        setIsOpenModalBooking(false);
    }

    const handleChangeSelect = async (e) => {
        if (doctorId && doctorId !== -1) {
            let date = e.target.value;
            let res = await getScheduleDoctorService(doctorId, date);

            if (res && res.errCode === 0) {
                setAllAvailabletime(res.data ? res.data : [])
            }
        }
    }

    return (
        <>
            <BookingModal
                isOpenModal={isOpenModalBooking}
                closeModalBooking={handleCloseModalBooking}
                dataScheduleModal={dataScheduleModal}
                doctorIdFrSchedule={doctorId}
            // loading={this.loading}
            />
            <div className='schedule-container'>
                <div className='all-schedule'>
                    <select
                        onChange={handleChangeSelect}>
                        {
                            allDays && allDays.length > 0 && allDays.map((item, i) => {
                                return (
                                    <option
                                        key={i}
                                        value={item.value}
                                    >
                                        {item.label}
                                    </option>
                                )
                            })
                        }
                    </select>
                </div>
                <div className='range-time'>
                    <div className='text-calendar'>
                        <span>
                            <i className='fas fa-calendar-alt'></i>
                            Lịch khám
                        </span>
                    </div>
                    <div className='calendar-content'>
                        {
                            allAvailabletime && allAvailabletime.length > 0 ?
                                <>
                                    {
                                        allAvailabletime.map((item, i) => {
                                            let time = item.timeTypeData.value;
                                            return (
                                                <button
                                                    className={item.currentNumber === item.maxNumber ? 'btn-time disabled' : 'btn-time'}
                                                    key={i}
                                                    onClick={() => handleClickSchedule(item)}
                                                >
                                                    {time}
                                                </button>
                                            )
                                        })
                                    }
                                </>
                                :
                                <div className='no-schedule'>
                                    <i>
                                        Bác sĩ không có lịch hẹn trong thời gian này, vui lòng chọn thời gian khác !
                                    </i>
                                </div>
                        }
                    </div>
                    <div className='booking-fee'>
                        <span>
                            Chọn
                            <i className="far fa-hand-point-up"></i>
                            và đặt lịch khám (Phí đặt lịch 0 đ)
                        </span>
                    </div>
                </div>
            </div >
        </>
    )
}

export default DoctorSchedule