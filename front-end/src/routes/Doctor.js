import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import Header from '../containers/Header/Header';
import ManagePatient from '../containers/System/Doctor/ManagePatient';
import ManageSchedule from '../containers/System/Doctor/ManageSchedule';

class Doctor extends Component {
    render() {
        const { isLoggedIn, DoctorMenuPath, userInfo } = this.props;
        return (
            <Fragment>
                {isLoggedIn && <Header />}
                <div className="system-container">
                    <div className="system-list">
                        {
                            userInfo.roleId === "R2" && (
                                <Switch>
                                    <Route path="/doctor/manage-schedule" component={ManageSchedule} />
                                    <Route path="/doctor/manage-patient" component={ManagePatient} />
                                    <Route component={() => { return (<Redirect to={DoctorMenuPath} />) }} />
                                </Switch>
                            )
                        }
                    </div>
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        DoctorMenuPath: state.app.DoctorMenuPath,
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);
