import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import _ from 'lodash';

class ModalEditUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            phoneNumber: '',
            gender: '',
            roleId: '',
        }

    }

    componentDidMount() {
        let user = this.props.currentUser;

        if (user && !_.isEmpty(user)) {
            this.setState({
                id: user.id,
                email: user.email,
                password: "123456",
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address,
                phoneNumber: user.phoneNumber,
                gender: user.gender,
                roleId: user.roleId,
            })
        }
    }

    toggle = () => {
        this.props.toggleEditModal();
    }

    handleOnchangeInput = (e, id) => {
        let copyState = { ...this.state };
        copyState[id] = e.target.value;

        this.setState({
            ...copyState
        })

    }

    checkValideInput = () => {
        let isValid = true;
        let arrInput = ['email', 'firstName', 'lastName', 'address', 'phoneNumber'];

        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert('Missing parameter ' + arrInput[i]);
                break;
            }

        }
        return isValid;
    }

    handleSaveUser = () => {
        let isValid = this.checkValideInput();
        if (isValid === true) {
            this.props.editUser(this.state);
        }
    }

    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => this.toggle()}
                size="lg"
                style={{ marginTop: "100px" }}
            >
                <ModalHeader toggle={() => this.toggle()} className="close">Edit User</ModalHeader>
                <ModalBody>
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <h1 className="text-center mb-4">Edit User</h1>
                                <form>
                                    <div className="my-3">
                                        <label>Email:</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="name"
                                            placeholder="Email"
                                            name="email"
                                            value={this.state.email}
                                            onChange={(e) => {
                                                this.handleOnchangeInput(e, 'email')
                                            }}
                                            disabled />
                                    </div>
                                    <div className="my-3">
                                        <label >Password:</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="password"
                                            placeholder="Password"
                                            name="password"
                                            value={this.state.password}
                                            onChange={(e) => {
                                                this.handleOnchangeInput(e, 'password');
                                            }}
                                            disabled />
                                    </div>
                                    <div className="my-3" style={{ display: "flex", justifyContent: "space-between" }}>
                                        <div className="col-md-5" style={{ width: "49%" }}>
                                            <label >First Name:</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="firstName"
                                                placeholder="First Name"
                                                name="firstName"
                                                value={this.state.firstName}
                                                onChange={(e) => {
                                                    this.handleOnchangeInput(e, 'firstName');
                                                }} />
                                        </div>
                                        <div className="col-md-6">
                                            <label >Last Name:</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="lastName"
                                                placeholder="Last Name"
                                                name="lastName"
                                                value={this.state.lastName}
                                                onChange={(e) => {
                                                    this.handleOnchangeInput(e, 'lastName');
                                                }} />
                                        </div>
                                    </div>

                                    <div className="my-3">
                                        <label >Address: </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="address"
                                            placeholder="Address"
                                            name="address"
                                            value={this.state.address}
                                            onChange={(e) => {
                                                this.handleOnchangeInput(e, 'address');
                                            }} />
                                    </div>


                                    <div className="my-3" style={{ display: "flex", justifyContent: "space-between" }}>
                                        <div className=" col-md-5">
                                            <label>Phone Number:</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="phoneNumber"
                                                name="phoneNumber"
                                                placeholder='Phone Number'
                                                value={this.state.phoneNumber}
                                                onChange={(e) => {
                                                    this.handleOnchangeInput(e, 'phoneNumber');
                                                }} />
                                        </div>
                                        <div className=" col-md-3">
                                            <label>Gender:</label>
                                            <input
                                                max={1}
                                                min={0}
                                                type="number"
                                                className="form-control"
                                                id="gender"
                                                name="gender"
                                                placeholder='gender'
                                                value={this.state.gender}
                                                onChange={(e) => {
                                                    this.handleOnchangeInput(e, 'gender');
                                                }} />
                                            {/* <select
                                                name="gender"
                                                id="gender"
                                                selected
                                                className="form-control"
                                                onChange={(e) => {
                                                    this.handleOnchangeInput(e, 'gender');
                                                }}>
                                                <option selected>{this.state.gender === 1 ? "Male" :"Female"}</option>
                                                <option value="1">Male</option>
                                                <option value="0">Female</option>
                                            </select>  */}
                                        </div>
                                        <div className=" col-md-3">
                                            <label>Role ID:</label>
                                            <input
                                                max={3}
                                                min={1}
                                                type="number"
                                                className="form-control"
                                                id="roleId"
                                                name="roleId"
                                                placeholder='roleId'
                                                value={this.state.roleId}
                                                onChange={(e) => {
                                                    this.handleOnchangeInput(e, 'roleId');
                                                }} />
                                            {/* <select disabled
                                                name="roleId"
                                                id="role"
                                                className="form-control"
                                                onChange={(e) => {
                                                    this.handleOnchangeInput(e, 'roleId');
                                                }}>
                                                <option selected>{this.state.roleId}</option>
                                                <option value="1">Admin</option>
                                                <option value="2">Doctor</option>
                                                <option value="3">Patient</option>
                                            </select> */}
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="success px-2"
                        onClick={() => {
                            this.handleSaveUser()
                        }}>
                        Add
                    </Button>
                    <Button
                        color="danger px-2"
                        onClick={() => {
                            this.toggle()
                        }}>
                        Close
                    </Button>
                </ModalFooter>
            </Modal>

        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);



