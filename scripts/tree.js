var _=require('lodash');

var colleges=require('../data/college-list.json').colleges;
var degrees=require('../data/degrees.json');
var alias=require('../data/course-alias.json');
var courses=require('../data/course-schedule-f15.json').courses;
var courses2=require('../data/course-schedule-s16.json').courses;
_.mixin({
	omitAll:function(data,arr){_.each(arr,function(k,v){console.log(k,v);data=_.omit(data,k);});return data;},
  selectKeys: function (obj, ks) {
    return _.pick.apply(null, Array.prototype.concat.call([obj], ks));
  }

});
_.mixin({
	select:function(data,arr){return _.map(data,function(v){return _.selectKeys(v,arr);});}
});

var by_req={};
var course_lookup={};
var course_data={};

_.map(courses,function(d,k){
	if(/\d{4}/.test(k)) console.log('yay',k);
	course_data[k]=_.extend(d,{number:k});
	course_lookup[k]=d.name.toLowerCase();
	course_lookup[d.name.toLowerCase()]=k;

});

_.map(courses2,function(d,k){
	if(/\d{4}/.test(k)) console.log('yay',k);
	course_data[k]=_.extend(d,{number:k});
	course_lookup[k]=d.name.toLowerCase();
	course_lookup[d.name.toLowerCase()]=k;
});

var L={};
_.map(course_data,function(v,k){L[k]={name:v.name,number:v.number,units:v.units,blurb:_.trunc(v.desc,100)}});
// var fs = require('fs');
// fs.writeFile("course_map.json", JSON.stringify(_.select(_.values(course_data),['name','number'])), function(err) {
//     if(err) {
//         return console.log(err);
//     }

//     console.log("The file was saved!");
// });
var fs = require('fs');
fs.writeFile("course_map_l.json", JSON.stringify(L), function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
});


_.map(alias,function(ar,key){
	_.map(ar,function(name){
		course_data[name]=course_data[key];
		course_lookup[name]=key;
	});
});

// console.log(course_lookup);

var degree_name,req;

_.map(colleges,function(c){
	_.map(degrees[c],function(v){
		degree_name=v.name.toLowerCase();

		by_req[degree_name]=[];

		_.map(v.requirements,function(k){
			req=k.toLowerCase();

			if(course_lookup[req]){
				by_req[degree_name].push(course_lookup[req]);
			}else{
				by_req[degree_name].push(req);
			}
		});
	});
});

/*
Files look slightly different when moved, so if it's missing something try below
*/

// var _=require('lodash');

// var colleges=require('./data/college-list.json').colleges;
// var degrees=require('./data/degrees.json');
// var alias=require('./data/course-alias.json');
// var courses=require('./data/course-schedule-f15.json').courses;
// var courses2=require('./data/course-schedule-s16.json').courses;


// var by_req={};
// var course_lookup={};
// var course_reqs={};

// _.map(courses,function(d,k){
// 	course_lookup[k]=d.name.toLowerCase();
// 	course_lookup[d.name.toLowerCase()]=k;
// });
// course_reqs=_.mapValues(courses,'prereqs');
// _.map(courses2,function(d,k){
// 	course_lookup[k]=d.name.toLowerCase();
// 	course_lookup[d.name.toLowerCase()]=k;
// });
// _.merge(course_reqs,_.mapValues(courses2,'prereqs'));

// _.map(alias,function(ar,key){
// 	_.map(ar,function(name){
// 		course_lookup[name]=key;
// 	});
// });

// console.log(course_lookup);

// var degree_name,req;

// _.map(colleges,function(c){
// 	_.map(degrees[c],function(v){
// 		degree_name=v.name.toLowerCase();

// 		by_req[degree_name]=[];

// 		_.map(v.requirements,function(k){
// 			req=k.toLowerCase();

// 			if(course_lookup[req]){
// 				by_req[degree_name].push(course_lookup[req]);
// 			}else{
// 				by_req[degree_name].push(req);
// 			}
// 		});
// 	});
// });

// console.log(by_req);
// _.map(degrees,function(d,k){
// 	console.log(d);
// })