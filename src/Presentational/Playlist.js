import React from "react";
import Track from "./Track";
import trackListStyle from './Styles/Tracklist.module.css';
import playlistStyle from './Styles/Playlist.module.css'

export default function Playlist({playlist, removeFromPlaylist, name, changeName, saveToSpotify}) {
    return (
        <div className={trackListStyle.containerItem}>
            <form className={playlistStyle.form} onSubmit={(e) => { e.preventDefault(); saveToSpotify(); }}>
                <input className={playlistStyle.playlistInput} type="text" placeholder="Name it" value={name} onChange={changeName} required />
                <ul>
                    {playlist.map(track => (
                        <li className={trackListStyle.li} key={track.id}>
                            <Track song={track.song} artist={track.artist} album={track.album} />
                            <button className={trackListStyle.button} onClick={() => removeFromPlaylist(track)}>-</button>
                        </li>
                    ))}
                </ul>
                <input className={trackListStyle.submitButton} type="submit" value="Save to Spotify" />
            </form>
        </div>
    )
}