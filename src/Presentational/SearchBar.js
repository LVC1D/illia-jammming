import React from 'react'


export default function SearchBar({showResults, searchTerm, handleQuery}) {
    return (
        <form onSubmit={showResults}>
            <input type="text" required value={searchTerm} onChange={handleQuery} />
        </form>
    )
}