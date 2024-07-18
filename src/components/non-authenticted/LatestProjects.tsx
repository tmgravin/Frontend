import React from 'react'

function LatestProjects() {

    const projectitle="home aoutmation sustem"
    const amoutn=200

const discription="Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe laudantium debitis blanditiis quam nostrum eaque mollitia, atque eveniet consectetur cumque illo beatae consequuntur. Unde, reiciendis maxime? Totam beatae laboriosam a."

  return (
    <div className='flex flex-col shadow-md w-1/4'>

<div className='underline'>
    Home Automation System
</div>
<div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe laudantium debitis blanditiis quam nostrum eaque mollitia, atque eveniet consectetur cumque illo beatae consequuntur. Unde, reiciendis maxime? Totam beatae laboriosam a.
</div>

<div className='flex flex-row'>s
<div>
Project Amount:
</div>
<div>$150</div>
</div>
<div>
    <button className='bg-blue-600 text-white'>apply now</button>
</div>
    </div>

  )
}

export default LatestProjects