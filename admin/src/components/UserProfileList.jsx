import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { Link } from 'react-router-dom';
import '../assets/css/list.css';

const UserProfileList = (props) => {
  const [userProfiles, setUserProfiles] = useState([]);
  const {setOption, setProfile}=props

  useEffect(() => {
    axios
      .get('http://localhost:4000/api/api/user-profiles')
      .then((res) => {
        const userProfiles = res.data;
        setUserProfiles(userProfiles);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleDelete = (userId) => {
    const updatedProfiles = userProfiles.filter(
      (profile) => profile._id !== userId
    );
    setUserProfiles(updatedProfiles);
    axios
      .delete(`http://localhost:4000/api/${userId}`)
      .then((response) => {
        console.log(response.data.message);
      })
      .catch((error) => {
        console.log(error.response.data.error);
      });
  };

  const handleUpdate = (userProfile) => {

        setOption(1);
        setProfile(userProfile);
      // })
      // .catch((error) => {
      //   console.log(error.response.data.error);
      // });
  }; 
    

  return (
    <div>
      <h2>Projects</h2>
      <ul className="flexbox">
        {userProfiles.map((userProfile) => (
          <li key={userProfile._id} className='li-items'> 
            <img src={userProfile.profileImg} alt={userProfile.title} />
            <h3>{userProfile.title}</h3>
            <p>{userProfile.desc}</p>
            <a href={userProfile.githublink}>Github Link</a>
            <button onClick={() => handleUpdate(userProfile)}>
              Update
            </button>
            <button onClick={() => handleDelete(userProfile._id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserProfileList;

