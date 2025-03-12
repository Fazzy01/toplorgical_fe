import React from 'react'
import {Link} from 'react-router-dom'

export default function Button({
                                   text,
                                   type,
                                   link,
                                   path,
                                   icon,
                                   bgColor,
                                   bgHover,
                                   width,
                                   padding,
                                   handleClick,
                                   ...other
                               }) {
    const btnStyle = `

${bgColor ? bgColor : 'bg-[var(--primary-color-600)] text-white'}
transition-all duration-[0.3s]

${width ? width : 'w-full '}
                  relative
                  overflow-hidden
                  bg-gray-10
                  border-[1px] border-green-600
                  bg-green-600
                  px-6
                  py-3
                  rounded-md
                  text-sm
                  font-medium
                  transition-colors
                  duration-700
                  ease-in-out
                  group
block
text-center
${padding ? padding : 'p-[14px_80px_14px_80px]'}

${icon && 'flex items-center'}

`
    return (
        <>
            {type === 'internal-link' ? (
                <Link to={path} className={btnStyle}>
                    {' '}
                    {icon && icon}
                    {text}
                </Link>
            ) : type === 'external-link' ? (
                <a href={path} className={btnStyle}>
                    {icon && icon} {text}
                </a>
            ) : (
                // <button
                //     type={`${type ? type : 'button'}`}
                //     onClick={handleClick}
                //     {...other}
                //     className={btnStyle}
                // >
                //     {icon && icon} {text}
                // </button>
                <button

                type={`${type ? type : 'button'}`}
                onClick={handleClick}
                {...other}
                className={btnStyle}

              >
                <span className="relative z-10  md:group-hover:text-[white]">    {icon && icon} {text}</span>
                <span
                  className= {`
                    absolute
                    inset-0
                    bg-[gray-300]
                    ${bgHover ? bgHover : 'md:group-hover:bg-green-500 '}
                    transition-all
                    duration-700
                    ease-in-out
                    transform
                    translate-y-full
                    group-hover:translate-y-0
                  `}
                ></span>
              </button>

            )}
        </>
    )
}