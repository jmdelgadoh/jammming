const clientID = '097b98d45ae04d7dbf5117d81409e256';
// const redirectURI = 'http://xunuxjammm.surge.sh';
const redirectURI = 'http://localhost:3000/';
let accessToken = '';


const Spotify = {
	getAccessToken(){
		if(accessToken !== ''){
			return accessToken;
		}

		const accessTokenFromURL = window.location.href.match(/access_token=([^&]*)/);
		const expirationFromURL = window.location.href.match(/expires_in=([^&]*)/);

		if(accessTokenFromURL && expirationFromURL){
			accessToken = accessTokenFromURL[1];
			let expirationTime = Number(expirationFromURL[1]);

			window.setTimeout(()=> accessToken ='',expirationTime * 1000);
			window.history.pushState('Access Token', null, '/');

			return accessToken;

		} else {
			const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-private,playlist-modify-public&redirect_uri=${redirectURI}`
			window.location=accessUrl;

		}

	},

	search(term){
		accessToken = this.getAccessToken();
		const endpoint = `https://api.spotify.com/v1/search?type=track&q=${term}`
		return fetch(
				endpoint,
				{
				  headers: {Authorization: `Bearer ${accessToken}`}
				}
				).then(response=>{
					if(response.ok){
						return response.json();
					} throw new Error('Woops Request failed!');}, 
					networkError => console.log(networkError.message)
				).then(json=>{
					
					if (!json.tracks) {
						return [];
					}
					let theSearch = json.tracks.items.map(track=>(
 						{
 							id: track.id,
							name: track.name,
							artist: track.artists[0].name,
							album: track.album.name,
							uri: track.uri
 						}));
					
					return theSearch;
				});
	},

	savePlaylist(playlistName,playlistTracks){
		const userToken = this.getAccessToken();
		const headers =  {"Authorization": `Bearer ${userToken}`}
		let userID = '';
		console.log(playlistName,playlistTracks);
		const baseUrl='https://api.spotify.com/v1';
		
		return fetch(baseUrl+'/me',{headers : headers}).then(response =>{
			if(response.ok){
				return response.json();
			}
			throw new Error('Woops there was a fetch error!');
			},networkError => {console.log(networkError.message)})
		.then(data => {
			// console.log(data);
			userID=data.id;
		
			return fetch(`${baseUrl}/users/${userID}/playlists`,
				{
					method: 'POST',
					headers: headers,
					body: JSON.stringify({
							name: playlistName,
							description: 'New description',
							public: false
						})
				}).then(response => {						
						return response.json();
						 // throw new Error('oink');
					}, networkError => console.log(networkError.message)
				).then(jsonResponse => {
					let playlistId = jsonResponse.id;
					return fetch(baseUrl+`/users/${userID}/playlists/${playlistId}/tracks`,
						{
							method:'POST',
							headers: {
								"Authorization": `Bearer ${userToken}`,
								'Content-Type': 'application/json'
							},
							body: JSON.stringify({uris:playlistTracks})
						}).then(response => {
							if(response.ok){
							return response.json();
							} throw new Error('holy moly couldnt post the tracks');
						},networkError=>(console.log(networkError.message))
						).then(jsonResponse => {
							// console.log(jsonResponse);
							alert('you saved your playlist!');
						});
				});
		});
	}
}
export default Spotify;