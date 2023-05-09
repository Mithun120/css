import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import './userlist.css';

const DomainList = (props) => {
  const [domainProfiles, setdomainProfiles] = useState([]);
  const {setDoption, setDomain}=props

  useEffect(() => {
    axios
      .get('http://localhost:4000/dapi/domainget')
      .then((res) => {
        const domainProfiles = res.data;
        setdomainProfiles(domainProfiles);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleDelete = (domainId) => {
    const updatedProfiles = domainProfiles.filter(
      (domain) => domain._id !== domainId
    );
    setdomainProfiles(updatedProfiles);
    axios
      .delete(`http://localhost:4000/dapi/domaindelete/${domainId}`)
      .then((response) => {
        console.log(response.data.message);
      })
      .catch((error) => {
        console.log(error.response.data.error);
      });
  };

  const handleUpdate = (domainProfile) => {

    // axios
    //   .put(`http://localhost:4000/api/${domainId}`, {
    //     profileImg: "new-profile-img",
    //     title: "new-title",
    //     desc: "new-desc",
    //     githublink: "new-github-link"
    //   }) 
    //   .then((response) => {
    //     console.log(response.data.message);
    //     const updatedProfiles = domainProfiles.map((profile) => {
    //       if (profile._id === domainId) {
    //         return {
    //           ...profile,
    //           profileImg: "new-profile-img",
    //           title: "new-title",
    //           desc: "new-desc",
    //           githublink: "new-github-link"
    //         };
    //       }
    //       return profile;
    //     });
        // setdomainProfiles(updatedProfiles);
        setDoption(1);
        setDomain(domainProfile);
      // })
      // .catch((error) => {
      //   console.log(error.response.data.error);
      // });
  }; 
    

  return (
    <div>
      <h2>Domains</h2>
      <ul>
        {domainProfiles.map((domainProfile) => (
          <li key={domainProfile._id}>
            <img src={domainProfile.domainImg} alt={domainProfile.title} />
            <h3>{domainProfile.title}</h3>
            <button onClick={() => handleUpdate(domainProfile)}>
              Update
            </button>
            <button onClick={() => handleDelete(domainProfile._id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DomainList;

