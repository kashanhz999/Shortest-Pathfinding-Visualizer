import React, { useState, useEffect } from "react";
import Node from "./Node.js";
import astar from "../astarAlgorithm/astar.js";
import "./Pathfind.css";
import Astar from "../astarAlgorithm/astar.js";

const cols = 25;
const rows = 10;

const NODE_START_ROW = 0;
const NODE_START_COL = 0;
const NODE_END_ROW = rows - 1;
const NODE_END_COL = cols - 1;

const Pathfind = () => {
  const [Grid, setGrid] = useState([]);
  const [Path, setPath] = useState([]);
  const [VisitedNodes, setVisitedNodes] = useState([]);

  useEffect(() => {
    initializeGrid();
  }, []);

  // Creates the grid
  const initializeGrid = () => {
    const grid = new Array(rows);
    for (let i = 0; i < rows; i++) {
      grid[i] = new Array(rows);
    }

    createSpot(grid);

    setGrid(grid);

    addNeighbours(grid);

    const startNode = grid[NODE_START_ROW][NODE_START_COL];
    const endNode = grid[NODE_END_ROW][NODE_END_COL];
    let path = Astar(startNode, endNode);
    startNode.isWall =false
    endNode.isWall = false
    setPath(path.path);
    setVisitedNodes(path.visitedNodes)
  };

  // Creates the Spot
  const createSpot = (grid) => {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        grid[i][j] = new Spot(i, j);
      }
    }
  };

  // Add Neighbours
  const addNeighbours = (grid) => {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        grid[i][j].addneighbours(grid);
      }
    }
  }

  // Spot Constructor
  function Spot(i, j) {
    this.x = i;
    this.y = j;
    this.isStart = this.x === NODE_START_ROW && this.y === NODE_START_COL;
    this.isEnd = this.x === NODE_END_ROW && this.y === NODE_END_COL;
    this.g = 0;
    this.f = 0;
    this.h = 0;
    this.neighbours = [];
    this.isWall = false
    if(Math.random(1)<0.2){
      this.isWall = true
    }
    this.previous = undefined;
    this.addneighbours = function (grid) {
      let i = this.x;
      let j = this.y;
      if (i > 0) this.neighbours.push(grid[i - 1][j]);
      if (i < rows - 1) this.neighbours.push(grid[i + 1][j]);
      if (j > 0) this.neighbours.push(grid[i][j - 1]);
      if (j < cols - 1) this.neighbours.push(grid[i][j + 1]);
    };
  }

  // Grid with Node
  const gridwithNode = (
    <div>
      {Grid.map((row, rowIndex) => {
        return (
          <div key={rowIndex} className="rowWrapper">
            {row.map((col, colIndex) => {
              const { isStart, isEnd, isWall } = col;
              return <Node
                key={colIndex}
                isStart={isStart}
                isEnd={isEnd}
                row={rowIndex}
                col={colIndex}
                isWall = {isWall}
              />;
            })}
          </div>
        );
      })}
    </div>
  );

  console.log(Path);

  const visualizeShortestPath = (shortestPathNodes) => {
    for (let i = 0; i < shortestPathNodes.length; i++) {
      setTimeout(() => {
        const node = shortestPathNodes[i];
        document.getElementById(`node-${node.x}-${node.y}`).className = "node node-shortest-path";
      }, 10 * i);
    }
  }

  const visualizePath = () => {
    for (let i = 0; i <= VisitedNodes.length; i++) {
      if (i === VisitedNodes.length) {
        setTimeout(() => {
          visualizeShortestPath(Path);
        }, 20 * i);
      } else {
        setTimeout(() => {
          const node = VisitedNodes[i];
          document.getElementById(`node-${node.x}-${node.y}`).className = 'node node-visited';
        },20*i)
      }
    }
  }

  return (
    <div className="wrapper">
    <h1>Pathfind Component</h1>
      {gridwithNode}
    <button onClick={visualizePath}>Visualize Path</button>  
    
    </div>
    
  );
};

export default Pathfind;