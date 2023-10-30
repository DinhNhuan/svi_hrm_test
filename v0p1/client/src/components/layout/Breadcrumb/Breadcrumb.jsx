import React from 'react'


const Breadcrumb = ({ breadcrumbs }) => {

    return (
        <div>
            {breadcrumbs && breadcrumbs.map((item, index) => {
                const slash = breadcrumbs.length - 1 > index ? '/ ' : ''
                return (

                    <span
                        key={index}
                        className={`text-white
                                    text-lg
                                    capitalize
                                    leading-8
                                    ${index < breadcrumbs.length - 1 || breadcrumbs.length === 1 ? 'font-bold' : 'opacity-80'}`
                        }
                    >
                        {item} {slash}
                    </span>
                )
            }
            )}
        </div >
    )
}

export default Breadcrumb