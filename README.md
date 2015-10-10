Code to solve the best route to complete a given degree given a set of requirements. This example produces a minimal path to complete CMU'S information systems major based on the degree requirements.

The graph and algorythms are implemented in graph.js.

The selection is run using heap structure.






## Notes

The scraped data is primarily in the `/data` dir

`course_reqs-f15.json` and `course_reqs-s16.json` hold formatted scraped course lists.


Prereqs are stored as strings inside of an array, and default to "AND" type logic, IE

`"prereqs": ["33111","21120"]` would require both 33111 and 21120

Prereqs with choices between classes are formatted with an object instead of a string

`[{"$or":["18341","18447"]}]`

Combinations of these exist in the data as well IE
`["33111","21120",{"$or":["18341","18447"]}]`
would mean 33111, 21120, and one of 18341 or 18447

## Setup

`npm install`


## Run demo

`node optimize.js`