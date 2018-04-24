import React from 'react';
import './Track.css';

class Track extends React.Component {
	
	renderAction(){
		if(this.state.isRemoval){
			return '-';
		} else {
			return '+';
		}
	}
	render(){
		
		return (
			<div className="Track">
				<div className="Track-information">
					<h3></h3>
				<p> track artist will go here |  track album will go here </p>
				</div>
				<a className="Track-action">{this.renderAction}</a>
			</div>
		)
	}
}

export default Track;