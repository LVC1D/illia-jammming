import React, {useState, useEffect} from 'react'
import SearchBar from './Presentational/SearchBar'
import Tracklist from './Presentational/Tracklist';
import Playlist from './Presentational/Playlist';
import { songMock } from './songMock';

function App() {
  
  const [result, setResult] = useState('');
  const handleQuery = ({target}) => {
    const value = target.value;
    setResult(value);
  }
  
  const [tracklist, setTracklist] = useState([]);
  const handleSubmit = e => {
    e.preventDefault();
    setTracklist(songMock);
  }

  const [playlist, setPlaylist] = useState([]);

  const addToPlaylist = item => {
    const {song, artist, id} = item;
    setPlaylist((prev) => [
      ...prev, 
      {
        song: song,
        artist: artist,
        id: id
      }
    ]);
  }

  const removeFromPlaylist = item => setPlaylist(prev => [...prev].filter(t => t.id !== item.id));

  const [name, setName] = useState('');
  const handleChange = ({target}) => {
    const value = target.value;
    setName(value);
  }

  const saveToSpotify = e => {
    e.preventDefault();

  }
  
  return (
    <div style={{margin: '0 5%'}}>
      <h1>JAMMMING</h1>
      <SearchBar showResults={handleSubmit} result={result} setQuery={handleQuery} />
      <div style={{display: 'flex'}}>
        <Tracklist tracklist={tracklist} addToPlaylist={addToPlaylist} />
        <Playlist playlist={playlist} removeFromPlaylist={removeFromPlaylist} name={name} changeName={handleChange} saveToSpotify={saveToSpotify} />
      </div>
    </div>
  );
}

export default App;
