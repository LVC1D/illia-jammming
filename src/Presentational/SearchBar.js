import React from 'react'
import searchStyles from './Styles/SearchBar.module.css';

export default function SearchBar({showResults, searchTerm, handleQuery}) {
    return (
        <form className={searchStyles.searchForm} onSubmit={showResults}>
            <input type="text" required value={searchTerm} onChange={handleQuery} placeholder='Search a track' />
        </form>
    )
}