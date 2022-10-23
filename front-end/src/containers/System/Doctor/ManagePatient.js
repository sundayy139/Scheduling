import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { languages } from '../../../utils/constant';



class ManagePatient extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps) {
        if (prevProps.lang !== this.props.lang) {

        }
    }


    render() {

        return (
            <div className='manage-doctor-container'>
                <div className='container-content'>
                    <div className='title'>
                        <FormattedMessage id="manage-doctor.title" />
                    </div>

                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
