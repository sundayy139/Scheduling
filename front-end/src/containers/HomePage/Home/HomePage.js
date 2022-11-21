import React from 'react'
import Footer from '../Footer';
import HomeHeader from '../HomeHeader';
import About from './Section/About';
import Banner from './Section/Banner';
import Clinic from './Section/Clinic';
import Doctor from './Section/Doctor';
import HandBook from './Section/HandBook';
import Specialty from './Section/Specialty';

const HomePage = () => {
    return (
        <>
            <HomeHeader />
            <Banner />
            <Specialty />
            <Clinic />
            <Doctor />
            <HandBook />
            <About />
            <Footer />
        </>
    )
}

export default HomePage