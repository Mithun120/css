import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import './files-upload-component.css';

const DomainUpdate = (props) => {
    const [domainImg, setdomainImg] = useState(props.domain.domainImg);
    const [title, setTitle] = useState(props.domain.title);

    // const onFileChange = (e) => {
    //   console.log(e.target.files[0]);
    //     setProfileImg(e.target.files[0]);
    //     console.log(profileImg+"***");
    // };

    const onFileChange = (e) => {
      const file = e.target.files[0];
      console.log(file.name);
      setdomainImg(file);
    };
    
    useEffect(() => {
      console.log("Profile : "+domainImg);
    }, [domainImg]);

    const onTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleUpdate = async (event) => {
      // event.preventDefault();
      console.log(props.domain);
      try {
        const formData = new FormData();
        formData.append("domainImg", domainImg);
        console.log("***" + domainImg);
        formData.append("title", title);
        const response = await axios.put(
          `http://localhost:4000/dapi/domainput/${props.domain._id}`,
          formData,
          {}
        );
        console.log("Response"+response.data.message);
        const updateddomains = domainProfiles.map((domain) => {
          if (domain._id === props.domain._id) {
            return {
              ...domain,
              domainImg: domainImg ? URL.createObjectURL(domainImg) : null,
              title: title,
            };
          }
          return domain;
        });
        // setUserProfiles(updatedProfiles);
        props.setDoption(0);
      } catch (error) {
        console.log(
          error.response?.data?.error ||
            error.message ||
            "An error occurred while updating the profile"
        );
      }
    };

    

    return (
        <div className="container">
            <div className="container-fluid row justify-content-center px-0">
                <form onSubmit={handleUpdate}>
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

export default DomainUpdate;
