import React from "react";
import { Link } from "react-router-dom";
import "./WelcomePage.css"

function WelcomePage() {
    return (
        <div className="welcome-page">
            <div className="container padding">
                <img src="/images/logo.png" alt="" />
                <div className="line"></div>
                <Link to={'/personal-info'}>
                    <div className="button">რეზიუმეს დამატება</div>
                </Link>
            </div>
        </div>
    )
}

export default WelcomePage