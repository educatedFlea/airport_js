'use strict';

describe('Feature Test:', function(){
	var plane;
	var airport;

	beforeEach(function(){
		plane = new Plane();
		airport = new Airport();
	});

	it('planes can be instructed to land at an airport',function(){
		plane.land(airport);
		expect(airport.planes()).toContain(plane);
	});

	it('planes can be instructed to take off', function(){
		plane.land(airport)
		plane.takeoff();
		expect(airport.planes()).not.toContain(plane);
	});

	it('can block take off when weather is stormy', function(){
		plane.land(airport)
		spyOn(airport,'isStormy').and.returnValue(true);
		expect(function(){ plane.takeoff();}).toThrowError('cannot take off during storm');
		expect(airport.planes()).toContain(plane);
	});
});