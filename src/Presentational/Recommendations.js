import React from "react";
import Track from "./Track";
import trackListStyle from './Styles/Tracklist.module.css';

export default function Recommendations({suggestions, addToPlaylist}) {
    return (
        <div>
            <ul className={trackListStyle.recContainer}>
                {suggestions.map((track) => (
                    <li className={trackListStyle.li} key={track.id}>
                        <Track song={track.song} artist={track.artist} album={track.album} />
                        <button className={trackListStyle.button} onClick={() => addToPlaylist(track)}>+</button>
                    </li>
                ))
               }
            </ul>
        </div>
    )
}