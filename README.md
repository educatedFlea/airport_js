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
2.1 Create `spec/planeSpec.js`
    Assmue there is a method `land` can be call on `plane`.
- 2nd Test:
A `land` method should not be undefined.

2.2 To pass the test above: create `plane.js` and declare `Plane` class with a `land` function. 

2.3 Create `airportSpec.js`
    Assmue that when `Airport` initialised, there is no plane landed.
- 3rd Test: 
`planes` is an empty array.

2.4 To pass above test, create `airport.js`, declare `Airport`

3. Refactor 2nd test
So far the plane object does not interact with airport object. Stub the interaction in the plane unit test and create a spy of airport which is initialised as an array and has `clearForLanding` function inside. 

Create a `clearForLanding` in `Plane` class to pass this test.

#### first feature test still failed at this stage ####



