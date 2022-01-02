import React from 'react'
import "./TopBar.css"
import { Link } from 'react-router-dom'
import { useContext } from 'react';
import { Context } from '../../context/Context';

export default function TopBar() {
    
    const {user, dispatch } = useContext(Context);
    const path = 'localhost:5000/images/'
    const handleLogout = async(event) => {
        event.preventDefault();
        dispatch({ type: "LOGOUT" });
    }

    return (
        <div className="top-bar">
            <div className="top-left">
                <i className="top-icons fab fa-facebook-square"></i>
                <i className="top-icons fab fa-twitter-square"></i>
                <i className="top-icons fab fa-pinterest-square"></i>
                <i className="top-icons fab fa-instagram-square"></i>
            </div>
            <div className="top-center">
                <ul className="top-list">
                    <li className="top-list-item">
                        <Link className="link" to="/">Home</Link>
                    </li>
                    <li className="top-list-item">
                        <Link className="link" to="/write-post">Write a Post</Link>
                    </li>
                    <li className="top-list-item">
                        <Link className="link" to="/settings">Settings</Link>
                    </li>
                    <li className="top-list-item">
                        <Link to="#" onClick={handleLogout} className="link">{ user && "LOGOUT" }</Link>
                    </li>
                </ul>
            </div>
            <div className="top-right">
                { 
                    user ? 
                        (
                        <ul className="top-list">
                            <li className="top-list-item">
                                <Link to="/settings">
                                    {user.profilePic ? (<img className="top-bar-image" src={path + user.profilePic} alt="pexels-pic" />) : (<p>{user.username}</p>)}
                                </Link>
                            </li>
                        </ul>
                        )
                    : (
                        <ul className="top-list">
                            <li className="top-list-item">
                                <Link className="link" to="/login">Login</Link>
                            </li>
                            <li className="top-list-item">
                                <Link className="link" to="/register">Register</Link>
                            </li>
                        </ul>
                    )
                }
                
                <i className="top-search-icon fas fa-search"></i>
                
            </div>
        </div>
    )
}
