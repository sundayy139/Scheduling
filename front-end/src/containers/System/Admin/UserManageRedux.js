import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllCodeService } from "../../../services/userService";
import { languages } from "../../../utils/constant";
class UserManageRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
        }
    }

    async componentDidMount() {
        try {
            let res = await getAllCodeService('gender');
            if (res && res.errCode === 0) {
                this.setState({
                    genderArr: res.data
                })
            }
        } catch (e) {

        }
    }


    render() {

        let genders = this.state.genderArr;
        let language = this.props.lang;

        return (
            <div className="user-redux-container" >
                <div className='title text-center'>
                    Manage Users
                </div>
                <div className='user-redux-body'>
                    <div className='container'>
                        <div className='row'>
                            <form className='col-9 mx-auto border my-5'>
                                <h2 className="text-center mb-4 mt-5">
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
                                                    id="name"
                                                    placeholder={placeholder}
                                                    name="email"
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
                                                />
                                            }
                                        </FormattedMessage>
                                    </div>
                                </div>
                                <div className='row my-4'>
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
                                                />
                                            }
                                        </FormattedMessage>
                                    </div>
                                </div>

                                <div className="form-group col-12">
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
                                            />
                                        }
                                    </FormattedMessage>
                                </div>
                                <div className='row my-4'>
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
                                        >
                                            {
                                                genders && genders.length > 0 && genders.map((item, index) => {
                                                    return (
                                                        <option key={index}>
                                                            {language === languages.VI ? item.value_VI : item.value_EN}
                                                        </option>
                                                    )
                                                })
                                            }

                                        </select>
                                    </div>
                                </div>

                                <div className='row my-4'>

                                    <div className="form-group col-4">
                                        <label>
                                            <FormattedMessage id="manage-user.role" />
                                        </label>
                                        <select
                                            name="roleId"
                                            id="role"
                                            className="form-control"
                                        >

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
                                        >

                                        </select>
                                    </div>

                                    <div className="form-group col-4">
                                        <label>
                                            <FormattedMessage id="manage-user.image" />
                                        </label>
                                        <input
                                            type="file"
                                            className="form-control"
                                            id="image" />
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-primary mb-4">
                                    <FormattedMessage id="manage-user.create" />
                                </button>
                            </form>
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManageRedux);
