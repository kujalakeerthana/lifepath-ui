import React from 'react'
import Leftpart from './leftpart'
import Rightpart from './rightpart'
const pagecontent1 = () => {
  return (
    <div className="flex justify-between items-center w-full h-[90vh]">
        <Leftpart />
        <Rightpart />
    </div>
  )
}

export default pagecontent1