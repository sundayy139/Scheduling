import React from "react";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import Header from "../../../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { deleteUserStart, fetchAllUsersStart } from "../../../store/actions";
import EditOutLinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutLinedIcon from "@mui/icons-material/DeleteOutlined";
import AddOutLinedIcon from "@mui/icons-material/AddOutlined";
import { useState } from "react";
import ModalEditUser from "./ModalEditUser";
import ModalCreateUser from "./ModalCreateUser";

const ManageDoctor = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [isOpenModalCreateUser, setIsOpenModalCreateUser] = useState(false);
  const [isOpenModalEditUser, setIsOpenModalEditUser] = useState(false);
  const [userEdit, setUserEdit] = useState("");
  const dispath = useDispatch();
  const doctorList = useSelector((state) => state.admin.users);

  useEffect(() => {
    dispath(fetchAllUsersStart());
  }, []);

  if (doctorList && doctorList.length > 0) {
    doctorList.map((item, i) => {
      if (item && item.image) {
        item.avatar = new Buffer(item.image, "base64").toString("binary");
      }
    });
  }

  const handleDeleteUser = (id) => {
    if (window.confirm(`Are you sure you want to delete user id: ${id}`)) {
      dispath(deleteUserStart(id));
    }
  };

  const handleAddNewUser = () => {
    setIsOpenModalCreateUser(true);
  };

  const toggleCreateUserModal = () => {
    setIsOpenModalCreateUser(!isOpenModalCreateUser);
  };

  const handleEditUser = (data) => {
    setIsOpenModalEditUser(true);
    setUserEdit(data);
  };

  const toggleEditUserModal = () => {
    setIsOpenModalEditUser(!isOpenModalEditUser);
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
                handleEditUser(params.row);
              }}
            >
              <EditOutLinedIcon />
            </IconButton>
            <IconButton
              onClick={() => {
                handleDeleteUser(params.row.id);
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
      field: "email",
      headerName: "Email",
      renderCell: (params) => {
        return <a href={`mailto:${params.row.email}`}>{params.row.email}</a>;
      },
      minWidth: 180,
      flex: 1,
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      renderCell: (params) => {
        return (
          <a href={`tel:${params.row.phoneNumber}`}>{params.row.phoneNumber}</a>
        );
      },
      flex: 1,
      minWidth: 150,
    },
    {
      field: "firstName",
      headerName: "First Name",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "lastName",
      headerName: "Last Name",
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
      field: "dateOfBirth",
      headerName: "Date Of Birth",
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
      <Header title="MANAGE DOCTOR" subtitle="Welcome to Manage Doctor" />
      <Box
        m="40px 0 0 0"
        height="75vh"
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
        <Typography
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            marginBottom: "30px",
          }}
        >
          Add New User
          <IconButton onClick={handleAddNewUser}>
            <AddOutLinedIcon />
          </IconButton>
        </Typography>
        <DataGrid
          rows={doctorList}
          columns={columns}
          scrollbarSize={1}
          autoHeight={true}
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
          pageSize={5}
          components={{ Toolbar: GridToolbar }}
        />
        <ModalCreateUser
          hidden={true}
          isOpen={isOpenModalCreateUser}
          toggleCreateUserModal={toggleCreateUserModal}
        />
        {isOpenModalEditUser && (
          <ModalEditUser
            isOpen={isOpenModalEditUser}
            toggleEditUserModal={toggleEditUserModal}
            userEdit={userEdit}
            disableColumnSelected
          />
        )}
      </Box>
    </Box>
  );
};

export default ManageDoctor;
