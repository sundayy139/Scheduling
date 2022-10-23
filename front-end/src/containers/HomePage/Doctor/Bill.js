import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import './DoctorSchedule.scss';
import { languages } from '../../../utils';
import './ProfileDoctor.scss';
import { getProfileDoctorService } from '../../../services/userService'
import NumberFormat from 'react-number-format';
import { FormattedMessage } from 'react-intl';
import _ from 'lodash';
import localization from 'moment/locale/vi';


class Bill extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataProfile: {}
        }
    }

    async componentDidMount() {
        let data = await this.getInfoDoctor(this.props.doctorId);
        this.setState({
            dataProfile: data
        })
    }

    getInfoDoctor = async (id) => {
        let result = [];
        if (id) {
            let res = await getProfileDoctorService(id);
            if (res && res.errCode === 0) {
                result = res.data;
            }
        }
        return result;
    }

    componentDidUpdate(prevProps) {

    }


    render() {
        let { lang } = this.props;
        let { dataProfile } = this.state;

        return (
            <>
                <div
                    style={{
                        borderRadius: "5px",
                        backgroundColor: "#f5f5f5",
                        padding: "20px",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginBottom: "10px"
                        }}
                    >
                        <div>
                            <FormattedMessage id="modal-booking.examination-price" />
                        </div>
                        <div>
                            {

                                dataProfile && dataProfile.Doctor_Info && lang === languages.VI &&
                                (
                                    <NumberFormat
                                        value={dataProfile.Doctor_Info.priceData.value_VI}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        suffix={"VND"}
                                    />
                                )
                            }
                            {
                                dataProfile && dataProfile.Doctor_Info && lang === languages.EN &&
                                (
                                    <NumberFormat
                                        value={dataProfile.Doctor_Info.priceData.value_EN}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        suffix={"USD"}
                                    />
                                )
                            }
                        </div>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginBottom: "10px",
                        }}
                    >
                        <div>
                            <FormattedMessage id="modal-booking.booking-fee" />
                        </div>
                        <div>
                            <FormattedMessage id="modal-booking.free" />
                        </div>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            paddingTop: "15px",
                            borderTop: "1px solid #ccc"
                        }}
                    >
                        <div>
                            <FormattedMessage id="modal-booking.total" />
                        </div>
                        <div
                            style={{
                                color: "#fe3834"
                            }}
                        >
                            {

                                dataProfile && dataProfile.Doctor_Info && lang === languages.VI &&
                                (
                                    <NumberFormat
                                        value={dataProfile.Doctor_Info.priceData.value_VI}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        suffix={"VND"}
                                    />
                                )
                            }
                            {
                                dataProfile && dataProfile.Doctor_Info && lang === languages.EN &&
                                (
                                    <NumberFormat
                                        value={dataProfile.Doctor_Info.priceData.value_EN}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        suffix={"USD"}
                                    />
                                )
                            }
                        </div>
                    </div>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Bill);
