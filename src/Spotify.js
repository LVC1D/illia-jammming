export const getSpotifyToken = () => {
    function getAccessTokenFromHash() {
        const hashParams = window.location.hash.substring(1).split('&');
        const params = {};
        for (let i = 0; i < hashParams.length; i++) {
          const [key, value] = hashParams[i].split('=');
          params[key] = decodeURIComponent(value);
        }
        return params.access_token || null;
    }
  
    // Function to check if the access token is present in the URL hash
    function hasAccessToken() {
        return window.location.hash.includes('access_token');
    }
  
      // Main function to obtain the access token
     
    if (hasAccessToken()) {
      const accessToken = getAccessTokenFromHash();
      return accessToken;
    } else {
          // Redirect the user to the Spotify authorization URL
          const clientId = '5d558001059e4f058c05353caae87dee';
          const redirectUri = 'http://localhost:3000/callback';
          const scope = 'user-read-private user-read-email playlist-modify-public playlist-modify-private';
  
          const authorizationUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}&response_type=token&show_dialog=true`;
  
          window.location.href = authorizationUrl;
    }
     
}

export const parseSpotifyData = (data) => {
    if(!data.tracks || !data.tracks.items) {
        return [];
    }

    return data.tracks.items.slice(0, 10).map(item => ({
        artist: item.artists.length > 0 ? item.artists[0].name : 'Unknown artist',
        song: item.name,
        album: item.album ? item.album.name : 'Unknown album',
        id: item.id,
        uri: item.uri
    }))
}



export const uploadPlaylist = async (name, trackURIs) => {
    try {
        const accessToken = await getSpotifyToken();

        const getSpotifyId = async () => {
            const idEndpoint = 'https://api.spotify.com/v1/me'; 
            try {
                const response = await fetch(idEndpoint, {
                    method: 'GET',
                    headers: {
                        "Authorization": `Bearer ${accessToken}`
                    }
                });
        
                if (!response.ok) {
                    throw new Error('Invalid network response.');
                }
        
                const myProfile = await response.json();
                return myProfile.id;
            } catch(e) {
                console.log(e);
            }
        
        }

        const createPlaylist = async () => {
            try {
                const spotifyId = await getSpotifyId();
                const response = await fetch(`https://api.spotify.com/v1/users/${spotifyId}/playlists`, {
                        method: 'POST',
                        headers: {
                            "Authorization": `Bearer ${accessToken}`,
                            "Content-type": "application/json"
                        },
                        body: JSON.stringify({
                        "name": `${name}`,
                        "description": "Some playlist sent from Jammming",
                        "public": true
                    })
                    });

                    if (!response.ok) {
                        throw new Error('Invalid network response.');
                    }

                    const customPlaylist = await response.json();
                    return customPlaylist.id;
            } catch(e) {
                console.log(e)
            }
        }

            const playlistId = await createPlaylist();
            const spotifyId = await getSpotifyId();
            try {
               
                const response = await fetch(`https://api.spotify.com/v1/users/${spotifyId}/playlists/${playlistId}/tracks`, {
                    headers: {
                        "Authorization": `Bearer ${accessToken}`,
                        "Content-type": "application/json"
                    },
                    method: 'POST',
                    body: JSON.stringify({ uris: trackURIs })
                })
                if(response.ok) {
                    const jsonResponse = response.json();
                    return jsonResponse;
                }
            }
            catch(e) {
                console.log(e)
            }
        
        
    } catch(error) {
        console.log(error)
    }
}

export const parseRecommendations = data => {
    
    if(!data.tracks || !data.seeds) {
        return [];
    }

    return data.tracks.map(item => ({
        artist: item.artists.length > 0 ? item.artists[0].name : 'Unknown artist',
        song: item.name,
        album: item.album ? item.album.name : 'Unknown album',
        id: item.id,
        uri: item.uri 
    }))
}

export const fetchRecommendations = async(trackId) => {
    try {
        const accessToken = await getSpotifyToken();
        const response = await fetch(`https://api.spotify.com/v1/recommendations?limit=5&seed_genres=electronic&seed_tracks=${trackId}`, {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            },
            method: 'GET'
        });

        if(response.ok) {
            const jsonResponse = await response.json();
            const recommendations = parseRecommendations(jsonResponse)
            return recommendations;
        }
    } catch(e) {
        console.error(`Error fetching recommendations: ${e.message}`);
    }
}

