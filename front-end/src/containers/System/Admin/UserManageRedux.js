import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from "../../../store/actions";
import 'react-image-lightbox/style.css';
import ModalCreateUser from './ModalCreateUser';
import ModalEditUser from './ModalEditUser';
import * as ReactDOM from 'react-dom';
import MaterialTable from 'material-table';
import { isBuffer } from 'lodash';


class UserManageRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpenModalCreateUser: false,
            isOpenModalEditUser: false,

            usersRedux: [],
            userEdit: {},

            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            gender: '',
            position: '',
            role: '',
            image: '',
        }
    }

    async componentDidMount() {
        this.props.fetchAllUsers()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.usersList !== this.props.usersList) {
            this.setState({
                usersRedux: this.props.usersList
            })
        }
    }

    toggleCreateUserModal = () => {
        this.setState({
            isOpenModalCreateUser: !(this.state.isOpenModalCreateUser)
        })
    }

    handleAddNewUser = () => {
        this.setState({
            isOpenModalCreateUser: true
        })
    }

    toggleEditUserModal = () => {
        this.setState({
            isOpenModalEditUser: !(this.state.isOpenModalEditUser)
        })
    }

    handleEditUser = (user) => {
        this.setState({
            isOpenModalEditUser: true,
            userEdit: user
        })
    }

    handleDeleteUser = (user) => {
        if (window.confirm(`Are you sure you want to delete user id: ${user.id}`)) {
            this.props.deleteUser(user.id);
        }
    }

    render() {

        let language = this.props.lang;
        let allUsers = this.props.usersList;

        if (allUsers && allUsers.length > 0) {
            allUsers.map((item, i) => {
                if (item && item.image) {
                    item.avatar = new Buffer(item.image, 'base64').toString('binary');
                }
            })
        }

        return (
            <div className="user-redux-container" >
                <div className="container-content">
                    <div className='title text-center'>
                        <FormattedMessage id="manage-user.manage-user" />
                    </div>
                    <div className='col-12'>
                        <div className='row'>
                            <div className='col-12 mt-2'>
                                <button
                                    className='btn btn-primary px-4 float-right'
                                    onClick={() => { this.handleAddNewUser() }}
                                >
                                    <FormattedMessage id="manage-user.add-new-user" />
                                    <i className="fas fa-plus px-2"></i>
                                </button>
                            </div>
                        </div>

                        <ModalCreateUser
                            hidden={true}
                            isOpen={this.state.isOpenModalCreateUser}
                            toggleCreateUserModal={this.toggleCreateUserModal}
                        />

                        {
                            this.state.isOpenModalEditUser && (
                                <ModalEditUser
                                    isOpen={this.state.isOpenModalEditUser}
                                    toggleEditUserModal={this.toggleEditUserModal}
                                    userEdit={this.state.userEdit}
                                />
                            )
                        }

                        <div className='user-redux-body'>
                            <div className='container-content'>
                                <div className='col-12 mt-5 mb-5'>
                                    <MaterialTable
                                        title="User Table"
                                        columns={[
                                            { title: 'ID', field: 'id' },
                                            { title: 'Email', field: 'email' },
                                            { title: 'First Name', field: 'firstName' },
                                            { title: 'Last Name', field: 'lastName' },
                                            {
                                                title: 'Avatar', field: 'url', render: rowData => <div
                                                    style={{
                                                        width: 50,
                                                        height: 50,
                                                        borderRadius: '50%',
                                                        backgroundImage: `url(${rowData.avatar})`,
                                                        backgroundSize: "contain",
                                                        backgroundRepeat: "no-repeat",
                                                        backgroundPosition: "center",
                                                    }} />
                                            },
                                            { title: 'Address', field: 'address' },
                                            { title: 'Phone Number', field: 'phoneNumber' },
                                            { title: 'Gender', field: 'gender' },
                                            { title: 'Date of Birth', field: 'dateOfBirth' },
                                            { title: 'Created At', field: 'createdAt' },
                                            { title: 'Updated At', field: 'updatedAt' },
                                        ]}
                                        data={allUsers}
                                        actions={[
                                            {
                                                icon: 'edit',
                                                tooltip: 'Edit',
                                                onClick: (event, rowData) => {
                                                    this.setState({
                                                        isOpenModalEditUser: true,
                                                        userEdit: rowData
                                                    })
                                                }
                                            },
                                            {
                                                icon: 'delete',
                                                tooltip: 'Delete',
                                                onClick: (event, rowData) => {
                                                    if (window.confirm(`Are you sure you want to delete user id: ${rowData.id}`)) {
                                                        this.props.deleteUser(rowData.id);
                                                    }
                                                },
                                            }
                                        ]}
                                    // options={{
                                    //     actionsColumnIndex: -1
                                    // }}
                                    />
                                </div>
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
        lang: state.app.language,
        usersList: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllUsers: () => dispatch(actions.fetchAllUsersStart()),
        deleteUser: (id) => dispatch(actions.deleteUserStart(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManageRedux);
