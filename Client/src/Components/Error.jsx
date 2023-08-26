import React, { useContext, useState } from 'react'
import {Context} from '../Context/UserContext'

const Error = () => {
    const {error} = useContext(Context)
  return (
    <div className='text-white bg-red-500 w-full h-8 flex items-center px-3'>
      <p>Error: {error}</p>
    </div>
  )
}

export default Error
