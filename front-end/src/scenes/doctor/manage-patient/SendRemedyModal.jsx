import {
  Backdrop,
  Box,
  Button,
  FormControl,
  Modal,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { CommonUtils } from "../../../utils";
import UploadOutLinedIcon from "@mui/icons-material/UploadOutlined";
import Lightbox from "react-image-lightbox";
import _ from "lodash";

const SendRemedyModal = (props) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const toggle = () => {
    props.toggleSendRemedyModal();
  };

  const [initialValues, setInitialValues] = useState({
    email: "",
  });
  const [isOpenLightBox, setIsOpenLightBox] = useState(false);
  const [previewImgUrl, setPreviewImgUrl] = useState(false);
  const [avatar, setAvatar] = useState("");
  const [dataSend, setDataSend] = useState([]);

  useEffect(() => {
    setDataSend(props.dataSend);
    if (dataSend && !_.isEmpty(dataSend)) {
      setInitialValues({
        email: dataSend.email,
      });
    }
  }, [dataSend]);

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

  const handleSendRemedy = (values) => {
    props.sendRemedy({
      email: values.email,
      image: avatar,
      doctorId: dataSend.doctorId,
      patientId: dataSend.patientId,
      timeType: dataSend.timeType,
      fullName: dataSend.fullName,
    });
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
            Send Bill/Remedy
          </Typography>
          <Formik
            initialValues={initialValues}
            enableReinitialize
            onSubmit={handleSendRemedy}
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
                    type="text"
                    label="Email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    name="email"
                    sx={{ gridColumn: "span 6" }}
                  />
                  <FormControl
                    sx={{
                      gridColumn: "span 6",
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
                      Upload Bill/Remedy
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
                    Send
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
          {isOpenLightBox === true && (
            <Lightbox
              mainSrc={previewImgUrl}
              onCloseRequest={() => setIsOpenLightBox(false)}
            />
          )}
        </Box>
      </Modal>
    </>
  );
};

export default SendRemedyModal;
