import React from "react";
import "./Node.css";

const Node = ({isStart, isEnd,isWall,row,col}) => {
  const classes = 
  isStart
  ? "node-start"
  : isWall
  ?"isWall"
  : isEnd
  ? "node-end"
  :""

  return (
    <div className={`node ${classes}`} id={`node-${row}-${col}`}>
      
    </div>
  )
}

export default Node;