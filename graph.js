
var _ = require('lodash');
var Heap = require("collections/heap");

// costruct
var Graph = function(vertices) {
  // you can either pass a verticies object or add every
  this.vertices = vertices || {};
};

_.assign(Graph.prototype, {

  /*
  *  Add a vertex to the graph
  *  String name the name of the vertex.
  *  String edges either an array of names or an object
  *     { 'name': Integer, ... }
  *     [ 'name' ... ] defaults weights to 1
  */
  addVertex: function(name, edges) {
    if(_.isArray(edges)){
      edges=_.zipObject(edges,_.range(1,edges.length+1,0));
    }
    this.vertices[name] = edges;
    return this;
  },
  addEdge: function(from, to, weight) {
    if(!this.vertices[from])this.vertices[from]={};
    this.vertices[from][to]=weight||1;
    return this;
  },

  addEdges: function(from, arr, weight) {

    var edges=_.zipObject(arr, _.range(1,arr.length+1,0));
    if(this.vertices[from]){
      this.vertices[from]=_.merge(this.vertices[from],edges);
    }else{
      this.addVertex(from,edges);
    }

    return this;
  },

  addConvergence: function(arr, to, weight) {
    var self=this;
    _.each(arr, function(from){ self.addEdge(from, to); });
    return this;
  },

  threshHold: function(value, options){
    var path=[], val=0;
    _.each(options,function(opt){
      path.push(opt);
      if(val+opt.units>=value){
        return path;
      }
      val+=opt.units;
    });
    return this;
  },

  /*
  *  Array arr is a list of nodes to be linked sequentially.
  *  String into is where the last element will point to.
  *  String start the head of the chain.
  */
  and: function(arr, into, start){
    var temp=start;
    var self = this;

    _.each(arr,function(from){
      self.addEdge(temp,from);
      temp = from;
    });
    console.log(temp,into);
    this.addEdge(temp,into);
    return this;
  },

 /*
  *  Array arr is a list of nodes to be linked individually.
  *  String into is where the last element will point to.
  *  String start the head of the chain.
  */
  or: function(arr, start, into){
    this.addEdges(start,arr,into);
    return this;
  },

 /*
  *  Array options is a list of nodes to be linked sequentially.
  *  Integer n the number of options to be sampled
  *  String into is where the last element will point to.
  *  String start the head of the chain.
  */
  pick: function(options, n, start, into){
    this.and(_.sample(options,n),into,start);
    return this;
  },

 /*
  *  Array options needing { number: String , unit: Int }.
  *  Integer value the minimum value sum of the units.
  *  String into is where the last element will point to.
  *  String start the head of the chain.
  */
  constrain: function(options, value, start, into){
    var val=0,edges=[];
    var temp;

    while(val<value){
      temp=_.sample(options,1)[0];
      console.log(temp,temp.units);
      edges.push(temp.number);
      val+=temp.units;
    }

    this.and(edges,into,start);

    return this;
  },

 /*
  *  String start the head of the chain.
  *  String finish the terminal point of the search.
  *  Object options { trim: Boolean, reverse: Boolean }
  */
  shortestPath: function(start, finish, options) {
    options = options || {};

    this.nodes = new Heap([], null, function (a, b) {
        return b.units - a.units ;
    });
    this.distances = {};
    this.previous = {};
    this.start = start;
    this.finish = finish;

    // Set the starting values for distances
    this.setBaseline.call(this);

    // loop until we checked every node in the queue
    var smallest;
    var path = [];
    var alt;
    while (this.nodes.peek()) {
      smallest = this.nodes.pop().key;
      if (smallest === finish) {
        while (this.previous[smallest]) {
          path.push(smallest);
          smallest = this.previous[smallest];
        }
        break;
      }

      if (!smallest || this.distances[smallest] === Infinity) {
        continue;
      }

      for (var neighbor in this.vertices[smallest]) {
        alt = this.distances[smallest] + this.vertices[smallest][neighbor];

        if (alt < this.distances[neighbor]) {
          this.distances[neighbor] = alt;
          this.previous[neighbor] = smallest;
          this.nodes.push({units:alt, key:neighbor});
        }
      }
    }

    if (path.length < 1) { return null; }

    if (options.trim) {
      path = path.concat([start]);
      // `path` is generated in reverse order
      if (options.reverse) { return path; }
      return path.reverse();
    }
    path.shift();
    if (options.reverse) { return path; }
    return path.reverse();
  },

  // set the starting point to 0 and all the others to infinite
  setBaseline: function() {
    var vertex;
    for (vertex in this.vertices) {
      if (vertex === this.start) {
        this.distances[vertex] = 0;
        this.nodes.push({units:0, key:vertex});
      } else {
        this.distances[vertex] = Infinity;
        this.nodes.push({units:Infinity, key:vertex});
      }

      this.previous[vertex] = null;
    }
  }

});

module.exports = Graph;
