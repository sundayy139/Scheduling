import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { languages } from '../../../utils/constant';
import './Handbook.scss';
import HomeHeader from '../HomeHeader';
import Footer from '../Footer';
import { withRouter } from 'react-router'
import { getAllHandbookService, getLimitHandbookService } from '../../../services/userService';


class Handbook extends Component {

    constructor(props) {
        super(props);
        this.state = {
            limitHandbook: [],
            allDataHandbook: []
        }
    }

    async componentDidMount() {
        let allHandbook = await getAllHandbookService("ALL");
        if (allHandbook && allHandbook.errCode === 0) {
            this.setState({
                allDataHandbook: allHandbook.handbooks ? allHandbook.handbooks : ''
            });
        }


        let handbookLimit = await getLimitHandbookService(5)
        if (handbookLimit && handbookLimit.errCode === 0) {
            this.setState({
                limitHandbook: handbookLimit.handbooks ? handbookLimit.handbooks : ''
            });
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.lang !== this.props.lang) {

        }
    }

    handleViewDetailHandbook = (handbook) => {
        this.props.history.push(`/detail-handbook/${handbook.id}`);
    }

    handleFilter = (e) => {
        let { allDataHandbook } = this.state;
        let searchWords = e.target.value;
        let newFilter = allDataHandbook.filter((value) => {
            return this.removeVietnameseTones(value.title).toLowerCase().includes(searchWords.toLowerCase())
        })
        if (searchWords === '') {
            this.setState({
                filterData: []
            })
        } else {
            this.setState({
                filterData: newFilter
            })
        }
    }

    removeVietnameseTones = (str) => {
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

    render() {

        let { limitHandbook, filterData } = this.state;
        if (limitHandbook && limitHandbook.length > 0) {
            limitHandbook.map((item) => {
                if (item && item.image) {
                    item.avatar = new Buffer(item.image, 'base64').toString('binary');
                }
            })
        }

        return (
            <>
                <HomeHeader />
                <div className='handbook-container'>
                    <div className='back-menu'>
                        <div className='back-ground'>
                            <div
                                className='icon-back'
                                onClick={this.props.history.goBack}
                            >
                                <i className="fas fa-arrow-left"></i>
                            </div>
                            <div className='menu-title'>
                                <FormattedMessage id="section.handbook" />
                            </div>
                        </div>
                    </div>
                    <div className='search'>
                        <div className='search-box'>
                            <div className='search-input'>
                                <input
                                    type='search'
                                    placeholder='Search handbook . . .'
                                    onChange={(e) => this.handleFilter(e)}
                                />
                                <i className='fas fa-search'></i>
                            </div>
                        </div>
                    </div>
                    {
                        filterData && filterData.length > 0 && (
                            <div className='search-result'>
                                <h4 className='text-search'>
                                    <FormattedMessage id='section.search-result' />
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
                                                onClick={() => this.handleViewDetailHandbook(item)}
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
                            <FormattedMessage id='section.new-handbook' />
                        </h4>
                        {
                            limitHandbook && limitHandbook.length > 0
                            && limitHandbook.map((item) => (
                                <div
                                    className='item'
                                    key={item.id}
                                    onClick={() => this.handleViewDetailHandbook(item)}
                                >
                                    <div className='inner'>
                                        <div
                                            className='image'
                                            style={{
                                                backgroundImage: `url(${item.avatar})`,
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
                            ))
                        }
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Handbook));
