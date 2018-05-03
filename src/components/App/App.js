import React from 'react';
import './App.css';

import SearchResults from '../SearchResults/SearchResults';
import SearchBar from '../SearchBar/SearchBar';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

class App extends React.Component {
  constructor(props){
  	super(props);
  	this.addTrack = this.addTrack.bind(this);
  	this.removeTrack = this.removeTrack.bind(this);
  	this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  	this.state = {
  		searchResults: [
  			{
  				name: 'Mason',
  				artist: 'Moi',
  				album: 'Eat this',
  				id : '123'
  			},
  			{
  				name: 'Maasdson',
  				artist: 'Moai',
  				album: 'Eatf this',
  				id : '12a3'
  			},
        {
          name: 'wasda',
          artist: 'bgbg',
          album: 'bg this',
          id : '12dd3'
        },
        {
          name: 'Maastoddson',
          artist: 'Moai',
          album: 'Eatf this',
          id : '12aa3'
        }
  		],
  		playlistName : 'New Playlist',
  		playlistTracks : []
  	}
  }

  addTrack(track){
  	let tracksArray = this.state.playlistTracks;
  	if(tracksArray.find(data => data.id === track.id)){
  		return;
  	} else {
  		tracksArray.push(track);
  		this.setState({playlistTracks:tracksArray});
  	}
  }

  removeTrack(track){
  	let tracksArray = this.state.playlistTracks.filter(data => data.id !== track.id);
  	this.setState({playlistTracks:tracksArray});
  	
  }

  updatePlaylistName(name){
  	this.setState({playlistName:name});
  	console.log(this.state.playlistName);
  }

  savePlaylist(){
    const trackURIs = this.state.playlistTracks.map(track => track.uri);
  }

  search(term){
    console.log(Spotify.search(term));

    // this.setState({searchResults:Spotify.search(term)});
  }

  render() {
    return (
     	<div>
		  <h1>Ja<span className="highlight">mmm</span>ing</h1>
		  <div className="App">
		    <SearchBar onSearch={this.search}/>
		    <div className="App-playlist">
		       <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
		       <Playlist 
		       	playlistTracks={this.state.playlistTracks} 
		       	playlistName={this.state.playlistName} 
		       	onRemove={this.removeTrack}
		       	onNameChange={this.updatePlaylistName}
            onSave={this.savePlaylist}
		       	/>
		    </div>
		  </div>
		</div>
    );
  }
}

export default App;

