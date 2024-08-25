import React from 'react';
import './AboutPage.scss';
import { FaGithub, FaLinkedin } from 'react-icons/fa6';

const AboutPage = () => {
  return (
    <div className='aboutPage'>
        <div className="top">
            <h1>About Us</h1>
            <p>
                Welcome to Stu-Rental!
                <br />
                Having lived in Kolkata for the past three years as a university student, we've noticed how challenging it can be to find rental accommodations. Unlike other states, many colleges here do not require students to live in hostels, leading to a higher demand for rentals.
                <b>Stu-Rental</b> was created to bridge the gap between students who want to share available rental information and those looking for vacancies. Whether you want to help others by sharing vacancies or find a place to stay, this platform brings all the information together in one place.
                <b>Stu-Rental</b> is built by two students <b>Anurag Dey</b> and <b>Ankan Das</b>. We are excited to launch version 1.0.0 and look forward to your feedback to help us improve in future updates!
            </p>
        </div>
        <div className="bottom">
            <h1>About The Devs</h1>
            <div className="cards">
                <div className="about-dev-container">
                    <div className="shadow"></div>
                    <div className="about-dev">
                        <div className="background-image" style={{ backgroundImage: 'url("./src/assets/images/Code.jpg")' }}></div>
                        <img className="profile-image" src="./src/assets/images/Anurag.jpg" alt="Anurag Dey" />
                        <div className="content">
                            <div className="title">Anurag Dey</div>
                            <div className="description">JU '26</div>
                        </div>
                        <div className="links">
                            <a
                                href="https://github.com/iamanurag101"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FaGithub className="icons" />
                            </a>
                            <a
                                href="https://www.linkedin.com/in/iamanurag101/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FaLinkedin className="icons" />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="about-dev-container">
                    <div className="shadow"></div>
                    <div className="about-dev">
                        <div className="background-image" style={{ backgroundImage: 'url("./src/assets/images/Code.jpg")' }}></div>
                        <img className="profile-image" src="./src/assets/images/Ankan.jpg" alt="Ankan Das" />
                        <div className="content">
                            <div className="title">Ankan Das</div>
                            <div className="description">JU '26</div>
                        </div>
                        <div className="links">
                            <a
                                href="https://github.com/evuedeveloper"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FaGithub className="icons" />
                            </a>
                            <a
                                href="https://www.linkedin.com/in/evuedeveloper/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FaLinkedin className="icons" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AboutPage;
