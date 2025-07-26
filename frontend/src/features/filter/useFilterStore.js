import { create } from 'zustand';
import { axiosInstance } from '../../lib/axios';

export const useFilterStore = create((set) => ({
    selectedFilter: "/Rooms",
    filteredListings: [],
    isLoading: false,
    isError: null,

    setSelectedFilter: async (category) => {
        set({ isLoading:true, isError:null, selectedFilter: category });
        try {
            const result = await axiosInstance.get(`/filters${category}`);
            set({ filteredListings: result.data, isLoading:false });
        } catch (error) {
            set({ filteredListings:[] ,isLoading:false, isError:true});
            console.error("Error fetching listings from filter", error);
        }
    },
}));
