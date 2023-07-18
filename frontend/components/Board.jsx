import React from "react";
import Cell from "./Cell";

function Board() {
 
  return (
      <div style={ {
          height: "395px",
          width: "395px",
          backgroundColor: "#fff",
          borderRadius: "10px",
          display: "grid",
          gridTemplateColumns: "120px 120px 120px",
          gridGap: "10px",
          padding: "10px",
          alignItems:"center"
        }}>
          <Cell row={0} column={0} />
          <Cell row={0} column={1} />
          <Cell row={0} column={2} />
         
          <Cell row={1} column={0} />
          <Cell row={1} column={1} />
          <Cell row={1} column={2} />

          <Cell row={2} column={0} />
          <Cell row={2} column={1} />
          <Cell row={2} column={2} />
     </div>
  )
}

export default Board