const clientID = '097b98d45ae04d7dbf5117d81409e256';
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
			const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`
			window.location=accessUrl;

		}

	},

	search(term){

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
					console.log(json);
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
	}	
}
export default Spotify;