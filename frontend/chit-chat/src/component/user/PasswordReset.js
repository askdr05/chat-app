import React, { useEffect, useState } from 'react'
import "./_PasswordReset.scss"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { BiLockOpen } from "react-icons/bi"
import { clearError,resetState } from '../../redux/slices/user/passwordResetSlice'
import { userPasswordReset } from '../../redux/slices/user/userApi'
import { toast } from 'react-toastify';
import Loadder from '../Loadder'
import Title from '../Title'
const PasswordReset = () => {
  const {token} = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {error,success,loading} = useSelector(state=> state.userPasswordReset)

    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const resetPasswordSubmit = (e) => {
        e.preventDefault()

        const myForm = new FormData()
        myForm.set("newPassword", newPassword);
        myForm.set("confirmPassword", confirmPassword);

        dispatch(userPasswordReset({token,myForm}))
    }

    useEffect(()=>{
     if(error){
      toast.error(error,
        { position: "bottom-center",
         autoClose: 5000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined,
         theme: "light"});
        dispatch(clearError())
     }
     if(success){
      toast.success('Password Reset Done Successfully',
        { position: "top-center",
         autoClose: 5000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined,
         theme: "light"});
        navigate('/login')
        dispatch(resetState())
     }
    },[error,dispatch,success,navigate])
  return (
    <>
    <Title title= "Reset Password"/>
      <div className="resetPasswordContainer">
            {loading?<Loadder loading={loading}/>:
            <div className="resetPasswordBox">
            <h2 className="resetPasswordHeading">Reset Password</h2>

            <form
              className="resetPasswordForm"
              onSubmit={resetPasswordSubmit}
            >
              <div className="loginPassword">
                <BiLockOpen size={22}/>
                <input
                  type="password"
                  placeholder="New Password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="loginPassword">
                <BiLockOpen  size={22}/>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <input
                type="submit"
                value="Reset"
                className="resetPasswordBtn"
              />
            </form>
          </div>
            }
          </div>
    </>
  )
}

export default PasswordReset
