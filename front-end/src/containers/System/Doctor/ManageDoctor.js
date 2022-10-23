import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from "../../../store/actions";
import 'react-image-lightbox/style.css';
import * as ReactDOM from 'react-dom';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { CRUDActions, languages } from '../../../utils/constant';
import { getDetailDoctorService } from '../../../services/userService';
import { toast } from 'react-toastify';

const mdParser = new MarkdownIt();

class ManageDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            contentMarkdown: '',
            contentHTML: '',
            description: '',
            oldData: false,

            selectedDoctor: '',
            selectedPrice: '',
            selectedProvince: '',
            selectedPayment: '',
            clinicId: '',
            specialtyId: '',
            selectedClinic: '',
            selectedSpecialty: '',
            note: '',
            listDoctor: [],
            listPrice: [],
            listPayment: [],
            listProvince: [],
            listClinic: [],
            listSpecialty: [],
        }
    }

    componentDidMount() {
        this.props.fetchAllDoctors();
        this.props.getAllRequiedInfoDoctor();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildInputSelect(this.props.allDoctors, "USER")
            this.setState({
                listDoctor: dataSelect
            })
        }

        if (prevProps.lang !== this.props.lang) {
            let { resPrice, resPayment, resProvince, resSpecialty, resClinic } = this.props.allRequiredDoctorInfo;
            let dataSelect = this.buildInputSelect(this.props.allDoctors, "USER")
            let dataSelectPrice = this.buildInputSelect(resPrice, "PRICE")
            let dataSelectPayment = this.buildInputSelect(resPayment, "PAYMENT")
            let dataSelectProvince = this.buildInputSelect(resProvince, "PROVINCE")
            let dataSelectSpecialty = this.buildInputSelect(resSpecialty, "SPECIALTY")
            let dataSelectClinic = this.buildInputSelect(resClinic, "CLINIC")
            this.setState({
                listDoctor: dataSelect,
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince,
                listSpecialty: dataSelectSpecialty,
                listClinic: dataSelectClinic
            })
        }

        if (prevProps.allRequiredDoctorInfo !== this.props.allRequiredDoctorInfo) {
            let { resPrice, resPayment, resProvince, resSpecialty, resClinic } = this.props.allRequiredDoctorInfo;
            let dataSelectPrice = this.buildInputSelect(resPrice, "PRICE")
            let dataSelectPayment = this.buildInputSelect(resPayment, "PAYMENT")
            let dataSelectProvince = this.buildInputSelect(resProvince, "PROVINCE")
            let dataSelectSpecialty = this.buildInputSelect(resSpecialty, "SPECIALTY")
            let dataSelectClinic = this.buildInputSelect(resClinic, "CLINIC")

            this.setState({
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince,
                listSpecialty: dataSelectSpecialty,
                listClinic: dataSelectClinic
            })
        }

    }

    buildInputSelect = (inputData, type) => {
        let result = [];
        let { lang } = this.props
        if (inputData && inputData.length > 0) {
            inputData.map((item) => {
                if (type === 'USER') {
                    let object = {};
                    let labelVi = `${item.lastName} ${item.firstName}`;
                    let labelEn = `${item.firstName} ${item.lastName}`;
                    object.label = lang === languages.VI ? labelVi : labelEn;
                    object.value = item.id;
                    result.push(object);
                }
                if (type === "PRICE") {
                    let object = {};
                    let labelVi = `${item.value_VI}`;
                    let labelEn = `${item.value_EN} USD`;
                    object.label = lang === languages.VI ? labelVi : labelEn;
                    object.value = item.key;
                    result.push(object);
                }

                if (type === "PAYMENT" || type === "PROVINCE") {
                    let object = {};
                    let labelVi = `${item.value_VI}`;
                    let labelEn = `${item.value_EN}`;
                    object.label = lang === languages.VI ? labelVi : labelEn;
                    object.value = item.key;
                    result.push(object);
                }

                if (type === "SPECIALTY" || type === "CLINIC") {
                    let object = {};
                    object.label = item.name;
                    object.value = item.id;
                    result.push(object);
                }

            })
        }

        return result;
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html
        })
    }

    handleSelectChange = async (selectedDoctor) => {
        this.setState({
            selectedDoctor
        });
        let { listPrice, listPayment, listProvince, listSpecialty, listClinic } = this.state;
        let res = await getDetailDoctorService(selectedDoctor.value);
        if (res && res.errCode === 0 && res.data && res.data.Doctor_Info && res.data.Doctor_Info.description !== null) {
            let
                paymentId = '',
                priceId = '',
                provinceId = '',
                specialtyId = '',
                clinicId = '',
                note = '',
                selectedPrice = '',
                selectedProvince = '',
                selectedPayment = '',
                selectedSpecialty = '',
                selectedClinic = '',
                contentHTML = '',
                contentMarkdown = '',
                description = '';

            if (res.data.Doctor_Info) {
                paymentId = res.data.Doctor_Info.paymentId;
                priceId = res.data.Doctor_Info.priceId;
                provinceId = res.data.Doctor_Info.provinceId;
                specialtyId = res.data.Doctor_Info.specialtyId;
                clinicId = res.data.Doctor_Info.clinicId;
                note = res.data.Doctor_Info.note;
                description = res.data.Doctor_Info.description;
                contentMarkdown = res.data.Doctor_Info.contentMarkdown;
                contentHTML = res.data.Doctor_Info.contentHTML;

                selectedPrice = listPrice.find((item) => {
                    return item && item.value === priceId;
                });

                selectedPayment = listPayment.find((item) => {
                    return item && item.value === paymentId;
                });

                selectedProvince = listProvince.find((item) => {
                    return item && item.value === provinceId;
                })

                selectedSpecialty = listSpecialty.find((item) => {
                    return item && item.value === specialtyId;
                })

                selectedClinic = listClinic.find((item) => {
                    return item && item.value === clinicId;
                })
            }

            this.setState({
                contentHTML: contentHTML,
                contentMarkdown: contentMarkdown,
                description: description,
                selectedPrice: selectedPrice,
                selectedProvince: selectedProvince,
                selectedPayment: selectedPayment,
                selectedSpecialty: selectedSpecialty,
                selectedClinic: selectedClinic,
                note: note,
                oldData: true
            })
        } else {
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                selectedPrice: '',
                selectedProvince: '',
                selectedPayment: '',
                selectedSpecialty: '',
                selectedClinic: '',
                note: '',
                oldData: false
            })
        }
    };

    handleSelectChangeInfo = async (selectedOptions, name) => {
        let stateName = name.name;
        let copyState = { ...this.state };
        copyState[stateName] = selectedOptions;
        this.setState({
            ...copyState
        })
    };

    handleOnchangeText = (e, id) => {
        let copyState = { ...this.state };
        copyState[id] = e.target.value;
        this.setState({
            ...copyState
        })
    }

    handleCreateDetailDoctor = () => {
        let { oldData } = this.state;
        this.props.createDetailDoctor({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedDoctor.value,
            selectedPrice: this.state.selectedPrice.value,
            selectedProvince: this.state.selectedProvince.value,
            selectedPayment: this.state.selectedPayment.value,
            selectedClinic: this.state.selectedClinic.value,
            selectedSpecialty: this.state.selectedSpecialty.value,
            note: this.state.note,
            actions: oldData === true ? CRUDActions.EDIT : CRUDActions.CREATE,
        })
    }

    handleCancel = () => {
        this.setState({
            contentMarkdown: '',
            contentHTML: '',
            description: '',
            oldData: false,
            selectedDoctor: '',
            selectedPrice: '',
            selectedProvince: '',
            selectedPayment: '',
            clinicId: '',
            specialtyId: '',
            selectedClinic: '',
            selectedSpecialty: '',
            note: '',
        })
    }


    render() {
        let { oldData } = this.state;
        let { lang } = this.props;

        return (
            <div className='manage-doctor-container'>
                <div className='container-content'>
                    <div className='title'>
                        <FormattedMessage id="manage-doctor.title" />
                    </div>
                    <div className='col-12 mt-5'>
                        <div className='row'>
                            <div className='col-6 form-group'>
                                <label>
                                    <FormattedMessage id="manage-doctor.choose-doctor" />
                                </label>
                                <Select
                                    value={this.state.selectedDoctor}
                                    onChange={this.handleSelectChange}
                                    options={this.state.listDoctor}
                                    placeholder={lang === languages.VI ? "Chọn bác sĩ" : "Select doctor"}
                                    name="selectedDoctor"
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label>
                                    <FormattedMessage id="manage-doctor.doctor-info" />
                                </label>
                                <textarea
                                    className='form-control'
                                    onChange={(e) => this.handleOnchangeText(e, 'description')}
                                    value={this.state.description}
                                ></textarea>
                            </div>
                        </div>
                        <div className='row mt-4'>
                            <div className='col-4 form-group'>
                                <label>
                                    <FormattedMessage id="manage-doctor.doctor-price" />
                                </label>
                                <Select
                                    value={this.state.selectedPrice}
                                    onChange={this.handleSelectChangeInfo}
                                    options={this.state.listPrice}
                                    placeholder={lang === languages.VI ? "Chọn giá" : "Select price"}
                                    name="selectedPrice"
                                />

                            </div>
                            <div className='col-4 form-group'>
                                <label>
                                    <FormattedMessage id="manage-doctor.doctor-payment" />
                                </label>
                                <Select
                                    value={this.state.selectedPayment}
                                    onChange={this.handleSelectChangeInfo}
                                    options={this.state.listPayment}
                                    placeholder={lang === languages.VI ? "Chọn PTTT" : "Select PM"}
                                    name="selectedPayment"
                                />

                            </div>
                            <div className='col-4 form-group'>
                                <label>
                                    <FormattedMessage id="manage-doctor.doctor-province" />
                                </label>
                                <Select
                                    value={this.state.selectedProvince}
                                    onChange={this.handleSelectChangeInfo}
                                    options={this.state.listProvince}
                                    placeholder={lang === languages.VI ? "Chọn tỉnh" : "Select province"}
                                    name="selectedProvince"
                                />
                            </div>
                        </div>
                        <div className='row mt-4'>
                            <div className='col-4 form-group'>
                                <label>
                                    <FormattedMessage id="manage-doctor.specialty" />
                                </label>
                                <Select
                                    value={this.state.selectedSpecialty}
                                    onChange={this.handleSelectChangeInfo}
                                    options={this.state.listSpecialty}
                                    placeholder={lang === languages.VI ? "Chọn chuyên khoa" : "Select specialty"}
                                    name="selectedSpecialty"
                                />
                            </div>
                            <div className='col-4 form-group'>
                                <label>
                                    <FormattedMessage id="manage-doctor.clinic" />
                                </label>
                                <Select
                                    value={this.state.selectedClinic}
                                    onChange={this.handleSelectChangeInfo}
                                    options={this.state.listClinic}
                                    placeholder={lang === languages.VI ? "Chọn phòng khám" : "Select clinic"}
                                    name="selectedClinic"
                                />
                            </div>
                            <div className='col-4 form-group'>
                                <label>
                                    <FormattedMessage id="manage-doctor.doctor-note" />
                                </label>
                                <textarea
                                    type='text'
                                    className='form-control'
                                    name='note'
                                    onChange={(e) => this.handleOnchangeText(e, 'note')}
                                    value={this.state.note}
                                ></textarea>
                            </div>
                        </div>

                        <div className='row mt-5 mb-5'>
                            <div className='col-12'>
                                <label>
                                    <FormattedMessage id="manage-doctor.doctor-details" />
                                </label>
                                <MdEditor
                                    style={{ height: '500px' }}
                                    renderHTML={text => mdParser.render(text)}
                                    onChange={this.handleEditorChange}
                                    value={this.state.contentMarkdown} />
                            </div>
                        </div>

                        <div className='row mt-5 mb-5'>
                            <div className='col-12'>
                                <button
                                    className={oldData === false ? 'btn btn-primary float-right' : 'btn btn-success float-right'}
                                    onClick={() => this.handleCreateDetailDoctor()}
                                >
                                    {oldData === true ?
                                        <FormattedMessage id='manage-doctor.save' />
                                        : <FormattedMessage id='manage-doctor.create' />
                                    }
                                </button>
                                <button
                                    className='btn btn-secondary float-right mr-3'
                                    onClick={() => this.handleCancel()}
                                >
                                    <FormattedMessage id='manage-doctor.cancel' />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        lang: state.app.language,
        allDoctors: state.admin.doctors,
        allRequiredDoctorInfo: state.admin.allRequiredData
    };

};

const mapDispatchToProps = dispatch => {
    return {
        getAllRequiedInfoDoctor: () => dispatch(actions.fetchRequiredDoctorInfoStart()),
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctorsStart()),
        createDetailDoctor: (data) => dispatch(actions.createDetailDoctorStart(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
