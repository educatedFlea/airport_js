'use strict';

describe('Airport', function(){
	var airport;
	beforeEach(function(){
		airport = new airport();
	});

	it('has no planes by default', function(){
		expect(airport.planes()).toEqual([]);
	});
});