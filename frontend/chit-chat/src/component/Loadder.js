import React from 'react'
import ClipLoader from "react-spinners/ClipLoader";


const Loadder = ({loading}) => {
  return (
 <>
  <ClipLoader
        color="#36d7b7"
        loading= {loading} 
        size={40}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
 </>
  )
}

export default Loadder
