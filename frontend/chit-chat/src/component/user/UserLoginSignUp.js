import React, { useEffect, useRef, useState } from 'react'
import './_LoginSignUp.scss'
import { Link, useNavigate } from 'react-router-dom'
import { MdOutlineMail } from "react-icons/md"
import { BiLockOpen } from "react-icons/bi"
import { RxAvatar } from "react-icons/rx"
import { login } from '../../redux/slices/user/userApi'
import { register } from '../../redux/slices/user/userApi'
import { useDispatch, useSelector } from 'react-redux'
import { clearError } from '../../redux/slices/user/userLiginSignUpSlice'
import { toast } from 'react-toastify';
import Title from '../Title'

const UserLoginSignUp = () => {
    const loginTab = useRef(null)
    const registerTab = useRef(null)
    const switcherTab = useRef(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()


    //user data after login/Register
    const { loading, loggedIn, error } = useSelector(state => state.user)

    //login states
    const [loginEmail, setLoginEmail] = useState('')
    const [loginPassword, setLoginPassword] = useState('')

    //register states
    const [avatar, setAvatar] = useState('')
    const [avatarPreview, setAvatarPreview] = useState('https://cdn-icons-png.flaticon.com/512/147/147144.png');

    const [user, setUser] = useState({ name: "", email: "", password: "" })
    const { name, email, password } = user

    const registerDataChange = (e) => {
        if (e.target.name === 'avatar') {
            const reader = new FileReader()
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result)
                    setAvatar(reader.result)
                }
            }
            reader.readAsDataURL(e.target.files[0])
        }
        else {
            setUser({ ...user, [e.target.name]: e.target.value })
        }
    }

    const loginSubmit = (e) => {
        e.preventDefault()

        dispatch(login({ loginEmail, loginPassword }))
    }

    const registerSubmit = (e) => {
        e.preventDefault()
        const myForm = new FormData()
        myForm.set('name', name)
        myForm.set('email', email)
        myForm.set('password', password)
        myForm.set('avatar', avatar)
        // console.log(myForm.values())

        dispatch(register(myForm))
    }

    const switchTabs = (e, tab) => {
        if (tab === "login") {
            switcherTab.current.classList.add("shiftToLogin");
            switcherTab.current.classList.remove("shiftToRegister");


            registerTab.current.classList.remove("signUpFormShiftToLeft");
            loginTab.current.classList.remove("loginFormShiftToLeft");
        }
        if (tab === "register") {
            switcherTab.current.classList.add("shiftToRegister");
            switcherTab.current.classList.remove("shiftToLogin");

            registerTab.current.classList.add("signUpFormShiftToLeft");
            loginTab.current.classList.add("loginFormShiftToLeft");
        }
    };

    useEffect(() => {
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
            dispatch(clearError())
            console.log(error)
        }

        if (loggedIn) {
            navigate("/")
        }
    }, [dispatch, navigate, loggedIn, error])
    return (
        <>
        <Title title="Login-Sign Up"/>
        
        {loading ? <span>loading</span> :
            <div className='LoginSignUpContainer'>
                <div className='LoginSignUpBox'>
                    <div>
                        <div className='login_signUp_toggle'>
                            <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                            <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
                        </div>
                        <button ref={switcherTab}></button>
                    </div>
                    <form className='loginForm' ref={loginTab} onSubmit={loginSubmit}>
                        <div className='loginEmail'>
                            <MdOutlineMail className='icons' size={22} />
                            <input type='email'
                                placeholder='Email'
                                value={loginEmail}
                                onChange={(e) => setLoginEmail(e.target.value)}
                            />

                        </div>
                        <div className='loginPassword'>
                            <BiLockOpen className='icons' size={22} />
                            <input type='password'
                                placeholder='Password'
                                value={loginPassword}
                                onChange={(e) => setLoginPassword(e.target.value)}
                            />
                        </div>
                        <Link to='/password/forget'>Forgot Password ?</Link>
                        <button type='submit' className='loginBtn'>LOGIN</button>
                    </form>

                    <form
                        className='signUpForm'
                        ref={registerTab}
                        encType='multipart/form-data'
                        onSubmit={registerSubmit}>
                        <div className='signUpName'>
                            <RxAvatar className='icons' size={22} />
                            <input type='text'
                                placeholder='Name'
                                value={name}
                                name='name'
                                onChange={registerDataChange}
                            />
                        </div>
                        <div className='email'>
                            <MdOutlineMail className='icons' size={22} />
                            <input type='email'
                                placeholder='Email'
                                value={email}
                                name='email'
                                onChange={registerDataChange}
                            />
                        </div>
                        <div className='password'>
                            <BiLockOpen className='icons' size={22} />
                            <input type='password'
                                placeholder='Password'
                                value={password}
                                name='password'
                                onChange={registerDataChange}
                            />
                        </div>
                        <div className='registerImage'>
                            <img src={avatarPreview} alt='avatar' />
                            <input className='imgInput' type='file'
                                name='avatar'
                                accept='image/'
                                onChange={registerDataChange}
                            />
                        </div>
                        <button type='submit' className='signUpBtn'>REGISTER</button>
                    </form>

                </div>

            </div>

        }</>
    )
}

export default UserLoginSignUp
