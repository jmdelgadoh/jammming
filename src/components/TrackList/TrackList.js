import React from 'react';
import './TrackList.css';
import Track from '../Track/Track';

class TrackList extends React.Component {
	
	render(){
		return (
			<div className="TrackList">
				{console.log(this.props.tracks)}
				
				{
					this.props.tracks.map(track => {
						return <div key={track.id}> Printing {track.name}</div>
					})
				}
	     		
			

			</div>
		);
	}
}

export default TrackList;