import React from "react";
import { Navbar } from "react-bootstrap";
import './LandingPage.css';


const LandingPage: React.FC = () => {
    return (
        <>
            <Navbar />
            <div className="landing-page">
                <h1 className="message">Welcome to ATS Clinic!</h1>
            </div>
        </>
    )
}

export default LandingPage;