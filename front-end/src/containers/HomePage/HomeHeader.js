import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';

class HomeHeader extends Component {

    render() {
        return (
            <div className='home-header'>
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div className='left-content'>
                            <a>
                                <i className='fas fa-bars'></i>
                            </a>
                            <div className='logo'>
                            </div>
                        </div>
                        <div className='center-content'>
                            <div className='child-content'>
                                <div className='text-title'>
                                    Chuyên khoa
                                </div>
                                <div className='text-desc'>
                                    Tìm bác sĩ theo chuyên khoa
                                </div>
                            </div>
                            <div className='child-content'>
                                <div className='text-title'>
                                    Cơ sở y tế
                                </div>
                                <div className='text-desc'>
                                    Chọn bệnh viện phòng khám
                                </div>
                            </div>
                            <div className='child-content'>
                                <div className='text-title'>
                                    Bác sĩ
                                </div>
                                <div className='text-desc'>
                                    Chọn bác sĩ giỏi
                                </div>
                            </div>
                            <div className='child-content'>
                                <div className='text-title'>
                                    Gói khám
                                </div>
                                <div className='text-desc'>
                                    Khám sức khỏe tổng quát
                                </div>
                            </div>
                        </div>
                        <div className='right-content'>
                            <div>Language</div>
                            {/* <ul>
                                <li>
                                    <a>
                                        <img></img>
                                        <span>VN</span>
                                    </a>
                                </li>
                                <li>
                                    <a>
                                        <img></img>
                                        <span>EN</span>
                                    </a>
                                </li>
                            </ul> */}
                            <div className='supports'>
                                <i className='fas fa-question-circle'></i>
                                <span>Hỗ trợ</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='home-header-banner'>

                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
