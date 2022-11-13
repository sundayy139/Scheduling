import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import './DoctorSchedule.scss';
import { languages } from '../../../utils';
import moment from 'moment';
import localization from 'moment/locale/vi';
// import localization from 'moment/locale/en';
import { getScheduleDoctorService } from '../../../services/userService';
import { FormattedMessage } from 'react-intl';
import BookingModal from './Modal/BookingModal';

class DoctorSchedule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
            allAvailabletime: [],
            isOpenModalBooking: false,
            dataScheduleModal: {}
        }
    }

    async componentDidMount() {
        let allDays = this.getArrDays();
        if (allDays && allDays.length > 0) {
            let res = await getScheduleDoctorService(this.props.doctorIdFrDetail, allDays[0].value)
            this.setState({
                allDays: allDays,
                allAvailabletime: res.data ? res.data : []
            })
        }
    }

    async componentDidUpdate(prevProps) {
        if (this.props.lang !== prevProps.lang) {
            let allDays = this.getArrDays(this.props.lang);
            this.setState({
                allDays: allDays
            })
        }

        if (this.props.doctorIdFrDetail !== prevProps.doctorIdFrDetail) {
            let { lang } = this.props;
            let allDays = this.getArrDays(lang);
            let res = await getScheduleDoctorService(this.props.doctorIdFrDetail, allDays[0].value);
            this.setState({
                allAvailabletime: res.data ? res.data : []
            })
        }
    }

    getArrDays = () => {
        let { lang } = this.props;
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
                    object.label = this.capitalizeFirstLetter(labelVI);
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

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    handleChangeSelect = async (e) => {
        if (this.props.doctorIdFrDetail && this.props.doctorIdFrDetail !== -1) {

            let doctorId = this.props.doctorIdFrDetail;
            let date = e.target.value;
            let res = await getScheduleDoctorService(doctorId, date);

            if (res && res.errCode === 0) {
                this.setState({
                    allAvailabletime: res.data ? res.data : []
                })
            }
        }
    }

    handleClickSchedule = (time) => {
        this.setState({
            isOpenModalBooking: true,
            dataScheduleModal: time
        })
    }

    handleCloseModalBooking = () => {
        this.setState({
            isOpenModalBooking: false
        })
    }

    render() {
        let { lang } = this.props;
        let { allDays, allAvailabletime } = this.state;

        return (
            <Fragment>
                <BookingModal
                    isOpenModal={this.state.isOpenModalBooking}
                    closeModalBooking={this.handleCloseModalBooking}
                    dataScheduleModal={this.state.dataScheduleModal}
                    doctorIdFrSchedule={this.props.doctorIdFrDetail}
                    loading={this.loading}
                />
                <div className='schedule-container'>
                    <div className='all-schedule'>
                        <select
                            onChange={(e) => this.handleChangeSelect(e)}>
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
                                                        onClick={() => this.handleClickSchedule(item)}
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
            </Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        lang: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
