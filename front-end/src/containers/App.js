import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';
import { history } from '../redux'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";


import { userIsAuthenticated, userIsNotAuthenticated } from '../hoc/authentication';

import { path } from '../utils'

import Home from '../routes/Home';
// import Login from '../routes/Login';
import Login from './Auth/Login';
import Admin from '../routes/Admin';
import HomePage from './HomePage/Home/HomePage';
import CustomScrollbars from '../components/CustomScrollbars'
import DetailDoctor from './HomePage/Doctor/DetailDoctor';
import Doctor from '../routes/Doctor';
import Verify from './HomePage/Verify';
import DetailSpecialty from './HomePage/Specialty/DetailSpecialty';
import DetailClinic from './HomePage/Clinic/DetailClinic';
import DetailHandbook from './HomePage/Handbook/DetailHandbook';
import AllHandbook from './HomePage/Handbook/AllHandbook';
import AllDoctor from './HomePage/Doctor/AllDoctor';
import AllSpecialty from './HomePage/Specialty/AllSpecialty';
import AllClinic from './HomePage/Clinic/AllClinic';


class App extends Component {

    handlePersistorState = () => {
        const { persistor } = this.props;
        let { bootstrapped } = persistor.getState();
        if (bootstrapped) {
            if (this.props.onBeforeLift) {
                Promise.resolve(this.props.onBeforeLift())
                    .then(() => this.setState({ bootstrapped: true }))
                    .catch(() => this.setState({ bootstrapped: true }));
            } else {
                this.setState({ bootstrapped: true });
            }
        }
    };

    componentDidMount() {
        this.handlePersistorState();
    }

    render() {
        return (
            <Fragment>
                <Router history={history}>
                    <div className="main-container">
                        <div className="content-container">
                            <CustomScrollbars style={{ height: "100vh", width: "100%" }}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <Switch>
                                        <Route path={path.HOME} exact component={(Home)} />
                                        <Route path={path.ADMIN} component={userIsAuthenticated(Admin)} />
                                        <Route path={path.LOGIN} component={userIsNotAuthenticated(Login)} />
                                        <Route path={path.DOCTOR} component={userIsAuthenticated(Doctor)} />
                                        <Route path={path.HOMEPAGE} component={HomePage} />
                                        <Route path={path.DETAIL_DOCTOR} component={DetailDoctor} />
                                        <Route path={path.ALL_DOCTOR} component={AllDoctor} />
                                        <Route path={path.DETAIL_SPECIALTY} component={DetailSpecialty} />
                                        <Route path={path.SPECIALTY} component={AllSpecialty} />
                                        <Route path={path.CLINIC} component={AllClinic} />
                                        <Route path={path.DETAIL_CLINIC} component={DetailClinic} />
                                        <Route path={path.HANDBOOK} component={AllHandbook} />
                                        <Route path={path.DETAIL_HANDBOOK} component={DetailHandbook} />
                                        <Route path={path.VERIFY} component={Verify} />
                                    </Switch>
                                </LocalizationProvider>
                            </CustomScrollbars>
                        </div>

                        <ToastContainer
                            position="top-right"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                        />
                    </div>
                </Router>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        started: state.app.started,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);