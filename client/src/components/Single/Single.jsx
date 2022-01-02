import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import SinglePost from '../SinglePost/SinglePost'
import './Single.css'

export default function Single() {
    return (
        <div className="single">
            <SinglePost />
            <Sidebar />
        </div>
    )
}
