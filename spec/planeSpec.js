'use strict';

describe('Plane', function(){
	var plane;
	var airport; 
	
	beforeEach(function(){
		plane = new Plane();
		// spys are Jasmine's equivalent of doubles.
		airport = jasmine.createSpyObj('airport',['clearForLanding'])
	});

	it('can land at an airport', function(){
		plane.land(airport);
		expect(airport.clearForLanding).toHaveBeenCalledWith(plane);
	});
});