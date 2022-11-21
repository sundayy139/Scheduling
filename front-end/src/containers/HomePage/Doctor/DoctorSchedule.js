// import React, { Component, Fragment } from 'react';


// class DoctorSchedule extends Component {

//     constructor(props) {
//         super(props);
//         this.state = {

//         }
//     }

//     async componentDidMount() {

//     }

//     async componentDidUpdate(prevProps) {
//         if (this.props.lang !== prevProps.lang) {
//             let allDays = this.getArrDays(this.props.lang);
//             this.setState({
//                 allDays: allDays
//             })
//         }

//         if (this.props.doctorIdFrDetail !== prevProps.doctorIdFrDetail) {
//             let { lang } = this.props;
//             let allDays = this.getArrDays(lang);
//             let res = await getScheduleDoctorService(this.props.doctorIdFrDetail, allDays[0].value);
//             this.setState({
//                 allAvailabletime: res.data ? res.data : []
//             })
//         }
//     }








//     render() {
//         let { lang } = this.props;
//         let { allDays, allAvailabletime } = this.state;

//         return (

//         );
//     }

// }

// const mapStateToProps = state => {
//     return {
//         lang: state.app.language,
//     };
// };

// const mapDispatchToProps = dispatch => {
//     return {
//     };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);


import React, { useEffect, useState } from 'react';
import './DoctorSchedule.scss';
import { languages } from '../../../utils';
import moment from 'moment';
import localization from 'moment/locale/vi';
// import localization from 'moment/locale/en';
import { getScheduleDoctorService } from '../../../services/userService';
import { FormattedMessage } from 'react-intl';
import BookingModal from './Modal/BookingModal';
import { useSelector } from 'react-redux';

const DoctorSchedule = (props) => {

    const [allDays, setAllDays] = useState([]);
    const [allAvailabletime, setAllAvailabletime] = useState([]);
    const [isOpenModalBooking, setIsOpenModalBooking] = useState(false);
    const [dataScheduleModal, setDataScheduleModal] = useState({});
    const [doctorId, setDoctorId] = useState('')

    const lang = useSelector((state) => state.app.language)
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
    }, [doctorId, lang])

    const getArrDays = () => {
        let allDays = [];
        for (let i = 0; i < 7; i++) {
            let object = {};
            if (lang === languages.VI) {
                //format day iss today
                if (i === 0) {
                    let ddMM = moment(new Date()).format('DD/MM');
                    let today = `Hôm nay - ${ddMM}`;
                    object.label = today;
                } else {
                    let labelVI = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
                    object.label = capitalizeFirstLetter(labelVI);
                }

            } else {
                if (i === 0) {
                    let ddMM = moment(new Date()).format('DD/MM');
                    let today = `Today - ${ddMM}`;
                    object.label = today;
                } else {
                    object.label = moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM');
                }
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
                            <FormattedMessage id="detail-doctor.appointment-schedule" />
                        </span>
                    </div>
                    <div className='calendar-content'>
                        {
                            allAvailabletime && allAvailabletime.length > 0 ?
                                <>
                                    {
                                        allAvailabletime.map((item, i) => {
                                            let time = lang === languages.VI ?
                                                item.timeTypeData.value_VI : item.timeTypeData.value_EN;
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
                                        <FormattedMessage id="detail-doctor.not-schedule" />
                                    </i>
                                </div>
                        }
                    </div>
                    <div className='booking-fee'>
                        <span>
                            <FormattedMessage id="detail-doctor.select" />
                            <i className="far fa-hand-point-up"></i>
                            <FormattedMessage id="detail-doctor.make-a-appointment" />
                        </span>
                    </div>
                </div>
            </div >
        </>
    )
}

export default DoctorSchedule