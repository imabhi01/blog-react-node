import React, { useContext } from 'react'
import './write.css'
import { useState } from 'react'
import axios from 'axios'
import {Context} from  '../../context/Context'

export default function Write() {
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [file, setFile] = useState(null)
    const {user} = useContext(Context);

    const handleSubmit = async(e) => {
        
        e.preventDefault();
        
        const post = {
            username: user.username,
            title: title,
            desc: desc,
            categories: [
                'Music',
                'Books'
            ]
        }

        if(file){
            const data = new FormData;
            const filename = Date.now() + file.name;
            data.append('name', filename)
            data.append('file', file)
            post.photo = filename
            try {
               await axios.post('/upload', data)
            } catch (error) {
                console.log(error);
            }
        }
        
        try{
            const res = await axios.post('/posts', post )
            window.location.replace('/posts/' + res.data._id)
        }catch(err){
            console.log(err);
        }
    }

    return (
        <div className="write-wrapper">
            {file && (
                <img
                    className="write-img"
                    src={URL.createObjectURL(file)}
                    alt="post-img"
                />
            )}
            <form className="write-form" onSubmit={handleSubmit}>
                <div className="write-form-group">
                    <label htmlFor="file-input">
                        <i className="write-icon fas fa-plus"></i>
                    </label>
                    <input type="file" id="file-input" style={{ display: 'none'}} onChange={(e) => setFile(e.target.files[0])} />
                    <input type="text" placeholder="Title" className="writeInput" autoFocus={true} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className="write-form-group">
                    <textarea
                        className="writeInput writeText"
                        placeholder="Tell your story..."
                        type="text"
                        autoFocus={true}
                        onChange={(e) => setDesc(e.target.value)}
                    />
                </div>
                <button type="submit" className="write-submit">Publish</button>
            </form>
        </div>
    )
}
