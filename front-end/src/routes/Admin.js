import React, { useReducer } from 'react'
import { ColorModeContext, useMode } from "../theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "../scenes/global/Topbar";
import Sidebar from '../scenes/global/Sidebar';
import DashBoard from '../scenes/Admin/dashboard/Dashboard';
// import Pie from '../scenes/pie';
// import Bar from '../scenes/bar';
// import Form from '../scenes/form';
import { Route, Switch } from 'react-router';
import ManageDoctor from '../scenes/Admin/manage-doctor/ManageDoctor';
import ManageInfoDoctor from '../scenes/Admin/manage-info-doctor/ManageInfoDoctor';
import ManageSpecialty from '../scenes/Admin/manage-specialty/ManageSpecialty';
import ManageClinic from '../scenes/Admin/manage-clinic/ManageClinic';
import ManageHandbook from '../scenes/Admin/manage-handbook/ManageHandbook';
import ManageSchedule from '../scenes/Doctor/ManageSchedule';
import ManagePatient from '../scenes/Doctor/manage-patient/ManagePatient';

function AppDashBoard() {

    const [theme, colorMode] = useMode();

    return (
        // const { systemMenuPath, isLoggedIn, userInfo } = this.props;
        <ColorModeContext.Provider value={colorMode} >
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <div className='app'>
                    <Sidebar />
                    <main className='content'>
                        <Topbar />
                        <Switch>
                            <Route path="/admin/manage-doctor" component={ManageDoctor} />
                            <Route path="/admin/manage-info-doctor" component={ManageInfoDoctor} />
                            <Route path="/admin/manage-specialty" component={ManageSpecialty} />
                            <Route path="/admin/manage-clinic" component={ManageClinic} />
                            <Route path="/admin/manage-handbook" component={ManageHandbook} />
                            <Route path="/admin/manage-schedule" component={ManageSchedule} />
                            <Route path="/admin/manage-patient" component={ManagePatient} />
                            {/* <Route path="/admin/pie" component={Pie} /> */}
                            {/* <Route path="/admin/bar" component={Bar} /> */}
                            <Route path="/admin/dashboard" component={DashBoard} />
                        </Switch>
                    </main>
                </div>
            </ThemeProvider>
        </ColorModeContext.Provider>
    )
}

export default AppDashBoard