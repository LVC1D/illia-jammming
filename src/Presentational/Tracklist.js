import React from 'react';
import Track from './Track';
import trackListStyle from './Styles/Tracklist.module.css';

function Tracklist({tracklist, addToPlaylist}) {
    return (
      <div className={trackListStyle.containerItem}>
        <ul className={trackListStyle.ul}>
          {tracklist && tracklist.length > 0 ? (
            tracklist.map((track) => (
              <li className={trackListStyle.li} key={track.id}>
                <Track song={track.song} artist={track.artist} album={track.album} />
                <button className={trackListStyle.button} onClick={() => addToPlaylist(track)}>+</button>
              </li>
            ))
          ) : (
            <p>No tracks available</p>
          )}
        </ul>
      </div>
    );
}

export default Tracklist;