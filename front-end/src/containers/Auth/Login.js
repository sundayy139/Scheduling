import "./Login.scss"
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import { handleLoginApi } from '../../services/userSevice'


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isShowPassword: false,
            errMessage: ''
        }
    }

    handleOnChangeUsername = (e) => {
        this.setState({
            username: e.target.value,
        })
    }

    handleOnChangePassword = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    handleLogin = async () => {
        this.setState({
            errMessage: ''
        })
        try {
            let data = await handleLoginApi(this.state.username, this.state.password);

            if (data && data.errCode !== 0) {
                this.setState({
                    errMessage: data.message
                })

            } else {
                this.props.userLoginSuccess(data.user)
            }

           
        } catch (error) {
            if (error.response) {
                if (error.response.data) {
                    this.setState({
                        errMessage: error.response.data.message
                    })
                }
            }
        }
    }

    showHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }

    render() {

        return (
            <div className="login-bg">
                <div className="login-container">
                    <div className="login-content row">
                        <div className="col-md-12 header-title">
                            Login
                        </div>
                        <div className="col-12 form-group login-input">
                            <label>Userame:</label>
                            <input
                                type="text"
                                className="form-control input"
                                placeholder="Enter your username"
                                value={this.state.username}
                                onChange={(e) => this.handleOnChangeUsername(e)} />
                        </div>
                        <div className="col-12 form-group login-input">
                            <label>Password:</label>
                            <div className="custom-password">
                                <input
                                    type={this.state.isShowPassword ? "text" : "password"}
                                    className="input form-control"
                                    placeholder="Enter your password"
                                    value={this.state.password}
                                    onChange={(e) => this.handleOnChangePassword(e)}
                                />
                                <span onClick={() => { this.showHidePassword() }}>
                                    <i className={this.state.isShowPassword ? "far fa-eye" : "fa fa-eye-slash"}></i>
                                </span>
                            </div>
                        </div>
                        <div className="col-12" style={{ color: "red", margin: "20px 0 0 45px", fontSize: "16px" }}>
                            {this.state.errMessage}
                        </div>
                        <div className="col-12  login-btn">
                            <button
                                className="btn"
                                onClick={() => { this.handleLogin() }}>Log in</button>
                        </div>
                        <div className="col-12 login-text">
                            <span>Forgot your password? <a href="">Click here</a></span>
                        </div>
                        <div className="col-12 login-text">
                            <span>Or sign in with:</span>
                        </div>
                        <div className="col-12 login-social">
                            <a className="icon-fb">
                                <i className="fab fa-facebook-f "></i>
                            </a>
                            <a className="icon-tw">
                                <i className="fab fa-twitter icon-twitter "></i>
                            </a>
                            <a className="icon-gg">
                                <i className="fab fa-google-plus-g "></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        languege: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
        userLoginFail: () => dispatch(actions.userLoginFail()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
