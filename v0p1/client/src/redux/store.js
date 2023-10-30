import { configureStore } from '@reduxjs/toolkit';
import authSlice from '@/redux/authSlice/AuthSlice'


export const store = configureStore({
    reducer: {
        auth: authSlice,
    }
})

