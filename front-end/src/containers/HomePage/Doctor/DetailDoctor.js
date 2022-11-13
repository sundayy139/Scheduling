import React, { Component } from 'react';
import { connect } from 'react-redux';
import Footer from '../Footer';
import HomeHeader from '../HomeHeader';
import './DetailDoctor.scss';
import { languages } from '../../../utils';
import { getDetailDoctorService } from '../../../../src/services/userService';
import DoctorSchedule from './DoctorSchedule';
import DoctorExtraInfo from './DoctorExtraInfo';
import ProfileDoctor from './ProfileDoctor';


class DetailDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            detailDoctor: {},
            currentDoctorId: '-1',
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            this.setState({
                currentDoctorId: id
            });
            let res = await getDetailDoctorService(id);
            if (res && res.errCode === 0) {
                this.setState({
                    detailDoctor: res.data
                })
            }
        }
    }

    componentDidUpdate(prevProps) {

    }

    render() {

        let { detailDoctor } = this.state;
        let { lang } = this.props
        let nameVi = '';
        let nameEn = '';

        if (detailDoctor && detailDoctor.positionData) {
            nameVi = `${detailDoctor.positionData.value_VI} ${detailDoctor.firstName} ${detailDoctor.lastName}`;
            nameEn = `${detailDoctor.positionData.value_EN} ${detailDoctor.lastName} ${detailDoctor.firstName}`;
        }

        return (
            <div>
                <HomeHeader />
                <div className='detail-doctor'>
                    <div className='detail-doctor-container'>
                        <div className='back-menu'>
                            <div className='back-ground'>
                                <div
                                    className='icon-back'
                                    onClick={this.props.history.goBack}
                                >
                                    <i className="fas fa-arrow-left"></i>
                                </div>
                                <div className='menu-title'>
                                    {
                                        lang === languages.VI ? nameVi : nameEn
                                    }
                                </div>
                            </div>
                        </div>
                        <div className='container-up'>
                            <div className='general-info'>
                                {
                                    detailDoctor && detailDoctor.id && (
                                        <ProfileDoctor
                                            doctorId={detailDoctor.id}
                                            isShowDescDoctor={true}
                                            isShowLinkToDetail={false}
                                        />
                                    )
                                }

                            </div>
                            <div className='schedule'>
                                <div className='schedule-left'>
                                    <DoctorSchedule
                                        doctorIdFrDetail={this.state.currentDoctorId}
                                    />
                                </div>
                                <div className='schedule-right'>
                                    <DoctorExtraInfo
                                        doctorIdFrDetail={this.state.currentDoctorId}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='container-down'>
                            <div className='container-down-content'>
                                <div className='detail-info'>
                                    {
                                        detailDoctor.Doctor_Info && detailDoctor.Doctor_Info.contentHTML &&
                                        <div
                                            className='inner'
                                            dangerouslySetInnerHTML={{ __html: detailDoctor.Doctor_Info.contentHTML }}>
                                        </div>
                                    }
                                </div>
                                <div className='comment'>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        lang: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
