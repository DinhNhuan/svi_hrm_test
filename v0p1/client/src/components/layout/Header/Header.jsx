
import React from 'react';
import { LiaSignOutAltSolid } from 'react-icons/lia';
import { useDispatch, useSelector } from 'react-redux';
import { userLogout } from '@/redux/authSlice/AuthSlice';
import Breadcrumb from '../Breadcrumb'


const Header = ({ breadcrumbs }) => {


    // Access auth store to get the user info
    const { userInfo } = useSelector(state => state.auth)

    const dispatch = useDispatch();

    // Define the function to handle signing out
    const handleSignOut = async () => {
        await dispatch(userLogout())
    }

    // Render the header component
    return (
        <div className='
                        w-full
                        bg-primary-500
                        bg-gradient-to-r 
                        from-primary-400             
                        px-10'
        >
            <div className='py-2'>
                <div className='flex 
                                justify-between
                                items-center'
                >
                    {/* Breadcrumb component */}
                    <Breadcrumb breadcrumbs={breadcrumbs} />

                    {/* Sign-out button */}
                    <div
                        className='flex
                                    justify-between
                                    items-center
                                    gap-3
                                    border
                                    border-white 
                                    rounded-3xl 
                                    px-3
                                    py-1
                                    text-white
                                    shadow-xl
                                    cursor-pointer
                                    hover:bg-primary-400
                                    duration-300'
                        onClick={handleSignOut}
                    >
                        <span className='font-bold'><LiaSignOutAltSolid /> </span>
                        <span className='text-sm '>log out</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
