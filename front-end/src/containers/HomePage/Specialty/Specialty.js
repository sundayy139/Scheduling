import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { languages } from '../../../utils/constant';
import './Specialty.scss';
import HomeHeader from '../HomeHeader';
import Footer from '../Footer';
import { withRouter } from 'react-router'
import { getAllSpecialtyService } from '../../../services/userService';
import { Link } from 'react-router-dom'



class Specialty extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSpecialty: []
        }
    }

    async componentDidMount() {
        let res = await getAllSpecialtyService("ALL");
        if (res && res.errCode === 0) {
            this.setState({
                dataSpecialty: res.specialties ? res.specialties : ''
            });
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.lang !== this.props.lang) {

        }
    }

    handleViewDetailSpecialty = (specialty) => {
        this.props.history.push(`/detail-specialty/${specialty.id}`);
    }

    render() {

        let { dataSpecialty } = this.state;
        if (dataSpecialty && dataSpecialty.length > 0) {
            dataSpecialty.map((item, i) => {
                if (item && item.image) {
                    item.avatar = new Buffer(item.image, 'base64').toString('binary');
                }
            })
        }

        return (
            <>
                <HomeHeader />
                <div className='specialty-container'>
                    <div className='back-menu'>
                        <div className='back-ground'>
                            <div
                                className='icon-back'
                                onClick={this.props.history.goBack}
                            >
                                <i className="fas fa-arrow-left"></i>
                            </div>
                            <div className='menu-title'>
                                <FormattedMessage id='section.specialty' />
                            </div>
                        </div>
                    </div>
                    <div className='specialty-contents'>
                        {
                            dataSpecialty && dataSpecialty.length > 0
                            && dataSpecialty.map((item) => (
                                <div
                                    className='item'
                                    key={item.id}
                                    onClick={() => this.handleViewDetailSpecialty(item)}
                                >
                                    <div className='inner'>
                                        <div
                                            className='image'
                                            style={{
                                                backgroundImage: `url(${item.avatar})`,
                                                backgroundSize: 'contain',
                                                backgroundRepeat: 'no-repeat',
                                                backgroundPosition: 'center center'
                                            }}
                                        >

                                        </div>
                                        <div className='text'>
                                            {item.name}
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));
