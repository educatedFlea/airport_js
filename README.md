# Airport Challenge in JavaScript

## TDD workflow: 
1. Feature tests for each user stories
2. Unit tests for each class involved in feature test
3. Complete the code to pass unit tests which should also help to pass feature tests. 

### User stories #1
```
As an air traffic controller
To get passengers to a destination
I want to instruct a plane to land at an airport and  
  confirm that it has landed
```
1. Create feature test - first create `spec/featuresSpec.js`
Assume there is an `airport` and it has a collection of `planes ` landed. 

- 1st test: 
when a `plane` landed at the `airport`, it should be included in `planes`. 


2. Unit tests for `plane` and `airport` created in the first test 
    
    1). Create `spec/planeSpec.js`
    Assmue there is a method `land` can be call on `plane`.

- 2nd Test:
A `land` method should not be undefined.

    2). To pass the test above: create `plane.js` and declare `Plane` class with a `land` function. 

    3). Create `airportSpec.js`: assmue that when `Airport` initialised, there is no plane landed.

- 3rd Test: 
`planes` is an empty array.

    4). To pass above test, create `airport.js`, declare `Airport`

3. Refactor 2nd test
So far the plane object does not interact with airport object. Stub the interaction in the plane unit test and create a spy of airport which is initialised as an array and has `clearForLanding` function inside. 

    Create a `clearForLanding` in `Plane` class to pass this test.

#### First feature test still failed at this stage
Plane is doing everything it needs to, so now we need Airport to play its part, so a unit test for `Airport` is in order to make sure it stores a reference to the incoming plane after `clearForLanding` is called. To move a little faster let's skip the trivial test that clearForLanding is defined, and go straight to making a spy that we can check has been landed correctly.

4. Refactor `airportSpec.js`: creaete spy for plane (just like how we did for airport in `planeSpec.js`)

    To pass the test
    - create a `clearForLanding` method in `airport.js`
    - create `_hangar` method (an empty array when initialsed)
    - push plane to the array in when `clearForLanding` is called 

#### Now all the feature tests and unit tests passed 


### User stories #2 
```
As an air traffic controller
To get passengers to a destination
I want to instruct a plane to take off from
  an airport and confirm that it is no longer in the airport
```
1. Create feature test - in `featureSpec.js` 

- 1st test:
when a `plane` takes off, it should be longer exists in `planes`.

```javascript
it('planes can be instructed to take off', function(){
	plane.land(airport);
	plane.takeoff();
	expect(airport.plane()).not.toContain(plane);
});
```
Now we have a failed feature test becasue we have not yet defined `takeoff`. Again, this feature tests involve 2 class, `Plane` and `Airport`, first write unit tests for them before we try to pass the feature test.

2. Create unit test for `Plane` 

- 2nd test:
```javascript
// in spec/planeSpec.js
describe('Plane', function(){
// existing codes ... 
// add 'clearForTakeOff' to the stub!
airport = jasmine.createSpyObj('airport',['clearForLanding','clearForTakeOff']);
//... exist codes
it('can take off from an airport', function(){
	plane.land(airport)
	plane.takeoff();
	expect(airport.clearForTakeOff).toHaveBeenCalled();
	});
});
```
Note that here we create new method `clearForTakeOff` for the class. 
To pass the test: add function to `plane.js`. 
	refactor from: 

```javascript
class Plane {
land(airport){
	airport.clearForLanding(this)
};
};
```
to:

```javascript
class Plane {
	// every plane object will have a 'location' property when initialized
	constructor(){
		this._location()
	};

	land(airport){
	// when they land the location will change to the argument passed 
	// in this case they land at 'airport'
		airport.clearForLanding(this)
		this._location = airport
	};

	takeoff(){
		// when they take off the location will be cleared.
		this._location.clearForTakeoff()
	};
};
```

3. Now feature test still fails...
```
 ______________________________________ 
/ Ugh! Let's create matching unit test \
\ for 'Airport' now ...                /
 -------------------------------------- 
        \   ^__^
         \  (xx)\_______
            (__)\       )\/\
             U  ||----w |
                ||     ||
```
- 3rd test: no `plane` in `airport` after take off 
```javascript 
it('can clear planes after takeoff', function(){
	airport.clearForLanding(plane);
	airport.clearForTakeOff(plane);
	expect(airport.planes()).toEqual([]);
});
```
Now the errors (for both feature and unit tests) say it doesn't know what `clearForTakeOff` is.

To pass the unit test: add the function in `airport.js`:
```javascript
clearForTakeOff(plane){
	this._hangar = [];
}
```
#### Now now, all the tests passed! (but hang on there are 2 more user stories! )

### User stories #3 
```
As an air traffic controller
To ensure safety
I want to prevent landing when weather is stormy
```

1. Assume we will have a functio to determine weather, let's create a feature test for it(in `featureSpec.js`). 

- 1st test:
```javascript 
it('can block take off when weather is stormy', function(){
	plane.land(airport)
	spyOn(airport,'isStormy').and.returnValue(true);
	expect(function(){ plane.takeoff();}).toThrowError('cannot take off during storm');
	expect(airport.planes()).toContain(plane);
});
```

It fails because there's no such method 'isStormy'.

2. Time to create a matching unit test for airport.

- 2nd test: 
```javascript
// in spec/airportSpec.js
it('can check for stormy conditions', function(){
	expect(airport.isStormy()).toBeFalsy();
});
```
To pass this unit test: add function in `airport.js`.
Now feature test is throwing an error:
```
Feature Test: blocks takeoff when weather is stormy
  Error: Expected function to throw an Error.
  Error: Expected [  ] to contain Plane({ _location: Airport({ _hangar: [  ], isStormy: spy on isStormy }) }).
```
because at the moment it can still take off because we have not set ceveat(guard clause) in `airport.js`. 

3. Create another unit test to match above error message.
- 3rd test:
```javascript
// in spec/airportSpec.js
// nested test for stormy scenarios: 
describe('under stormy conditions', function(){
	it('does not clear planes for takeoff', function(){
		spyOn(airport,'isStormy').and.returnValue(true);
		expect(function(){ airport.clearForTakeOff(plane);}).toThrowError('cannot take off during storm');
	});
});
```
Now both test have same error: 
```
Feature Test: > can block take off when weather is stormy
Expected function to throw an Error.
Error: Expected function to throw an Error.

Airport > under stormy conditions > does not clear planes for takeoff
Expected function to throw an Error.
Error: Expected function to throw an Error.
```

4. Now try to pass the test(by adding the guard clause) before we go crazy. 
```javascript
// in airport.js, modify clearForTakeOff function 
clearForTakeOff(plane){
	if(this.isStormy()){
		throw new Error('cannot take off during storm')
	}
	this._hangar = [];
}
```
#### Can you believe it we finished the 3rd user story! 

### User stories #4
```
As an air traffic controller
To ensure safety
I want to prevent landing when weather is stormy
```
(spoiler alert: there will a new class soon @_@)

So far the `airport` model has too much responsibilty, we want to separate `isStormy` to a new class. 

1. Create a unit test for `Weather` class.
- 1st test
```javascript 
// create weatherSpec.js
describe('Weather', function(){
	var weather;
	beforeEach(function(){
		weather = new Weather();

	it('gives stormy sometimes',function(){
		spyOn(Math,'random').and,returnValue(1);
		expect(weather.isStormy()).toBeTruthy();
	});

	it('gives sunny sometimes', function(){
		spyOn(Math,'random').and.returnValue(0);
		expect(weather.isStormy()).toBeFalsy();
	});
	});
});
``` 

2. Create Weather class and add function to pass these tests:
```javascript
// in weather.js
'use strict';

class Weather {
  constructor(){
	this._CHANCE_OF_STORMY = 0.5;
	}
	isStormy(){
		return (Math.random() > this._CHANCE_OF_STORMY);
	}
}
```

3. Link `weather` to the airport
```javascript
// in airport.js
'use strict';

class Airport{
	constructor(weather){
		// if the weather is not undefined, return weather; otherwise create a new Weather object. 
		this._weather = typeof weather !== 'undefined' ? weather : new Weather();
		this._hangar = []
	}
// leave out unrefactored codes...
	clearForTakeOff(plane){
		if(this._weather.isStormy()){
			throw new Error('cannot take off during storm')
		}
		this._hangar = [];
	}
};
```
Now the tests are randomly pass or fail thanks to the value return by `random`.  

4. (Major) Refactor feature tests.
```javascript
// in featureSpec.js
'use strict';
describe('Feature Test:', function(){
	var plane;
	var airport;

	beforeEach(function(){
		plane = new Plane();
		airport = new Airport();
	});
	// tests for sunny weathers, hence we put stub for random to return 0 before each tests.
	describe('under normal conditions',function(){
		beforeEach(function(){
			spyOn(Math,'random').and.returnValue(0);
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
	});
	
	// tests for stormy weather.
	describe('under stormy conditions', function(){
		it('can block take off when weather is stormy', function(){
			spyOn(Math,'random').and.returnValue(0);
			plane.land(airport)
			spyOn(airport,'isStormy').and.returnValue(true);
			expect(function(){ plane.takeoff();}).toThrowError('cannot take off during storm');
			expect(airport.planes()).toContain(plane);
		});

		it('blocks landing when weather is stormy',function(){
			spyOn(Math,'random').and.returnValue(1);
			expect(function(){plane.land(airport); }).toThrowError('cannot land during strom');
		});
});
});
```
```javascript
// in airportSpec.js
'use strict';

describe('Airport', function(){
	var airport;
	var plane;
	var weather;

	beforeEach(function(){
		plane = jasmine.createSpy('plane');
		weather = jasmine.createSpyObj('weather', ['isStormy']);
		airport = new Airport(weather);
	});

	it('has no planes by default', function(){
		expect(airport.planes()).toEqual([]);
	});

	describe('under normal weather',function(){
		beforeEach(function(){
			weather.isStormy.and.returnValue(false);
		});

		it('can clear planes for landing', function(){
			airport.clearForLanding(plane);
			expect(airport.planes()).toEqual([plane]);
		});

		it('can clear planes after takeoff', function(){
			airport.clearForLanding(plane);
			airport.clearForTakeOff(plane);
			expect(airport.planes()).toEqual([]);
		});
	});

	// it('can check for stormy conditions', function(){
	// 	expect(airport.isStormy()).toBeFalsy();
	// });

	// nested test for stormy scenarios: 
	describe('under stormy conditions', function(){
		beforeEach(function(){
			weather.isStormy.and.returnValue(true);
		});

		it('does not clear planes for takeoff', function() {
			expect(function(){ airport.clearForTakeOff(plane); }).toThrowError('cannot take off during storm');
		});

		it('does not clear planes for landing', function(){
			expect(function(){ airport.clearForLanding(plane); }).toThrowError('cannot land during storm');
		});

	});
});

```

Now the tests failed (and they are matching!) because we have not raise error in `land` yet. 

5. To pass the last failing tests:
```javascript
// in airport.js 

class Airport{
	constructor(weather){
		// !!! 1. add condition for weather when initialise
		this._weather = typeof weather !== 'undefined' ? weather : new Weather();
		this._hangar = []
	}

	planes(){
		return this._hangar;
	};
	// !!! 2. add gaurd clause for landing. 
	clearForLanding(plane){
		if(this._weather.isStormy()){
			throw new Error('cannot land during storm');
		}
		this._hangar.push(plane)
	};

	clearForTakeOff(plane){
		if(this._weather.isStormy()){
			throw new Error('cannot take off during storm');
		}
		this._hangar = [];
	}

	isStormy(){
		return false;
	};
};
```

#### Voila! All done!
```
 _____ _             _ _       _ 
|  ___(_)_ __   __ _| | |_   _| |
| |_  | | '_ \ / _` | | | | | | |
|  _| | | | | | (_| | | | |_| |_|
|_|   |_|_| |_|\__,_|_|_|\__, (_)
                         |___/   
```




	




	 









