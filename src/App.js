import React, {useState, useEffect} from 'react'
import SearchBar from './Presentational/SearchBar'
import Tracklist from './Presentational/Tracklist';
import { songMock } from './songMock';

function App() {
  
  return (
    <div>
      <h1>JAMMMING</h1>
      <SearchBar />
      <Tracklist />
    </div>
  );
}

export default App;
