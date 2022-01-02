import React, { useContext } from 'react'
import { useLocation } from "react-router";
import './SinglePost.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Context } from '../../context/Context';

export default function SinglePost() {
    const location = useLocation()
    const path = location.pathname.split('/')[2]
    const [post, setPost] = useState({})
    const {user} = useContext(Context)
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [updateMode, setUpdateMode] = useState(false)

    useEffect(() => {
        const getPost = async () => {
            const res = await axios.get("/posts/" + path);
            setPost(res.data);
            setTitle(res.data.title);
            setDesc(res.data.desc);
        };
        getPost();
    }, [path]);
    
    const PF = 'http://localhost:5000/images/'

    const handleDelete = async(e) => {
        e.preventDefault();
        try {
            await axios.delete(`/posts/${post._id}`, {
                data: {
                    username: user.username
                }
            })
            window.location.replace('/');
        } catch (error) {
            console.log(error)
        }
    }

    const handleUpdate = async(e) => {
        e.preventDefault();
        try{
            const res = await axios.put(`/posts/${post._id}`, {
                username: user.username,
                title: title,
                desc: desc
            })
            console.log(res)
            setUpdateMode(false)
            // window.location.replace('/posts'+ post._id)
            
        }catch(err){
            console.log(err)
        }
    }
    
    return (
        
        <div className="single-post">
            <div className="single-post-wrapper">
                {post.photo && (
                    <img 
                        src={PF + post.photo} 
                        alt="single-post"
                        className="single-post-image"
                    />
                )}
                
                {updateMode ? (
                    <input
                        type="text"
                        value={title}
                        className="single-post-update-title single-post-title"
                        autoFocus
                        onChange={(e) => setTitle(e.target.value)}
                   />
                ): (
                    <h1 className="single-post-title">
                    {title}
                    { post.username === user?.username && (
                        <div className="single-post-actions">
                            <i className="single-post-icon far fa-edit" onClick={(e) => setUpdateMode(true)}></i>
                            <i className="single-post-icon far fa-trash-alt" onClick={(e) => handleDelete}></i>
                        </div>
                    ) }
                    </h1>
                )}
                
                <div className="single-post-info">
                    <span className="single-post-author">
                        Author: 
                        <Link className="link" to={`/?username=${post.username}`}>
                            <b>{post.username}</b>
                        </Link>
                    </span>
                    <span className="single-post-date">
                        {new Date(post.createdAt).toDateString()}
                    </span>
                </div>
                
                {updateMode ? (
                    <textarea
                        value={desc}
                        className="single-post-description"
                        placeholder="Tell your story..."
                        type="text"
                        onChange={(e) => setDesc(e.target.value)}
                    />
                ): (
                    <p className="single-post-desc">
                        {desc}
                    </p>
                )}

                {updateMode && (
                    <button className="single-post-button" onClick={handleUpdate}>Update</button>
                )}
            </div>
        </div>
    )
}
