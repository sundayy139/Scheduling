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
import EditOutLinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutLinedIcon from "@mui/icons-material/DeleteOutlined";
import AddOutLinedIcon from "@mui/icons-material/AddOutlined";
import Header from "../../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  deleteScheduleTimeStart,
  fetchAllScheduleDoctorByDateStart,
  fetchAllScheduleTimeStart,
} from "../../store/actions";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useTheme } from "@emotion/react";
import { createScheduleDoctorService } from "../../services/userService";
import { toast } from "react-toastify";
import moment from "moment";
import ModalEditTime from "./ModalEditTime";

const ManageSchedule = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispath = useDispatch();
  const allScheduleTime = useSelector((state) => state.admin.scheduleTimes);
  const infoDoctor = useSelector((state) => state.user.userInfo);
  const dataScheduleByDay = useSelector((state) => state.admin.scheduleByDay);
  const [rangeTime, setRangeTime] = useState();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isShowForm, setIsShowForm] = useState(false);
  const [isOpenModalEditTime, setIsOpenModalEditTime] = useState(false);
  const [dataEdit, setDataEdit] = useState([]);
  const [initialValues, setInitialValues] = useState({
    maxNumber: 1,
  });
  useEffect(() => {
    const formattedDate = moment(
      new Date(currentDate).toLocaleDateString()
    ).format("YYYY-MM-DD");

    setCurrentDate(formattedDate);
    dispath(fetchAllScheduleTimeStart());
    dispath(fetchAllScheduleDoctorByDateStart(infoDoctor.id, formattedDate));
    getAllTime();
  }, [currentDate]);

  const getAllTime = () => {
    let data = allScheduleTime;
    if (data && data.length > 0) {
      data = data.map((item) => {
        item.isSelected = false;
        return item;
      });
    }
    setRangeTime(data);
  };

  const handleAddNewSchedule = () => {
    setIsShowForm(true);
    setInitialValues({
      maxNumber: "",
    });
    getAllTime();
  };

  const handleCancel = () => {
    setIsShowForm(false);
  };

  const handleBtnChooseTime = (time) => {
    if (rangeTime && rangeTime.length > 0) {
      let selectedTime = rangeTime.map((item) => {
        if (item.id === time.id) {
          item.isSelected = !item.isSelected;
        }
        return item;
      });
      setRangeTime(selectedTime);
    }
  };

  const handleCreateScheduleTime = async (values) => {
    let result = [];

    if (rangeTime && rangeTime.length > 0) {
      let selected = rangeTime.filter((item) => item.isSelected === true);
      if (selected && selected.length > 0) {
        selected.map((item) => {
          let object = {};
          object.doctorId = infoDoctor.id;
          object.date = currentDate;
          object.timeType = item.key;
          object.maxNumber = values.maxNumber;
          result.push(object);
        });
      } else {
        toast.error("Invalid selected time, please choose range time", {
          theme: "colored",
        });
      }
    }

    let res = await createScheduleDoctorService({
      arrSchedule: result,
      doctorId: infoDoctor.id,
      date: currentDate,
    });

    if (res && res.errCode === 0) {
      toast.success("Create schedule successfully", {
        theme: "colored",
      });
    } else {
      toast.error("Create schedule failed", {
        theme: "colored",
      });
    }

    dispath(fetchAllScheduleDoctorByDateStart(infoDoctor.id, currentDate));
  };

  const handleDeleteScheduleTime = async (id) => {
    if (window.confirm(`Are you sure you want to delete time`)) {
      await dispath(deleteScheduleTimeStart(id));
    }

    dispath(fetchAllScheduleDoctorByDateStart(infoDoctor.id, currentDate));
  };

  const handleEditRangeTime = (data) => {
    setIsOpenModalEditTime(true);
    setDataEdit(data);
  };

  const toggleEditTimeModal = () => {
    setIsOpenModalEditTime(!isOpenModalEditTime);
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
                handleEditRangeTime(params.row);
              }}
            >
              <EditOutLinedIcon />
            </IconButton>
            <IconButton
              onClick={() => {
                handleDeleteScheduleTime(params.row.id);
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
      field: "timeTypeData",
      headerName: "Range Time",
      renderCell: (params) => {
        return (
          <div className="rowitem">{params.row.timeTypeData.value_VI}</div>
        );
      },
      flex: 1,
      minWidth: 150,
    },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "currentNumber",
      headerName: "Current Partient",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "maxNumber",
      headerName: "Max Partient",
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
          Add New Schedule
          <IconButton onClick={handleAddNewSchedule}>
            <AddOutLinedIcon />
          </IconButton>
        </Typography>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          onSubmit={handleCreateScheduleTime}
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
                <DatePicker
                  name="date"
                  label="Date"
                  minDate={new Date()}
                  value={currentDate}
                  onChange={(newValue) => {
                    setCurrentDate(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField sx={{ gridColumn: "span 6" }} {...params} />
                  )}
                />

                {isShowForm ? (
                  <>
                    <TextField
                      fullWidth
                      required
                      variant="outlined"
                      type="number"
                      InputProps={{ inputProps: { min: 1 } }}
                      label="Max Number"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.maxNumber}
                      name="maxNumber"
                      sx={{ gridColumn: "span 6" }}
                    />

                    <FormControl sx={{ gridColumn: "span 12" }}>
                      <Box>
                        {rangeTime &&
                          rangeTime.length > 0 &&
                          rangeTime.map((item, i) => {
                            return (
                              <Button
                                variant="contained"
                                sx={{
                                  fontSize: "12px",
                                  margin: "5px",
                                  minWidth: "105px",
                                }}
                                color={
                                  item.isSelected === true
                                    ? "error"
                                    : "secondary"
                                }
                                key={item.id}
                                onClick={() => handleBtnChooseTime(item)}
                              >
                                {item.value_VI}
                              </Button>
                            );
                          })}
                      </Box>
                    </FormControl>
                    <FormControl sx={{ gridColumn: "span 12" }}>
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
                        <Button color="info" type="submit" variant="contained">
                          Create
                        </Button>
                      </Box>
                    </FormControl>
                  </>
                ) : (
                  ""
                )}
              </Box>
            </form>
          )}
        </Formik>
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
          rows={dataScheduleByDay}
          columns={columns}
          scrollbarSize={1}
          autoHeight={true}
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
          components={{ Toolbar: GridToolbar }}
        />
        {isOpenModalEditTime && (
          <ModalEditTime
            isOpen={isOpenModalEditTime}
            toggleEditTimeModal={toggleEditTimeModal}
            dataEdit={dataEdit}
            disableColumnSelected
          />
        )}
      </Box>
    </Box>
  );
};

export default ManageSchedule;
