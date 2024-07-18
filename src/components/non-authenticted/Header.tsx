import React from 'react'

function Header() {
  return (
    <div className='flex flex-row justify-between'>
   <div>

<div className='text-2xl potta-one-regular'>MSP ASSIGNMENT</div>
</div>

<div className='flex flex-row justify-end items-center'>
<div className='px-5'>
    FQA
   
</div>
<div className='primary-blue px-5'>
    Sign up  <i className="fa-solid fa-pen-to-square"></i>
</div>
<div className='primary-blue px-5' >
    Login <i className="fa-solid fa-right-to-bracket"></i>
</div>
</div>



    </div>
  )
}

export default Header