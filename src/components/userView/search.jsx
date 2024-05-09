import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { GlobalContext } from '@/context/context';
import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDebouncedCallback } from 'use-debounce';

export default function Search({ placeholder }) {
    const { search, setSearch } = useContext(GlobalContext);
    const location = useLocation();

    useEffect(() => {
        setSearch("");
    }, [location.pathname]);

    const handleSearch = useDebouncedCallback((term) => {
        setSearch(term);
        console.log(`Search term: ${search}`);
    }, 500);


    return (
        <>
            <input
                className="bg-[#FFFAED] peer block w-[40%] rounded-md text-black  border border-gray-400 py-[4px] pl-10 text-sm outline-2 placeholder:transparent"
                placeholder={placeholder}
                onChange={(e) => {
                    handleSearch(e.target.value);
                }}
            />
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
        </>
    );
}
