import React from 'react'
import './Post.css'
import { Link } from 'react-router-dom'

export default function Post({post}) {
    const PF = 'http://localhost:5000/images/'
    return (
        <div className="post">
            {post.photo && (
                <img className="post-image" src={PF + post.photo} alt="pexel-img" />
            )}
            <div className="post-info">
                <div className="post-category">
                    {post.categories.map((category, index) => (
                        <span className="post-category-title" key={index}>{category}, </span> 
                    ))}
                </div>
                <span className="post-title">
                    <Link className="link" to={`/posts/${post._id}`} >
                        <span>{post.title}</span>
                    </Link>
                </span>
                <hr />
                <span className="post-timestamp">{ new Date(post.createdAt).toDateString()}</span>
                <p className="post-description">
                    {post.desc}
                </p>
                <p>Author: {post.username}</p>
            </div>
        </div>
    )
}
