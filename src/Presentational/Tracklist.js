import React from 'react';
import Track from './Track';

function Tracklist({tracklist, addToPlaylist}) {
    return (
        <ul>
          {tracklist.map(track => (
            <li key={track.id}>
              <Track song={track.song} artist={track.artist} />
              <button onClick={() => addToPlaylist(track)}>+</button> 
            </li>
          ))}
        </ul>
      );
}

export default Tracklist;