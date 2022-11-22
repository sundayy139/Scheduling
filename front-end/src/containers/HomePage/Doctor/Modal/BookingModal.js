import React, { useEffect, useState } from 'react';
import ProfileDoctor from '../ProfileDoctor';
import _ from 'lodash';
import { postPatientBookAppointmentService } from '../../../../services/userService';
import { toast } from 'react-toastify';
import Bill from '../Bill';
import moment from 'moment';
import * as yup from "yup"
import LoadingOverlay from 'react-loading-overlay';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGenderStart } from '../../../../store/actions';
import { Backdrop, Box, Button, MenuItem, Modal, TextField, Typography, useMediaQuery } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Formik } from 'formik';

const BookingModal = (props) => {
    const isNonMobile = useMediaQuery("(min-width:600px)");

    const dispath = useDispatch();
    const genders = useSelector((state) => state.admin.genders);
    const [initialValues, setInitialValues] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        address: '',
        email: '',
        reason: '',
        gender: '',
    });
    const [timeString, setTimeString] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [fullName, setFullName] = useState('');


    useEffect(() => {
        dispath(fetchGenderStart());
        buildTimeBooking();
        buildDoctorName();
    }, [props.dataScheduleModal]);

    const toggle = () => {
        props.closeModalBooking()
    }

    const phoneRegex =
        /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

    const userSchema = yup.object().shape({
        email: yup.string().email("Email không tồn tại").required("Bạn phải điền đầy đủ Email"),
        firstName: yup.string().required("Bạn phải điền đầy đủ Họ"),
        lastName: yup.string().required("Bạn phải điền đầy đủ Tên"),
        address: yup.string().required("Bạn phải điền đầy đủ Địa chỉ"),
        reason: yup.string().required("Bạn phải điền đầy đủ Lý do khám"),
        phoneNumber: yup
            .string()
            .matches(phoneRegex, "Số điện thoại không tồn tại")
            .required("Bạn phải điền đầy đủ Số điện thoại"),
        gender: yup.string().required("Bạn phải chọn một giới tính"),
    });

    const buildTimeBooking = () => {
        let dataScheduleModal = props.dataScheduleModal;
        if (dataScheduleModal && !_.isEmpty(dataScheduleModal)) {
            let date = moment(dataScheduleModal.date).format('dddd - DD/MM/YYYY');
            let time = dataScheduleModal.timeTypeData.value;
            setTimeString(`${time} - ${date}`)
        }
    }

    const buildDoctorName = () => {
        let dataScheduleModal = props.dataScheduleModal;
        if (dataScheduleModal && !_.isEmpty(dataScheduleModal)) {
            let name = `${dataScheduleModal.doctorData.lastName} ${dataScheduleModal.doctorData.firstName}`
            setFullName(name)
        }
    }


    const handleConfirmBooking = async (values) => {
        setIsLoading(true);
        const dataScheduleModal = props.dataScheduleModal;
        let res = await postPatientBookAppointmentService({
            firstName: values.firstName,
            lastName: values.lastName,
            phoneNumber: values.phoneNumber,
            address: values.address,
            email: values.email,
            reason: values.reason,
            dateOfBirth: currentDate,
            date: dataScheduleModal.date,
            gender: values.gender,
            doctorId: props.doctorIdFrSchedule,
            timeType: dataScheduleModal.timeType,
            timeString: timeString,
            doctorName: fullName,
        })

        if (res && res.errCode === 0) {
            setIsLoading(false);
            setCurrentDate(new Date());
            toast.success('Booking Appointment Successfully', {
                theme: 'colored'
            })
            toggle();
        } else {
            setIsLoading(false);
            toast.error(res.errMessage, {
                theme: 'colored'
            })
        }
    }

    return (
        <>
            <LoadingOverlay
                active={isLoading}
                spinner
                text="Loading ..."
            ></LoadingOverlay>
            <Modal
                open={props.isOpenModal}
                onClose={toggle}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "70%",
                        bgcolor: "background.paper",
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <Typography
                        sx={{ textAlign: "center", fontSize: "35px", marginBottom: "20px" }}
                    >
                        Đặt lịch khám bệnh
                    </Typography>
                    <Box
                        sx={{ marginBottom: "20px" }}
                    >
                        <ProfileDoctor
                            doctorId={props.doctorIdFrSchedule}
                            isShowDescDoctor={false}
                            isShowLinkToDetail={false}
                            dataScheduleModal={props.dataScheduleModal}
                        />
                    </Box>
                    <Formik
                        validationSchema={userSchema}
                        initialValues={initialValues}
                        onSubmit={handleConfirmBooking}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleBlur,
                            handleChange,
                            handleSubmit,
                        }) => (
                            <form autoComplete="off" onSubmit={handleSubmit}>
                                <Box
                                    display="grid"
                                    gap="30px"
                                    gridTemplateColumns="repeat(12, minmax(0, 1fr))"
                                    sx={{
                                        "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                                    }}
                                >

                                    <TextField
                                        fullWidth
                                        required
                                        variant="outlined"
                                        type="text"
                                        label="Tên"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.firstName}
                                        name="firstName"
                                        error={!!touched.firstName && !!errors.firstName}
                                        helperText={touched.firstName && errors.firstName}
                                        sx={{ gridColumn: "span 6" }}
                                    />
                                    <TextField
                                        fullWidth
                                        required
                                        variant="outlined"
                                        type="text"
                                        label="Họ"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.lastName}
                                        name="lastName"
                                        error={!!touched.lastName && !!errors.lastName}
                                        helperText={touched.lastName && errors.lastName}
                                        sx={{ gridColumn: "span 6" }}
                                    />
                                    <TextField
                                        fullWidth
                                        required
                                        variant="outlined"
                                        type="text"
                                        label="Địa chỉ Email"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.email}
                                        name="email"
                                        error={!!touched.email && !!errors.email}
                                        helperText={touched.email && errors.email}
                                        sx={{ gridColumn: "span 6" }}
                                    />
                                    <TextField
                                        fullWidth
                                        required
                                        variant="outlined"
                                        type="text"
                                        label="Địa chỉ "
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.address}
                                        name="address"
                                        error={!!touched.address && !!errors.address}
                                        helperText={touched.address && errors.address}
                                        sx={{ gridColumn: "span 6" }}
                                    />
                                    <TextField
                                        fullWidth
                                        required
                                        input
                                        variant="outlined"
                                        type="text"
                                        label="Số điện thoại"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.phoneNumber}
                                        name="phoneNumber"
                                        error={!!touched.phoneNumber && !!errors.phoneNumber}
                                        helperText={touched.phoneNumber && errors.phoneNumber}
                                        sx={{ gridColumn: "span 4" }}
                                    />

                                    <DatePicker
                                        name="dateOfBirth"
                                        label="Ngày sinh"
                                        value={currentDate}
                                        onChange={(newValue) => {
                                            setCurrentDate(newValue);
                                        }}
                                        renderInput={(params) => (
                                            <TextField sx={{ gridColumn: "span 4" }} {...params} />
                                        )}
                                    />
                                    <TextField
                                        select
                                        required
                                        name="gender"
                                        value={values.gender}
                                        label="Giới tính"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        error={!!touched.gender && !!errors.gender}
                                        helperText={touched.gender && errors.gender}
                                        sx={{ gridColumn: "span 4" }}
                                    >
                                        {genders &&
                                            genders.length > 0 &&
                                            genders.map((item) => {
                                                return (
                                                    <MenuItem key={item.key} value={item.key}>
                                                        {item.value}
                                                    </MenuItem>
                                                );
                                            })}
                                    </TextField>

                                    <TextField
                                        fullWidth
                                        required
                                        multiline
                                        rows={3}
                                        variant="outlined"
                                        type="text"
                                        label="Lý do khám"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.reason}
                                        name="reason"
                                        error={!!touched.reason && !!errors.reason}
                                        helperText={touched.reason && errors.reason}
                                        sx={{ gridColumn: "span 12" }}
                                    />
                                </Box>
                                <Box
                                    sx={{ marginTop: "20px" }}
                                >
                                    <Bill
                                        doctorId={props.doctorIdFrSchedule}
                                    />
                                </Box>
                                <Box display="flex" justifyContent="end" mt="20px">
                                    <Button color="secondary" type="submit" variant="contained">
                                        Xác nhận
                                    </Button>
                                </Box>
                            </form>
                        )}
                    </Formik>
                </Box>
            </Modal>
        </>
    )
}



export default BookingModal