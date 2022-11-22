import React, { useEffect, useState } from 'react';
import { postVerifyBookAppointmentService } from '../../services/userService';
import HomeHeader from './HomeHeader';
import Footer from './Footer';
import { useLocation } from 'react-router';


const Verify = () => {
    const [statusVerify, setStatusVerify] = useState(false);
    const [code, setCode] = useState('');
    const location = useLocation();

    useEffect(() => {

        const postVerify = async () => {
            if (location && location.search) {
                let urlParams = new URLSearchParams(location.search);
                let token = urlParams.get('token');
                let doctorId = urlParams.get('doctorId');
                let res = await postVerifyBookAppointmentService({
                    token: token,
                    doctorId: doctorId
                })

                if (res && res.errCode === 0) {
                    setStatusVerify(true);
                    setCode(res.errCode)
                } else {
                    setStatusVerify(true);
                    setCode(res && res.errCode ? res.errCode : -1)
                }
            }
        }

        postVerify();
    }, [])
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
                                <>Có gì đó không đúng, vui lòng thử lại sau !</>
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
                                        <>Bạn đã xác nhận lịch hẹn thành công, cảm ơn bạn đã đặt lịch tại BookingCare !</>
                                    ) : (
                                        <>Lịch hẹn đã được xác nhận hoặc không tồn tại, vui lòng kiểm tra lại !</>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                )
            }

            <Footer />
        </>
    )
}

export default Verify