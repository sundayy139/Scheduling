import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { languages } from "../../../utils/constant";
import * as actions from "../../../store/actions";
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import TableUserManage from './TableUserManage';
class UserManageRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewImgUrl: '',
            isOpen: false,

            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            gender: '',
            position: '',
            role: '',
            avatar: '',
        }
    }

    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();
    }

    componentDidUpdate(prevProps) {

        if (prevProps.genders !== this.props.genders) {
            let arrGenders = this.props.genders;
            this.setState({
                genderArr: arrGenders,
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].key : "",
            })
        }

        if (prevProps.positions !== this.props.positions) {
            let arrPositions = this.props.positions;
            this.setState({
                positionArr: arrPositions,
                position: arrPositions && arrPositions.length > 0 ? arrPositions[0].key : "",
            })
        }

        if (prevProps.roles !== this.props.roles) {
            let arrRoles = this.props.roles;
            this.setState({
                roleArr: arrRoles,
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].key : "",
            })
        }

        // reset input when user created
        if (prevProps.usersList !== this.props.usersList) {
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phoneNumber: '',
                address: '',
                gender: '',
                position: '',
                role: '',
                avatar: '',
            })
        }
    }

    handleChangeImg = (e) => {
        let file = e.target.files[0];

        if (file) {
            let objectURrl = URL.createObjectURL(file);
            this.setState({
                previewImgUrl: objectURrl,
                avatar: file
            })
        }
    }

    openPreviewImg = () => {
        if (!this.state.previewImgUrl)
            return;

        this.setState({
            isOpen: true
        })
    }

    onChangeInput = (e, id) => {
        let copyState = { ...this.state };

        copyState[id] = e.target.value;
        this.setState({
            ...copyState
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
        let isValid = this.checkValideInput();

        if (isValid === false) return;

        // fire redux action
        this.props.createNewUser({
            email: this.state.email,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            address: this.state.address,
            phoneNumber: this.state.phoneNumber,
            gender: this.state.gender,
            roleId: this.state.role,
            positionId: this.state.position,
            image: this.state.avatar
        });
    }

    render() {

        let genders = this.state.genderArr;
        let positions = this.state.positionArr;
        let roles = this.state.roleArr;
        let language = this.props.lang;
        let loading = this.props.loading;

        let { email,
            password,
            firstName,
            lastName,
            phoneNumber,
            address,
            gender,
            position,
            role,
            avatar } = this.state;

        return (
            <div className="user-redux-container" >
                <div className='title text-center'>
                    Manage Users
                </div>
                <div className='user-redux-body'>
                    <div className='container'>
                        <div className='row'>
                            <form className='col-12 mx-auto border mt-3'>
                                <h2 className="text-center mb-4 mt-4">
                                    <FormattedMessage id="manage-user.add-new-user" />
                                </h2>
                                <div className='row'>
                                    <div className="form-group col-6">
                                        <label>
                                            <FormattedMessage id="manage-user.email" />
                                        </label>

                                        <FormattedMessage id="manage-user.email">
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
                                        <label >
                                            <FormattedMessage id="manage-user.password" />
                                        </label>
                                        <FormattedMessage id="manage-user.password">
                                            {placeholder =>
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    id="password"
                                                    placeholder={placeholder}
                                                    name="password"
                                                    value={password}
                                                    onChange={(e) => { this.onChangeInput(e, 'password') }}
                                                />
                                            }
                                        </FormattedMessage>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className="form-group col-6">
                                        <label >
                                            <FormattedMessage id="manage-user.first-name" />
                                        </label>
                                        <FormattedMessage id="manage-user.first-name">
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
                                        <label >
                                            <FormattedMessage id="manage-user.last-name" />
                                        </label>
                                        <FormattedMessage id="manage-user.last-name">
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

                                <div className="row">
                                    <div className='form-group col-12'>
                                        <label >
                                            <FormattedMessage id="manage-user.address" />
                                        </label>
                                        <FormattedMessage id="manage-user.address">
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
                                    <div className="form-group col-8">
                                        <label>
                                            <FormattedMessage id="manage-user.phone-number" />
                                        </label>
                                        <FormattedMessage id="manage-user.phone-number">
                                            {placeholder =>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="phoneNumber"
                                                    name="phoneNumber"
                                                    placeholder={placeholder}
                                                    value={phoneNumber}
                                                    onChange={(e) => { this.onChangeInput(e, 'phoneNumber') }}
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
                                <div
                                    className="btn btn-primary mb-4"
                                    onClick={() => {
                                        this.handleSaveUser()
                                    }}
                                >
                                    <FormattedMessage id="manage-user.create" />
                                </div>
                            </form>
                        </div>

                        <div className='row mt-5 mb-5'>
                            <div className='col-12 p-0'>
                                <TableUserManage />
                            </div>
                        </div>
                    </div>
                </div>

                {/* toggle preview img upload */}
                {
                    this.state.isOpen === true && (
                        <Lightbox
                            mainSrc={this.state.previewImgUrl}
                            onCloseRequest={() => this.setState({ isOpen: false })}
                        />
                    )
                }
            </div>
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
        createNewUser: (data) => dispatch(actions.createUserStart(data)),
        fetchAllUsers: () => dispatch(actions.fetchAllUsersStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManageRedux);
