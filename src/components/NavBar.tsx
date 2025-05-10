import React, { useEffect, useState } from "react";
import logo from "../assets/ATS.png"
import { Link, useNavigate } from "react-router-dom";
import Login from "./Login";

interface NavBarProps {
    userName: string;
    onLogout: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ userName, onLogout }) => {
    const navigate = useNavigate();
    const isLoggedIn = !!userName;

    const handleLogin = () => {
        navigate('/login')
    }

    // Set home page as role based dashboard 
    const [homePage, setHomePage] = useState<string>('/')
    useEffect(() => {
        const roleId = localStorage.getItem("roleId")
        const roleIdStr = String(roleId); // force to string

        if (roleIdStr === '1') {
            setHomePage('/admin');
        } else if (roleIdStr === '2') {
            setHomePage('/manager');
        } else if (roleIdStr === '3') {
            setHomePage('/doctor');
        } else if (roleIdStr === '4') {
            setHomePage('/receptionist');
        } else {
            setHomePage('/unauthorized');
        }
    }, [])

    return (
        <nav className='navbar navbar-expand-lg navbar-dark bg-dark py-3'>
            <div className="container-fluid">
                <span className="navbar-brand d-flex align-items-center">
                    <img
                        src={logo}
                        alt="CMS V2025"
                        width="50"
                        height="50"
                        className="me-2"
                    />
                    Clinic Management System v2025
                </span>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNavDropdown"
                    aria-controls='navbarNavDropdown'
                    aria-expanded='false'
                    aria-label='Toggle Navigation'
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    {isLoggedIn ? (
                        // if not logged in show logout button and home and search options in the navbar
                        <><ul className="navbar-nav me-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to={homePage}>Home</Link>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Search</a>
                            </li>
                        </ul><ul className="navbar-nav me-auto">
                                <li className="nav-item d-flex align-items-center me-2 text-white">
                                    <i className="bi bi-person-circle me-1"></i>
                                    {userName}
                                </li>
                                <li className="nav-item">
                                    <button className="btn btn-outline-light" onClick={onLogout}>
                                        Logout
                                    </button>
                                </li>
                            </ul></>
                    ) : (
                        // else show login button
                        <><ul className="navbar-nav me-auto"></ul><li className="nav-item">
                            <button className="btn btn-outline-light" onClick={handleLogin}>
                                Login
                            </button>
                        </li></>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default NavBar;