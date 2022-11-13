import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { languages } from '../../../utils/constant';
import './Clinic.scss';
import HomeHeader from '../HomeHeader';
import Footer from '../Footer';
import { withRouter } from 'react-router'
import { getAllClinicService } from '../../../services/userService';


class Clinic extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataClinic: []
        }
    }

    async componentDidMount() {
        let res = await getAllClinicService("ALL");
        if (res && res.errCode === 0) {
            this.setState({
                dataClinic: res.clinics ? res.clinics : ''
            });
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.lang !== this.props.lang) {

        }
    }

    handleViewDetailClinic = (clinic) => {
        this.props.history.push(`/detail-clinic/${clinic.id}`);
    }

    render() {

        let { dataClinic } = this.state;
        console.log(dataClinic);
        if (dataClinic && dataClinic.length > 0) {
            dataClinic.map((item, i) => {
                if (item && item.image) {
                    item.avatar = new Buffer(item.image, 'base64').toString('binary');
                }
            })
        }

        return (
            <>
                <HomeHeader />
                <div className='clinic-container'>
                    <div className='back-menu'>
                        <div className='back-ground'>
                            <div
                                className='icon-back'
                                onClick={this.props.history.goBack}
                            >
                                <i className="fas fa-arrow-left"></i>
                            </div>
                            <div className='menu-title'>
                                <FormattedMessage id="section.hospital-clinic" />
                            </div>
                        </div>
                    </div>
                    <div className='clinic-contents'>
                        {
                            dataClinic && dataClinic.length > 0
                            && dataClinic.map((item) => (
                                <div
                                    className='item'
                                    key={item.id}
                                    onClick={() => this.handleViewDetailClinic(item)}
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Clinic));
