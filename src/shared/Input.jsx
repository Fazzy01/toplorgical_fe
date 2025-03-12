import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react'

const Input = ({
  id,
  name,
  value,
  type,
  required,
  placeholder,
  autoComplete,
  error,
  helpText,
  ...other
}) => {

    let [pwdEye, setPwdEye] = useState(false)

  return (
    <>
    {
        type== 'text' ? (
            <input
            id={id}
            name={name}
            type={type}
            required={required}
            aria-required={required ? 'true' : undefined}
            autoComplete={autoComplete}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={
              error ? `${id}-error` : helpText ? `${id}-help` : undefined
            }
            className={` border border-gray-300 rounded-sm text-sm  pl-[10px] py-[8px]
                 ${ error
                  ? 'input-border-error-message  ]'
                  : ' outline-none focus:bg-gray-100 focus:border-gray-300' }

              `}
              placeholder={placeholder}
          />

        ): type == 'password' ? (

            <div className="relative">
            <input
              id={id}
              name={name}
              type={pwdEye ? 'text' : 'password'}
              required={required}
              aria-required={required ? 'true' : undefined}
              autoComplete={autoComplete}
              aria-invalid={error ? 'true' : 'false'}
              aria-describedby={
                error ? `${id}-error` : helpText ? `${id}-help` : undefined
              }
              className={`w-full pr-10 border border-gray-300 text-sm rounded-sm  pl-[10px] py-[8px] ${
                error
                  ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                  : ' outline-none focus:bg-gray-100 focus:border-gray-300'
              } outline-none`}

              placeholder={placeholder}
            />
            <button
              type="button"
              onClick={() => setPwdEye((prev) => !prev)}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-500"
              aria-label={pwdEye ? "Hide password" : "Show password"}
            >
              {pwdEye ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
            </button>
            {error && (
              <p id={`${id}-error`} className="mt-2 text-sm text-red-600">
                {error}
              </p>
            )}
            {helpText && !error && (
              <p id={`${id}-help`} className="mt-2 text-sm text-gray-500">
                {helpText}
              </p>
            )}
          </div>
        ): type == 'email' ? (

            <input
            id={id}
            name={name}
            type={type}
            required={required}
            aria-required={required ? 'true' : undefined}
            autoComplete={autoComplete}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={
              error ? `${id}-error` : helpText ? `${id}-help` : undefined
            }
            className={` border border-gray-300 rounded-sm text-sm  pl-[10px] py-[8px]  ${
                error
                  ? 'input-border-error-message  ]'
                  : ' outline-none focus:bg-gray-100 focus:border-gray-300'
              }

              `}
              placeholder={placeholder}
          />

        ): type == 'textarea' ? (
            <textarea name={name} id={id}
            {...other}
            value={value}
            type={type}
            placeholder={placeholder}

            >

            </textarea>
        )

        : null
    }


    </>
  );
};
export default Input;