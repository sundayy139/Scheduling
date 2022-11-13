import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { languages } from '../../../utils/constant';
import Footer from '../Footer';
import HomeHeader from '../HomeHeader';
import './DetailHandbook.scss';
import _ from 'lodash';
import { getDetailHandbookService } from '../../../services/userService';



class DetailHandbook extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataHandbook: {},
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;

            let res = await getDetailHandbookService(id);

            if (res && res.errCode === 0) {
                this.setState({
                    dataHandbook: res.data,
                })
            }
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.lang !== this.props.lang) {

        }
    }

    render() {

        let { dataHandbook } = this.state;
        let { lang } = this.props;
        console.log(this.state)

        return (
            <>
                <HomeHeader />
                <div className='detail-handbook'>
                    <div className='back-menu'>
                        <div className='back-ground'>
                            <div
                                className='icon-back'
                                onClick={this.props.history.goBack}
                            >
                                <i className="fas fa-arrow-left"></i>
                            </div>
                            <div className='menu-title'>
                                {dataHandbook.title}
                            </div>
                        </div>
                    </div>
                    <div className='container-handbook'>
                        <div className='content-desc'>
                            {
                                dataHandbook && !_.isEmpty(dataHandbook) &&
                                (
                                    <div className='inner'
                                        dangerouslySetInnerHTML={{ __html: dataHandbook.descHTML }}>
                                    </div>
                                )
                            }
                        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailHandbook);
