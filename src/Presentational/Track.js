import React from 'react'

function Track({song, artist, id}) {
   return (
    <div key={id}>
        <h3>{song}</h3>
        <p>{artist}</p>    
    </div>
   )
}

export default Track;