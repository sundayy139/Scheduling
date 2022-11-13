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
import Header from "../../components/Header";
import { CommonUtils, CRUDActions } from "../../utils";
import Lightbox from "react-image-lightbox";
import { useDispatch, useSelector } from "react-redux";
import {
  createHandbookStart,
  deleteHandbookStart,
  editHandbookStart,
  fetchAllHandbookStart,
} from "../../store/actions";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useTheme } from "@emotion/react";

const mdParser = new MarkdownIt();

const ManageHandbook = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispath = useDispatch();
  const handbookList = useSelector((state) => state.admin.handbooks);
  const [isOpenThump, setIsOpenThump] = useState(false);
  const [previewImgUrl, setPreviewImgUrl] = useState(false);
  const [thump, setThump] = useState();
  const [idHandbookEdit, setIdHandbookEdit] = useState("");
  const [isShowForm, setIsShowForm] = useState(false);

  const [initialValues, setInitialValues] = useState({
    descHTML: "",
    descMarkdown: "",
    action: CRUDActions.CREATE,
  });
  const [handbookTitle, setHandbookTitle] = useState("");
  useEffect(() => {
    dispath(fetchAllHandbookStart());
  }, []);

  if (handbookList && handbookList.length > 0) {
    handbookList.map((item, i) => {
      if (item && item.image) {
        item.thump = new Buffer(item.image, "base64").toString("binary");
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

  const handleChangeTitle = (e) => {
    setHandbookTitle(e.target.value);
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

  const handleCreateNewHandbook = (values) => {
    dispath(
      createHandbookStart({
        title: handbookTitle,
        avatar: thump,
        descHTML: values.descHTML,
        descMarkdown: values.descMarkdown,
      })
    );

    setInitialValues({
      descHTML: "",
      descMarkdown: "",
      action: CRUDActions.CREATE,
    });
    setHandbookTitle("");
    setPreviewImgUrl("");
  };

  const handleAddNewHandbook = () => {
    setIsShowForm(true);
    setIdHandbookEdit("");
    setInitialValues({
      descHTML: "",
      descMarkdown: "",
      action: CRUDActions.CREATE,
    });
    setPreviewImgUrl("");
    setHandbookTitle("");
  };

  const handleCancel = () => {
    setIsShowForm(false);
  };

  const handleDeleteHandbook = (id) => {
    if (window.confirm(`Are you sure you want to delete handbook: ${id}`)) {
      dispath(deleteHandbookStart(id));
    }
  };

  const handleEditHandbook = (data) => {
    setIsShowForm(true);
    setHandbookTitle(data.title);
    setIdHandbookEdit(data.id);
    setInitialValues({
      descHTML: data.descHTML,
      descMarkdown: data.descMarkdown,
      action: CRUDActions.EDIT,
    });
    setPreviewImgUrl(data.thump);
  };

  const handleSaveChangeHandbook = (values) => {
    dispath(
      editHandbookStart({
        id: idHandbookEdit,
        title: handbookTitle,
        avatar: thump,
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
                handleEditHandbook(params.row);
              }}
            >
              <EditOutLinedIcon />
            </IconButton>
            <IconButton
              onClick={() => {
                handleDeleteHandbook(params.row.id);
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
      field: "thump",
      headerName: "Thump",
      renderCell: (params) => {
        return <img src={params.row.thump} style={{ height: "35px" }} />;
      },
      flex: 1,
      minWidth: 150,
    },
    {
      field: "title",
      headerName: "Handbook Title",
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
          Add New Handbook
          <IconButton onClick={handleAddNewHandbook}>
            <AddOutLinedIcon />
          </IconButton>
        </Typography>
        {isShowForm ? (
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={
              initialValues.action === CRUDActions.EDIT
                ? handleSaveChangeHandbook
                : handleCreateNewHandbook
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
                    label="Handbook Title"
                    onBlur={handleBlur}
                    onChange={handleChangeTitle}
                    value={handbookTitle}
                    name="title"
                    sx={{ gridColumn: "span 6" }}
                  />
                  {/* Change Thump */}
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
          rows={handbookList}
          columns={columns}
          scrollbarSize={1}
          autoHeight={true}
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
          pageSize={5}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default ManageHandbook;
