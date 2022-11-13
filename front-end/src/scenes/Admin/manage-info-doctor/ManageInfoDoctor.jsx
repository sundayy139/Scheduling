import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  TextField,
  useMediaQuery,
} from "@mui/material";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createDetailDoctorStart,
  fetchAllDoctorsStart,
  fetchRequiredDoctorInfoStart,
} from "../../../store/actions";
import { getDetailDoctorService } from "../../../services/userService";
import Header from "../../../components/Header";
import { CRUDActions } from "../../../utils";

const mdParser = new MarkdownIt();
const ManageInfoDoctor = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [initialValues, setInitialValues] = useState({
    selectedClinic: "",
    selectedSpecialty: "",
    selectedDoctor: "",
    selectedPrice: "",
    selectedProvince: "",
    selectedPayment: "",
    contentHTML: "",
    contentMarkdown: "",
    oldData: false,
  });
  const [dataSelect, setDataSelect] = useState({
    listDoctor: [],
    listPrice: [],
    listPayment: [],
    listProvince: [],
    listSpecialty: [],
    listClinic: [],
  });
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [inputs, setInputs] = useState({
    description: "",
    note: "",
  });

  const dispath = useDispatch();
  const allDoctors = useSelector((state) => state.admin.doctors);
  const allRequiredDoctorInfo = useSelector(
    (state) => state.admin.allRequiredData
  );

  useEffect(() => {
    dispath(fetchRequiredDoctorInfoStart());
    dispath(fetchAllDoctorsStart());
    buildDataSelect();
  }, []);

  const buildDataSelect = () => {
    const { resPrice, resPayment, resProvince, resSpecialty, resClinic } =
      allRequiredDoctorInfo;
    const dataSelect = buildInputSelect(allDoctors, "USER");
    const dataSelectPrice = buildInputSelect(resPrice, "PRICE");
    const dataSelectPayment = buildInputSelect(resPayment, "PAYMENT");
    const dataSelectProvince = buildInputSelect(resProvince, "PROVINCE");
    const dataSelectSpecialty = buildInputSelect(resSpecialty, "SPECIALTY");
    const dataSelectClinic = buildInputSelect(resClinic, "CLINIC");

    setDataSelect({
      listDoctor: dataSelect,
      listPrice: dataSelectPrice,
      listPayment: dataSelectPayment,
      listProvince: dataSelectProvince,
      listSpecialty: dataSelectSpecialty,
      listClinic: dataSelectClinic,
    });
  };

  const buildInputSelect = (inputData, type) => {
    let result = [];
    if (inputData && inputData.length > 0) {
      inputData.map((item) => {
        if (type === "USER") {
          let object = {};
          let label = `${item.firstName} ${item.lastName}`;
          object.label = label;
          object.value = item.id;
          result.push(object);
        }
        if (type === "PRICE") {
          let object = {};
          let label = `${item.value_VI} VND`;
          object.label = label;
          object.value = item.key;
          result.push(object);
        }

        if (type === "PAYMENT" || type === "PROVINCE") {
          let object = {};
          let label = `${item.value_VI}`;
          object.label = label;
          object.value = item.key;
          result.push(object);
        }

        if (type === "SPECIALTY" || type === "CLINIC") {
          let object = {};
          object.label = item.name;
          object.value = item.id;
          result.push(object);
        }
      });
    }
    return result;
  };

  const handleSelectChange = async (event, value) => {
    const { listPrice, listPayment, listProvince, listSpecialty, listClinic } =
      dataSelect;
    setSelectedDoctor(value);
    const res = await getDetailDoctorService(value.value);
    if (
      res &&
      res.errCode === 0 &&
      res.data &&
      res.data.Doctor_Info &&
      res.data.Doctor_Info.description !== null
    ) {
      let paymentId = "",
        priceId = "",
        provinceId = "",
        specialtyId = "",
        clinicId = "",
        note = "",
        selectedPrice = "",
        selectedProvince = "",
        selectedPayment = "",
        selectedSpecialty = "",
        selectedClinic = "",
        contentHTML = "",
        contentMarkdown = "",
        description = "";

      if (res.data.Doctor_Info) {
        paymentId = res.data.Doctor_Info.paymentId;
        priceId = res.data.Doctor_Info.priceId;
        provinceId = res.data.Doctor_Info.provinceId;
        specialtyId = res.data.Doctor_Info.specialtyId;
        clinicId = res.data.Doctor_Info.clinicId;
        note = res.data.Doctor_Info.note;
        description = res.data.Doctor_Info.description;
        contentMarkdown = res.data.Doctor_Info.contentMarkdown;
        contentHTML = res.data.Doctor_Info.contentHTML;

        selectedPrice = listPrice.find((item) => {
          return item && item.value === priceId;
        });

        selectedPayment = listPayment.find((item) => {
          return item && item.value === paymentId;
        });

        selectedProvince = listProvince.find((item) => {
          return item && item.value === provinceId;
        });

        selectedSpecialty = listSpecialty.find((item) => {
          return item && item.value === specialtyId;
        });

        selectedClinic = listClinic.find((item) => {
          return item && item.value === clinicId;
        });
      }

      setInputs({
        description: description,
        note: note,
      });

      setInitialValues({
        contentHTML: contentHTML,
        contentMarkdown: contentMarkdown,
        selectedPrice: selectedPrice,
        selectedProvince: selectedProvince,
        selectedPayment: selectedPayment,
        selectedSpecialty: selectedSpecialty,
        selectedClinic: selectedClinic,
        oldData: true,
      });
    } else {
      setInitialValues({
        contentHTML: "",
        contentMarkdown: "",
        description: "",
        selectedPrice: "",
        selectedProvince: "",
        selectedPayment: "",
        selectedSpecialty: "",
        selectedClinic: "",
        note: "",
        oldData: false,
      });

      setInputs({
        description: "",
        note: "",
      });
    }
  };

  const handleSelectChangeInfo = (event, value) => {
    setInitialValues({
      ...initialValues,
      [event.target.id.split("-")[0]]: value,
    });
  };
  const handleEditorChange = ({ html, text }) => {
    setInitialValues({
      ...initialValues,
      contentMarkdown: text,
      contentHTML: html,
    });
  };

  const handleChangeInput = (e, value) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateDetailDoctor = (values) => {
    const oldData = initialValues.oldData;
    dispath(
      createDetailDoctorStart({
        contentHTML: values.contentHTML,
        contentMarkdown: values.contentMarkdown,
        description: inputs.description,
        doctorId: selectedDoctor.value,
        selectedPrice: values.selectedPrice.value,
        selectedProvince: values.selectedProvince.value,
        selectedPayment: values.selectedPayment.value,
        selectedClinic: values.selectedClinic.value,
        selectedSpecialty: values.selectedSpecialty.value,
        note: inputs.note,
        actions: oldData === true ? CRUDActions.EDIT : CRUDActions.CREATE,
      })
    );
  };

  return (
    <Box m="20px">
      <Header
        title="MANAGE DOCTOR INFOMATION"
        subtitle="Welcome to Manage Doctor Infomation"
      />
      <Box mt="40px">
        <Formik
          enableReinitialize
          initialValues={initialValues}
          onSubmit={handleCreateDetailDoctor}
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
                <Autocomplete
                  fullWidth
                  required
                  sx={{ gridColumn: "span 6" }}
                  getOptionLabel={
                    dataSelect && dataSelect.listDoctor
                      ? dataSelect.listDoctor.value
                      : ""
                  }
                  value={selectedDoctor}
                  options={dataSelect.listDoctor}
                  noOptionsText={"No doctor available"}
                  onChange={handleSelectChange}
                  renderInput={(params) => (
                    <TextField
                      fullWidth
                      label="Choose Doctor"
                      required
                      sx={{ gridColumn: "span 6" }}
                      {...params}
                    />
                  )}
                ></Autocomplete>

                <TextField
                  fullWidth
                  required
                  variant="outlined"
                  type="text"
                  label="Description"
                  onBlur={handleBlur}
                  onChange={handleChangeInput}
                  multiline
                  rows={5}
                  value={inputs.description}
                  name="description"
                  sx={{ gridColumn: "span 6" }}
                />
                <Autocomplete
                  fullWidth
                  id="selectedPrice"
                  name="selectedPrice"
                  value={values.selectedPrice}
                  required
                  sx={{ gridColumn: "span 4" }}
                  getOptionLabel={
                    dataSelect && dataSelect.listPrice
                      ? dataSelect.listPrice.value
                      : ""
                  }
                  options={dataSelect.listPrice}
                  noOptionsText={"No price available"}
                  onChange={handleSelectChangeInfo}
                  renderInput={(params) => (
                    <TextField
                      fullWidth
                      label="Choose Price"
                      required
                      sx={{ gridColumn: "span 4" }}
                      {...params}
                    />
                  )}
                ></Autocomplete>
                <Autocomplete
                  fullWidth
                  id="selectedPayment"
                  name="selectedPayment"
                  value={values.selectedPayment}
                  required
                  sx={{ gridColumn: "span 4" }}
                  getOptionLabel={
                    dataSelect && dataSelect.listPayment
                      ? dataSelect.listPayment.value
                      : ""
                  }
                  options={dataSelect.listPayment}
                  noOptionsText={"No payment method available"}
                  onChange={handleSelectChangeInfo}
                  renderInput={(params) => (
                    <TextField
                      fullWidth
                      label="Choose Payment Method"
                      required
                      sx={{ gridColumn: "span 4" }}
                      {...params}
                    />
                  )}
                ></Autocomplete>
                <Autocomplete
                  fullWidth
                  id="selectedProvince"
                  name="selectedProvince"
                  value={values.selectedProvince}
                  required
                  sx={{ gridColumn: "span 4" }}
                  getOptionLabel={
                    dataSelect && dataSelect.listProvince
                      ? dataSelect.listProvince.value
                      : ""
                  }
                  options={dataSelect.listProvince}
                  noOptionsText={"No province available"}
                  onChange={handleSelectChangeInfo}
                  renderInput={(params) => (
                    <TextField
                      fullWidth
                      label="Choose Province"
                      required
                      sx={{ gridColumn: "span 4" }}
                      {...params}
                    />
                  )}
                ></Autocomplete>
                <Autocomplete
                  fullWidth
                  id="selectedSpecialty"
                  name="selectedSpecialty"
                  value={values.selectedSpecialty}
                  required
                  sx={{ gridColumn: "span 4" }}
                  getOptionLabel={
                    dataSelect && dataSelect.listSpecialty
                      ? dataSelect.listSpecialty.value
                      : ""
                  }
                  options={dataSelect.listSpecialty}
                  noOptionsText={"No specialty available"}
                  onChange={handleSelectChangeInfo}
                  renderInput={(params) => (
                    <TextField
                      fullWidth
                      label="Choose Specialty"
                      required
                      sx={{ gridColumn: "span 4" }}
                      {...params}
                    />
                  )}
                ></Autocomplete>
                <Autocomplete
                  fullWidth
                  id="selectedClinic"
                  name="selectedClinic"
                  value={values.selectedClinic}
                  required
                  sx={{ gridColumn: "span 4" }}
                  getOptionLabel={
                    dataSelect && dataSelect.listClinic
                      ? dataSelect.listClinic.value
                      : ""
                  }
                  options={dataSelect.listClinic}
                  noOptionsText={"No clinic available"}
                  onChange={handleSelectChangeInfo}
                  renderInput={(params) => (
                    <TextField
                      fullWidth
                      label="Choose Clinic"
                      required
                      sx={{ gridColumn: "span 4" }}
                      {...params}
                    />
                  )}
                ></Autocomplete>
                <TextField
                  fullWidth
                  required
                  multiline
                  rows={3}
                  variant="outlined"
                  type="text"
                  label="Note"
                  onBlur={handleBlur}
                  onChange={handleChangeInput}
                  value={inputs.note}
                  name="note"
                  sx={{ gridColumn: "span 4" }}
                />
                <FormControl
                  fullWidth
                  label="Choose Clinic"
                  required
                  sx={{ gridColumn: "span 12" }}
                >
                  <MdEditor
                    style={{ height: "500px" }}
                    renderHTML={(text) => mdParser.render(text)}
                    onChange={handleEditorChange}
                    value={values.contentMarkdown}
                  />
                </FormControl>
              </Box>
              <Box display="flex" justifyContent="end" mt="20px">
                <Button color="secondary" type="submit" variant="contained">
                  {initialValues.oldData === true ? "Save Changes" : "Create"}
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default ManageInfoDoctor;
