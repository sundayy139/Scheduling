// import React, { Component } from 'react';



// class DoctorExtraInfo extends Component {

//     constructor(props) {
//         super(props);
//         this.state = {

//         }
//     }

//     async componentDidMount() {

//     }

//     async componentDidUpdate(prevProps) {
//         if (this.props.doctorIdFrDetail !== prevProps.doctorIdFrDetail) {
//             let res = await getExtraInfoDoctorService(this.props.doctorIdFrDetail);
//             if (res && res.errCode === 0) {
//                 this.setState({
//                     extraInfo: res.data
//                 })
//             }
//         }
//     }



//     render() {

//         let { isShow, extraInfo } = this.state;
//         let { lang } = this.props;

//         return (

//         );
//     }

// }

// const mapStateToProps = state => {
//     return {
//         lang: state.app.language,
//     };
// };

// const mapDispatchToProps = dispatch => {
//     return {
//     };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfo);


import React, { useEffect, useState } from 'react';
import { languages } from '../../../utils';
import { getExtraInfoDoctorService } from '../../../services/userService';
import { FormattedMessage } from 'react-intl';
import NumberFormat from 'react-number-format';
import { useSelector } from 'react-redux';
import './DoctorExtraInfo.scss';

const DoctorExtraInfo = (props) => {

    const [isShow, setIsShow] = useState(false)
    const [extraInfo, setExtraInfo] = useState({});
    const [id, setId] = useState()
    const lang = useSelector((state) => state.app.language);


    useEffect(() => {
        const getExtraInfoDoctor = async () => {
            setId(props.doctorIdFrDetail)
            if (id) {
                let res = await getExtraInfoDoctorService(id);
                if (res && res.errCode === 0) {
                    setExtraInfo(res.data)
                }
            }
        }

        getExtraInfoDoctor();
    }, [id])


    const showHideDetailsPrice = () => {
        setIsShow(!isShow)
    }

    return (
        <>
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
                                    onClick={() => showHideDetailsPrice()}
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
                                        onClick={() => showHideDetailsPrice()}
                                    >
                                        <FormattedMessage id='detail-doctor.hide-detail' />
                                    </span>
                                </>
                            )
                    }
                </div>
            </div>
        </>
    )
}

export default DoctorExtraInfo