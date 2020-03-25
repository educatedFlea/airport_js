'use strict';

class Plane {
	// every plane object will have a 'location' property when initialized
	constructor(){
		this._location;
	};
	
	land(airport){
		// when they land the location will change to the argument passed 
		// in this case they land at 'airport'
		airport.clearForLanding(this)
		this._location = airport;
	};

	takeoff(){
		// when they take off the location will be cleared.
		this._location.clearForTakeOff()
	};
};