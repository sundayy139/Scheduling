import "./Login.scss"
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import { handleLoginApi } from '../../services/userService'


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

    handleOnChangeInput = (e, id) => {
        let copyState = { ...this.state };
        copyState[id] = e.target.value;

        this.setState({
            ...copyState
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

    handleKeyDown = (e) => {
        if (e.key === 'Enter' || e.keyCode === 13) {
            this.handleLogin();
        }
    }

    render() {

        return (
            <div className="login-page">
                <div className="box">
                    <div className="form">
                        <h2>Login</h2>
                        <div className="input-box">
                            <input
                                type="text"
                                required
                                value={this.state.username}
                                onChange={(e) => this.handleOnChangeInput(e, 'username')}
                                onKeyDown={(e) => this.handleKeyDown(e)}
                            />
                            <span>User name</span>
                            <p></p>
                        </div>
                        <div className="input-box">
                            <input
                                required
                                type={this.state.isShowPassword ? "text" : "password"}
                                value={this.state.password}
                                onChange={(e) => this.handleOnChangeInput(e, 'password')}
                                onKeyDown={(e) => this.handleKeyDown(e)}
                            />
                            <span>Pass word</span>
                            <div className="show-hide-pw" onClick={() => { this.showHidePassword() }}>
                                <i className={this.state.isShowPassword ? "far fa-eye" : "fa fa-eye-slash"}></i>
                            </div>
                            <p></p>
                        </div>
                        <div className="link">
                            <div className="message" >
                                {this.state.errMessage}
                            </div>
                            <a href="">Forgot password?</a>
                        </div>
                        <div className="btn-login">
                            <button
                                onClick={() => { this.handleLogin() }}
                            >
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                Log in
                            </button>
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
