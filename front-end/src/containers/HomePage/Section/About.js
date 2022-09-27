import React, { Component } from 'react';
import { connect } from 'react-redux';
import './About.scss';

class About extends Component {

    render() {
        return (
            <div className='about-section'>
                <div className='about-container'>
                    <div className='about-content'>
                        <div className='content-top'>
                            <h2 className='content-title'>Truyền thông nói về BookingCare</h2>
                        </div>
                        <div className='content-container'>
                            <div className='container-left'>
                                <iframe src="https://www.youtube.com/embed/tPEpUf_naOA"
                                    title="Sức Mạnh gia đình sẽ hóa giải tất cả | Reup 108 : KungFu Panda"
                                    frameborder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowfullscreen></iframe>
                            </div>
                            <div className='container-right'>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
