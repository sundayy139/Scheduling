import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import { languages } from "../../../../utils/constant";
import ProfileDoctor from '../ProfileDoctor';
import _ from 'lodash';
import DatePicker from '../../../../components/Input/DatePicker';
import * as actions from "../../../../store/actions";
import Select from "react-select"
import { getProfileDoctorService, postPatientBookAppointmentService } from '../../../../services/userService';
import { toast } from 'react-toastify';
import Bill from '../Bill';
import moment from 'moment';
import localization from 'moment/locale/vi';

class BookingModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            email: '',
            reason: '',
            dateOfBirth: '',
            gender: '',
            doctorId: '',
            genders: '',
            timeType: '',
            selectedGender: '',
            dataProfile: {},
        }
    }

    async componentDidMount() {
        this.props.getGenderStart();
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

    buildDataGender = (data) => {
        let result = [];
        let { lang } = this.props;
        if (data && data.length > 0) {
            data.map((item) => {
                let object = {};
                object.label = lang === languages.VI ? item.value_VI : item.value_EN;
                object.value = item.key;
                result.push(object);
            })
        }
        return result;
    }

    componentDidUpdate(prevProps) {

        if (this.props.lang !== prevProps.lang) {
            this.setState({
                genders: this.buildDataGender(this.props.genders)
            })
        }

        if (prevProps.genders !== this.props.genders) {
            this.setState({
                genders: this.buildDataGender(this.props.genders)
            })
        }

        if (this.props.dataScheduleModal !== prevProps.dataScheduleModal) {
            let doctorId = this.props.dataScheduleModal && !_.isEmpty(this.props.dataScheduleModal) ? this.props.dataScheduleModal.doctorId : '';
            this.setState({
                doctorId: doctorId,
                timeType: this.props.dataScheduleModal.timeType,
                date: this.props.dataScheduleModal.date
            })
        }
    }

    toggle = () => {
        this.props.closeModalBooking()
    }

    onChangeInput = (e, id) => {
        let copyState = { ...this.state };

        copyState[id] = e.target.value;
        this.setState({
            ...copyState
        })
    }

    // checkValideInput = () => {
    //     let isValid = true;
    //     let arrCheck = [
    //         'email',
    //         'password',
    //         'firstName',
    //         'lastName',
    //         'phoneNumber',
    //         'address',
    //     ];

    //     for (let i = 0; i < arrCheck.length; i++) {

    //         if (!this.state[arrCheck[i]]) {
    //             isValid = false;
    //             alert('Missing required field: ' + arrCheck[i]);
    //             break;
    //         }
    //     }

    //     return isValid;
    // }

    handleChangDatePiker = (date) => {
        this.setState({
            dateOfBirth: date[0]
        })
    }

    handleChangeSelect = (selectedGender) => {
        this.setState({
            selectedGender
        })
    }

    buildTimeBooking = (dataScheduleModal) => {
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
            return `${time} - ${date}`
        }
        return ''
    }

    buildDoctorName = (dataScheduleModal) => {
        let { lang } = this.props;
        if (dataScheduleModal && !_.isEmpty(dataScheduleModal)) {
            let name = lang === languages.VI
                ? `${dataScheduleModal.doctorData.lastName} ${dataScheduleModal.doctorData.firstName}`
                : `${dataScheduleModal.doctorData.firstName} ${dataScheduleModal.doctorData.lastName}`
                ;
            return name;
        }
        return ''
    }

    handleConfirmBooking = async () => {
        let timeString = this.buildTimeBooking(this.props.dataScheduleModal);
        let doctorName = this.buildDoctorName(this.props.dataScheduleModal);
        let res = await postPatientBookAppointmentService({
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            phoneNumber: this.state.phoneNumber,
            address: this.state.address,
            email: this.state.email,
            reason: this.state.reason,
            dateOfBirth: this.state.dateOfBirth,
            date: this.state.date,
            gender: this.state.selectedGender.value,
            doctorId: this.state.doctorId,
            timeType: this.state.timeType,
            language: this.props.lang,
            timeString: timeString,
            doctorName: doctorName
        })

        if (res && res.errCode === 0) {
            toast.success('Booking Appointment Successfully', {
                theme: 'colored'
            })
            this.toggle();
        } else {
            toast.error('Booking Appointment Failled', {
                theme: 'colored'
            })
            this.toggle();
        }
    }


    render() {

        let { isOpenModal, dataScheduleModal, lang } = this.props;
        let doctorId = dataScheduleModal && !_.isEmpty(dataScheduleModal) ? dataScheduleModal.doctorId : '';

        let {
            firstName,
            lastName,
            phoneNumber,
            address,
            email,
            reason,
            dateOfBirth,
            genders,
            selectedGender,
        } = this.state;

        return (
            <Modal
                isOpen={isOpenModal}
                toggle={() => this.toggle()}
                size="lg"
                style={{ marginTop: "100px" }}
            >
                <ModalHeader toggle={() => this.toggle()} className="close">
                    <FormattedMessage id="modal-booking.book-appointment" />
                </ModalHeader>
                <ModalBody>
                    <form className='col-12'>
                        <div className='row'>
                            <div className='col-12 form-group'>
                                <ProfileDoctor
                                    doctorId={doctorId}
                                    isShowDescDoctor={false}
                                    isShowLinkToDetail={false}
                                    dataScheduleModal={this.props.dataScheduleModal}
                                />
                            </div>
                        </div>
                        <div className='row'>
                            <div className="form-group col-6">
                                <label>
                                    <FormattedMessage id="modal-booking.first-name" />
                                </label>
                                <FormattedMessage id="modal-booking.first-name">
                                    {placeholder =>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="firstName"
                                            placeholder={placeholder}
                                            name="firstName"
                                            value={firstName}
                                            onChange={(e) => { this.onChangeInput(e, 'firstName') }}
                                        />
                                    }
                                </FormattedMessage>
                            </div>
                            <div className="form-group col-6">
                                <label>
                                    <FormattedMessage id="modal-booking.last-name" />
                                </label>
                                <FormattedMessage id="modal-booking.last-name">
                                    {placeholder =>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="lastName"
                                            placeholder={placeholder}
                                            name="lastName"
                                            value={lastName}
                                            onChange={(e) => { this.onChangeInput(e, 'lastName') }}
                                        />
                                    }
                                </FormattedMessage>
                            </div>
                        </div>
                        <div className='row'>
                            <div className="form-group col-6">
                                <label>
                                    <FormattedMessage id="modal-booking.email" />
                                </label>
                                <FormattedMessage id="modal-booking.email">
                                    {placeholder =>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            placeholder={placeholder}
                                            name="email"
                                            value={email}
                                            onChange={(e) => { this.onChangeInput(e, 'email') }}
                                        />
                                    }
                                </FormattedMessage>
                            </div>
                            <div className="form-group col-6">
                                <label>
                                    <FormattedMessage id="modal-booking.phone-number" />
                                </label>
                                <FormattedMessage id="modal-booking.phone-number">
                                    {placeholder =>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="phoneNumber"
                                            placeholder={placeholder}
                                            name="phoneNumber"
                                            value={phoneNumber}
                                            onChange={(e) => { this.onChangeInput(e, 'phoneNumber') }}
                                        />
                                    }
                                </FormattedMessage>
                            </div>
                        </div>

                        <div className='row'>
                            <div className="form-group col-12">
                                <label>
                                    <FormattedMessage id="modal-booking.address" />
                                </label>
                                <FormattedMessage id="modal-booking.address">
                                    {placeholder =>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="address"
                                            placeholder={placeholder}
                                            name="address"
                                            value={address}
                                            onChange={(e) => { this.onChangeInput(e, 'address') }}
                                        />
                                    }
                                </FormattedMessage>
                            </div>
                        </div>

                        <div className='row'>
                            <div className="form-group col-6">
                                <label>
                                    <FormattedMessage id="modal-booking.birth-day" />
                                </label>
                                <FormattedMessage id="modal-booking.birth-day">
                                    {placeholder =>
                                        <DatePicker
                                            className="form-control"
                                            value={dateOfBirth}
                                            placeholder={placeholder}
                                            onChange={this.handleChangDatePiker}
                                        />
                                    }
                                </FormattedMessage>
                            </div>
                            <div className="form-group col-6">
                                <label>
                                    <FormattedMessage id="modal-booking.gender" />
                                </label>
                                <Select
                                    value={selectedGender}
                                    onChange={this.handleChangeSelect}
                                    options={genders}
                                    name='selectedGender'
                                    placeholder={lang === languages.VI ? "Giới tính" : "Gender"}
                                />
                            </div>
                        </div>

                        <div className='row'>
                            <div className="form-group col-12">
                                <label>
                                    <FormattedMessage id="modal-booking.reason" />
                                </label>
                                <FormattedMessage id="modal-booking.reason">
                                    {placeholder =>
                                        <textarea
                                            className="form-control"
                                            id="reason"
                                            placeholder={placeholder}
                                            name="reason"
                                            value={reason}
                                            onChange={(e) => { this.onChangeInput(e, 'reason') }}
                                        />
                                    }
                                </FormattedMessage>
                            </div>
                        </div>

                        <div className='row mt-4'>
                            <div className='col-12'>
                                <div className='form-group'>
                                    <Bill
                                        doctorId={doctorId}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className='row mt-4'>
                            <div className='col-12'>
                                <div className='form-group'>
                                    <div>
                                        <p>
                                            <b>
                                                <FormattedMessage id="modal-booking.note" />
                                            </b>
                                        </p>
                                        <p>
                                            <FormattedMessage id="modal-booking.note-title" />
                                            <br />
                                            - <FormattedMessage id="modal-booking.note-name" />
                                            <b>
                                                <FormattedMessage id="modal-booking.note-eg" />
                                            </b>
                                            <br />
                                            - <FormattedMessage id="modal-booking.note-confirm" />

                                            "
                                            <b>
                                                <FormattedMessage id="modal-booking.confirm" />
                                            </b>
                                            "
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary px-2"
                        onClick={() => this.handleConfirmBooking()}
                    >
                        <FormattedMessage id="modal-booking.confirm" />
                    </Button>
                    <Button
                        color="danger px-2"
                        onClick={() => {
                            this.toggle()
                        }}
                    >
                        <FormattedMessage id="modal-booking.close" />
                    </Button>
                </ModalFooter>

            </Modal>

        )
    }

}

const mapStateToProps = state => {
    return {
        lang: state.app.language,
        genders: state.admin.genders,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);



