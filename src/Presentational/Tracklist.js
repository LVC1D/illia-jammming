import React from 'react';
import Track from './Track';

function Tracklist({tracklist, addToPlaylist}) {
  return (
    <ul>
      {tracklist && tracklist.length > 0 ? (
        tracklist.map((track) => (
          <li key={track.id}>
            <Track song={track.song} artist={track.artist} album={track.album} />
            <button onClick={() => addToPlaylist(track)}>+</button>
          </li>
        ))
      ) : (
        <p>No tracks available</p>
      )}
    </ul>
  );
}

export default Tracklist;