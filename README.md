# Airport Challenge in JavaScript

## TDD workflow: 
## User stories #1
```
As an air traffic controller
To get passengers to a destination
I want to instruct a plane to land at an airport and confirm that it has landed
```
1. Create feature test - first create `spec/featuresSpec.js`
Assume there is an `airport` and it has a collection of `planes ` landed. 

- 1st test: 
When a `plane` landed at the `airport`, it should be included in `planes`. 


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








