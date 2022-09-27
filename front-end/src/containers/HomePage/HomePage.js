import React, { Component } from 'react';
import { connect } from 'react-redux';
import Footer from './Footer';
import HomeHeader from './HomeHeader';
import About from './Section/About';
import Clinic from './Section/Clinic';
import Doctor from './Section/Doctor';
import HandBook from './Section/HandBook';
import Specialty from './Section/Specialty';

class HomePage extends Component {

    render() {
        return (
            <div>
                <HomeHeader />
                <Specialty />
                <Clinic />
                <Doctor />
                <HandBook />
                <About />
                <Footer />
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
