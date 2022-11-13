import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HandBook.scss';
import Slider from "react-slick";
import { FormattedMessage } from 'react-intl';
import { getAllHandbookService } from '../../../../services/userService';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom'


class HandBook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataHandbook: []
        }
    }

    async componentDidMount() {
        let res = await getAllHandbookService("ALL");
        if (res && res.errCode === 0) {
            this.setState({
                dataHandbook: res.handbooks ? res.handbooks : ''
            });
        }
    }

    handleViewDetailHandbook = (handbook) => {
        this.props.history.push(`/detail-handbook/${handbook.id}`);
    }
    render() {

        const settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 2,
            slidesToScroll: 1,
        };

        let { dataHandbook } = this.state;
        if (dataHandbook && dataHandbook.length > 0) {
            dataHandbook.map((item, i) => {
                if (item && item.image) {
                    item.avatar = new Buffer(item.image, 'base64').toString('binary');
                }
            })
        }

        return (
            <div className='handBook-section'>
                <div className='handBook-container'>
                    <div className='handBook-content'>
                        <div className='content-top'>
                            <h2 className='content-title'>
                                <FormattedMessage id="section.handbook" />
                            </h2>
                            <Link to={'/handbook'} className='content-btn'>
                                <FormattedMessage id="section.all-posts" />
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
                                                onClick={() => this.handleViewDetailHandbook(item)}
                                            >
                                                <div className='item-link'>
                                                    <div className='item-img'>
                                                        <img src={item.avatar} />
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HandBook));
