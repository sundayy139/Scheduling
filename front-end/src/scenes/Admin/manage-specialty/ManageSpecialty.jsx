import React, { useEffect, useState } from "react";
import {
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
  createSpecialtyStart,
  deleteSpecialtyStart,
  editSpecialtyStart,
  fetchAllSpecitaltyStart,
} from "../../../store/actions";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import { useTheme } from "@emotion/react";

const mdParser = new MarkdownIt();

const ManageSpecialty = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispath = useDispatch();
  const specialtyList = useSelector((state) => state.admin.specialties);
  const [isOpenLightBox, setIsOpenLightBox] = useState(false);
  const [previewImgUrl, setPreviewImgUrl] = useState(false);
  const [avatar, setAvatar] = useState("");
  const [idSpecialtyEdit, setIdSpecialtyEdit] = useState("");
  const [isShowForm, setIsShowForm] = useState(false);

  const [initialValues, setInitialValues] = useState({
    descHTML: "",
    descMarkdown: "",
    specialtyName: "",
    action: CRUDActions.CREATE,
  });

  const [specialtyName, setSpecialtyName] = useState("");

  useEffect(() => {
    dispath(fetchAllSpecitaltyStart());
  }, []);

  if (specialtyList && specialtyList.length > 0) {
    specialtyList.map((item, i) => {
      if (item && item.image) {
        item.avatar = new Buffer(item.image, "base64").toString("binary");
      }
    });
  }

  const handleEditorChange = ({ html, text }) => {
    setInitialValues({
      ...initialValues,
      descMarkdown: text,
      descHTML: html,
    });
  };

  const handleChangeSpecialtyName = (e, value) => {
    setSpecialtyName(e.target.value);
  };

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

  const handleCreateNewSpecialty = (values) => {
    dispath(
      createSpecialtyStart({
        name: specialtyName,
        avatar: avatar,
        descHTML: values.descHTML,
        descMarkdown: values.descMarkdown,
      })
    );

    setSpecialtyName("");
    setInitialValues({
      descHTML: "",
      descMarkdown: "",
      action: CRUDActions.CREATE,
    });
    setPreviewImgUrl("");
  };

  const handleAddNewSpecialty = () => {
    setIsShowForm(true);
    setIdSpecialtyEdit("");
    setSpecialtyName("");
    setInitialValues({
      descHTML: "",
      descMarkdown: "",
      action: CRUDActions.CREATE,
    });
    setPreviewImgUrl("");
  };

  const handleCancel = () => {
    setIsShowForm(false);
  };

  const handleDeleteSpecialty = (id) => {
    if (window.confirm(`Are you sure you want to delete user id: ${id}`)) {
      dispath(deleteSpecialtyStart(id));
    }
  };

  const handleEditSpecialty = (data) => {
    setIsShowForm(true);
    setIdSpecialtyEdit(data.id);
    setSpecialtyName(data.name);
    setInitialValues({
      descHTML: data.descHTML,
      descMarkdown: data.descMarkdown,
      action: CRUDActions.EDIT,
    });
    setPreviewImgUrl(data.avatar);
  };

  const handleSaveChangeSpecialty = (values) => {
    dispath(
      editSpecialtyStart({
        id: idSpecialtyEdit,
        name: specialtyName,
        avatar: avatar,
        descHTML: values.descHTML,
        descMarkdown: values.descMarkdown,
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
                handleEditSpecialty(params.row);
              }}
            >
              <EditOutLinedIcon />
            </IconButton>
            <IconButton
              onClick={() => {
                handleDeleteSpecialty(params.row.id);
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
      minWidth: 150,
    },
    {
      field: "avatar",
      headerName: "Avatar",
      renderCell: (params) => {
        return (
          <img
            src={params.row.avatar}
            style={{ width: "35px", height: "35px", borderRadius: "50%" }}
          />
        );
      },
      flex: 1,
      minWidth: 150,
    },
    {
      field: "name",
      headerName: "Specialty Name",
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
      <Header title="MANAGE SPECIALTY" subtitle="Welcome to Manage Specialty" />
      <Box>
        <Typography
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            marginBottom: "30px",
          }}
        >
          Add New Specialty
          <IconButton onClick={handleAddNewSpecialty}>
            <AddOutLinedIcon />
          </IconButton>
        </Typography>
        {isShowForm ? (
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={
              initialValues.action === CRUDActions.EDIT
                ? handleSaveChangeSpecialty
                : handleCreateNewSpecialty
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
                    label="Specialty Name"
                    onBlur={handleBlur}
                    onChange={handleChangeSpecialtyName}
                    value={specialtyName}
                    name="specialty"
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
        {isOpenLightBox === true && (
          <Lightbox
            mainSrc={previewImgUrl}
            onCloseRequest={() => setIsOpenLightBox(false)}
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
          rows={specialtyList}
          columns={columns}
          scrollbarSize={1}
          autoHeight={true}
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default ManageSpecialty;
