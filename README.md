Code to solve the best route to complete a given degree given a set of requirements. This example produces a minimal path to complete CMU'S information systems major based on the degree requirements.

The data was scraped using =>
https://github.com/PseudoSky/cmu_scraper
Then parsed into a queriable format that  I define below.

The graph and algorythms are implemented in graph.js.

The selection is run using heap structure.






## Notes

The scraped data is primarily in the `/data` dir

`course_reqs-f15.json` and `course_reqs-s16.json` hold formatted scraped course lists.


Modeling the requirements was slightly complicated, so I chose to represent the logical "and" using an array, and "or" using an object. I chose this because the situation of optional selection requires extra logic, therefore we can avoid additional recursive processing by differentiating the data type.
This also made it so I wouldn't have to write out a full blown query language.

Check out `data/course_reqs-s16.json` for a look at the raw data.
Line 6589 is a good example: 15415 requiring 15210 or the combination of 15211 and 15213

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

`node index.js`

It prints out the generated path, satisfying each of the requirements.