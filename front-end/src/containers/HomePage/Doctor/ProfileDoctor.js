import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import './DoctorSchedule.scss';
import { languages } from '../../../utils';
import './ProfileDoctor.scss';
import { getProfileDoctorService } from '../../../services/userService'
import NumberFormat from 'react-number-format';
import { FormattedMessage } from 'react-intl';
import _ from 'lodash';
import moment from 'moment';
import localization from 'moment/locale/vi';
import { Link } from 'react-router-dom';


class ProfileDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataProfile: {}
        }
    }

    async componentDidMount() {
        let data = await this.getInfoDoctor(this.props.doctorId);
        this.setState({
            dataProfile: data
        })
    }

    getInfoDoctor = async (id) => {
        let result = [];
        if (id) {
            let res = await getProfileDoctorService(id);
            if (res && res.errCode === 0) {
                result = res.data;
            }
        }
        return result;
    }

    componentDidUpdate(prevProps) {
        // if (this.props.lang !== prevProps.lang) {

        // }
        // if (this.props.doctorId !== prevProps.doctorId) {
        //     this.getInfoDoctor(this.props.doctorId)
        // }
    }

    renderTimeBooking = (dataScheduleModal) => {
        let { lang } = this.props;
        if (dataScheduleModal && !_.isEmpty(dataScheduleModal)) {
            let date = lang === languages.VI
                ? moment(dataScheduleModal.date).format('dddd - DD/MM/YYYY')
                : moment(dataScheduleModal.date).locale('en').format('ddd - MM/DD/YYYY')
                ;

            let time = lang === languages.VI
                ? dataScheduleModal.timeTypeData.value_VI
                : dataScheduleModal.timeTypeData.value_EN
                ;;
            return (
                <>
                    <div className='time'>
                        {time} - {date}
                    </div>
                    <div className='booking-fee'>
                        <FormattedMessage id="detail-doctor.booking-fee" />
                    </div>
                </>
            )
        }
    }

    render() {
        let { lang, isShowDescDoctor, dataScheduleModal, isShowLinkToDetail, isShowLocation, doctorId } = this.props;
        let { dataProfile } = this.state;
        let nameVi = '';
        let nameEn = '';
        let image = '';

        if (dataProfile && dataProfile.image) {
            image = new Buffer(dataProfile.image, 'base64').toString('binary');
        }

        if (dataProfile && dataProfile.positionData) {
            nameVi = `${dataProfile.positionData.value_VI} ${dataProfile.firstName} ${dataProfile.lastName}`;
            nameEn = `${dataProfile.positionData.value_EN} ${dataProfile.lastName} ${dataProfile.firstName}`;
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
                                                {lang === languages.VI ? nameVi : nameEn}
                                            </div>
                                            <div className='down'>
                                                <>
                                                    {
                                                        isShowDescDoctor === true ?
                                                            <>
                                                                {dataProfile && dataProfile.Doctor_Info &&
                                                                    <p p >
                                                                        {dataProfile.Doctor_Info.description}
                                                                    </p>
                                                                }
                                                            </>
                                                            :
                                                            <>
                                                                {this.renderTimeBooking(dataScheduleModal)}
                                                            </>
                                                    }

                                                    {
                                                        isShowLocation === true &&
                                                        dataProfile && dataProfile.Doctor_Info
                                                        && dataProfile.Doctor_Info.provinceData &&
                                                        (
                                                            <div className='location' >
                                                                <i className='fas fa-map-marker-alt'>
                                                                </i>
                                                                <span>
                                                                    {lang === languages.VI ? dataProfile.Doctor_Info.provinceData.value_VI : dataProfile.Doctor_Info.provinceData.value_EN}
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
                        isShowLinkToDetail === true &&
                        (
                            <div className='container-down'>
                                <span className='more-info'>
                                    <Link className='link' to={`/detail-doctor/${doctorId}`}>
                                        <FormattedMessage id='detail-doctor.more-info' />
                                    </Link>
                                </span>
                            </div>
                        )
                    }
                </div>
            </div >
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
