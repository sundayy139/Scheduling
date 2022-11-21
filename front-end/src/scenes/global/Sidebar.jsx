import React, { useState } from "react";
import "react-pro-sidebar/dist/css/styles.css";
import { Box, IconButton, useTheme, Typography } from "@mui/material";
import { tokens } from "../../theme";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import HomeOutLinedIcon from "@mui/icons-material/HomeOutlined";
import PersonOutLinedIcon from "@mui/icons-material/PersonOutlined";
import LightModeOutLinedIcon from "@mui/icons-material/LightModeOutlined";
import BarChartOutLinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutLinedIcon from "@mui/icons-material/PieChartOutlined";
import TimelineOutLinedIcon from "@mui/icons-material/TimelineOutlined";
import PeopleOutLinedIcon from "@mui/icons-material/PeopleOutlined";
import HelpOutLinedIcon from "@mui/icons-material/HelpOutlined";
import KeyOutLinedIcon from "@mui/icons-material/KeyOutlined";
import CalendarMonthOutLinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import CalendarTodayOutLinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import MenuOutLinedIcon from "@mui/icons-material/MenuOutlined";
import InfoOutLinedIcon from "@mui/icons-material/InfoOutlined";
import MapOutLinedIcon from "@mui/icons-material/MapOutlined";
import AccessibleOutLinedIcon from "@mui/icons-material/AccessibleOutlined";
import MenuBookOutLinedIcon from "@mui/icons-material/MenuBookOutlined";
import ApartmentOutLinedIcon from "@mui/icons-material/ApartmentOutlined";
import CameraEnhanceOutLinedIcon from "@mui/icons-material/CameraEnhanceOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import Img from "../../assets/doctor/160049-bs-hoai-huong.jpg";
import { processLogout } from "../../store/actions";
import { useEffect } from "react";
import { getDetailDoctorService } from "../../services/userService";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const dispath = useDispatch();
  const logOut = () => {
    dispath(processLogout());
  };
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const [image, setImage] = useState("");
  const [response, setResponse] = useState([]);
  const userInfo = useSelector((state) => state.user.userInfo);

  useEffect(() => {
    const getInfoDoctor = async () => {
      let res = await getDetailDoctorService(userInfo.id);
      if (res && res.errCode === 0) {
        setResponse(res.data);
        setImage(new Buffer(res.data.image, "base64").toString("binary"));
      }
    };

    getInfoDoctor();
  }, []);

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutLinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h4" color={colors.grey[100]}>
                  MANAGEMENT
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutLinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={image}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h5"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 10px 0" }}
                >
                  Welcome
                </Typography>
                <Typography
                  variant="h4"
                  fontWeight="bold"
                  color={colors.greenAccent[500]}
                >
                  {`${response.firstName} ${response.lastName}`}
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/admin/dashboard"
              icon={<HomeOutLinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Manage
            </Typography>
            <Item
              title="Manage Doctor"
              to="/admin/manage-doctor"
              icon={<PeopleOutLinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Manage Info Doctor"
              to="/admin/manage-info-doctor"
              icon={<InfoOutLinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Manage Clinic"
              to="/admin/manage-clinic"
              icon={<ApartmentOutLinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Manage Specialty"
              to="/admin/manage-specialty"
              icon={<CameraEnhanceOutLinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Manage Handbook"
              to="/admin/manage-handbook"
              icon={<MenuBookOutLinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Manage Schedue"
              to="/admin/manage-schedule"
              icon={<CalendarMonthOutLinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Manage Patient"
              to="/admin/manage-patient"
              icon={<AccessibleOutLinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Apps
            </Typography>
            <Item
              title="Calendar"
              to="/admin/calendar"
              icon={<CalendarTodayOutLinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Charts
            </Typography>
            <Item
              title="Bar Chart"
              to="/bar"
              icon={<BarChartOutLinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Pie Chart"
              to="/pie"
              icon={<PieChartOutLinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Line Chart"
              to="/line"
              icon={<TimelineOutLinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Geography Chart"
              to="/geography"
              icon={<MapOutLinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Setting
            </Typography>
            <Item
              title="Change Password"
              to="/admin/change-password"
              icon={<KeyOutLinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <MenuItem
              style={{
                color: colors.grey[100],
              }}
              onClick={logOut}
              icon={<LogoutIcon />}
            >
              <Typography>Logout</Typography>
            </MenuItem>
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
