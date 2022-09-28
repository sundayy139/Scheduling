import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllUsersService, createNewUserService, deleteUserService, editUserService } from '../../services/userService';
import ModalUser from './ModalUser';
import ModalEditUser from './ModalEditUser';
import { emitter } from '../../utils/emitter';
import _ from 'lodash';

class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalUser: false,
            isOpenModalEditUser: false,
            userEdit: {}
        }
    }

    async componentDidMount() {
        await this.getAllUsers();
    }

    handleAddNewUser = () => {
        this.setState({
            isOpenModalUser: true
        })
    }

    toggleUserModal = () => {
        this.setState({
            isOpenModalUser: !(this.state.isOpenModalUser)
        })
    }

    toggleEditModal = () => {
        this.setState({
            isOpenModalEditUser: !(this.state.isOpenModalEditUser)
        })
    }

    getAllUsers = async () => {
        let response = await getAllUsersService('ALL');
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users,
            })
        }
    }

    createNewUser = async (data) => {
        try {
            let response = await createNewUserService(data);

            if (response && response.errCode !== 0) {
                alert(response.errMessage);
            } else {
                await this.getAllUsers();
                this.setState({
                    isOpenModalUser: false
                })

                alert(response.errMessage);

                emitter.emit('EVENT_CLEAR_MODAL_DATA')
            }
        } catch (e) {

        }
    }

    editUser = async (user) => {
        try {

            if (window.confirm(`Are you sure you want to update user id: ${user.id}`)) {
                let response = await editUserService(user);
                if (response && response.errCode !== 0) {
                    alert(response.errMessage);
                } else {
                    await this.getAllUsers();
                    this.setState({
                        isOpenModalEditUser: false
                    })

                    alert(response.errMessage);
                }
            }
        } catch (e) {

        }

    }

    handleEditUser = (user) => {
        this.setState({
            isOpenModalEditUser: true,
            userEdit: user
        })
    }


    handleDeleteUser = async (user) => {
        try {
            if (window.confirm(`Are you sure you want to delete user id: ${user.id}`)) {
                let response = await deleteUserService(user.id);
                if (response && response.errCode !== 0) {
                    alert(response.errMessage)
                } else {
                    await this.getAllUsers();
                }
            }

        } catch (e) {
            console.log(e)
        }
    }

    render() {

        let arrUsers = this.state.arrUsers;

        return (
            <div className="users-container">
                <ModalUser
                    isOpen={this.state.isOpenModalUser}
                    toggleUserModal={this.toggleUserModal}
                    createNewUser={this.createNewUser}
                />
                {
                    this.state.isOpenModalEditUser && (
                        <ModalEditUser
                            isOpen={this.state.isOpenModalEditUser}
                            toggleEditModal={this.toggleEditModal}
                            currentUser={this.state.userEdit}
                            editUser={this.editUser}
                        />
                    )
                }

                <div className=' title text-center '>Manage Users</div>
                <div className='mx-2 my-4' style={{ float: "right" }}>
                    <button
                        className='btn btn-primary px-4'
                        onClick={() => { this.handleAddNewUser() }}
                    >
                        Add new user
                        <i className="fas fa-plus px-2"></i>
                    </button>
                </div>

                <div style={{ width: "100vw", height: "80vh", overflow: "scroll" }}>
                    <table className="table table-bordered" style={{ width: "100%" }}>
                        <thead className='text-center'>
                            <tr>
                                <th>ID</th>
                                <th>Email</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Address</th>
                                <th>Phone Number</th>
                                <th>Gender</th>
                                <th>Role</th>
                                <th>Created At</th>
                                <th>Updated At</th>
                                <th style={{ width: "100px" }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                arrUsers && arrUsers.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td>{item.phoneNumber}</td>
                                        <td>{item.gender === 0 ? "Female" : "Male"}</td>
                                        <td>{item.roleId}</td>
                                        <td>{item.createdAt}</td>
                                        <td>{item.updatedAt}</td>
                                        <td>
                                            <button className="btn btn-primary" type="button" onClick={() => { this.handleEditUser(item) }}>
                                                <i className="fas fa-pencil-alt"></i>
                                            </button>
                                            <button className="btn btn-danger" type="button"  onClick={() => { this.handleDeleteUser(item) }}>
                                                <i className="fas fa-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
