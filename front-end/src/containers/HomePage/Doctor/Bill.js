import React, { useEffect, useState } from 'react'
import NumberFormat from 'react-number-format'
import { getProfileDoctorService } from '../../../services/userService'
import { languages } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';

const Bill = (props) => {
    const [dataProfile, setDataProfile] = useState({});
    const lang = useSelector((state) => state.app.language);

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

    console.log(props);

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
    )
}

export default Bill