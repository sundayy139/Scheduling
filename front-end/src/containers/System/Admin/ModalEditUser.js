import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import * as actions from "../../../store/actions";
import { FormattedMessage } from 'react-intl';
import { languages } from "../../../utils/constant";
import Lightbox from 'react-image-lightbox';
import CommonUtils from '../../../utils/CommonUtils';
import _ from 'lodash';
import DatePicker from '../../../components/Input/DatePicker';


class ModalEditUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewImgUrl: '',

            id: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            gender: '',
            position: '',
            role: '',
            dateOfBirth: '',
            image: '',
        }
    }


    componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();

        let user = this.props.userEdit;

        if (user && !_.isEmpty(user)) {
            let imageBase64 = '';
            if (user.image) {
                imageBase64 = new Buffer(user.image, 'base64').toString('binary');
            }

            this.setState({
                id: user.id,
                email: user.email,
                password: "123456789",
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address,
                phoneNumber: user.phoneNumber,
                dateOfBirth: user.dateOfBirth,
                gender: user.gender,
                role: user.roleId,
                position: user.positionId,
                avatar: '',
                previewImgUrl: imageBase64
            })
        }
    }

    componentDidUpdate(prevProps) {

        if (prevProps.genders !== this.props.genders) {
            let arrGenders = this.props.genders;
            this.setState({
                genderArr: arrGenders,
            })
        }

        if (prevProps.positions !== this.props.positions) {
            let arrPositions = this.props.positions;
            this.setState({
                positionArr: arrPositions,
            })
        }

        if (prevProps.roles !== this.props.roles) {
            let arrRoles = this.props.roles;
            this.setState({
                roleArr: arrRoles,
            })
        }
    }

    toggle = () => {
        this.props.toggleEditUserModal();
    }

    openPreviewImg = () => {
        if (!this.state.previewImgUrl)
            return;

        this.setState({
            isOpen: true
        })
    }

    handleChangeImg = async (e) => {
        let file = e.target.files[0];
        let base64 = await CommonUtils.getBase64(file);

        if (file) {
            let objectURrl = URL.createObjectURL(file);
            this.setState({
                previewImgUrl: objectURrl,
                avatar: base64
            })
        }
    }

    onChangeInput = (e, id) => {
        let copyState = { ...this.state };

        copyState[id] = e.target.value;
        this.setState({
            ...copyState
        })
    }

    handleChangDatePiker = (date) => {
        this.setState({
            dateOfBirth: date[0]
        })
    }

    checkValideInput = () => {
        let isValid = true;
        let arrCheck = [
            'email',
            'password',
            'firstName',
            'lastName',
            'phoneNumber',
            'address',
            'dateOfBirth'
        ];

        for (let i = 0; i < arrCheck.length; i++) {

            if (!this.state[arrCheck[i]]) {
                isValid = false;
                alert('Missing required field: ' + arrCheck[i]);
                break;
            }
        }

        return isValid;
    }

    handleSaveUser = () => {
        if (window.confirm('Are you sure you want to save change?')) {
            let isValid = this.checkValideInput();
            if (isValid === false) return;

            this.props.editUser({
                id: this.state.id,
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phoneNumber: this.state.phoneNumber,
                dateOfBirth: this.state.dateOfBirth,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
                avatar: this.state.avatar
            })

            this.toggle();
        }

    }

    render() {

        let genders = this.state.genderArr;
        let positions = this.state.positionArr;
        let roles = this.state.roleArr;
        let language = this.props.lang;
        let loading = this.props.loading;
        let date = new Date(this.state.dateOfBirth).getTime();

        let { email,
            password,
            firstName,
            lastName,
            phoneNumber,
            address,
            dateOfBirth,
            gender,
            position,
            role,
            avatar } = this.state;

        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => this.toggle()}
                size="lg"
                style={{ marginTop: "100px" }}
            >
                <ModalHeader toggle={() => this.toggle()} className="close">
                    <FormattedMessage id="manage-user.edit-user" />
                </ModalHeader>
                <ModalBody>
                    <form className='col-12'>
                        <h2 className="text-center mb-5">
                            <FormattedMessage id="manage-user.edit-user" />
                        </h2>
                        <div className='row'>
                            <div className="form-group col-6">
                                <label>
                                    <FormattedMessage id="manage-user.email" />
                                </label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    name="email"
                                    disabled
                                    value={email}
                                    onChange={(e) => { this.onChangeInput(e, 'email') }}
                                />
                            </div>
                            <div className="form-group col-6">
                                <label >
                                    <FormattedMessage id="manage-user.password" />
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    disabled
                                    name="password"
                                    value={password}
                                    onChange={(e) => { this.onChangeInput(e, 'password') }}
                                />
                            </div>
                        </div>
                        <div className='row'>
                            <div className="form-group col-6">
                                <label >
                                    <FormattedMessage id="manage-user.first-name" />
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="firstName"
                                    name="firstName"
                                    value={firstName}
                                    onChange={(e) => { this.onChangeInput(e, 'firstName') }}
                                />
                            </div>
                            <div className="form-group col-6">
                                <label >
                                    <FormattedMessage id="manage-user.last-name" />
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="lastName"
                                    name="lastName"
                                    value={lastName}
                                    onChange={(e) => { this.onChangeInput(e, 'lastName') }}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className='form-group col-12'>
                                <label >
                                    <FormattedMessage id="manage-user.address" />
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="address"
                                    name="address"
                                    value={address}
                                    onChange={(e) => { this.onChangeInput(e, 'address') }}
                                />
                            </div>

                        </div>
                        <div className='row'>
                            <div className="form-group col-4">
                                <label>
                                    <FormattedMessage id="manage-user.phone-number" />
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    value={phoneNumber}
                                    onChange={(e) => { this.onChangeInput(e, 'phoneNumber') }}
                                />
                            </div>
                            <div className="form-group col-4">
                                <label>
                                    <FormattedMessage id="manage-user.birth-day" />
                                </label>
                                <FormattedMessage id="modal-booking.birth-day">
                                    {placeholder =>
                                        <DatePicker
                                            className="form-control"
                                            value={date}
                                            placeholder={placeholder}
                                            onChange={this.handleChangDatePiker}
                                        />
                                    }
                                </FormattedMessage>
                            </div>
                            <div className="form-group col-4">
                                <label>
                                    <FormattedMessage id="manage-user.gender" />
                                </label>
                                <select
                                    name="gender"
                                    id="gender"
                                    className="form-control"
                                    value={gender}
                                    onChange={(e) => { this.onChangeInput(e, 'gender') }}
                                >
                                    {
                                        genders && genders.length > 0 && genders.map((item, index) => {
                                            return (
                                                <option key={index} value={item.key}>
                                                    {language === languages.VI ? item.value_VI : item.value_EN}
                                                </option>
                                            )
                                        })
                                    }

                                </select>
                            </div>
                        </div>
                        <div className='row'>
                            <div className="form-group col-4">
                                <label>
                                    <FormattedMessage id="manage-user.role" />
                                </label>
                                <select
                                    name="roleId"
                                    id="role"
                                    className="form-control"
                                    value={role}
                                    onChange={(e) => { this.onChangeInput(e, 'role') }}
                                >
                                    {
                                        roles && roles.length > 0 && roles.map((item, index) => {
                                            return (
                                                <option key={index} value={item.key}>
                                                    {language === languages.VI ? item.value_VI : item.value_EN}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>

                            <div className="form-group col-4">
                                <label>
                                    <FormattedMessage id="manage-user.position" />
                                </label>
                                <select
                                    name="position"
                                    id="position"
                                    className="form-control"
                                    value={position}
                                    onChange={(e) => { this.onChangeInput(e, 'position') }}
                                >
                                    {
                                        positions && positions.length > 0 && positions.map((item, index) => {
                                            return (
                                                <option key={index} value={item.key}>
                                                    {language === languages.VI ? item.value_VI : item.value_EN}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>

                            <div className="form-group col-4">
                                <label>
                                    <FormattedMessage id="manage-user.avatar" />
                                </label>
                                <div>
                                    <input
                                        type="file"
                                        id="previewImg"
                                        hidden
                                        onChange={(e) => {
                                            this.handleChangeImg(e)
                                        }}
                                    />
                                    <label htmlFor='previewImg' className='btn btn-primary w-100'>
                                        Upload
                                        <i className='fas fa-upload ml-2'></i>
                                    </label>
                                    <div className='preview-img w-100 form-control center'
                                        style={{
                                            height: "100px",
                                            backgroundImage: `url(${this.state.previewImgUrl})`,
                                            backgroundSize: "contain",
                                            backgroundRepeat: "no-repeat",
                                            backgroundPosition: "center",
                                            cursor: "pointer"
                                        }}
                                        onClick={() => {
                                            this.openPreviewImg()
                                        }}
                                    >
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </ModalBody>
                <ModalFooter>

                    <Button
                        color="success px-2"
                        onClick={() => {
                            this.handleSaveUser()
                        }}>
                        <FormattedMessage id="manage-user.save" />
                    </Button>
                    <Button
                        color="danger px-2"
                        onClick={() => {
                            this.toggle()
                        }}>
                        <FormattedMessage id="manage-user.close" />
                    </Button>
                </ModalFooter>
                {/* toggle preview img upload */}
                {
                    this.state.isOpen === true && (
                        <Lightbox
                            mainSrc={this.state.previewImgUrl}
                            onCloseRequest={() => this.setState({ isOpen: false })}
                        />
                    )
                }
            </Modal>

        )
    }

}

const mapStateToProps = state => {
    return {
        lang: state.app.language,
        genders: state.admin.genders,
        positions: state.admin.positions,
        roles: state.admin.roles,
        loading: state.admin.loading,
        usersList: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        editUser: (data) => dispatch(actions.editUserStart(data)),
        fetchAllUsers: () => dispatch(actions.fetchAllUsersStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);



