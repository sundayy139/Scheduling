import React, { useEffect, useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  IconButton,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Formik } from "formik";
import MdEditor from "react-markdown-editor-lite";
import MarkdownIt from "markdown-it";
import UploadOutLinedIcon from "@mui/icons-material/UploadOutlined";
import EditOutLinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutLinedIcon from "@mui/icons-material/DeleteOutlined";
import AddOutLinedIcon from "@mui/icons-material/AddOutlined";
import Header from "../../../components/Header";
import { CommonUtils, CRUDActions } from "../../../utils";
import Lightbox from "react-image-lightbox";
import { useDispatch, useSelector } from "react-redux";
import {
  createClinicStart,
  deleteClinicStart,
  editClinicStart,
  fetchAllClinicStart,
} from "../../../store/actions";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import { useTheme } from "@emotion/react";
import ConfirmDialog from "../../share/dialog/ConfirmDialog";

const mdParser = new MarkdownIt();

const ManageClinic = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispath = useDispatch();
  const clinicList = useSelector((state) => state.admin.clinics);
  const allRequiredDoctorInfo = useSelector(
    (state) => state.admin.allRequiredData
  );
  const [isOpenThump, setIsOpenThump] = useState(false);
  const [isOpenLogo, setIsOpenLogo] = useState(false);
  const [previewImgUrl, setPreviewImgUrl] = useState(false);
  const [previewLogoUrl, setPreviewLogoUrl] = useState(false);
  const [thump, setThump] = useState();
  const [logo, setLogo] = useState();
  const [idClinicEdit, setIdClinicEdit] = useState("");
  const [isShowForm, setIsShowForm] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });

  const [initialValues, setInitialValues] = useState({
    descHTML: "",
    descMarkdown: "",
    clinicName: "",
    address: "",
    selectedProvince: "",
    action: CRUDActions.CREATE,
  });

  const [inputs, setInputs] = useState({
    clinicName: "",
    clinicAddress: "",
  });
  const [dataSelect, setDataSelect] = useState({
    listProvince: [],
  });
  useEffect(() => {
    dispath(fetchAllClinicStart());
    buildDataSelect();
  }, []);

  const buildDataSelect = () => {
    const { resProvince } = allRequiredDoctorInfo;
    const dataSelectProvince = buildInputSelect(resProvince, "PROVINCE");
    setDataSelect({
      listProvince: dataSelectProvince,
    });
  };

  const buildInputSelect = (inputData, type) => {
    let result = [];
    if (inputData && inputData.length > 0) {
      inputData.map((item) => {
        if (type === "PROVINCE") {
          let object = {};
          let label = `${item.value_VI}`;
          object.label = label;
          object.value = item.key;
          result.push(object);
        }
      });
    }
    return result;
  };

  if (clinicList && clinicList.length > 0) {
    clinicList.map((item, i) => {
      if (item && item.logo) {
        item.lg = new Buffer(item.logo, "base64").toString("binary");
      }
    });

    if (clinicList && clinicList.length > 0) {
      clinicList.map((item, i) => {
        if (item && item.image) {
          item.thump = new Buffer(item.image, "base64").toString("binary");
        }
      });
    }
  }

  const handleSelectChangeInfo = (event, value) => {
    setInitialValues({
      ...initialValues,
      [event.target.id.split("-")[0]]: value,
    });
  };

  const handleEditorChange = ({ html, text }) => {
    setInitialValues({
      ...initialValues,
      descMarkdown: text,
      descHTML: html,
    });
  };

  const handleChangeInput = (e, value) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeImg = async (e) => {
    let file = e.target.files[0];

    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      let objectURrl = URL.createObjectURL(file);
      setPreviewImgUrl(objectURrl);
      setThump(base64);
    }
  };

  const openPreviewImg = () => {
    if (!previewImgUrl) return;
    setIsOpenThump(true);
  };

  const handleChangeLogo = async (e) => {
    let file = e.target.files[0];

    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      let objectURrl = URL.createObjectURL(file);
      setPreviewLogoUrl(objectURrl);
      setLogo(base64);
    }
  };

  const openPreviewLogo = () => {
    if (!previewLogoUrl) return;
    setIsOpenLogo(true);
  };

  const handleCreateNewClinic = (values) => {
    dispath(
      createClinicStart({
        name: inputs.clinicName,
        address: inputs.clinicAddress,
        lg: logo,
        avatar: thump,
        descHTML: values.descHTML,
        descMarkdown: values.descMarkdown,
        provinceId: values.selectedProvince.value,
      })
    );

    setInitialValues({
      selectedProvince: "",
      descHTML: "",
      descMarkdown: "",
      action: CRUDActions.CREATE,
    });
    setPreviewImgUrl("");
    setPreviewLogoUrl("");
    setInputs({
      clinicName: "",
      clinicAddress: "",
    });
  };

  const handleAddNewClinic = () => {
    buildDataSelect();

    setIsShowForm(true);
    setIdClinicEdit("");
    setInitialValues({
      selectedProvince: "",
      descHTML: "",
      descMarkdown: "",
      action: CRUDActions.CREATE,
    });
    setPreviewImgUrl("");
    setPreviewLogoUrl("");
    setInputs({
      clinicName: "",
      clinicAddress: "",
    });
  };

  const handleCancel = () => {
    setIsShowForm(false);
  };

  const handleDeleteClinic = (id) => {
    dispath(deleteClinicStart(id));
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
  };

  const handleEditClinic = (data) => {
    let selectedProvince = dataSelect.listProvince.find((item) => {
      return item && item.value === data.provinceId;
    });
    setIsShowForm(true);
    setInputs({
      clinicName: data.name,
      clinicAddress: data.address,
    });
    setIdClinicEdit(data.id);
    setInitialValues({
      selectedProvince: selectedProvince,
      descHTML: data.descHTML,
      descMarkdown: data.descMarkdown,
      action: CRUDActions.EDIT,
    });
    setPreviewImgUrl(data.thump);
    setPreviewLogoUrl(data.lg);
  };

  const handleSaveChangeClinic = (values) => {
    dispath(
      editClinicStart({
        id: idClinicEdit,
        name: inputs.clinicName,
        address: inputs.clinicAddress,
        lg: logo,
        avatar: thump,
        descHTML: values.descHTML,
        descMarkdown: values.descMarkdown,
        provinceId: values.selectedProvince.value,
      })
    );
  };

  const columns = [
    {
      field: "actions",
      headerName: "Action",
      renderCell: (params) => {
        return (
          <Box display="flex">
            <IconButton
              onClick={() => {
                handleEditClinic(params.row);
              }}
            >
              <EditOutLinedIcon />
            </IconButton>
            <IconButton
              onClick={() => {
                setConfirmDialog({
                  isOpen: true,
                  title: "Are you sure you want to delete record ?",
                  subTitle: "You can't undo this operation",
                  onConfirm: () => {
                    handleDeleteClinic(params.row.id);
                  },
                });
              }}
            >
              <DeleteOutLinedIcon />
            </IconButton>
          </Box>
        );
      },
      flex: 1,
      minWidth: 150,
    },
    {
      field: "id",
      headerName: "ID",
    },
    {
      field: "lg",
      headerName: "Logo",
      renderCell: (params) => {
        return (
          <img
            src={params.row.lg}
            style={{ width: "35px", height: "35px", borderRadius: "50%" }}
          />
        );
      },
      flex: 1,
      minWidth: 100,
    },
    {
      field: "thump",
      headerName: "Thump",
      renderCell: (params) => {
        return <img src={params.row.thump} style={{ height: "35px" }} />;
      },
      flex: 1,
      minWidth: 150,
    },
    {
      field: "name",
      headerName: "Clinic Name",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "address",
      headerName: "Clinic Address",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "createdAt",
      headerName: "Created At",
      flex: 1,
      minWidth: 180,
    },
    {
      field: "updatedAt",
      headerName: "Updated At",
      flex: 1,
      minWidth: 180,
    },
  ];
  return (
    <Box m="20px">
      <Header title="MANAGE CLINIC" subtitle="Welcome to Manage Clinic" />
      <Box>
        <Typography
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            marginBottom: "30px",
          }}
        >
          Add New Clinic
          <IconButton onClick={handleAddNewClinic}>
            <AddOutLinedIcon />
          </IconButton>
        </Typography>
        {isShowForm ? (
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={
              initialValues.action === CRUDActions.EDIT
                ? handleSaveChangeClinic
                : handleCreateNewClinic
            }
          >
            {({ values, errors, touched, handleBlur, handleSubmit }) => (
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
                    label="Clinic Name"
                    onBlur={handleBlur}
                    onChange={handleChangeInput}
                    value={inputs.clinicName}
                    name="clinicName"
                    sx={{ gridColumn: "span 6" }}
                  />
                  <TextField
                    fullWidth
                    required
                    variant="outlined"
                    type="text"
                    label="Clinic address"
                    onBlur={handleBlur}
                    onChange={handleChangeInput}
                    value={inputs.clinicAddress}
                    name="clinicAddress"
                    sx={{ gridColumn: "span 6" }}
                  />
                  <Autocomplete
                    fullWidth
                    id="selectedProvince"
                    name="selectedProvince"
                    value={values.selectedProvince}
                    required
                    sx={{ gridColumn: "span 6" }}
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

                  {/* Change Thump */}
                  <FormControl
                    sx={{
                      gridColumn: "span 3",
                      border: "1px solid #c4c4c4",
                      borderRadius: "4px",
                    }}
                  >
                    <label
                      style={{
                        margin: "0",
                        width: "100%",
                        height: "100%",
                        maxHeight: "50px",
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
                      Upload Thump
                      <UploadOutLinedIcon />
                    </label>
                    <TextField
                      type="file"
                      id="previewImg"
                      name="image"
                      onChange={handleChangeImg}
                      hidden
                    ></TextField>
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
                          margin: "5px",
                          borderRadius: "4px",
                        }}
                        onClick={openPreviewImg}
                      ></Box>
                    ) : (
                      ""
                    )}
                  </FormControl>

                  {/* Change logo */}
                  <FormControl
                    sx={{
                      gridColumn: "span 3",
                      border: "1px solid #c4c4c4",
                      borderRadius: "4px",
                    }}
                  >
                    <label
                      style={{
                        margin: "0",
                        width: "100%",
                        height: "100%",
                        maxHeight: "50px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        minHeight: "1.4375em",
                        cursor: "pointer",
                        gridColumn: "span 4",
                        background: "#cac",
                      }}
                      htmlFor="previewLogo"
                    >
                      Upload logo
                      <UploadOutLinedIcon />
                    </label>
                    <TextField
                      type="file"
                      id="previewLogo"
                      name="image"
                      onChange={handleChangeLogo}
                      hidden
                    ></TextField>
                    {previewLogoUrl && previewLogoUrl !== "" ? (
                      <Box
                        sx={{
                          height: "150px",
                          backgroundImage: `url(${previewLogoUrl})`,
                          backgroundSize: "contain",
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "center",
                          cursor: "pointer",
                          gridColumn: "span 12",
                          margin: "5px",
                          borderRadius: "4px",
                        }}
                        onClick={openPreviewLogo}
                      ></Box>
                    ) : (
                      ""
                    )}
                  </FormControl>

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
                      value={values.descMarkdown}
                    />
                  </FormControl>
                </Box>
                <Box
                  display="flex"
                  justifyContent="end"
                  alignItems="center"
                  mt="20px"
                >
                  <Button
                    color="warning"
                    variant="contained"
                    sx={{
                      marginRight: "10px",
                    }}
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                  <Button color="secondary" type="submit" variant="contained">
                    {initialValues.action === CRUDActions.EDIT
                      ? "Save Changes"
                      : "Create"}
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        ) : (
          ""
        )}
        {/* toggle preview img upload */}
        {isOpenThump === true && (
          <Lightbox
            mainSrc={previewImgUrl}
            onCloseRequest={() => setIsOpenThump(false)}
          />
        )}
        {/* toggle preview img upload */}
        {isOpenLogo === true && (
          <Lightbox
            mainSrc={previewLogoUrl}
            onCloseRequest={() => setIsOpenLogo(false)}
          />
        )}
      </Box>
      <Box
        mt="50px"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-root .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-root .MuiDataGrid-cell:focus":
            {
              outline: "none",
            },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={clinicList}
          columns={columns}
          scrollbarSize={1}
          autoHeight={true}
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
          components={{ Toolbar: GridToolbar }}
        />
        <ConfirmDialog
          confirmDialog={confirmDialog}
          setConfirmDialog={setConfirmDialog}
        />
      </Box>
    </Box>
  );
};

export default ManageClinic;
