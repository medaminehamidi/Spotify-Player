let accessToken;
let expiresIn;

const clientId = 'c821d21bce4546deacc03df055f4ff8a';

const spotifyPlaylistAPI = 'https://api.spotify.com/v1/users/${userId}/playlists';
const spotifyPlaylistTracksAPI = 'https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks';
const spotifyRedirectUrl = 'http://localhost:3000/';

const spotifySearchAPI = 'https://api.spotify.com/v1/search';
const spotifyUserProfileAPI = 'https://api.spotify.com/v1/me';

const Spotify = {

    getAccessToken(){
      
        let localStorageAccessToken =  localStorage.getItem('accessToken');
        
        // 1. case: already there?
        if(localStorageAccessToken){

            localStorageAccessToken = JSON.parse(localStorageAccessToken);

            let now = (new Date()).getSeconds();
            let accessTokenStartIn = (new Date(localStorageAccessToken.startIn)).getSeconds();
            
            if(localStorageAccessToken.expiresIn < (now - accessTokenStartIn)){
                // expired
                localStorage.removeItem('accessToken');
                // get a new from the url
                this.getAccessTokenFromAPI();
            }else{
                // still exist
                return localStorageAccessToken.accessToken;
            }
        }else{
            // no access token found
            this.getAccessTokenFromAPI();
        }  
    },

    getAccessTokenFromAPI(){
        let url = window.location.href;
        accessToken = this.extract(url, "access_token=", "&");
        if (accessToken) {
            expiresIn = this.extract(url, "expires_in=", "&");
            localStorage.setItem('accessToken',JSON.stringify({
                accessToken : accessToken,
                expiresIn : expiresIn * 1000,
                startIn: new Date()
            }))
            return accessToken;
        } else {
            // 3. case: fetch from spotify
            window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-private&redirect_uri=${spotifyRedirectUrl}`;
        }
    },

    search(term) {   
        return fetch(`${spotifySearchAPI}?type=track&q=${term}`,{headers: this.buildAuthorizationHeader()})
            .then(response => response.json())
            .then(jsonResponse => {
                if (jsonResponse.tracks) {
                    return jsonResponse.tracks.items.map(function(track) {
                        return {
                            id: track.id,
                            name: track.name,
                            uri: track.uri,
                            album: track.album.name,
                            artist: track.artists[0].name,
                            preview: track.preview_url
                        }}
                    )}
                else {
                    return [];
                }
            });
    },

    savePlaylist(name, trackURIs) {
        //fetch the user id and call createPlayListWithTracks methode to actually save the playlist
        return fetch(`${spotifyUserProfileAPI}`,{headers: this.buildAuthorizationHeader()})
            .then(response => response.json())
            .then(jsonResponse => {
                let userId = jsonResponse.id;
                return this.createPlaylistWithTracks(userId, name, trackURIs);
            });
    },

    createPlaylistWithTracks(userId, playlistName, playlistTracks) {

        let jsonBody = JSON.stringify({name: playlistName, public: false});
        let url = spotifyPlaylistAPI.replace("${userId}", userId);

        return fetch(url, { headers: this.buildAuthorizationHeader(), method:'POST', body: jsonBody})
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Request failed!');
            })
            .then(jsonResponse => {
                console.log("playlist successful created.");
                let playlistId = jsonResponse.id;
                return this.saveTracksToPlaylist(userId, playlistId, playlistTracks);
            });
    },

    saveTracksToPlaylist(userId, playlistId, playlistTracks) {

        let jsonBody = JSON.stringify(playlistTracks);
        let url = spotifyPlaylistTracksAPI.replace("${userId}", userId).replace("${playlistId}", playlistId);

        return fetch(url, { headers: this.buildAuthorizationHeader(), method:'POST', body: jsonBody})
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Request failed!');
            })
            .then(jsonResponse => {
                console.log("tracks successful stored");
                return jsonResponse.snapshot_id;
            });
    },






    buildAuthorizationHeader() {
        let token = this.getAccessToken();
        return {Authorization: `Bearer ${token}`};
    },

    // extracts everything between the end of the keyword and the limiter from the string if the keyword was not found return undefined. 
    // need some tests for this`
    extract(string, keyword, limiter) {
        let startIndex = string.indexOf(keyword);
        if (startIndex !== -1) {
            // add the length of the keyword to the start position to get the "real" start
            startIndex += keyword.length;
            let endIndex = string.indexOf(limiter, startIndex);
            if (endIndex !== -1) {
                return string.slice(startIndex, endIndex);
            } else {
                return string.slice(startIndex);
            }
        }
        return undefined;
    }
}

export default Spotify ;