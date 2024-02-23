import React from 'react';
import listStyles from './Styles/Track.module.css';

function Track({song, artist, id, album}) {
   return (
    <div key={id}>
        <h3 className={listStyles.h3}>{song}</h3>
        <p className={listStyles.p}>{artist} | {album}</p>    
    </div>
   )
}

export default Track;