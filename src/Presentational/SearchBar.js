import React from 'react'

export default function SearchBar({showResults, result, setQuery}) {
    return (
        <form onSubmit={showResults}>
            <input type="text" required value={result} onChange={setQuery} />
            <input type="submit" value="Search songs" />
        </form>
    )
}