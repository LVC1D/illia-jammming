import React from "react";
import Track from "./Track";

export default function Playlist({playlist, removeFromPlaylist, name, changeName, saveToSpotify}) {
    return (
        <div>
            <form onSubmit={(e) => { e.preventDefault(); saveToSpotify(); }}>
                <h2>{name}</h2>
                <input type="text" placeholder="Name your playlist" value={name} onChange={changeName} required />
                <ul>
                    {playlist.map(track => (
                        <li key={track.id}>
                            <Track song={track.song} artist={track.artist} album={track.album} />
                            <button onClick={() => removeFromPlaylist(track)}>-</button>
                        </li>
                    ))}
                </ul>
                <input type="submit" value="Save to Spotify" />
            </form>
        </div>
    )
}