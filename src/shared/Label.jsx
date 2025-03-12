import React from 'react'

export default function Label({children, htmlFor, required, ...others}) {
  return (
    <>
      <label htmlFor= {htmlFor? htmlFor : 'id'} className='text-gray-600 text-md lg-small-caption mb-1'>
        {children} {required? `*`:' '}
      </label>
    </>
  )
}
