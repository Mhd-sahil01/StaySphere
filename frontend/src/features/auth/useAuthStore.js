import { create } from 'zustand';
import { axiosInstance } from '../../lib/axios';
import { toast } from 'react-hot-toast';

export const useAuthStore = create((set) => ({
    user: null,
    isAuthenticated: false,
    isLogin: false,
    isSignin: false,
    isCheckingAuth: true,

    checkAuth: async () => {
        try {
            const result = await axiosInstance.get("auth/status");
            set({
                user: result.data,
                isAuthenticated: isAuthenticated,
            })
        } catch (error) {
            console.log("Error in checkAuth:", error);
        } finally {
            set({isCheckingAuth: false})
        }
    },

    signup: async (data) => {
        try {
            set({isSignin: true});
            const result = await axiosInstance.post("auth/signup", data);
            set({user: result.data})
            toast.success("Account created sucessfully");
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error);
        } finally {
            set({isSignin: false});
        }
    },

    login: async (data) => {
        try{
            set({isLogin: true});
            const result = await axiosInstance.post("auth/login", data);
            set({user: result.data});
            console.log(result.data);
            toast.success("Logged in sucessfully");
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error);
        } finally {
            set({isLogin: false});
        }
    },

    logout: async () => {
        try {
            await axiosInstance.get("auth/logout");
            set({user: null, isAuthenticated: false});
            toast.success("Loggout successfully");
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
}));