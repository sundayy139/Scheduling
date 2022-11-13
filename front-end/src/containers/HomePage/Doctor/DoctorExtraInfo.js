import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DoctorExtraInfo.scss';
import { languages } from '../../../utils';
import { getExtraInfoDoctorService } from '../../../services/userService';
import { FormattedMessage } from 'react-intl';
import NumberFormat from 'react-number-format';


class DoctorExtraInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isShow: false,
            extraInfo: {}
        }
    }

    async componentDidMount() {
        if (this.props.doctorIdFrDetail) {
            let res = await getExtraInfoDoctorService(this.props.doctorIdFrDetail);
            if (res && res.errCode === 0) {
                this.setState({
                    extraInfo: res.data
                })
            }
        }
    }

    async componentDidUpdate(prevProps) {
        if (this.props.doctorIdFrDetail !== prevProps.doctorIdFrDetail) {
            let res = await getExtraInfoDoctorService(this.props.doctorIdFrDetail);
            if (res && res.errCode === 0) {
                this.setState({
                    extraInfo: res.data
                })
            }
        }
    }

    showHideDetailsPrice = () => {
        this.setState({
            isShow: !this.state.isShow
        })
    }

    render() {

        let { isShow, extraInfo } = this.state;
        let { lang } = this.props;

        return (
            <div className='extra-info-container'>
                <div className='content-up'>
                    <div className='text-address'>
                        <FormattedMessage id='detail-doctor.examination-address' />
                    </div>
                    <div className='name-clinic'>
                        {extraInfo && extraInfo.Clinic ? extraInfo.Clinic.name : ''}
                    </div>
                    <div className='name-address'>
                        {extraInfo && extraInfo.Clinic ? extraInfo.Clinic.address : ''}
                    </div>
                </div>
                <div className='content-down'>
                    {
                        isShow === false ? (
                            <div className='general-price'>
                                <div className='text-price'>
                                    <FormattedMessage id='detail-doctor.examination-price' />
                                    <span>
                                        {extraInfo && extraInfo.priceData && lang === languages.VI &&
                                            (
                                                <NumberFormat
                                                    value={extraInfo.priceData.value_VI}
                                                    displayType={'text'}
                                                    thousandSeparator={true}
                                                    suffix={"VND"}
                                                />
                                            )
                                        }

                                        {extraInfo && extraInfo.priceData && lang === languages.EN &&
                                            (
                                                <NumberFormat
                                                    value={extraInfo.priceData.value_EN}
                                                    displayType={'text'}
                                                    thousandSeparator={true}
                                                    suffix={"USD"}
                                                />
                                            )
                                        }
                                    </span>
                                </div>
                                <span
                                    className='view-detail'
                                    onClick={() => this.showHideDetailsPrice()}
                                >
                                    <FormattedMessage id='detail-doctor.view-detail' />
                                </span>
                            </div>
                        ) :
                            (
                                <>
                                    <div className='text-price'>
                                        <FormattedMessage id='detail-doctor.examination-price' />
                                    </div>
                                    <div className='content-box'>
                                        <div className='price-box'>
                                            <div className='price'>
                                                <FormattedMessage id='detail-doctor.examination-price' />
                                                <span>
                                                    {extraInfo && extraInfo.priceData && lang === languages.VI &&
                                                        (
                                                            <NumberFormat
                                                                value={extraInfo.priceData.value_VI}
                                                                displayType={'text'}
                                                                thousandSeparator={true}
                                                                suffix={"VND"}
                                                            />
                                                        )
                                                    }

                                                    {extraInfo && extraInfo.priceData && lang === languages.EN &&
                                                        (
                                                            <NumberFormat
                                                                value={extraInfo.priceData.value_EN}
                                                                displayType={'text'}
                                                                thousandSeparator={true}
                                                                suffix={"USD"}
                                                            />
                                                        )
                                                    }
                                                </span>
                                            </div>
                                            <div className='text'>
                                                {extraInfo && extraInfo.note ? extraInfo.note : ''}
                                            </div>
                                        </div>
                                        <div className='payment-box'>
                                            <FormattedMessage id='detail-doctor.payment-method' />
                                            {extraInfo && extraInfo.paymentData && lang === languages.VI ? extraInfo.paymentData.value_VI : extraInfo.paymentData.value_EN}
                                        </div>
                                    </div>
                                    <span
                                        className='hide-detail'
                                        onClick={() => this.showHideDetailsPrice()}
                                    >
                                        <FormattedMessage id='detail-doctor.hide-detail' />
                                    </span>
                                </>
                            )
                    }
                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfo);
