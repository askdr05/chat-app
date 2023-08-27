import React, { useEffect} from 'react'
import { loadUser } from './redux/slices/user/userApi';
import { useDispatch, useSelector } from 'react-redux';
import {
  Routes,
  Route,

} from "react-router-dom";
import { clearError } from './redux/slices/user/userLiginSignUpSlice';
import UserLoginSignUp from './component/user/UserLoginSignUp';
import ProtectedRoute from './component/ProtectedRoute';
import UserForgotPassword from './component/user/UserForgotPassword';
import HomePage from './component/homePage/HomePage';
import PasswordReset from './component/user/PasswordReset';
import UserProfileUpdate from './component/user/UserProfileUpdate';
import PasswordUpdate from './component/user/PasswordUpdate';
import { ToastContainer, toast } from 'react-toastify';
import { accessAllNotifications } from './redux/slices/noficationApi';
const App = () => {
  const dispatch = useDispatch()

  const { loggedIn, error,loggedOutMessage } = useSelector(state => state.user)


  useEffect(() => {
    if (error) {
     
      dispatch(clearError())
    }
    if (loggedOutMessage) {
      toast.success(loggedOutMessage,
        { position: "top-center",
         autoClose: 5000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined,
         theme: "light"});
      dispatch(clearError())
    }
    
    dispatch(loadUser())
    dispatch(accessAllNotifications())

    // console.count()
  }, [dispatch,loggedOutMessage,error])
  return (
   <>
   
   <Routes>
      <Route element={<ProtectedRoute loggedIn={loggedIn} />} >
        <Route path="/" exact element={<HomePage />} />
        <Route path='/me/update' exact element={<UserProfileUpdate />} />
        <Route path='/me/update/password' exact element={<PasswordUpdate />} />
      </Route>
      <Route path="/login" exact element={<UserLoginSignUp />} />
      <Route path="/password/forget" exact element={<UserForgotPassword />} />
      <Route path="/password/reset/:token" exact element={<PasswordReset />} />
    </Routes>
     <ToastContainer/>
   </>
   
  );
}

export default App;
