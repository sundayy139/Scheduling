import React from 'react';
import './Footer.scss';

const Footer = () => {
    return (
        <div>
            <div className='footer'>
                <div className='footer-container'>
                    <div className='footer-content'>
                        <div className='content-left'>
                            <div className='content-logo'></div>
                            <h3>Công ty Cổ phần Công nghệ BookingCare</h3>
                            <h4>
                                <i className="fas fa-map-marker-alt"></i>
                                28 Thành Thái, Dịch Vọng, Cầu Giấy, Hà Nội
                            </h4>
                            <h4>
                                <i className="fas fa-check"></i>
                                ĐKKD số: 0106790291. Sở KHĐT Hà Nội cấp ngày 16/03/2015
                            </h4>
                            <div className='content-certify'>
                                <div className='certify-img'></div>
                                <div className='certify-img'></div>
                            </div>

                        </div>
                        <div className='content-center'>
                            <ul className='list-text'>
                                <li className='text-item'>
                                    <a href='' className='item-link'>
                                        Liên hệ hợp tác
                                    </a>
                                </li>
                                <li className='text-item'>
                                    <a href='' className='item-link'>
                                        Gói chuyển đổi số doanh nghiệp
                                    </a>
                                </li>
                                <li className='text-item'>
                                    <a href='' className='item-link'>
                                        Tuyển dụng
                                    </a>
                                </li>
                                <li className='text-item'>
                                    <a href='' className='item-link'>
                                        Câu hỏi thường gặp
                                    </a>
                                </li>
                                <li className='text-item'>
                                    <a href='' className='item-link'>
                                        Điều khoản sử dụng
                                    </a>
                                </li>
                                <li className='text-item'>
                                    <a href='' className='item-link'>
                                        Chính sách Bảo mật
                                    </a>
                                </li>
                                <li className='text-item'>
                                    <a href='' className='item-link'>
                                        Quy trình hỗ trợ giải quyết khiếu nại
                                    </a>
                                </li>
                                <li className='text-item'>
                                    <a href='' className='item-link'>
                                        Quy chế hoạt động
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className='content-right'>
                            <div className='info'>
                                <div className='info-title'>Trụ sở tại Hà Nội</div>
                                <div className='info-sub-title'>28 Thành Thái, Dịch Vọng, Cầu Giấy, Hà Nội</div>
                            </div>
                            <div className='info'>
                                <div className='info-title'>Văn phòng tại TP Hồ Chí Minh</div>
                                <div className='info-sub-title'>Số 01, Hồ Bá Kiện, Phường 15, Quận 10</div>
                            </div>
                            <div className='info'>
                                <div className='info-title'>Hỗ trợ khách hàng</div>
                                <div className='info-sub-title'>support@bookingcare.vn <br />(7h - 18h)</div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className='footer-outside'>
                    <div className='copy-right'>
                        <p>&copy; 2022 Bookingcare.vn</p>
                        <div className='social'>
                            <div className='social-icon-fb'>
                                <a href=''>
                                    <i className="fab fa-facebook-square"></i>
                                </a>
                            </div>
                            <div className='social-icon-yt'>
                                <a href=''>
                                    <i className="fab fa-youtube-square"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
