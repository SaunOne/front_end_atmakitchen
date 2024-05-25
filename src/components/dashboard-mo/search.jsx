import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { GlobalContext } from '@/context/global_context';
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
        <div className="relative flex flex-1 flex-shrink-0">
            <label htmlFor="search" className="sr-only">
                Search
            </label>
            <input
                className="peer block w-full text-black rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                placeholder={placeholder}
                onChange={(e) => {
                    handleSearch(e.target.value);
                }}
            />
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
        </div>
    );
}
