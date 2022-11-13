import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { languages } from '../../utils/constant';
import { postVerifyBookAppointmentService } from '../../services/userService';
import HomeHeader from './HomeHeader';
import Footer from './Footer';


class Verify extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statusVerify: false,
            code: ''
        }
    }


    async componentDidMount() {
        if (this.props.location && this.props.location.search) {
            let urlParams = new URLSearchParams(this.props.location.search);
            let token = urlParams.get('token');
            let doctorId = urlParams.get('doctorId');
            let res = await postVerifyBookAppointmentService({
                token: token,
                doctorId: doctorId
            })

            if (res && res.errCode === 0) {
                this.setState({
                    statusVerify: true,
                    code: res.errCode
                });
            } else {
                this.setState({
                    statusVerify: true,
                    code: res && res.errCode ? res.errCode : -1
                });
            }
        }
    }

    render() {

        let { statusVerify, code } = this.state;
        console.log(this.state)

        return (
            <>
                <HomeHeader />

                {
                    statusVerify === false ? (
                        <div
                            style={{
                                height: "80vh",
                                maxWidth: '1440px',
                                margin: '0 auto',
                                padding: '0 20px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <div
                                style={{
                                    paddingTop: "70px",
                                }}
                            >
                                <div
                                    style={{
                                        margin: "0 auto",
                                        fontSize: "22px",
                                        fontWeight: "700",
                                        color: "#fd3c3c",
                                        textTransform: "uppercase",
                                    }}
                                >
                                    <FormattedMessage id='verify.error' />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div
                            style={{
                                height: "80vh",
                                maxWidth: '1440px',
                                margin: '0 auto',
                                padding: '0 20px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <div
                                style={{
                                    paddingTop: "70px",
                                }}
                            >
                                <div
                                    style={{
                                        margin: "0 auto",
                                        fontSize: "22px",
                                        fontWeight: "700",
                                        color: "#45c3d2",
                                        textTransform: "uppercase",
                                        textAlign: "center",
                                    }}
                                >
                                    {
                                        +code === 0 ? (
                                            <FormattedMessage id='verify.success' />
                                        ) : (
                                            <FormattedMessage id='verify.failed' />
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    )
                }

                <Footer />
            </>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(Verify);
