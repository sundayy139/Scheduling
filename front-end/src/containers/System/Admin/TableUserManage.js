import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from "../../../store/actions";

class TableUserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            usersRedux: []
        }
    }

    componentDidMount() {
        this.props.fetchAllUsers()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.usersList !== this.props.usersList) {
            this.setState({
                usersRedux: this.props.usersList
            })
        }
    }

    handleDeleteUser = (user) => {
        if (window.confirm(`Are you sure you want to delete user id: ${user.id}`)) {
           this.props.deleteUser(user.id);
        }
    }


    render() {

        let allUsers = this.props.usersList

        return (
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
                        <th>Position</th>
                        <th>Created At</th>
                        <th>Updated At</th>
                        <th style={{ width: "100px" }}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {allUsers && allUsers.length > 0 && allUsers.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>
                                <a href={`mailto:${user.email}`} target='_blank'>{user.email}</a>
                            </td>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.address}</td>
                            <td>
                                <a href={`tel:${user.phoneNumber}`} target='_blank'>{user.phoneNumber}</a>
                            </td>
                            <td>{user.gender}</td>
                            <td>{user.roleId}</td>
                            <td>{user.positionId}</td>
                            <td>{user.createdAt}</td>
                            <td>{user.updatedAt}</td>
                            <td>
                                <div className='d-flex'>
                                    <button className="btn btn-primary mr-2" type="button">
                                        <i className="fas fa-pencil-alt"></i>
                                    </button>
                                    <button 
                                        className="btn btn-danger" 
                                        type="button"
                                        onClick={()=>{
                                            this.handleDeleteUser(user)
                                        }}
                                    >
                                        <i className="fas fa-trash"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }

}

const mapStateToProps = state => {
    return {
        usersList: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllUsers: () => dispatch(actions.fetchAllUsersStart()),
        deleteUser: (id) => dispatch(actions.deleteUserStart(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableUserManage);
