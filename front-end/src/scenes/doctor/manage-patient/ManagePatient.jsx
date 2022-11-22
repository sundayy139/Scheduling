import { Box, IconButton, TextField, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { tokens } from "../../../theme";
import Header from "../../../components/Header";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import CheckOutLinedIcon from "@mui/icons-material/CheckOutlined";
import moment from "moment";
import { useSelector } from "react-redux";
import {
  getListPatientService,
  sendRemedyService,
} from "../../../services/userService";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import SendRemedyModal from "./SendRemedyModal";
import { toast } from "react-toastify";
import LoadingOverlay from "react-loading-overlay";

const ManagePatient = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const infoDoctor = useSelector((state) => state.user.userInfo);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [data, setData] = useState({
    doctorId: infoDoctor.id,
    date: "",
  });
  const [dataSend, setDataSend] = useState([]);
  const [listPatient, setListPatient] = useState([]);
  const [isOpenModalRemedy, setIsOpenModalRemedy] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(async () => {
    const formattedDate = moment(
      new Date(currentDate).toLocaleDateString()
    ).format("YYYY-MM-DD");
    setCurrentDate(formattedDate);
    setData({
      ...data,
      date: formattedDate,
    });

    getAllPartients();
  }, [currentDate]);

  const getAllPartients = async () => {
    const res = await getListPatientService(data);
    if (res && res.errCode === 0) {
      let result = [];
      if (res.data && res.data.length > 0) {
        res.data.map((item) => {
          let object = {};
          let fullName = `${item.patientData.firstName} ${item.patientData.lastName}`;
          object.fullName = fullName;
          object.doctorId = item.doctorId;
          object.patientId = item.patientId;
          object.timeType = item.timeType;
          object.id = item.id;
          object.email = item.patientData.email;
          object.address = item.patientData.address;
          object.date = item.date;
          object.time = item.timeTypeDataBooking.value;
          object.reason = item.reason;
          object.createdAt = item.createdAt;
          object.updatedAt = item.updatedAt;

          result.push(object);
        });
      }
      setListPatient(result);
    }
  };

  const handleSendRemedy = (data) => {
    console.log(1);
    setIsOpenModalRemedy(true);
    setDataSend(data);
  };

  const toggleSendRemedyModal = () => {
    setIsOpenModalRemedy(!isOpenModalRemedy);
  };

  const sendRemedy = async (dataFrModal) => {
    setLoading(true);
    let res = await sendRemedyService(dataFrModal);

    if (res && res.errCode === 0) {
      toast.success("Send Remedy Success", {
        theme: "colored",
      });
      setIsOpenModalRemedy(false);
      getAllPartients();
      setLoading(false);
    } else {
      toast.error("Send Remedy Fail", {
        theme: "colored",
      });
      setLoading(false);
    }
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
                handleSendRemedy(params.row);
              }}
            >
              <CheckOutLinedIcon />
            </IconButton>
          </Box>
        );
      },
      flex: 1,
      minWidth: 70,
    },
    {
      field: "id",
      headerName: "ID",
    },

    {
      field: "time",
      headerName: "Time",
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
      field: "fullName",
      headerName: "Full Name",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "address",
      headerName: "Address",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "reason",
      headerName: "Reason",
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
      <Header title="MANAGE PATIENT" subtitle="Welcome to Manage Patient" />
      <LoadingOverlay
        active={loading}
        spinner
        text="Loading ..."
      ></LoadingOverlay>
      <Box mt="50px">
        <DatePicker
          name="date"
          label="Date"
          value={currentDate}
          onChange={(newValue) => {
            setCurrentDate(newValue);
          }}
          renderInput={(params) => (
            <TextField sx={{ gridColumn: "span 6" }} {...params} />
          )}
        />
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
          rows={listPatient}
          columns={columns}
          scrollbarSize={1}
          autoHeight={true}
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
          components={{ Toolbar: GridToolbar }}
        />
        {isOpenModalRemedy && (
          <SendRemedyModal
            isOpen={isOpenModalRemedy}
            toggleSendRemedyModal={toggleSendRemedyModal}
            dataSend={dataSend}
            sendRemedy={sendRemedy}
            disableColumnSelected
          />
        )}
      </Box>
    </Box>
  );
};

export default ManagePatient;
