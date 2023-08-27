import { useDispatch, useSelector } from "react-redux"
import "./_UserForgotPassword.scss"
import React, { useEffect, useState } from 'react'
import { userForgotPassword } from "../../redux/slices/user/userApi"
import { clearError,  } from "../../redux/slices/user/passwordResetSlice"
import { MdOutlineMail } from "react-icons/md"
import { resetState } from "../../redux/slices/user/passwordResetSlice"
import {  toast } from 'react-toastify';
import Loadder from "../Loadder"
import Title from "../Title"
const UserForgotPassword = () => {
    const dispatch = useDispatch()

    const { error, message, loading }  = useSelector(state=>state.userPasswordReset)
    
    const [email, setEmail] = useState("")

    const forgotPasswordSubmit = (e) => {
        e.preventDefault();
    
        const myForm = new FormData();
    
        myForm.set("email", email);
        dispatch(userForgotPassword(myForm));
      };

      useEffect(()=>{
        if (error) {
          toast.error(error,
            { position: "bottom-center",
             autoClose: 5000,
             hideProgressBar: false,
             closeOnClick: true,
             pauseOnHover: true,
             draggable: true,
             progress: undefined,
             theme: "light"});
            dispatch(clearError());
          }
      
          if (message) {
            toast.success(message,
              { position: "top-center",
               autoClose: 5000,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: true,
               progress: undefined,
               theme: "light"});
            dispatch(resetState())
          }
      },[error,dispatch,message])
  return (
    <>
    <Title title="Forgot Password"/>
    <div className="forgotPasswordContainer">
           {loading?<Loadder loading={loading}/>:
            <div className="forgotPasswordBox">
            <h2 className="forgotPasswordHeading">Forgot Password</h2>

            <form
              className="forgotPasswordForm"
              onSubmit={forgotPasswordSubmit}
            >
              <div className="forgotPasswordEmail">
              <MdOutlineMail className='icons' size={22} />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <input
                type="submit"
                value="Send"
                className="forgotPasswordBtn"
              />
            </form>
          </div>
           }
          </div>
   
   </>
  )
}

export default UserForgotPassword
