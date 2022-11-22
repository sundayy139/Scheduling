import React, { useEffect } from "react";
import { Formik } from "formik";
import { Box, TextField, Typography, useMediaQuery } from "@mui/material";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Backdrop from "@mui/material/Backdrop";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  editScheduleTimeStart,
  fetchAllScheduleDoctorByDateStart,
} from "../../../store/actions";
import _ from "lodash";

const ModalEditTime = (props) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const dispath = useDispatch();
  const [time, setTime] = useState([]);
  const [initialValues, setInitialValues] = useState({
    maxNumber: "",
    currentNumber: "",
    time: "",
    date: "",
  });

  useEffect(() => {
    setTime(props.dataEdit);
    if (time && !_.isEmpty(time)) {
      setInitialValues({
        date: time.date,
        currentNumber: time.currentNumber,
        maxNumber: time.maxNumber,
        time: time.timeTypeData.value,
        id: time.id,
      });
    }
  }, [time]);

  const toggle = () => {
    props.toggleEditTimeModal();
  };

  const handleSaveChangeTime = async (values) => {
    await dispath(
      editScheduleTimeStart({
        id: values.id,
        maxNumber: values.maxNumber,
      })
    );

    dispath(fetchAllScheduleDoctorByDateStart(time.doctorId, values.date));
    toggle();
  };

  return (
    <>
      <Modal
        open={props.isOpen}
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
            sx={{ textAlign: "center", fontSize: "25px", marginBottom: "50px" }}
          >
            Edit Time
          </Typography>
          <Formik
            initialValues={initialValues}
            enableReinitialize
            onSubmit={handleSaveChangeTime}
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
                    "& > div": {
                      gridColumn: isNonMobile ? undefined : "span 4",
                    },
                  }}
                >
                  <TextField
                    fullWidth
                    disabled
                    required
                    variant="outlined"
                    type="text"
                    label="Range Time"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.time}
                    name="rangeTime"
                    sx={{ gridColumn: "span 6" }}
                  />
                  <TextField
                    fullWidth
                    disabled
                    required
                    variant="outlined"
                    type="text"
                    label="Date"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.date}
                    name="date"
                    sx={{ gridColumn: "span 6" }}
                  />
                  <TextField
                    fullWidth
                    disabled
                    required
                    variant="outlined"
                    type="text"
                    label="Current Patient"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.currentNumber}
                    name="currentNumber"
                    sx={{ gridColumn: "span 6" }}
                  />
                  <TextField
                    fullWidth
                    required
                    variant="outlined"
                    type="text"
                    label="Max Patient"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.maxNumber}
                    name="maxNumber"
                    sx={{ gridColumn: "span 6" }}
                  />
                </Box>
                <Box display="flex" justifyContent="end" mt="20px">
                  <Button color="secondary" type="submit" variant="contained">
                    Save
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      </Modal>
    </>
  );
};

export default ModalEditTime;
