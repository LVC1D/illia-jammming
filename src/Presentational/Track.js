import React from 'react'

function Track({song, artist, id, album}) {
   return (
    <div key={id}>
        <h3>{song}</h3>
        <p>{artist} | {album}</p>    
    </div>
   )
}

export default Track;