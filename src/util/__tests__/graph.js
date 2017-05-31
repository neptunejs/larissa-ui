'use strict';

const Graph = require('graph.js/dist/graph.full');

const getSubgraphs = require('../getSubgraphs');

const graph = new Graph();

graph.addNewVertex('1');
graph.addNewVertex('2');
graph.addNewVertex('3');
graph.addNewVertex('4');
graph.addNewVertex('5');
graph.addNewVertex('6');
graph.addNewVertex('7');
graph.addNewVertex('8');
graph.addNewVertex('9');
graph.addNewVertex('10');
graph.addNewVertex('11');

graph.addNewEdge('1', '2');
graph.addNewEdge('2', '3');
graph.addNewEdge('2', '4');
graph.addNewEdge('4', '5');
graph.addNewEdge('6', '4');
graph.addNewEdge('6', '10');
graph.addNewEdge('11', '10');
graph.addNewEdge('7', '8');
graph.addNewEdge('8', '9');

console.log(getSubgraphs(graph));