import { forwardRef, useState, useRef } from 'react';

const Input = forwardRef(
    (
        {
            type = 'text',
            label,
            labelDetail,
            isLabel,
            labelClass,
            id,
            error,
            defaultValue,
            fullWidth,
            ...props
        }, ref
    ) => {

        const [isFocused, setIsFocused] = useState(false)

        const handleFocus = () => {
            setIsFocused(true)
        }


        return (

            <div className={`flex flex-col justify-end gap-1  ${fullWidth ? 'w-full' : ''}`
            }>
                {label &&
                    <label
                        className={
                            `
                            ${labelClass}
                            cursor-pointer
                            text-sm
                            capitalize                                           
                            duration-500
                            select-none
                            ${isFocused && isLabel || defaultValue && isLabel ? 'text-primary-500 text-xs translate-y-0' :
                                isLabel ? 'translate-y-[250%] text-secondary-600' : 'text-secondary-600'
                            }
                           
                            `
                        }
                        htmlFor={id}
                    >{label} {props.required && <span className='text-red-500'>*</span>} {labelDetail && <small className='text-xs normal-case'>{labelDetail}</small>}</label>}
                <input
                    id={id}
                    type={type}
                    onFocus={handleFocus}
                    defaultValue={defaultValue}
                    {...props}
                    ref={ref}
                />
                {error && <span className='text-red-500 text-xs '>{error}</span>}
            </div >

        )
    }
);

export default Input