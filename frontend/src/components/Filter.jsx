import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHotel,
    faBed,
    faBuildingUser,
    faArrowRightToCity,
    faBuilding,
    faHouse,
    faMountainCity,
    faSnowflake,
    faShopLock,
    faCrown
} from '@fortawesome/free-solid-svg-icons';
// import { useEffect, useState } from 'react';
import { axiosInstance } from '../lib/axios.js';


const Filter = () => {
    const filterItems = [
        { id: 1, name: "Hostels", icon: faHotel, path: "/Hostels" },
        { id: 2, name: "Rooms", icon: faBed, path: "/Rooms" },
        { id: 3, name: "PGs", icon: faBuildingUser, path: "/PGs" },
        { id: 4, name: "Shared Flats", icon: faArrowRightToCity, path: "/Shared Flats" },
        { id: 5, name: "Apartments", icon: faBuilding, path: "/Studio Apartments" },
        { id: 6, name: "Cheap Rent", icon: faHouse, path: "/Cheap Rent" },
        { id: 7, name: "Iconic Cities", icon: faMountainCity, path: "/Iconic Cities" },
        { id: 8, name: "Luxury Villas", icon: faSnowflake, path: "/Luxury Villas" },
        { id: 9, name: "House", icon: faShopLock, path: "/House" },
        { id: 10, name: "Penthouses", icon: faCrown, path: "/Penthouses" }
    ];
    return (
        <div className="w-full max-w-screen-xl mx-auto">
                <div className="flex item-center gap-3 sm:gap-4 md:gap-6 py-3 overflow-x-auto scroll-smooth no-scrollbar ">
                    {filterItems.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => filterFetchData(item.path)}
                            className="flex flex-col items-center cursor-pointer text-gray-400 hover:text-gray-600 min-w-[90px] flex-shrink-0 rounded-xl shadow-sm hover:scale-105 transition-transform"
                        >
                            <FontAwesomeIcon
                                icon={item.icon}
                                className="text-lg md:text-xl mb-2"
                            />
                            <span className="text-xs text-center">{item.name}</span>
                        </div>
                    ))}
                </div>
        </div>
    )
};

export default Filter;