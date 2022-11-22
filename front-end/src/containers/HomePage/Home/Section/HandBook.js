import React, { useEffect, useState } from 'react';
import './HandBook.scss';
import Slider from "react-slick";
import { getLimitHandbookService } from '../../../../services/userService';
import { Link, useHistory } from 'react-router-dom'

const HandBook = () => {

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
    };

    const [dataHandbook, setDataHandbook] = useState([]);
    const history = useHistory();

    useEffect(() => {
        const getAllHandbookServices = async () => {
            let res = await getLimitHandbookService(5);
            if (res && res.errCode === 0) {
                setDataHandbook(res.handbooks ? res.handbooks : '')
            }
        }
        getAllHandbookServices();

    }, [])

    if (dataHandbook && dataHandbook.length > 0) {
        dataHandbook.map((item, i) => {
            if (item && item.image) {
                item.avatar = new Buffer(item.image, 'base64').toString('binary');
            }
        })
    }


    const handleViewDetailHandbook = (handbook) => {
        history.push(`/detail-handbook/${handbook.id}`);
    }


    return (
        <div>
            <div className='handBook-section'>
                <div className='handBook-container'>
                    <div className='handBook-content'>
                        <div className='content-top'>
                            <h2 className='content-title'>
                                Cẩm nang
                            </h2>
                            <Link to={'/handbook'} className='content-btn'>
                                Tất cả bài viết
                            </Link>
                        </div>
                        <div className='content-container'>
                            <div className='handBook-slider'>
                                <Slider {...settings} className="slider">
                                    {
                                        dataHandbook && dataHandbook.map(item => (
                                            <div
                                                className='handBook-item'
                                                key={item.id}
                                                onClick={() => handleViewDetailHandbook(item)}
                                            >
                                                <div className='item-link'>
                                                    <div className='item-img'
                                                        style={{
                                                            backgroundImage: `url(${item.avatar})`,
                                                            backgroundSize: 'cover',
                                                            backgroundRepeat: 'no-repeat',
                                                            backgroundPosition: 'center center'
                                                        }}
                                                    >
                                                    </div>
                                                    <div className='item-text'>
                                                        {item.title}
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </Slider>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HandBook