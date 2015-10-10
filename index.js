var _ = require('lodash');
var Graph = require('./graph');
var g = new Graph();
var colleges=require('./data/college-list.json').colleges;
var degrees=require('./data/degrees.json');
var alias=require('./data/course-alias.json');
var courses=require('./data/course-schedule-f15.json').courses;
var courses2=require('./data/course-schedule-s16.json').courses;
var course_reqs=require('./data/course_reqs-s16.json').courses;
var course_reqs=_.merge(require('./data/course_reqs-f15.json').courses);

course_reqs=_.mapValues(course_reqs,'prereqs');

var by_req={};
var course_lookup={};

_.map(courses,function(d,k){
	course_lookup[k]=d.name.toLowerCase();
	course_lookup[d.name.toLowerCase()]=k;
});

_.map(courses2,function(d,k){
	course_lookup[k]=d.name.toLowerCase();
	course_lookup[d.name.toLowerCase()]=k;
});

_.map(alias,function(ar,key){
	_.map(ar,function(name){
		course_lookup[name]=key;
	});
});

// console.log(course_lookup);

var course_pick=[{name:'core',units:9, options:[
	{number:"19402",name:"Telecommunications Technology, Policy & Management", units:12},
	{number:"67306",name:"Special Topics: Management of Computer and Information Systems", units:6},
	{number:"67308",name:"Innovation Studio: Health Care Information Systems", units:9},
	{number:"67309",name:"Special Topics", units:6},
	{number:"67311",name:"Database Design and Implementation", units:9},
	{number:"67319",name:"Global Technology Consulting Groundwork - Technology Consulting in the Global Community", units:6},
	{number:"67327",name:"Web Application Security", units:6},
	{number:"67328",name:"Mobile to Cloud: Building Distributed Applications", units:9},
	{number:"67329",name:"Contemporary Themes in Global Systems", units:9},
	{number:"67330",name:"Technology Consulting in the Community", units:9},
	{number:"67344",name:"Organizational Intelligence in the Information Age", units:9},
	{number:"67353",name:"IT & Environmental Sustainability", units:6},
	{number:"67362",name:"Big Data and Analytics", units:9},
	{number:"67370",name:"Intelligent Decision Support Systems", units:9},
	{number:"67442",name:"Mobile Application Development in iOS", units:9},
	{number:"88223",name:"Decision Analysis and Decision Support Systems", units:9}
]},
{name:'communication',units:9, options:[
	{number: "15221", name: "Technical Communication for Computer Scientists", units: 9},
	{number: "36315", name: "Statistical Graphics and Visualization", units: 9},
	{number: "51262", name: "Communication Design Fundamentals: Design for Interactions for Communications", units: 9},
	{number: "70321", name: "Negotiation and Conflict Resolution", units: 9},
	{number: "70340", name: "Business Communications", units: 9},
	{number: "70341", name: "Organizational Communication", units: 9},
	{number: "70342", name: "Managing Across Cultures", units: 9},
	{number: "76270", name: "Writing for the Professions", units: 9},
	{number: "76272", name: "Language in Design", units: 9},
	{number: "85341", name: "Organizational Communication", units: 9}
]},
{ name:'quant',units:9, options: [
	{number:"21257", name: "Models and Methods for Optimization", units: 9 },
	{number:"21325", name: "Probability", units: 9 },
	{number:"36202", name: "Statistical Methods", units: 9 },
	{number:"36208", name: "Regression Analysis", units: 9 },
	{number:"36217", name: "Probability Theory and Random Processes", units: 9 },
	{number:"36225", name: "Introduction to Probability Theory", units: 9 },
	{number:"36303", name: "Sampling, Survey and Society", units: 9 },
	{number:"36309", name: "Experimental Design for Behavioral and Social Sciences", units: 9 },
	{number:"67360", name: "Applied Analytics", units: 9 },
	{number:"67362", name: "Big Data and Analytics", units: 9 },
	{number:"67370", name: "Intelligent Decision Support Systems", units: 9 },
	{number:"80305", name: "Rational Choice", units: 9 },
	{number:"80405", name: "Game Theory", units: 9 },
	{number:"88223", name: "Decision Analysis and Decision Support Systems", units: 9 },
	{number:"88251", name: "Empirical Research Methods", units: 9 }
]},
{ name:'organization',units:9, options:[
	{ number: "19211", name: "Ethics and Policy Issues in Computing", units: 9 },
	{ number: "15390", name: "Entrepreneurship for Computer Science", units: 9 },
	{ number: "19402", name: "Telecommunications Technology, Policy & Management", units: 12 },
	{ number: "19403", name: "Policies of Wireless Systems and the Internet", units: 12 },
	{ number: "19411", name: "Global Competitiveness: Firms, Nations and Technological Change", units: 9 },
	{ number: "67308", name: "Innovation Studio: Health Care Information Systems", units: 9 },
	{ number: "67344", name: "Organizational Intelligence in the Information Age", units: 9 },
	{ number: "67353", name: "IT & Environmental Sustainability", units: 6 },
	{ number: "70311", name: "Organizational Behavior", units: 9 },
	{ number: "70332", name: "Business, Society and Ethics", units: 9 },
	{ number: "70341", name: "Organizational Communication", units: 9 },
	{ number: "70342", name: "Managing Across Cultures", units: 9 },
	{ number: "70414", name: "Entrepreneurship for Engineers", units: 9 },
	{ number: "70415", name: "Introduction to Entrepreneurship", units: 9 },
	{ number: "70416", name: "New Venture Creation", units: 9 },
	{ number: "70420", name: "Entrepreneurship for Scientists", units: 9 },
	{ number: "70437", name: "Organizational Learning and Strategic Management", units: 9 },
	{ number: "80341", name: "Computers, Society and Ethics", units: 9 },
	{ number: "88220", name: "Policy Analysis I", units: 9 },
	{ number: "88223", name: "Decision Analysis and Decision Support Systems", units: 9 },
	{ number: "88260", name: "Organizations", units: 9 }
]},
{ name:"Enterprise Systems", next: "Content Area", units:27,options:[
	{number:"19402", name: "Telecommunications Technology, Policy & Management", units: 12},
	{number:"19411", name: "Global Competitiveness: Firms, Nations and Technological Change", units: 9},
	{number:"67301", name: "Networks and Telecommunications", units: 9},
	{number:"67306", name: "Special Topics: Management of Computer and Information Systems", units: 6},
	{number:"67308", name: "Innovation Studio: Health Care Information Systems", units: 9},
	{number:"67309", name: "Special Topics", units: 6},
	{number:"67311", name: "Database Design and Implementation", units: 9},
	{number:"67328", name: "Mobile to Cloud: Building Distributed Applications", units: 9},
	{number:"67330", name: "Technology Consulting in the Community", units: 9},
	{number:"67344", name: "Organizational Intelligence in the Information Age", units: 9},
	{number:"67353", name: "IT & Environmental Sustainability", units: 6},
	{number:"67370", name: "Intelligent Decision Support Systems", units: 9},
	{number:"67442", name: "Mobile Application Development in iOS", units: 9},
	{number:"70332", name: "Business, Society and Ethics", units: 9},
	{number:"70366", name: "Intellectual Property and E-Commerce", units: 6},
	{number:"70371", name: "Operations Management", units: 9},
	{number:"70414", name: "Entrepreneurship for Engineers", units: 9},
	{number:"70420", name: "Entrepreneurship for Scientists", units: 9},
	{number:"70421", name: "Entrepreneurship for Computer Scientists", units: 9},
	{number:"70437", name: "Organizational Learning and Strategic Management", units: 9},
	{number:"70438", name: "Commercialization and Innovation", units: 9},
	{number:"70443", name: "Digital Marketing and Social Media Strategy", units: 9},
	{number:"70449", name: "Social, Economic and Information Networks", units: 9},
	{number:"70455", name: "Modern Data Management", units: 9},
	{number:"70460", name: "Mathematical Models for Consulting", units: 9},
	{number:"70465", name: "Technology Strategy", units: 9},
	{number:"73465", name: "Technology Strategy", units: 9},
	{number:"70471", name: "Supply Chain Management", units: 9},
	{number:"70476", name: "Service Operations Management", units: 9},
	{number:"73359", name: "Benefit-Cost Analysis", units: 9},
	{number:"73469", name: "Global Electronic Markets: Economics and the Internet", units: 9},
	{number:"76391", name: "Document & Information Design", units: 12},
	{number:"76487", name: "Web Design", units: 12}
]
},
{ name: "Computing", next: "Content Area", units:27, options: [
	{number: "05391", name: "Designing Human Centered Software", units: 12 },
	{number: "05410", name: "User-Centered Research and Evaluation", units: 12 },
	{number: "05430", name: "Programming Usable Interfaces", units: 15 },
	{number: "05431", name: "Software Structures for User Interfaces", units: 15 },
	{number: "05432", name: "Personalized Online Learning", units: 12 },
	{number: "05433", name: "Programming Usable Interfaces OR Software Structures for Usable Interfaces", units: 6 },
	{number: "05499", name: "Special Topics in HCI", units: 12 },
	{number: "16311", name: "Introduction to Robotics", units: 12 },
	{number: "16362", name: "Mobile Robot Programming Laboratory", units: 12 },
	{number: "19403", name: "Policies of Wireless Systems and the Internet", units: 12 },
	{number: "19411", name: "Global Competitiveness: Firms, Nations and Technological Change", units: 9 },
	{number: "60415", name: "Advanced ETB: Animation", units: 10 },
	{number: "67311", name: "Database Design and Implementation", units: 9 },
	{number: "67327", name: "Web Application Security", units: 6 },
	{number: "67328", name: "Mobile to Cloud: Building Distributed Applications", units: 9 },
	{number: "67362", name: "Big Data and Analytics", units: 9 },
	{number: "67442", name: "Mobile Application Development in iOS", units: 9 }
]
},
{ name: "Social and Global Systems", next: "Content Area", units: 27, options: [
	{number: "19402", name: "Telecommunications Technology, Policy & Management", units: 12},
	{number: "19403", name: "Policies of Wireless Systems and the Internet", units: 12},
	{number: "19411", name: "Global Competitiveness: Firms, Nations and Technological Change", units: 9},
	{number: "67329", name: "Contemporary Themes in Global Systems", units: 9},
	{number: "67330", name: "Technology Consulting in the Community", units: 9},
	{number: "67353", name: "IT & Environmental Sustainability", units: 6},
	{number: "70342", name: "Managing Across Cultures", units: 9},
	{number: "70365", name: "International Trade and International Law", units: 9},
	{number: "70430", name: "International Management", units: 9},
	{number: "70480", name: "International Marketing", units: 9},
	{number: "73372", name: "International Money and Finance", units: 9},
	{number: "76318", name: "Communicating in the Global Marketplace", units: 9},
	{number: "76386", name: "Language & Culture", units: 9},
	{number: "79318", name: "Sustainable Social Change: History and Practice", units: 6},
	{number: "79381", name: "Energy and Empire: How Fossil Fuels Changed the World", units: 9},
	{number: "88371", name: "Entrepreneurship, Regulation and Technological Change", units: 9},
	{number: "88378", name: "International Economics", units: 9},
	{number: "88384", name: "Conflict and Conflict Resolution in International Relations", units: 9},
	{number: "88391", name: "Technology and Economic Growth", units: 9},
	{number: "88410", name: "The Global Economy: A User's Guide", units: 9},
	{number: "88411", name: "Rise of the Asian Economies", units: 9}
]
},
{ name: "Quantitative Analysis" , next: "Content Area", units: 27, options: [
	{number: "21257", name:"Models and Methods for Optimization", units: 9 },
	{number: "21292", name:"Operations Research I", units: 9 },
	{number: "36208", name:"Regression Analysis", units: 9 },
	{number: "70208", name:"Regression Analysis", units: 9 },
	{number: "36217", name:"Probability Theory and Random Processes", units: 9 },
	{number: "36225", name:"Introduction to Probability Theory", units: 9 },
	{number: "36303", name:"Sampling, Survey and Society", units: 9 },
	{number: "36309", name:"Experimental Design for Behavioral and Social Sciences", units: 9 },
	{number: "36350", name:"Statistical Computing", units: 9 },
	{number: "36401", name:"Modern Regression", units: 9 },
	{number: "36410", name:"Introduction to Probability Modeling", units: 9 },
	{number: "67360", name:"Applied Analytics", units: 9 },
	{number: "67362", name:"Big Data and Analytics", units: 9 },
	{number: "67370", name:"Intelligent Decision Support Systems", units: 9 },
	{number: "70460", name:"Mathematical Models for Consulting", units: 9 },
	{number: "70462", name:"Stochastic Modeling and Simulations", units: 9 },
	{number: "73363", name:"Econometrics", units: 9 },
	{number: "88223", name:"Decision Analysis and Decision Support Systems", units: 9 },
	{number: "88251", name:"Empirical Research Methods", units: 9 }
]}
];


// console.log(course_reqs);
// _.each(course_pick,function(d){
// 	_.each(d.options,function(k){
// 		if(course_reqs[k.number] && course_reqs[k.number].length>0){
// 			g.addVertex(k.number,course_reqs[k.number]);
// 			start_edges[d.number]=1;
// 		}
// 	});
// });
// function select_from(v){
// 	var edges={},units=v.units;
// 	if(v.next){
// 		var e2={};
// 		e2[v.next]=units;
// 		g.addVertex(v.name,e2);
// 		if(!_.includes(requirements, v.next)){
// 			g.addVertex(v.next,{'complete':0});
// 			// requirements.push(v.next);
// 		}
// 	}
// 	if(!_.includes(requirements, v.name)){
// 		g.addVertex(v.name,{'complete':v.units});
// 		requirements.push(v.name);
// 	}
// 	edges[v.name]=units;
// 	_.map(v.options, function(d){
// 		edges[v.name]=d.units;
// 		g.addVertex(d.number,edges);
// 		start_edges[d.number]=1;
// 	});
// }

var requirements=['15','21','67'];



var start_edges={ '15112':1,'15110':1,'67250':1,'21111':1,'21120':1 };


g.addVertex('start',start_edges);
requirements=_.union(_.pluck(course_pick,'name'),requirements);
_.each(course_pick,function(v){
	g.constrain(v.options,v.units,'start',v.name);
	if(v.next){
		g.addEdge(v.name,v.next);
		g.addEdge(v.next,'complete');
	}else{
		g.addEdge(v.name,'complete');
	}
});


g.addVertex('complete',{});
g.addVertex('15110',{ '15112':1 });
g.addVertex('15112',[ '67262','15121','15122']);
g.addVertex('67250',{ });
g.addVertex('67262',{ '67272':1 });
g.addVertex('67272',{ '67373':1 });
g.addVertex('67373',{ '67475':1 });
g.addVertex('67475',{ '67':1 });
g.addVertex('15121',{ '15':1, '67262':1 });
g.addVertex('15122',{ '15':1, '67262':1 });
g.addVertex('21111',{ '21112':1, '21256':1 });
g.addVertex('21112',{ '21':1 });
g.addVertex('21120',{ '21256':1, '21122':1 });
g.addVertex('21122',{ '21':1,'21256':1 });
g.addVertex('21256',{ '21':1 });
g.addVertex('67',{ 'complete':0 });
g.addVertex('15',{ 'complete':0 });
g.addVertex('21',{ 'complete':0 });
console.log(g.shortestPath('start','core'));
// console.log(g);

var path=[];
for( req in requirements ){
	console.log(requirements[req],g.shortestPath('start', requirements[req]));
	path=_.union(path,g.shortestPath('start', requirements[req]));
}
console.log(path);
