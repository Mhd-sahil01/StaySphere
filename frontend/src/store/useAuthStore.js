import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';

export const useAuthStore = create((set) => ({
    user: null,
    isAuthenticated: false,
    isLoggin: false,
    isSignin: false,
    isCheckingAuth: true,

    checkAuth: async () => {
        try {
            const result = await axiosInstance.get("auth/status");
            set({
                user: result.data,
                isAuthenticated: data.isAuthenticated,
            })
        } catch (error) {
            console.log("Error in checkAuth:", error);
        } finally {
            set({isCheckingAuth: false})
        }
    }
}))