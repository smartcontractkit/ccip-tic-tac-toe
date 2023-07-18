import React, { useContext } from "react";
import { AppContext } from "../pages";

const Boop = ({ row = 0, column = 0, cellClick = ()=>{}, timing = 150, disabledCell=true, children }) => {
  const [isBooped, setIsBooped] = React.useState(false);
  const style = {
    width: "115px",
    height: "115px",
    fontSize: "2.2em",
    backgroundColor: "#375bd2",
    display: 'flex',
    backfaceVisibility: 'hidden',
    scale:isBooped? "1.1": "1",
    borderRadius: "10px",
    justifyContent: "center",
    alignItems:"center"
  };
  React.useEffect(() => {
    if (!isBooped) {
      return;
    }
  }, [isBooped, timing]);
  const trigger = () => {
    setIsBooped(true);
  };

  const triggerOff = () => {
    setIsBooped(false);
  };
  return (
    <span onMouseEnter={trigger} style={style} onMouseLeave={triggerOff} onClick={() => !disabledCell && cellClick(row, column)}>
      {children}
    </span>
  );
};

function Cell({row, column}) {
    const { cells, cellClick, disabledCell } = useContext(AppContext)
    const currentVal = cells[row][column]
    return (
      <Boop row={row} column={column} cellClick={cellClick} disabledCell={disabledCell}>
           <div style={{textAlign:'center', color: 'white', fontFamily:"fantasy", marginTop:"20px", fontSize:"70px"}}>{currentVal}</div>
      </Boop>
    )
}

export default Cell