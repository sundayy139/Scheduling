import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { languages } from '../../../utils/constant';
import Footer from '../Footer';
import HomeHeader from '../HomeHeader';
import './DetailClinic.scss';
import _ from 'lodash';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfo from '../Doctor/DoctorExtraInfo';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import { getDetailClinicService } from '../../../services/userService';



class DetailClinic extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrDoctorId: [],
            dataClinic: {},
            backgroundImage: ''
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;

            let res = await getDetailClinicService(id);

            if (res && res.errCode === 0) {
                let data = res.data;
                let arrDoctorId = [];
                if (data && !_.isEmpty(data)) {
                    let arr = data.doctorClinic;
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrDoctorId.push(item.doctorId);
                        })
                    }
                }

                this.setState({
                    dataClinic: res.data,
                    arrDoctorId: arrDoctorId,
                })
            }


            if (this.state.dataClinic && this.state.dataClinic.image) {
                let avatar = new Buffer(this.state.dataClinic.image, 'base64').toString('binary');
                this.setState({
                    backgroundImage: avatar
                })
            }

            if (this.state.dataClinic && this.state.dataClinic.logo) {
                let lg = new Buffer(this.state.dataClinic.logo, 'base64').toString('binary');
                this.setState({
                    backgroundLogo: lg
                })
            }
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.lang !== this.props.lang) {

        }
    }

    render() {

        let { arrDoctorId, dataClinic, backgroundImage, backgroundLogo } = this.state;
        let { lang } = this.props;
        console.log(this.state)
        console.log(this.props)

        return (
            <>
                <HomeHeader />
                <div className='detail-clinic'>
                    <div className='back-menu'>
                        <div className='back-ground'>
                            <div
                                className='icon-back'
                                onClick={this.props.history.goBack}
                            >
                                <i className="fas fa-arrow-left"></i>
                            </div>
                            <div className='menu-title'>
                                {dataClinic.name}
                            </div>
                        </div>
                    </div>
                    <div className='container-clinic-up'>
                        <div className='image-clinic'
                            style={{
                                backgroundImage: `url(${backgroundImage})`,
                                backgroundSize: "cover",
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "center",

                            }}
                        >
                        </div>
                        <div className='info-clinic'>
                            <div className='info-up'>
                                <div className='logo-clinic'
                                    style={{
                                        backgroundImage: `url(${backgroundLogo})`,
                                        backgroundSize: "contain",
                                        backgroundRepeat: "no-repeat",
                                        backgroundPosition: "center",
                                        height: "70px",
                                    }}>
                                </div>
                                <div className='name-clinic'>
                                    <h1>{dataClinic.name}</h1>
                                </div>
                            </div>
                            <div className='info-down'>
                                <i className='fas fa-map-marker-alt'></i>
                                <span>
                                    {dataClinic.address}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className='container-clinic-center'>
                        <div className='content-desc'>
                            {
                                dataClinic && !_.isEmpty(dataClinic) &&
                                (
                                    <div
                                        className='inner'
                                        dangerouslySetInnerHTML={{ __html: dataClinic.descHTML }}>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    <div className='container-clinic-down'>
                        <p>
                            <FormattedMessage id="section.out-standing-doctor" />
                        </p>
                        <div className='content-box'>
                            {
                                arrDoctorId && arrDoctorId.length > 0
                                && arrDoctorId.map((item, i) => (
                                    <div className='box' key={i}>
                                        <div className='box-left'>
                                            <ProfileDoctor
                                                doctorId={item}
                                                isShowDescDoctor={true}
                                                isShowLinkToDetail={true}
                                                isShowLocation={true}
                                            />
                                        </div>
                                        <div className='box-right'>
                                            <div className='schedule'>
                                                <DoctorSchedule
                                                    doctorIdFrDetail={item}
                                                />
                                            </div>
                                            <div className='extra-info'>
                                                <DoctorExtraInfo
                                                    doctorIdFrDetail={item}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <Footer />
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        lang: state.app.language,
    };

};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
