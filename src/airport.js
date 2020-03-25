'use strict';

class Airport{
	constructor(){
		this._hangar = []
	}
	planes(){
		return this._hangar;
	};

	clearForLanding(plane){
		this._hangar.push(plane)
	};

	clearForTakeOff(plane){
		if(this.isStormy()){
			throw new Error('cannot take off during storm')
		}
		this._hangar = [];
	}

	isStormy(){
		return false;
	};
};