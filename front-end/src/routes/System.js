import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import Header from '../containers/Header/Header';
import ManageDoctor from '../containers/System/Admin/Doctor/ManageInfoDoctor';
import UserManageRedux from '../containers/System/Admin/User/UserManageRedux';
import ManageSpecialty from '../containers/System/Admin/Specialty/ManageSpecialty';
import ManageClinic from '../containers/System/Admin/Clinic/ManageClinic';
import ManageHandbook from '../containers/System/Admin/Handbook/ManageHandbook';

class System extends Component {
    render() {
        const { systemMenuPath, isLoggedIn, userInfo } = this.props;
        return (
            <Fragment>
                {isLoggedIn && <Header />}
                <div className="system-container">
                    <div className="system-list">
                        {
                            userInfo.roleId === "R1" && (
                                <Switch>
                                    <Route path="/system/manage-doctor" component={UserManageRedux} />
                                    <Route path="/system/manage-info-doctor" component={ManageDoctor} />
                                    <Route path="/system/manage-specialty" component={ManageSpecialty} />
                                    <Route path="/system/manage-clinic" component={ManageClinic} />
                                    <Route path="/system/manage-handbook" component={ManageHandbook} />
                                    <Route component={() => { return (<Redirect to={systemMenuPath} />) }} />
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
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
