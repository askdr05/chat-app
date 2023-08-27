import React, { useEffect, useState } from 'react'
import "./_SideBar.scss"
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { getAllUsers } from '../../redux/slices/user/userApi'
import { useDispatch, useSelector } from 'react-redux'

import UserCard from '../userCard/UserCard'
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const SideBar = ({setToggleValue, toggleValue }) => {
  const dispatch = useDispatch()
  const [userSearch, setUserSearch] = useState("")

  const { users, loading } = useSelector(state => state.users)


  const handelSearch = (e) => {
    e.preventDefault()
    console.log(userSearch)
    if (!userSearch) {
      toast.warn("Please Enter something in search", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      return
    } else { dispatch(getAllUsers(userSearch)) }
  }

  useEffect(() => {
    
    if(userSearch.length>0){
      dispatch(getAllUsers(userSearch))
    }

  }, [userSearch,dispatch])
  return (
    <div className={toggleValue ? "sideBarActive" : "sideBar"}>
      <form className='searchBar' onSubmit={handelSearch}>
        <input type='text' placeholder='Name Or Email' value={userSearch} onChange={(e) => setUserSearch(e.target.value)} />
        <button>go</button>
      </form>
      <div className='sideBarContainer'>
        {loading ? <Skeleton count={6} height={25} /> :
          users.map((user, i) => {
            return <UserCard setToggleValue={setToggleValue}  user={user} key={i} />
          })
        }

      </div>


    </div>
  )
}

export default SideBar
