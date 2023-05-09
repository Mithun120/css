import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import './files-upload-component.css';

const DomainUplaod = () => {
    const [domainImg, setDomainImg] = useState('');
    const [title, setTitle] = useState('');

    const onFileChange = (e) => {
        setDomainImg(e.target.files[0]);
    };

    useEffect(() => {
      console.log("Profile : " + domainImg);
    }, [domainImg]);


    const onTitleChange = (e) => {
        setTitle(e.target.value);
    };

    // const onGithubLinkChange = (e) => {
    //     setGithubLink(e.target.value);
    // };

    const onSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('DomainImg', domainImg);
        console.log("***" + domainImg);
        formData.append('title', title);
        axios.post("http://localhost:4000/dapi/domainpost", formData, {}).then(res => {
            console.log(res);
        });
    };

    return (
        <div className="container">
            <div className="container-fluid row justify-content-center px-0">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <legend>Image</legend>
                        <input type="file" onChange={onFileChange} />
                        <legend>Title</legend>
                        <input type="text" className="border border-dark rounded p-3" name="title" value={title} onChange={onTitleChange} />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary" type="submit">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DomainUplaod;
