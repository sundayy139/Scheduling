import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import Select from "react-select";
import { languages } from "../../../utils/constant";
import DatePiker from "../../../components/Input/DatePicker";
import moment from "moment";
import FormattedDate from "../../../components/Formating/FormattedDate";
import { toast } from "react-toastify";
import { dateFormat } from "../../../utils";
import _ from "lodash";
import { createScheduleDoctorService } from "../../../services/userService";

class ManageSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDoctor: [],
      listDoctor: [],
      currentDate: "",
      rangeTime: [],
      maxNumber: 1,
    };
  }

  componentDidMount() {
    this.props.fetchAllDoctors();
    this.props.fetchAllScheduleTimes();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.allDoctors !== this.props.allDoctors) {
      let dataSelect = this.buildInputSelect(this.props.allDoctors);
      this.setState({
        listDoctor: dataSelect,
      });
    }

    if (prevProps.lang !== this.props.lang) {
      let dataSelect = this.buildInputSelect(this.props.allDoctors);
      this.setState({
        listDoctor: dataSelect,
      });
    }

    if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
      let data = this.props.allScheduleTime;
      if (data && data.length > 0) {
        data = data.map((item) => {
          item.isSelected = false;
          return item;
        });
      }

      this.setState({
        rangeTime: data,
      });
    }
  }

  buildInputSelect = (inputData) => {
    let result = [];
    let { lang } = this.props;
    if (inputData && inputData.length > 0) {
      inputData.map((item, index) => {
        let object = {};
        let labelVi = `${item.lastName} ${item.firstName}`;
        let labelEn = `${item.firstName} ${item.lastName}`;
        object.label = lang === languages.VI ? labelVi : labelEn;
        object.value = item.id;
        result.push(object);
      });
    }

    return result;
  };

  handleSelectChange = async (selectedDoctor) => {
    this.setState({
      selectedDoctor,
    });
  };

  handleOnChangeDatePicker = (date) => {
    this.setState({
      currentDate: date[0],
    });
  };

  handleOnChangNumber = (e) => {
    this.setState({
      maxNumber: e.target.value,
    });
  };

  handleBtnChooseTime = (time) => {
    let { rangeTime } = this.state;
    if (rangeTime && rangeTime.length > 0) {
      rangeTime = rangeTime.map((item) => {
        if (item.id === time.id) {
          item.isSelected = !item.isSelected;
        }
        return item;
      });
    }
    this.setState({
      rangeTime: rangeTime,
    });
  };

  handleSaveSchedule = async () => {
    let { rangeTime, selectedDoctor, currentDate, maxNumber } = this.state;
    let result = [];

    if (selectedDoctor && _.isEmpty(selectedDoctor)) {
      toast.error("Invalid doctor, please choose doctor", {
        theme: "colored",
      });
      return;
    }

    if (!currentDate) {
      toast.error("Invalid date, please choose another date", {
        theme: "colored",
      });
      return;
    }

    let formattedDate = moment(
      new Date(currentDate).toLocaleDateString()
    ).format("YYYY-MM-DD");

    if (rangeTime && rangeTime.length > 0) {
      let selected = rangeTime.filter((item) => item.isSelected === true);
      if (selected && selected.length > 0) {
        selected.map((item) => {
          let object = {};
          object.doctorId = selectedDoctor.value;
          object.date = formattedDate;
          object.timeType = item.key;
          object.maxNumber = this.state.maxNumber;
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
      doctorId: selectedDoctor.value,
      date: formattedDate,
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
  };

  render() {
    let { rangeTime } = this.state;
    let language = this.props.lang;

    return (
      <div className="manage-doctor-container">
        <div className="container-content">
          <div className="title">
            <FormattedMessage id="manage-schedule.title" />
          </div>
          <div className="col-12 mt-5">
            <div className="row">
              <div className="col-6 form-group">
                <label>
                  <FormattedMessage id="manage-schedule.choose-doctor" />
                </label>
                <Select
                  value={this.state.selectedDoctor}
                  onChange={this.handleSelectChange}
                  options={this.state.listDoctor}
                />
              </div>
              <div className="col-4 form-group">
                <label>
                  <FormattedMessage id="manage-schedule.choose-date" />
                </label>
                <DatePiker
                  className="form-control"
                  onChange={this.handleOnChangeDatePicker}
                  value={this.state.currentDate}
                  // minDate={new Date().setDate(new Date().getDate() - 1)}
                  minDate={new Date().setHours(0, 0, 0, 0)}
                />
              </div>
              <div className="col-2 form-group">
                <label>
                  <FormattedMessage id="manage-schedule.max-number" />
                </label>
                <input
                  type="number"
                  min="1"
                  defaultValue="1"
                  className="form-control text-center"
                  onChange={(e) => this.handleOnChangNumber(e)}
                />
              </div>
            </div>
            <div className="row mt-5">
              <div className="col-12">
                <label>
                  <FormattedMessage id="manage-schedule.choose-schedule" />
                </label>
                <div className="border">
                  {rangeTime &&
                    rangeTime.length > 0 &&
                    rangeTime.map((item, i) => {
                      return (
                        <button
                          className={
                            item.isSelected === true
                              ? "btn btn-outline-primary active mx-3 my-3"
                              : "btn btn-outline-primary mx-3 my-3"
                          }
                          key={i}
                          style={{ minWidth: "180px" }}
                          onClick={() => this.handleBtnChooseTime(item)}
                        >
                          {language === languages.VI
                            ? item.value_VI
                            : item.value_EN}
                        </button>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 mt-5 mb-5">
            <div className="row ">
              <div className="col-12">
                <button
                  className="btn btn-primary float-right  "
                  onClick={() => this.handleSaveSchedule()}
                >
                  <FormattedMessage id="manage-schedule.save" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    lang: state.app.language,
    allDoctors: state.admin.doctors,
    allScheduleTime: state.admin.scheduleTimes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctors: () => dispatch(actions.fetchAllDoctorsStart()),
    fetchAllScheduleTimes: () => dispatch(actions.fetchAllScheduleTimeStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
