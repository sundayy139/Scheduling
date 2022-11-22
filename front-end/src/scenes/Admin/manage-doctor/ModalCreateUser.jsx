import React, { useEffect } from "react";
import * as yup from "yup";
import { Formik } from "formik";
import {
  Box,
  FormControl,
  MenuItem,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Backdrop from "@mui/material/Backdrop";
import { useDispatch, useSelector } from "react-redux";
import {
  createUserStart,
  fetchGenderStart,
  fetchPositionStart,
  fetchRoleStart,
} from "../../../store/actions";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import UploadOutLinedIcon from "@mui/icons-material/UploadOutlined";
import { CommonUtils } from "../../../utils";
import Lightbox from "react-image-lightbox";

const ModalCreateUser = (props) => {
  const genders = useSelector((state) => state.admin.genders);
  const roles = useSelector((state) => state.admin.roles);
  const positions = useSelector((state) => state.admin.positions);

  const [isOpenLightBox, setIsOpenLightBox] = useState(false);
  const [previewImgUrl, setPreviewImgUrl] = useState(false);
  const [avatar, setAvatar] = useState("");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [initialValues, setInitialValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    address: "",
    phoneNumber: "",
    gender: "",
    position: "",
    role: "",
  });

  const dispath = useDispatch();
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const openPreviewImg = () => {
    if (!previewImgUrl) return;
    setIsOpenLightBox(true);
  };

  const handleChangeImg = async (e) => {
    let file = e.target.files[0];

    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      let objectURrl = URL.createObjectURL(file);
      setPreviewImgUrl(objectURrl);
      setAvatar(base64);
    }
  };

  useEffect(() => {
    dispath(fetchGenderStart());
    dispath(fetchRoleStart());
    dispath(fetchPositionStart());
  }, []);

  const phoneRegex =
    /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

  const userSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("You must enter Email"),
    password: yup.string().required("You must enter password"),
    firstName: yup.string().required("You must enter First Name"),
    lastName: yup.string().required("You must enter Last Name"),
    address: yup.string().required("You must enter address"),
    phoneNumber: yup
      .string()
      .matches(phoneRegex, "Phone number is not valid")
      .required("You must enter Phone"),
    role: yup.string().required("Please select role"),
    gender: yup.string().required("Please select gender"),
    position: yup.string().required("Please select position"),
  });

  const toggle = () => {
    props.toggleCreateUserModal();
  };

  const handleCreateNewUser = (values) => {
    dispath(
      createUserStart({
        email: values.email,
        password: values.password,
        firstName: values.firstName,
        lastName: values.lastName,
        address: values.address,
        phoneNumber: values.phoneNumber,
        dateOfBirth: currentDate,
        gender: values.gender,
        roleId: values.role,
        positionId: values.position,
        avatar: avatar,
      })
    );

    setPreviewImgUrl("");
    toggle();
  };

  return (
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
          Create New User
        </Typography>
        <Formik
          validationSchema={userSchema}
          initialValues={initialValues}
          onSubmit={handleCreateNewUser}
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
                  label="Email"
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
                  type="password"
                  label="Password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  name="password"
                  error={!!touched.password && !!errors.password}
                  helperText={touched.password && errors.password}
                  sx={{ gridColumn: "span 6" }}
                />
                <TextField
                  fullWidth
                  required
                  variant="outlined"
                  type="text"
                  label="First Name"
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
                  label="Last Name"
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
                  label="Address"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.address}
                  name="address"
                  error={!!touched.address && !!errors.address}
                  helperText={touched.address && errors.address}
                  sx={{ gridColumn: "span 12" }}
                />
                <TextField
                  fullWidth
                  required
                  input
                  variant="outlined"
                  type="text"
                  label="Phone Number"
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
                  label="Date of Birth"
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
                  label="Gender"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.gender && !!errors.gender}
                  helperText={touched.gender && errors.gender}
                  sx={{ gridColumn: "span 4" }}
                >
                  {genders &&
                    genders.length > 0 &&
                    genders.map((item, index) => {
                      return (
                        <MenuItem key={index} value={item.key}>
                          {item.value}
                        </MenuItem>
                      );
                    })}
                </TextField>
                <TextField
                  select
                  required
                  name="role"
                  value={values.role}
                  label="Role"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.role && !!errors.role}
                  helperText={touched.role && errors.role}
                  sx={{ gridColumn: "span 4" }}
                >
                  {roles &&
                    roles.length > 0 &&
                    roles.map((item, index) => {
                      return (
                        <MenuItem key={index} value={item.key}>
                          {item.value}
                        </MenuItem>
                      );
                    })}
                </TextField>
                <TextField
                  select
                  required
                  name="position"
                  value={values.position}
                  label="Position"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.position && !!errors.position}
                  helperText={touched.position && errors.position}
                  sx={{ gridColumn: "span 4" }}
                >
                  {positions &&
                    positions.length > 0 &&
                    positions.map((item, index) => {
                      return (
                        <MenuItem key={index} value={item.key}>
                          {item.value}
                        </MenuItem>
                      );
                    })}
                </TextField>
                <FormControl
                  sx={{
                    gridColumn: "span 4",
                    border: "1px solid #c4c4c4",
                    borderRadius: "4px",
                  }}
                >
                  <label
                    style={{
                      margin: "0",
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      minHeight: "1.4375em",
                      cursor: "pointer",
                      gridColumn: "span 4",
                      background: "#cac",
                    }}
                    htmlFor="previewImg"
                  >
                    Upload
                    <UploadOutLinedIcon />
                  </label>
                  <TextField
                    type="file"
                    id="previewImg"
                    name="image"
                    onChange={handleChangeImg}
                    hidden
                  ></TextField>
                </FormControl>
                {previewImgUrl && previewImgUrl !== "" ? (
                  <Box
                    sx={{
                      height: "150px",
                      backgroundImage: `url(${previewImgUrl})`,
                      backgroundSize: "contain",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                      cursor: "pointer",
                      gridColumn: "span 12",
                      border: "1px solid #c4c4c4",
                      borderRadius: "4px",
                    }}
                    onClick={openPreviewImg}
                  ></Box>
                ) : (
                  ""
                )}
              </Box>
              <Box display="flex" justifyContent="end" mt="20px">
                <Button color="secondary" type="submit" variant="contained">
                  Create
                </Button>
              </Box>
            </form>
          )}
        </Formik>
        {/* toggle preview img upload */}
        {isOpenLightBox === true && (
          <Lightbox
            mainSrc={previewImgUrl}
            onCloseRequest={() => setIsOpenLightBox(false)}
          />
        )}
      </Box>
    </Modal>
  );
};

export default ModalCreateUser;
