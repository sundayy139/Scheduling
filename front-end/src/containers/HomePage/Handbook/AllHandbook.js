import React, { useEffect, useState } from 'react';
import './AllHandbook.scss';
import HomeHeader from '../HomeHeader';
import Footer from '../Footer';
import { getAllHandbookService, getLimitHandbookService } from '../../../services/userService';
import { useHistory } from 'react-router';

const AllHandbook = () => {

    const history = useHistory();

    const [newHandbook, setNewHandbook] = useState([])
    const [allDataHandbook, setAllDataHandbook] = useState([]);
    const [filterData, setFilterData] = useState([]);


    useEffect(() => {
        const getAllHandbook = async () => {
            let allHandbook = await getAllHandbookService("ALL");
            if (allHandbook && allHandbook.errCode === 0) {
                setAllDataHandbook(allHandbook.handbooks ? allHandbook.handbooks : '')
            }
        }
        const getNewHandbook = async () => {
            let newHandbook = await getLimitHandbookService(5);
            if (newHandbook && newHandbook.errCode === 0) {
                setNewHandbook(newHandbook.handbooks ? newHandbook.handbooks : '')
            }
        }
        getAllHandbook();
        getNewHandbook();

    }, [])

    const handleViewDetailHandbook = (handbook) => {
        history.push(`/detail-handbook/${handbook.id}`);
    }

    const handleFilter = (e) => {
        let searchWords = e.target.value;
        let newFilter = allDataHandbook.filter((value) => {
            return removeVietnameseTones(value.title).toLowerCase().includes(searchWords.toLowerCase())
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

    return (
        <>
            <HomeHeader />
            <div className='handbook-container'>
                <div className='back-menu'>
                    <div className='back-ground'>
                        <div
                            className='icon-back'
                            onClick={history.goBack}
                        >
                            <i className="fas fa-arrow-left"></i>
                        </div>
                        <div className='menu-title'>
                            Cẩm nang
                        </div>
                    </div>
                </div>
                <div className='search'>
                    <div className='search-box'>
                        <div className='search-input'>
                            <input
                                type='search'
                                placeholder='Search handbook . . .'
                                onChange={handleFilter}
                            />
                            <i className='fas fa-search'></i>
                        </div>
                    </div>
                </div>
                {
                    filterData && filterData.length > 0 && (
                        <div className='search-result'>
                            <h4 className='text-search'>
                                Kết quả tìm kiếm
                            </h4>
                            {
                                filterData && filterData.length > 0
                                && filterData.map((item) => {

                                    let imageBase64 = '';
                                    if (item.image) {
                                        imageBase64 = new Buffer(item.image, 'base64').toString('binary');
                                    }

                                    return (
                                        <div
                                            className='item'
                                            key={item.id}
                                            onClick={() => handleViewDetailHandbook(item)}
                                        >
                                            <div className='inner'>
                                                <div
                                                    className='image'
                                                    style={{
                                                        backgroundImage: `url(${imageBase64})`,
                                                        backgroundSize: 'cover',
                                                        backgroundRepeat: 'no-repeat',
                                                        backgroundPosition: 'center center'
                                                    }}
                                                >

                                                </div>
                                                <div className='text'>
                                                    {item.title}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )
                }
                <div className='handbook-contents'>
                    <h4 className='text-search'>
                        Cẩm nang mới
                    </h4>
                    {
                        newHandbook && newHandbook.length > 0
                        && newHandbook.map((item) => {
                            let imageBase64 = '';
                            if (item.image) {
                                imageBase64 = new Buffer(item.image, 'base64').toString('binary');
                            }
                            return (
                                <div
                                    className='item'
                                    key={item.id}
                                    onClick={() => handleViewDetailHandbook(item)}
                                >
                                    <div className='inner'>
                                        <div
                                            className='image'
                                            style={{
                                                backgroundImage: `url(${imageBase64})`,
                                                backgroundSize: 'cover',
                                                backgroundRepeat: 'no-repeat',
                                                backgroundPosition: 'center center'
                                            }}
                                        >

                                        </div>
                                        <div className='text'>
                                            {item.title}
                                        </div>
                                    </div>
                                </div>)
                        })
                    }
                </div>
            </div>
            <Footer />
        </>
    )
}

export default AllHandbook