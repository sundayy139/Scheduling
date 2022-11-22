import React, { useEffect, useState } from 'react'
import NumberFormat from 'react-number-format'
import { getProfileDoctorService } from '../../../services/userService'

const Bill = (props) => {
    const [dataProfile, setDataProfile] = useState({});

    useEffect(() => {
        const getInfoDoctor = async () => {
            let id = props.doctorId;
            if (id) {
                let res = await getProfileDoctorService(id);
                if (res && res.errCode === 0) {
                    setDataProfile(res.data)
                }
            }

        }

        getInfoDoctor();
    }, [])

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
                        Giá khám:
                    </div>
                    <div>
                        {

                            dataProfile && dataProfile.Doctor_Info &&
                            (
                                <NumberFormat
                                    value={dataProfile.Doctor_Info.priceData.value}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={"VND"}
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
                        Phí đặt lịch:
                    </div>
                    <div>
                        Miễn phí
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
                        Tổng cộng:
                    </div>
                    <div
                        style={{
                            color: "#fe3834"
                        }}
                    >
                        {

                            dataProfile && dataProfile.Doctor_Info &&
                            (
                                <NumberFormat
                                    value={dataProfile.Doctor_Info.priceData.value}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={"VND"}
                                />
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Bill