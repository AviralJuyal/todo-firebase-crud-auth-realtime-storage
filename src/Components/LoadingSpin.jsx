import React from 'react'

const LoadingSpin = () => {
  return (
//     <div className="flex justify-center items-center">
//   <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
//     <span className="visually-hidden">...</span>
//   </div>
// </div>
<div className="flex items-center">
  <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full m-12" role="status">
    <span className="visually-hidden">.</span>
  </div>
</div>
  )
}

export default LoadingSpin