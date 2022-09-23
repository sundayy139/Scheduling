import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllUsers } from '../../services/userSevice';
import ModalUser from './ModalUser';


class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalUser: false
        }
    }

    async componentDidMount() {
        let response = await getAllUsers('ALL');
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users,
            })
        }

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


    render() {

        let arrUsers = this.state.arrUsers;

        return (
            <div className="users-container">
                <ModalUser
                    isOpen={this.state.isOpenModalUser}
                    toggleUserModal={this.toggleUserModal}
                />
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
                <table className="table table-bordered">
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
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody className='text-center'>
                        {
                            arrUsers && arrUsers.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.email}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.address}</td>
                                    <td>{item.phoneNumber}</td>
                                    <td>{item.gender}</td>
                                    <td>{item.roleId}</td>
                                    <td>
                                        <button className="btn btn-primary" type="button" style={{ padding: " 0 8px", marginRight: "10px" }}>
                                            <i className="fas fa-pencil-alt"></i>
                                        </button>
                                        <button className="btn btn-danger" type="button" style={{ padding: " 0 8px" }}>
                                            <i className="fas fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }

                    </tbody>
                </table>
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
