import { Box, Button, TextField, useMediaQuery } from "@mui/material";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import _ from "lodash";
import Header from "../../../components/Header";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { changePasswordService } from "../../../services/userService";

const ChangePassword = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [initialValues, setInitialValues] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const userInfo = useSelector((state) => state.user.userInfo);
  useEffect(() => {}, []);

  const handleChangePassword = async (values) => {
    let res = await changePasswordService({
      id: userInfo.id,
      email: userInfo.email,
      oldPassword: values.oldPassword,
      newPassword: values.newPassword,
      confirmPassword: values.confirmPassword,
    });

    if (res && res.errCode === 0) {
      toast.success(res.errMessage, {
        theme: "colored",
      });
      setInitialValues({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } else {
      toast.error(res.errMessage, {
        theme: "colored",
      });
      setInitialValues({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }
  };

  return (
    <Box m="20px">
      <Header title="CHANGE PASSWORD" subtitle="Welcome to change password" />
      <Box mt="50px">
        <Formik
          initialValues={initialValues}
          enableReinitialize
          onSubmit={handleChangePassword}
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
                  required
                  variant="outlined"
                  type="password"
                  label="Old Password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.oldPassword}
                  name="oldPassword"
                  sx={{ gridColumn: "span 6" }}
                />
                <TextField
                  fullWidth
                  required
                  variant="outlined"
                  type="password"
                  label="New Password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.newPassword}
                  name="newPassword"
                  sx={{ gridColumn: "span 6" }}
                />
                <TextField
                  fullWidth
                  required
                  variant="outlined"
                  type="password"
                  label="Confirm Password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.confirmPassword}
                  name="confirmPassword"
                  sx={{ gridColumn: "span 6" }}
                />
              </Box>
              <Box display="flex" justifyContent="end" mt="20px">
                <Button color="secondary" type="submit" variant="contained">
                  Change
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default ChangePassword;
