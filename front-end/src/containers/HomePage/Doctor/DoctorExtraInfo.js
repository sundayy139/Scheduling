import React, { useEffect, useState } from 'react';
import { getExtraInfoDoctorService } from '../../../services/userService';
import NumberFormat from 'react-number-format';
import './DoctorExtraInfo.scss';

const DoctorExtraInfo = (props) => {

    const [isShow, setIsShow] = useState(false)
    const [extraInfo, setExtraInfo] = useState({});
    const [id, setId] = useState()

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
                        Địa chỉ khám:
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
                                    Giá khám:
                                    <span>
                                        {extraInfo && extraInfo.priceData &&
                                            (
                                                <NumberFormat
                                                    value={extraInfo.priceData.value}
                                                    displayType={'text'}
                                                    thousandSeparator={true}
                                                    suffix={"VND"}
                                                />
                                            )
                                        }
                                    </span>
                                </div>
                                <span
                                    className='view-detail'
                                    onClick={() => showHideDetailsPrice()}
                                >
                                    Xem chi tiết
                                </span>
                            </div>
                        ) :
                            (
                                <>
                                    <div className='text-price'>
                                        giá khám:
                                    </div>
                                    <div className='content-box'>
                                        <div className='price-box'>
                                            <div className='price'>
                                                Giá khám:
                                                <span>
                                                    {extraInfo && extraInfo.priceData &&
                                                        (
                                                            <NumberFormat
                                                                value={extraInfo.priceData.value}
                                                                displayType={'text'}
                                                                thousandSeparator={true}
                                                                suffix={"VND"}
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
                                            Phương thức thanh toán:
                                            <span>
                                                {extraInfo && extraInfo.paymentData ? extraInfo.paymentData.value : ''}
                                            </span>
                                        </div>
                                    </div>
                                    <span
                                        className='hide-detail'
                                        onClick={() => showHideDetailsPrice()}
                                    >
                                        Thu gọn
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