import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ModalUser extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    async componentDidMount() {
    }

    toggle = () => {
        this.props.toggleUserModal();
    }


    render() {

        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => this.toggle()}
                size="lg"
                centered
            >
                <ModalHeader toggle={() => this.toggle()} className="close">Create New User</ModalHeader>
                <ModalBody>
                    <div class="container">
                        <div class="row">
                            <div class="col-12">
                                <h1 class="text-center mb-4">Create New User</h1>
                                <form>
                                    <div class="my-3">
                                        <label>Email:</label>
                                        <input type="email" class="form-control" id="name" placeholder="Email" name="email" />
                                    </div>
                                    <div class="my-3">
                                        <label >Password:</label>
                                        <input type="password" class="form-control" id="password" placeholder="Password" name="password" />
                                    </div>
                                    <div class="my-3" style={{ display: "flex", justifyContent: "space-between" }}>
                                        <div class="col-md-5">
                                            <label >First Name:</label>
                                            <input type="text" class="form-control" id="firstName" placeholder="First Name" name="firstName" />
                                        </div>
                                        <div class="col-md-6">
                                            <label >Last Name:</label>
                                            <input type="text" class="form-control" id="lastName" placeholder="Last Name" name="lastName" />
                                        </div>
                                    </div>
                                    <div class=" my-3">
                                        <label >Address: </label>
                                        <input type="text" class="form-control" id="address" placeholder="Address" name="address" />
                                    </div>
                                    <div class="my-3" style={{ display: "flex", justifyContent: "space-between" }}>
                                        <div class=" col-md-5">
                                            <label>Phone Number:</label>
                                            <input type="text" class="form-control" id="phoneNumber" name="phoneNumber" placeholder='Phone Number'/>
                                        </div>
                                        <div class=" col-md-3">
                                            <label>Gender:</label>
                                            <select name="gender" id="gender" class="form-control">
                                                <option value="1" selected>Male</option>
                                                <option value="0">Female</option>
                                            </select>
                                        </div>
                                        <div class=" col-md-3">
                                            <label>Role:</label>
                                            <select name="roleId" id="role" class="form-control">
                                                <option value="1" selected>Admin</option>
                                                <option value="2">Doctor</option>
                                                <option value="3">Patient</option>
                                            </select>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="success px-2" onClick={() => { this.toggle() }}>
                        Save
                    </Button>{' '}
                    <Button color="danger px-2" onClick={() => { this.toggle() }}>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);



