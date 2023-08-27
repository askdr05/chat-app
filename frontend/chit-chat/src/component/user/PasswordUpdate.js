import React, { useEffect, useState } from 'react'
import "./_PasswordUpdate.scss"
import { useDispatch, useSelector } from 'react-redux'
import { loadUser, userPasswordUpdate } from '../../redux/slices/user/userApi'
import { clearError, reSetState } from '../../redux/slices/user/userUpdateSlice'
import { MdVpnKey } from "react-icons/md"
import { BiLockOpen } from "react-icons/bi"
import { useNavigate } from 'react-router-dom'
import {  toast } from 'react-toastify';
import Loadder from '../Loadder'
import Title from '../Title'
const PasswordUpdate = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { error, isUpdated, loading } = useSelector(state => state.updatedUser)

  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const updatePasswordSubmit = (e) => {
    e.preventDefault()

    const myForm = new FormData()

    myForm.set("oldPassword", oldPassword);
    myForm.set("newPassword", newPassword);
    myForm.set("confirmPassword", confirmPassword);

    dispatch(userPasswordUpdate(myForm))
  }

  useEffect(() => {
    if (error) {
      toast.error(error,
        {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light"
        });
      dispatch(clearError());
    }

    if (isUpdated) {
      toast.success("Password Updated Successfully",
        {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light"
        });

      dispatch(loadUser());

      navigate("/");
      dispatch(reSetState())
    }
  }, [dispatch, error, navigate, isUpdated])
  return (
    <>
      <Title title="Update Password"/>
      <div className="updatePasswordContainer">
        {loading ? <div style={{ margin: "auto" }}><Loadder loading={loading} /></div> :
          <div className="updatePasswordBox">
            <h2 className="updatePasswordHeading">Update Profile</h2>

            <form
              className="updatePasswordForm"
              onSubmit={updatePasswordSubmit}
            >
              <div className="loginPassword">
                <MdVpnKey size={22} />
                <input
                  type="password"
                  placeholder="Old Password"
                  required
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </div>

              <div className="loginPassword">
                <BiLockOpen size={22} />
                <input
                  type="password"
                  placeholder="New Password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="loginPassword">
                <BiLockOpen size={22} />
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
                value="Change"
                className="updatePasswordBtn"
              />
            </form>
          </div>
        }
      </div>



    </>
  )
}

export default PasswordUpdate
