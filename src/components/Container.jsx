import React from 'react'

function Container({children }) {
  return (
    <>
    <div className='pt-[80px] pl-[250px] max-sm:pl-0 bg-[#121317] absolute right-0 left-0 top-0 -z-10 bottom-0'>
      {children}
    </div>
    </>
  )
}

export default Container
