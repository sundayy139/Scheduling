import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from "../../../store/actions";
import 'react-image-lightbox/style.css';
import ModalCreateUser from './ModalCreateUser';
import ModalEditUser from './ModalEditUser';
import * as ReactDOM from 'react-dom';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';


const mdParser = new MarkdownIt();

// Finish!
function handleEditorChange({ html, text }) {
    console.log('handleEditorChange', html, text);
}




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
        let allUsers = this.props.usersList

        return (
            <div className="user-redux-container" >
                <div className="container">
                    <div className='title text-center'>
                        <FormattedMessage id="manage-user.manage-user" />
                    </div>
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
                        <div className='container'>
                            <div className='row mt-5 mb-5'>
                                <div className='col-12 p-0'>
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
                                                            <button
                                                                className="btn btn-primary mr-2"
                                                                type="button"
                                                                onClick={() => {
                                                                    this.handleEditUser(user);
                                                                }}
                                                            >
                                                                <i className="fas fa-pencil-alt"></i>
                                                            </button>
                                                            <button
                                                                className="btn btn-danger"
                                                                type="button"
                                                                onClick={() => {
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
                                </div>
                            </div>
                            <div className='row mb-5'>
                                <div className='col-12'>
                                    <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} />
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
