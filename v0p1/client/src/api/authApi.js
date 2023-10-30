import axios from './axios/AxiosInstance';

export const signIn = async(userForm) => {
    try{

        const response = await axios.post('/auth/sign-in', userForm)
        const {data} = response;
        return data

    } catch(err){
        throw('SignIn occured error')
    }
}

export const signOut = async()=>{
     try{
        const response = await axios.get('/auth/sign-out')
        const {data} = response;
        return data

    } catch(err){
        throw('SignOut occured error')
    }
}

