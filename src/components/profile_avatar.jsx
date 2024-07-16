import React, { useRef } from 'react'
import profileImg from '../assets/images/profile2.jpeg'
import axios from 'axios';
import { useSelector } from 'react-redux';
import { connectedUser } from '../redux/slices/authSlice';


function Profile_avatar() {

    const URL = 'http://localhost:4000/api/users/profile';

    const user = useSelector(connectedUser)

    const dblClick = () => {
        imgInput.current.click()
     }
    
   const imgInput = useRef()

   const handleSubmit = (event) => {
        const data = new FormData()
        data.append('file', event.target.files[0])
        data.append('userId', user._id)
        axios.post(`${URL}`, data).then((response) => {
        console.log(response)
        })
    }

  return (
    <div>
        <img 
        onDoubleClick={dblClick}
        className="w-32 h-32 border-2 border-blue-700 rounded-full 
        hover:border-4 hover:border-blue-400 hover:cursor-pointer" 
        src={profileImg}  alt="Extra large avatar" />
         <form onSubmit={handleSubmit} method="post" className='invisible' enctype="multipart/form-data">
            <input ref={imgInput} type="file" onChange={handleSubmit} name="avatar" />
          </form>
    </div>
  )
}

export default Profile_avatar