import React, {useState, useEffect} from 'react'
import SearchBar from './Presentational/SearchBar'
import Tracklist from './Presentational/Tracklist';
import Playlist from './Presentational/Playlist';
import { getSpotifyToken, parseSpotifyData, uploadPlaylist } from './Spotify';

function App() {
  
  // Search query
  const [searchTerm, setSearchTerm] = useState('');
    const handleQuery = ({ target }) => setSearchTerm(target.value);

  // Search results
  const [tracklist, setTracklist] = useState([]);
  const showResults = searchResults => setTracklist(searchResults);

  // Playlist creation
  const [playlist, setPlaylist] = useState([]);
  const addToPlaylist = item => {
    const {song, artist, id, uri, album} = item;
    setPlaylist((prev) => [
      ...prev, 
      {
        song: song,
        artist: artist,
        id: id,
        uri: uri,
        album: album
      }
    ]);
  }

  const removeFromPlaylist = item => setPlaylist(prev => [...prev].filter(t => t.id !== item.id));
  const accessToken = getSpotifyToken();

  useEffect(() => {
    const fetchData = async () => {

        if (searchTerm.trim() === "") {
            return;
        }

        try {
            const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`, {
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            });

            if (!response.ok) {
                throw new Error('Invalid network response.');
            }

            const data = await response.json();
            const searchResults = parseSpotifyData(data);
            showResults(searchResults);
        } catch (error) {
            console.error('Error fetching data from Spotify API: ', error.message);
        }
    };

    fetchData();
}, [searchTerm, showResults]);

  // Search query handling
  const [name, setName] = useState('');
  const handleChange = ({target}) => {
    const value = target.value;
    setName(value);
  }

  // this one uploads the playlist to Spotify profile
  const saveToSpotify = async () => {
    const trackURIs = playlist.map(track => track.uri)
    await uploadPlaylist(name, trackURIs);
    setName(name)
    setPlaylist([]);
  }
  
  return (
    <div style={{margin: '0 5%'}}>
      <h1>JAMMMING</h1>
      <SearchBar showResults={showResults} searchTerm={searchTerm} handleQuery={handleQuery} />
      <div style={{display: 'flex'}}>
        <Tracklist tracklist={tracklist} addToPlaylist={addToPlaylist} />
        <Playlist playlist={playlist} removeFromPlaylist={removeFromPlaylist} name={name} changeName={handleChange} saveToSpotify={saveToSpotify} />
      </div>
    </div>
  );
}

export default App;
