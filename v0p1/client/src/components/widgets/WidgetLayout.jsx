import React from 'react'
import WidgetHeader from './WidgetHeader'

const WidgetLayout = ({ title, widgetIcon, children }) => {
    return (
        <div className="bg-white p-3 shadow-xl rounded-2xl w-full h-full">

            {/* header */}
            < WidgetHeader title={title} icon={widgetIcon} />

            {/* content */}
            <div className='border-t pt-3 border-secondary-200'>
                {children}
            </div>
        </div>
    )
}

export default WidgetLayout