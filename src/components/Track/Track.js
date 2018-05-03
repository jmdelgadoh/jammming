import React from 'react';
import './Track.css';

class Track extends React.Component {
	constructor(props){
		super(props);

		this.renderAction = this.renderAction.bind(this);
		this.addTrack = this.addTrack.bind(this);
		this.removeTrack = this.removeTrack.bind(this);
	}
	renderAction(){
		// if(this.props.isRemoval === 'true'){
		// 	return '-';
		// } else {
		// 	return '+';
		// }
		return '+';
	}

	addTrack(){
		this.props.onAdd(this.props.track);
	}

	removeTrack(){
		this.props.onRemove(this.props.track);
		// console.log("trying to remove track");
	}
	render(){
		
		return (
			<div className="Track">
				<div className="Track-information">
					<h3>{this.props.name}</h3>
				<p> {this.props.artist} |  {this.props.album} </p>
				</div>
				<a alt="remove" className="Track-action" >{this.props.isRemoval ? <div onClick={this.removeTrack}> - </div> : <div onClick={this.addTrack}> + </div> }</a>
			</div>
		)
	}
}

export default Track;