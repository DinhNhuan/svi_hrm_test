import React from 'react'


const MyActionItem = ({ action, itemClick }) => {

    const handleItemClick = () => {
        { itemClick && itemClick() }
    }

    return (
        <div className="flex  gap-2 items-center justify-between"
            onClick={handleItemClick}
        >
            <div className='w-9 h-9  bg-secondary-100  border grow rounded-full overflow-hidden'>
                <img src={action.userAvatar} alt="user avatar" className="object-cover" />
            </div>

            <div className='flex flex-col text-xs text-secondary-700'>
                {/* top title */}
                {action?.topTitle && <small className='capitalize'>{action.topTitle}</small>}

                {/* title */}
                {action?.title && <span className='font-bold'>{action.title}</span>}

                {/* sub title */}
                {action?.subTitle && <small>{action.subTitle}</small>}

            </div>
        </div >
    )
}

export default MyActionItem