import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { languages } from '../../../utils/constant';
import './AllDoctor.scss';
import HomeHeader from '../HomeHeader';
import Footer from '../Footer';
import { getAllDoctorsService } from '../../../services/userService';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';


const AllDoctor = () => {
    const [dataDoctor, setDataDoctor] = useState([]);
    const [filterData, setFilterData] = useState([]);
    const lang = useSelector((state) => state.app.language);
    const history = useHistory();

    useEffect(() => {

        const getAllDoctor = async () => {
            let res = await getAllDoctorsService("ALL");
            if (res && res.errCode === 0) {
                let data = res.data;
                let result = [];
                if (data && data.length > 0) {
                    data.map((item) => {
                        let object = {};
                        let nameVi = `${item.positionData.value_VI} ${item.lastName} ${item.firstName}`;
                        let nameEn = `${item.positionData.value_EN} ${item.firstName} ${item.lastName}`;
                        let fullName = lang === languages.VI ? nameVi : nameEn;

                        object.doctorId = item.id;
                        object.fullName = fullName;
                        object.specialty = `${item.Doctor_Info.Specialty.name}`;
                        object.image = item.image;
                        object.searchWords = fullName;

                        result.push(object);
                    })
                }
                setDataDoctor(result);
            }
        }

        getAllDoctor();

    }, [])

    const handleFilter = (e) => {
        let searchWords = e.target.value;
        let newFilter = dataDoctor.filter((value) => {
            return removeVietnameseTones(value.searchWords).toLowerCase().includes(searchWords.toLowerCase())
        })
        if (searchWords === '') {
            setFilterData([])
        } else {
            setFilterData(newFilter)
        }
    }

    const removeVietnameseTones = (str) => {
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/đ/g, "d");
        str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
        str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
        str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
        str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
        str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
        str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
        str = str.replace(/Đ/g, "D");
        // Some system encode vietnamese combining accent as individual utf-8 characters
        // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
        str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
        str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
        // Remove extra spaces
        // Bỏ các khoảng trắng liền nhau
        str = str.replace(/ + /g, " ");
        str = str.trim();
        // Remove punctuations
        // Bỏ dấu câu, kí tự đặc biệt
        str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, " ");
        return str;
    }

    const handleViewDetailDoctor = (doctor) => {
        history.push(`/detail-doctor/${doctor.doctorId}}`);
    }

    return (
        <>
            <HomeHeader />
            <div className='all-doctor-container'>
                <div className='back-menu'>
                    <div className='back-ground'>
                        <div
                            className='icon-back'
                            onClick={history.goBack}
                        >
                            <i className="fas fa-arrow-left"></i>
                        </div>
                        <div className='menu-title'>
                            <FormattedMessage id="section.all-doctor" />
                        </div>
                    </div>
                </div>
                <div className='search'>
                    <div className='search-box'>
                        <div className='search-input'>
                            <input
                                type='search'
                                placeholder='Search doctor . . .'
                                onChange={handleFilter}
                            />
                            <i className='fas fa-search'></i>
                        </div>
                    </div>
                </div>
                {
                    filterData && filterData.length > 0 &&
                    (
                        <div className='search-value'>
                            <h4 className='text-search'>
                                <FormattedMessage id='section.search-result' />
                            </h4>
                            {
                                filterData && filterData.length > 0 && filterData.map((item) => {

                                    let imageBase64 = '';
                                    if (item.image) {
                                        imageBase64 = new Buffer(item.image, 'base64').toString('binary');
                                    }
                                    return (
                                        <div
                                            key={item.doctorId}
                                            className='item'
                                            onClick={() => handleViewDetailDoctor(item)}
                                        >
                                            <div className='inner'>
                                                <div
                                                    className='image'
                                                    style={{
                                                        backgroundImage: `url(${imageBase64})`,
                                                        backgroundSize: 'contain',
                                                        backgroundRepeat: 'no-repeat',
                                                        backgroundPosition: 'center center'
                                                    }}
                                                >

                                                </div>
                                                <div className='text'>
                                                    <span>
                                                        {item.fullName}
                                                    </span>
                                                    <p>
                                                        {item.specialty}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )

                                })
                            }
                        </div>
                    )
                }
                <div className='all-doctor-contents'>
                    <h4>
                        <FormattedMessage id="section.out-standing-doctor" />
                    </h4>
                    {
                        dataDoctor && dataDoctor.length > 0 && dataDoctor.map((item) => {

                            let imageBase64 = '';
                            if (item.image) {
                                imageBase64 = new Buffer(item.image, 'base64').toString('binary');
                            }
                            return (
                                <div
                                    key={item.doctorId}
                                    className='item'
                                    onClick={() => handleViewDetailDoctor(item)}
                                >
                                    <div className='inner'>
                                        <div
                                            className='image'
                                            style={{
                                                backgroundImage: `url(${imageBase64})`,
                                                backgroundSize: 'contain',
                                                backgroundRepeat: 'no-repeat',
                                                backgroundPosition: 'center center'
                                            }}
                                        >

                                        </div>
                                        <div className='text'>
                                            <span>
                                                {item.fullName}
                                            </span>
                                            <p>
                                                {item.specialty}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )

                        })
                    }
                </div>
            </div>
            <Footer />
        </>
    )
}

export default AllDoctor