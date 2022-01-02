import React from 'react'
import './Login.css'
import {Link} from 'react-router-dom'
import { useRef, useContext } from 'react'
import { Context } from '../../context/Context'
import axios from 'axios'

export default function Login() {
    
    const userRef = useRef();
    
    const passwordRef = useRef();
    
    const { dispatch, isFetching, error } = useContext(Context);
    
    const handleSubmit = async (event) => {
        
        event.preventDefault();
        
        dispatch({ type: "LOGIN_START" });

        try{
            const response = await axios.post("/auth/login", {
                username: userRef.current.value, // when useRef is used the value is inside current object 
                password: passwordRef.current.value
            })
            dispatch({
                type: 'LOGIN_SUCCESS',
                payload: response.data
            })
        }catch(err){
            dispatch({
                type: 'LOGIN_FAILURE'
            })
            console.log(err.response.data)
        }
    }

    return (
        <div className="login-wrapper">
            <div className="login-box">
                <div className="login-title">
                    <h2>Login</h2>
                </div>
                <form className="login-form" onSubmit={handleSubmit}>
                    <label htmlFor="">Username</label>
                    <input type="text" placeholder="Username" ref={userRef} />

                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder="Password" ref={passwordRef}/>

                    <div className="form-submit">
                        <button type="submit" className="login-submit" disabled={isFetching}>Submit</button>
                        <Link to="/register" className="login-register-button">Register</Link>
                    </div>
                </form>
                <div class="error-span">
                    <span>{error ? (<p>Something Went Wrong!</p>) : null}</span>
                </div>
            </div>
        </div>
    )
}
