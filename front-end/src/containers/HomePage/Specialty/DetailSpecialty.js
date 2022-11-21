// import React, { Component } from 'react';



// class DetailSpecialty extends Component {

//     constructor(props) {
//         super(props);
//         this.state = {
//            
//         }
//     }

//     async componentDidMount() {

//     }

//     componentDidUpdate(prevProps) {
//         if (prevProps.lang !== this.props.lang) {

//         }
//     }




//     render() {

//         let { arrDoctorId, dataSpecialty, listProvince, backgroundImage } = this.state;
//         let { lang } = this.props;

//         return (

//         )
//     }
// }

// const mapStateToProps = state => {
//     return {
//         isLoggedIn: state.user.isLoggedIn,
//         lang: state.app.language,
//     };

// };

// const mapDispatchToProps = dispatch => {
//     return {

//     };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);


import React, { useEffect, useState } from 'react';
import { languages } from '../../../utils/constant';
import Footer from '../Footer';
import HomeHeader from '../HomeHeader';
import './DetailSpecialty.scss';
import _ from 'lodash';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfo from '../Doctor/DoctorExtraInfo';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import { getAllCodeService, getDetailSpecialtyService } from '../../../services/userService';
import { useHistory, useParams } from 'react-router';
import { useSelector } from 'react-redux';

const DetailSpecialty = () => {

    const [arrDoctorId, setArrDoctorId] = useState([]);
    const [dataSpecialty, setDataSpecialty] = useState([]);
    const [listProvince, setListProvince] = useState([]);
    const [backgroundImage, setBackgroundImage] = useState('');
    const params = useParams();
    const lang = useSelector((state) => state.app.language)
    const history = useHistory();

    useEffect(() => {

        const getDetailSpecialty = async () => {
            if (params && params.id) {
                let id = params.id;
                let res = await getDetailSpecialtyService({
                    id: id,
                    location: 'ALL'
                });

                let resProvince = await getAllCodeService('PROVINCE');

                if (res && res.errCode === 0 && resProvince.errCode === 0) {
                    let data = res.data;
                    let arrDoctorId = [];
                    if (data && !_.isEmpty(data)) {
                        let arr = data.doctorSpecialty;
                        if (arr && arr.length > 0) {
                            arr.map(item => {
                                arrDoctorId.push(item.doctorId);
                            })
                        }
                    }

                    let dataProvince = resProvince.data;
                    if (dataProvince && dataProvince.length > 0) {
                        dataProvince.unshift({
                            key: "ALL",
                            type: "PROVINCE",
                            value_EN: "Nationally",
                            value_VI: "Toàn quốc",
                        })
                    }

                    if (data && data.image) {
                        let avatar = new Buffer(data.image, 'base64').toString('binary');
                        setBackgroundImage(avatar)
                    }

                    setDataSpecialty(data)
                    setArrDoctorId(arrDoctorId)
                    setListProvince(dataProvince)
                }



            }
        }

        getDetailSpecialty();
    }, [])

    const handleChangeSelect = async (e) => {

        if (params && params.id) {

            let id = params.id;
            let location = e.target.value;
            let res = await getDetailSpecialtyService({
                id: id,
                location: location
            });
            if (res && res.errCode === 0) {
                let data = res.data;
                let arrDoctorId = [];
                if (data && !_.isEmpty(data)) {
                    let arr = data.doctorSpecialty;
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrDoctorId.push(item.doctorId);
                        })
                    }
                }

                setDataSpecialty(res.data)
                setArrDoctorId(arrDoctorId)
            }
        }
    }

    return (
        <>
            <HomeHeader />
            <div className='detail-specialty'>
                <div className='back-menu'>
                    <div className='back-ground'>
                        <div
                            className='icon-back'
                            onClick={history.goBack}
                        >
                            <i className="fas fa-arrow-left"></i>
                        </div>
                        <div className='menu-title'>
                            {dataSpecialty && dataSpecialty.name ? dataSpecialty.name : ''}
                        </div>
                    </div>
                </div>
                <div className='container-specialty-up'
                    style={{
                        backgroundImage: `url(${backgroundImage})`,
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                    }}
                >
                    <div className='back-ground'>
                        <div className='content-desc'>
                            {
                                dataSpecialty && !_.isEmpty(dataSpecialty) &&
                                (
                                    <div
                                        className='inner'
                                        dangerouslySetInnerHTML={{ __html: dataSpecialty.descHTML }}>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
                <div className='container-specialty-center'>
                    <div className='search-specialty'>
                        <select
                            onChange={handleChangeSelect}
                        >
                            {
                                listProvince && listProvince.length > 0 &&
                                listProvince.map((item, index) => {
                                    return (
                                        <option
                                            key={index}
                                            value={item.key}
                                        >
                                            {lang === languages.VI ? item.value_VI : item.value_EN}
                                        </option>
                                    )
                                })
                            }
                        </select>
                    </div>
                </div>
                <div className='container-specialty-down'>
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

export default DetailSpecialty