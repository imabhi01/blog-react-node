import React from 'react'
import './Register.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

export default function Register() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)

    const handleSubmit = async (event) => {
        setError(false);
        event.preventDefault();
        try {
            const response = await axios.post('/auth/register', { username, email, password })
            response.data && window.location.replace('/login');
        } catch (error) {
            console.log(error);
           setError(true);
        }
    }

    return (
        <div className="register-wrapper">
            <div className="register-box">
                <div className="register-title">
                    <h2>Register</h2>
                </div>
                <form className="register-form" onSubmit={handleSubmit}>
                    <label htmlFor="">User Name</label>
                    <input type="text" placeholder="User Name" onChange={ (event) => { setUsername(event.target.value)}} />

                    <label htmlFor="">Email</label>
                    <input type="email" placeholder="Email" onChange={ (event) => { setEmail(event.target.value)}} />

                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder="Password" onChange={ (event) => { setPassword(event.target.value)}} />

                    <div className="form-submit">
                        <button type="submit" className="register-submit">Register</button>
                        <Link className="register-login-button" to="/login">Login</Link>
                    </div>
                </form>
            </div>
            <div class="error-span">
                <span>{error ? (<p>Something Went Wrong!</p>) : null}</span>
            </div>
        </div>
    )
}
