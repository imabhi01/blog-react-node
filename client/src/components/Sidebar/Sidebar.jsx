import React from 'react'
import './sidebar.css'
import { useState, useEffect } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Sidebar() {
    
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const getCategory = async() => {
            const response = await axios.get('/categories');
            setCategories(response.data);
        }
        getCategory();
    }, [])

    return (
        <div className="sidebar">
            <div className="sidebar-item">
                <span className="sidebar-title">
                    About Me
                </span>
                <img src="https://themegoods-cdn-pzbycso8wng.stackpathdns.com/grandblog/demo/wp-content/uploads/2015/11/aboutme.jpg" alt="" />
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
                    Minus, temporibus laborum veniam nulla 
                </p>
            </div>
            <div className="sidebar-item">
                <span className="sidebar-title">Category</span>
                <ul className="sidebar-list">
                    {categories.map((item, index) => (
                        <li className="sidebar-list-item" key={index}>
                            <Link className="link" to={`/?category=${item.name}`}>{item.name}</Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="sidebar-item">
                <span className="sidebar-title">Follow US</span>
                <div className="social-icons">
                    <i className="top-icons fab fa-facebook-square"></i>
                    <i className="top-icons fab fa-twitter-square"></i>
                    <i className="top-icons fab fa-pinterest-square"></i>
                    <i className="top-icons fab fa-instagram-square"></i>
                </div>
            </div>
        </div>
    )
}
